interface Props {
  size?: number;
  pressure?: number;
}

export function CherryPlanet({ size = 420, pressure = 500 }: Props) {
  const intensity = Math.max(0, Math.min(1, pressure / 1000));
  return (
    <div
      className="relative ease-viscous"
      style={{
        width: size,
        height: size,
        animation: "pulse-syrup 8s var(--ease-viscous) infinite",
      }}
    >
      {/* outer syrup glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, oklch(70% 0.25 25 / ${0.15 + intensity * 0.35}) 0%, transparent 70%)`,
          filter: "blur(40px)",
          transform: "scale(1.4)",
        }}
      />
      {/* planet body */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: "var(--grad-planet)",
          boxShadow: "var(--shadow-deep), inset -40px -60px 120px oklch(8% 0.02 18 / 0.7), inset 30px 30px 60px oklch(85% 0.2 30 / 0.2)",
        }}
      >
        {/* pitted craters */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-60">
          <defs>
            <radialGradient id="crater" cx="40%" cy="35%">
              <stop offset="0%" stopColor="oklch(10% 0.04 20)" />
              <stop offset="60%" stopColor="oklch(20% 0.08 20 / 0.7)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="65" cy="35" r="8" fill="url(#crater)" />
          <circle cx="30" cy="55" r="12" fill="url(#crater)" />
          <circle cx="75" cy="70" r="6" fill="url(#crater)" />
          <circle cx="50" cy="80" r="5" fill="url(#crater)" />
          <circle cx="20" cy="25" r="4" fill="url(#crater)" />
        </svg>
        {/* viscous highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "10%", left: "18%", width: "30%", height: "20%",
            background: "radial-gradient(ellipse, oklch(95% 0.05 60 / 0.5), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </div>
      {/* stem */}
      <div
        className="absolute"
        style={{
          top: -size * 0.18,
          left: "50%",
          width: 8,
          height: size * 0.22,
          background: "linear-gradient(to bottom, oklch(35% 0.1 130), oklch(20% 0.08 60))",
          borderRadius: 4,
          transform: "translateX(-50%) rotate(-12deg)",
          transformOrigin: "bottom center",
        }}
      />
    </div>
  );
}
