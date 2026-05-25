import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Initiate // Planetary Harvester" }] }),
  component: AuthView,
});

const Schema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(72),
});

function AuthView() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav({ to: "/" }); }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Schema.safeParse({ email, password: pwd });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password: pwd,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Initiation complete. Check your inbox.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
        if (error) throw error;
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally { setBusy(false); }
  };

  return (
    <main className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        ← Surface
      </Link>

      <div className="grid grid-cols-[1.1fr_1fr] gap-16 items-center max-w-5xl px-12">
        <aside className="flex flex-col gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Cherry-Pie Macrocosm · Sector ɸ-7
          </p>
          <h2 className="font-display text-4xl leading-tight" style={{ color: "var(--crust)" }}>
            You are entering the harvest grid.
          </h2>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            Every initiated harvester is bound to the planetary syrup commons. Your pulls of juice,
            crust, and pit are logged to a shared ledger and reflected in the global pressure
            telemetry observed by all operators.
          </p>
          <div className="flex flex-col gap-3">
            {[
              ["01", "Forge or recover your identity"],
              ["02", "Descend to the Crust surface"],
              ["03", "Calibrate yield and extract"],
              ["04", "Monitor pit integrity"],
            ].map(([n, t]) => (
              <div key={n} className="flex items-center gap-4">
                <span
                  className="clip-tear w-9 h-9 flex items-center justify-center font-display text-xs"
                  style={{ background: "var(--grad-syrup)", color: "var(--pitted)" }}
                >
                  {n}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: "var(--crust)" }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <div
          className="clip-blob relative px-14 py-16 ease-viscous"
          style={{
            background: "oklch(16% 0.06 18)",
            boxShadow: "var(--shadow-deep), var(--shadow-glow)",
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground text-center">
            Harvester Initiation Pod
          </p>
          <h1 className="font-display text-4xl text-center mt-3 text-syrup-glow" style={{ color: "var(--syrup)" }}>
            {mode === "signin" ? "Re-Enter" : "Initiate"}
          </h1>

          <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
            <Field label="Frequency Email" value={email} onChange={setEmail} type="email" />
            <Field label="Pit Cipher" value={pwd} onChange={setPwd} type="password" />
            <button
              type="submit" disabled={busy}
              className="clip-hex mt-4 py-4 font-display uppercase tracking-[0.3em] text-sm disabled:opacity-50 ease-viscous"
              style={{ background: "var(--grad-syrup)", color: "var(--pitted)", transition: "all 700ms var(--ease-viscous)" }}
            >
              {busy ? "Calibrating..." : mode === "signin" ? "Descend" : "Forge Identity"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-syrup-glow"
            style={{ transition: "color 700ms var(--ease-viscous)" }}
          >
            {mode === "signin" ? "No identity? Forge one →" : "Already calibrated? Re-enter →"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type }: {
  label: string; value: string; onChange: (v: string) => void; type: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-transparent border-0 border-b py-3 px-1 font-mono text-base focus:outline-none ease-viscous"
        style={{
          borderColor: "oklch(40% 0.12 22 / 0.5)",
          color: "var(--crust)",
          transition: "border-color 700ms var(--ease-viscous)",
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "var(--syrup)"}
        onBlur={(e) => e.currentTarget.style.borderColor = "oklch(40% 0.12 22 / 0.5)"}
      />
    </label>
  );
}
