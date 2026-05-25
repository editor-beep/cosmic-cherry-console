import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { extractResource } from "@/lib/planet.functions";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

type R = "juice" | "crust" | "pit";

const RESOURCES: { type: R; label: string; hint: string; clip: string }[] = [
  { type: "juice", label: "Tap Juice", hint: "+ pressure", clip: "clip-petal" },
  { type: "crust", label: "Mine Crust", hint: "- pressure", clip: "clip-hex" },
  { type: "pit",   label: "Pry Pit",   hint: "+ stability", clip: "clip-tear" },
];

export function HarvestPanel() {
  const { user, loading } = useAuth();
  const extract = useServerFn(extractResource);
  const qc = useQueryClient();
  const [amount, setAmount] = useState(12);

  const m = useMutation({
    mutationFn: (type: R) => extract({ data: { resource_type: type, amount } }),
    onSuccess: (_, type) => {
      toast.success(`Extracted ${amount} ${type}`);
      qc.invalidateQueries({ queryKey: ["planet"] });
      qc.invalidateQueries({ queryKey: ["harvests"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading) return null;
  if (!user) {
    return (
      <div className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <Link to="/auth" className="underline decoration-dotted text-syrup-glow" style={{ color: "var(--syrup)" }}>
          Authenticate
        </Link>{" "}to extract resources
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em]">
        <label className="text-muted-foreground">Yield</label>
        <input
          type="range" min={1} max={100} value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="w-40 accent-[var(--syrup)]"
        />
        <span className="text-syrup-glow w-8" style={{ color: "var(--syrup)" }}>{amount}</span>
      </div>
      <div className="flex gap-4">
        {RESOURCES.map((r) => (
          <button
            key={r.type}
            disabled={m.isPending}
            onClick={() => m.mutate(r.type)}
            className={`${r.clip} ease-viscous flex flex-col items-center justify-center gap-1 disabled:opacity-50`}
            style={{
              width: 130, height: 130,
              background: "oklch(22% 0.08 20)",
              color: "var(--crust)",
              transition: "all 700ms var(--ease-viscous)",
              boxShadow: "inset 0 0 0 1px oklch(40% 0.1 20 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--grad-syrup)";
              (e.currentTarget as HTMLElement).style.color = "var(--pitted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "oklch(22% 0.08 20)";
              (e.currentTarget as HTMLElement).style.color = "var(--crust)";
            }}
          >
            <span className="font-display text-sm uppercase tracking-[0.15em]">{r.label}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-70">{r.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
