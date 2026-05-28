import { createFileRoute, Link } from "@tanstack/react-router";
import { usePlanetStore } from "@/hooks/use-planet-store";
import { GameOverlay } from "@/components/GameOverlay";

export const Route = createFileRoute("/refinery")({
  head: () => ({
    meta: [
      { title: "The Filling // Refinery" },
      { name: "description", content: "Refined filling output logs across the cherry-pie macrocosm." },
    ],
  }),
  component: RefineryView,
});

function RefineryView() {
  const planet = usePlanetStore();
  const data = planet.harvests;

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <GameOverlay />
      <Link to="/" className="absolute top-8 left-8 z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        ← Surface
      </Link>
      <header className="absolute top-8 right-8 text-right z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Refinery // The Filling</p>
        <h1 className="font-display text-3xl mt-1" style={{ color: "var(--crust)" }}>Viscous Output</h1>
      </header>

      <div className="absolute inset-0 grid grid-cols-[1fr_1.2fr] items-center px-24 gap-16">
        <div className="relative flex items-center justify-center">
          <div
            className="clip-blob ease-viscous flex items-end justify-center relative overflow-hidden"
            style={{
              width: 360, height: 440,
              background: "oklch(16% 0.06 20)",
              boxShadow: "var(--shadow-deep)",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 ease-viscous"
              style={{
                height: `${Math.min(100, planet.syrup_pressure / 10)}%`,
                background: "var(--grad-syrup)",
                transition: "height 2.4s var(--ease-viscous)",
                boxShadow: "inset 0 20px 40px oklch(85% 0.2 30 / 0.4)",
              }}
            />
            <div className="relative z-10 pb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Vessel Load</p>
              <p className="font-display text-5xl mt-1" style={{ color: "var(--crust)" }}>
                {(planet.syrup_pressure / 10).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto scrollbar-none pr-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground sticky top-0 backdrop-blur py-2"
             style={{ background: "oklch(12% 0.04 22 / 0.85)" }}>
            Extraction Ledger — last 50
          </p>
          {data.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              No harvests recorded. Return to the Crust to extract.
            </p>
          ) : data.map((h) => (
            <div key={h.id} className="clip-hex flex items-center justify-between px-6 py-4 font-mono text-xs uppercase tracking-[0.2em]"
              style={{ background: "oklch(18% 0.06 18)" }}>
              <span style={{ color: "var(--syrup)" }} className="font-display text-sm">{h.resource_type}</span>
              <span style={{ color: "var(--crust)" }}>{Number(h.amount).toFixed(1)} u</span>
              <span className="text-muted-foreground">{new Date(h.extracted_at).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
