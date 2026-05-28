import { useState } from "react";
import { planetStore, type ResourceType } from "@/hooks/use-planet-store";
import { toast } from "sonner";

const RESOURCES: { type: ResourceType; label: string; hint: string; clip: string }[] = [
  { type: "juice", label: "Tap Juice", hint: "+ pressure", clip: "clip-petal" },
  { type: "crust", label: "Mine Crust", hint: "- pressure", clip: "clip-hex" },
  { type: "pit",   label: "Pry Pit",   hint: "+ stability", clip: "clip-tear" },
];

export function HarvestPanel() {
  const [amount, setAmount] = useState(12);

  const extract = (type: ResourceType) => {
    planetStore.extract(type, amount);
    toast.success(`Extracted ${amount} ${type}`);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em]">
        <label className="text-muted-foreground">Yield</label>
        <input
          type="range" min={1} max={100} value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="w-40 accent-[var(--syrup)]"
        />
        <span className="w-8" style={{ color: "var(--syrup)" }}>{amount}</span>
      </div>
      <div className="flex gap-4">
        {RESOURCES.map((r) => (
          <button
            key={r.type}
            onClick={() => extract(r.type)}
            className={`${r.clip} ease-viscous flex flex-col items-center justify-center gap-1`}
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
