import { useEffect, useState } from "react";
import { planetStore, usePlanetStore, type ResourceType, DELTA, streakMultiplier } from "@/hooks/use-planet-store";
import { toast } from "sonner";

const RESOURCES: { type: ResourceType; label: string; hint: string; key: string }[] = [
  { type: "juice", label: "Tap Juice", hint: "+ psi · refines", key: "Q" },
  { type: "crust", label: "Mine Crust", hint: "− psi · safe vent", key: "W" },
  { type: "pit",   label: "Pry Pit",   hint: "−− psi · risky", key: "E" },
];

const SHAPES = ["clip-petal", "clip-hex", "clip-tear"] as const;

const PRESETS = [10, 25, 50, 100];

export function HarvestPanel() {
  const [amount, setAmount] = useState(12);
  const { streak, status } = usePlanetStore();

  const extract = (type: ResourceType) => {
    if (status !== "playing") return;
    const delta = DELTA[type] * amount;
    const sign = delta >= 0 ? "+" : "";
    const mult = type === "juice" && streak > 0 ? streakMultiplier(streak + 1) : 1;
    const bonusNote = type === "juice" && streak > 0
      ? ` · ${((mult - 1) * 100).toFixed(0)}% streak bonus`
      : "";
    planetStore.extract(type, amount);
    toast.success(`${sign}${delta.toFixed(1)} PSI · ${amount} ${type}${bonusNote}`);
  };

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const key = e.key.toUpperCase();
      if (key === "Q") extract("juice");
      else if (key === "W") extract("crust");
      else if (key === "E") extract("pit");
      else if (key === "1") setAmount(10);
      else if (key === "2") setAmount(25);
      else if (key === "3") setAmount(50);
      else if (key === "4") setAmount(100);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, streak, status]);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Yield controls */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em]">
          <label className="text-muted-foreground">Yield</label>
          <input
            type="range" min={1} max={100} value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-36 accent-[var(--syrup)]"
          />
          <span className="w-8 font-display text-sm" style={{ color: "var(--syrup)" }}>{amount}</span>
        </div>
        {/* Quick presets */}
        <div className="flex gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm"
              style={{
                background: amount === p ? "var(--grad-syrup)" : "oklch(22% 0.07 20)",
                color: amount === p ? "var(--pitted)" : "var(--muted-foreground)",
                transition: "all 400ms var(--ease-viscous)",
                boxShadow: amount === p ? "0 0 8px var(--syrup)" : "none",
              }}
              title={`Yield ${p} (key ${i + 1})`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Extraction buttons */}
      <div className="flex gap-4">
        {RESOURCES.map((r, idx) => (
          <button
            key={r.type}
            onClick={() => extract(r.type)}
            className={`${SHAPES[idx]} harvest-btn ease-viscous flex flex-col items-center justify-center gap-1 relative`}
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
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px oklch(70% 0.25 25 / 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "oklch(22% 0.08 20)";
              (e.currentTarget as HTMLElement).style.color = "var(--crust)";
              (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 1px oklch(40% 0.1 20 / 0.5)";
            }}
          >
            {/* keyboard hint badge */}
            <span
              className="absolute font-mono text-[8px] tracking-[0.1em]"
              style={{ top: "22%", opacity: 0.55, color: "inherit" }}
            >
              [{r.key}]
            </span>
            <span className="font-display text-sm uppercase tracking-[0.15em]">{r.label}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-70">{r.hint}</span>
          </button>
        ))}
      </div>

      {/* Keyboard hint */}
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground opacity-60">
        Q · W · E to extract · 1–4 for yield
      </p>
    </div>
  );
}
