import { createFileRoute, Link } from "@tanstack/react-router";
import { usePlanetState } from "@/hooks/use-planet-state";

export const Route = createFileRoute("/core")({
  head: () => ({
    meta: [
      { title: "The Pit // Planetary Core" },
      { name: "description", content: "Descent into the planetary pit — stress telemetry of the cherry seed core." },
    ],
  }),
  component: PitView,
});

function PitView() {
  const { data } = usePlanetState();
  const p = data?.syrup_pressure ?? 0;
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-syrup-glow" style={{ transition: "color 700ms var(--ease-viscous)" }}>
        ← Surface
      </Link>
      <header className="absolute top-8 right-8 text-right z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Depth –12.7 km // Core</p>
        <h1 className="font-display text-3xl mt-1" style={{ color: "var(--crust)" }}>The Pit</h1>
      </header>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* descending rings */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: 200 + i * 110,
              height: 200 + i * 110,
              borderColor: `oklch(${30 + i * 5}% 0.1 20 / ${0.5 - i * 0.08})`,
              borderStyle: i % 2 ? "solid" : "dashed",
              animation: `${i % 2 ? "orbit-slow" : "orbit-reverse"} ${60 + i * 20}s linear infinite`,
            }}
          />
        ))}

        {/* the pit itself */}
        <div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 320, height: 320,
            background: "var(--grad-pit)",
            boxShadow: "inset 0 0 80px oklch(5% 0.02 18), 0 0 60px oklch(40% 0.2 22 / 0.4)",
          }}
        >
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Seed Integrity</p>
            <p className="font-display text-7xl text-syrup-glow mt-2" style={{ color: "var(--syrup)" }}>
              {((1 - p / 1000) * 100).toFixed(1)}<span className="text-2xl">%</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground mt-2">stress index</p>
          </div>
        </div>
      </div>

      {/* viscous drips */}
      <div className="absolute inset-x-0 top-0 flex justify-around pointer-events-none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="block w-1.5 rounded-b-full"
            style={{
              height: 28,
              background: "linear-gradient(to bottom, transparent, oklch(60% 0.27 18))",
              animation: `drip ${4 + i}s var(--ease-viscous) ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground text-center">
        warning: extraction beyond 800 psi destabilizes seed lattice
      </footer>
    </main>
  );
}
