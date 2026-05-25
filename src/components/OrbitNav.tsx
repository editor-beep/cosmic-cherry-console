import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

const NODES = [
  { to: "/", label: "Crust", angle: -90 },
  { to: "/core", label: "Pit", angle: 30 },
  { to: "/refinery", label: "Filling", angle: 150 },
] as const;

export function OrbitNav({ radius = 280 }: { radius?: number }) {
  const loc = useLocation();
  const { user, signOut } = useAuth();
  return (
    <>
      {/* faint orbital ring */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          borderColor: "oklch(60% 0.15 25 / 0.18)",
          borderStyle: "dashed",
          animation: "orbit-slow 120s linear infinite",
        }}
      />
      {NODES.map((n) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const active = loc.pathname === n.to;
        return (
          <Link
            key={n.to}
            to={n.to}
            className="absolute group ease-viscous"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
              transition: "all 900ms var(--ease-viscous)",
            }}
          >
            <div
              className="clip-petal flex items-center justify-center font-display uppercase text-xs tracking-[0.2em] ease-viscous"
              style={{
                width: active ? 130 : 110,
                height: active ? 130 : 110,
                background: active ? "var(--grad-syrup)" : "oklch(20% 0.06 20)",
                color: active ? "var(--pitted)" : "var(--crust)",
                boxShadow: active ? "var(--shadow-glow)" : "none",
                transition: "all 900ms var(--ease-viscous)",
              }}
            >
              {n.label}
            </div>
          </Link>
        );
      })}
      {/* auth control orbit node */}
      <div className="absolute top-8 right-8 flex items-center gap-3">
        {user ? (
          <button
            onClick={signOut}
            className="clip-hex px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] ease-viscous"
            style={{ background: "oklch(22% 0.06 20)", color: "var(--crust)", transition: "all 700ms var(--ease-viscous)" }}
          >
            Disengage
          </button>
        ) : (
          <Link
            to="/auth"
            className="clip-hex px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] ease-viscous"
            style={{ background: "var(--grad-syrup)", color: "var(--pitted)", transition: "all 700ms var(--ease-viscous)" }}
          >
            Enter Pit
          </Link>
        )}
      </div>
    </>
  );
}
