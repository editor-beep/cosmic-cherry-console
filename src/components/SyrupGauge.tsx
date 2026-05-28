import { SAFE_LOW, SAFE_HIGH, MAX_PSI } from "@/hooks/use-planet-store";

interface Props { pressure: number }

export function SyrupGauge({ pressure }: Props) {
  const pct = Math.max(0, Math.min(100, (pressure / MAX_PSI) * 100));
  const radius = 90;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  // safe band arc
  const safeStartPct = SAFE_LOW / MAX_PSI;
  const safeEndPct = SAFE_HIGH / MAX_PSI;
  const safeLen = (safeEndPct - safeStartPct) * circ;
  const safeOffset = circ - safeStartPct * circ;
  const inSafe = pressure >= SAFE_LOW && pressure <= SAFE_HIGH;

  return (
    <div className="relative" style={{ width: 220, height: 220 }}>
      <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="syrupArc" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(85% 0.2 60)" />
            <stop offset="100%" stopColor="oklch(60% 0.27 18)" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r={radius}
          fill="none" stroke="oklch(20% 0.06 20)" strokeWidth="14" />
        {/* safe band */}
        <circle cx="110" cy="110" r={radius}
          fill="none" stroke="oklch(70% 0.15 150 / 0.35)" strokeWidth="14"
          strokeDasharray={`${safeLen} ${circ}`}
          strokeDashoffset={safeOffset}
        />
        <circle cx="110" cy="110" r={radius}
          fill="none" stroke="url(#syrupArc)" strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 2.4s var(--ease-viscous)",
            filter: "drop-shadow(0 0 12px oklch(70% 0.25 25 / 0.6))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Syrup PSI</span>
        <span className="font-display text-5xl mt-1"
          style={{ color: inSafe ? "var(--syrup)" : "var(--destructive)" }}>
          {pressure.toFixed(0)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest mt-1"
          style={{ color: inSafe ? "oklch(70% 0.15 150)" : "var(--destructive)" }}>
          {inSafe ? "safe band" : pressure < SAFE_LOW ? "underpressure" : "critical"}
        </span>
      </div>
    </div>
  );
}
