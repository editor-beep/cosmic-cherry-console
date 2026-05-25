import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ExtractSchema = z.object({
  resource_type: z.enum(["juice", "crust", "pit"]),
  amount: z.number().positive().max(100),
});

export const getPlanetState = createServerFn({ method: "GET" }).handler(async () => {
  // Public read of planet state — use admin via dynamic import to keep client bundle clean
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("planet_state")
    .select("syrup_pressure,total_juice,total_crust,total_pit,updated_at")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error(error);
    return { syrup_pressure: 0, total_juice: 0, total_crust: 0, total_pit: 0, updated_at: null as string | null };
  }
  return data ?? { syrup_pressure: 0, total_juice: 0, total_crust: 0, total_pit: 0, updated_at: null };
});

export const extractResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ExtractSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("harvests").insert({
      user_id: userId,
      resource_type: data.resource_type,
      amount: data.amount,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getMyHarvests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("harvests")
      .select("id,resource_type,amount,extracted_at")
      .order("extracted_at", { ascending: false })
      .limit(20);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
