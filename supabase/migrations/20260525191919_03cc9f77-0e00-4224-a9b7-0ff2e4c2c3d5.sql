
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'harvester');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  harvester_name TEXT NOT NULL DEFAULT 'Unnamed Harvester',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profile self select" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profile self update" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Harvests
CREATE TABLE public.harvests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('juice','crust','pit')),
  amount NUMERIC NOT NULL CHECK (amount > 0 AND amount <= 100),
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.harvests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "harvest self select" ON public.harvests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "harvest self insert" ON public.harvests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Planet state (shared singleton)
CREATE TABLE public.planet_state (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  syrup_pressure NUMERIC NOT NULL DEFAULT 420,
  total_juice NUMERIC NOT NULL DEFAULT 0,
  total_crust NUMERIC NOT NULL DEFAULT 0,
  total_pit NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO public.planet_state (id) VALUES (1);
ALTER TABLE public.planet_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "planet state read all auth" ON public.planet_state
  FOR SELECT TO authenticated USING (true);

-- Trigger: new user => profile + role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, harvester_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'harvester_name', 'Harvester ' || substr(NEW.id::text,1,6)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'harvester');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: harvest => bump planet_state
CREATE OR REPLACE FUNCTION public.apply_harvest()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.planet_state SET
    syrup_pressure = GREATEST(0, LEAST(1000, syrup_pressure + CASE NEW.resource_type
      WHEN 'juice' THEN NEW.amount * 1.5
      WHEN 'crust' THEN -NEW.amount * 0.8
      WHEN 'pit'   THEN NEW.amount * 0.4
    END)),
    total_juice = total_juice + CASE WHEN NEW.resource_type='juice' THEN NEW.amount ELSE 0 END,
    total_crust = total_crust + CASE WHEN NEW.resource_type='crust' THEN NEW.amount ELSE 0 END,
    total_pit   = total_pit   + CASE WHEN NEW.resource_type='pit'   THEN NEW.amount ELSE 0 END,
    updated_at = now()
  WHERE id = 1;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_harvest_insert
  AFTER INSERT ON public.harvests
  FOR EACH ROW EXECUTE FUNCTION public.apply_harvest();

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.planet_state;
ALTER PUBLICATION supabase_realtime ADD TABLE public.harvests;
ALTER TABLE public.planet_state REPLICA IDENTITY FULL;
ALTER TABLE public.harvests REPLICA IDENTITY FULL;
