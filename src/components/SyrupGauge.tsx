interface Props { pressure: number }

export function SyrupGauge({ pressure }: Props) {
  const pct = Math.max(0, Math.min(100, (pressure / 1000) * 100));
  const radius = 90;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
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
        <span className="font-display text-5xl text-syrup-glow mt-1" style={{ color: "var(--syrup)" }}>
          {pressure.toFixed(0)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">/ 1000 max</span>
      </div>
    </div>
  );
}
