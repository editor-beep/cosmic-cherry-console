import { createFileRoute } from "@tanstack/react-router";
import { CherryPlanet } from "@/components/CherryPlanet";
import { OrbitNav } from "@/components/OrbitNav";
import { SyrupGauge } from "@/components/SyrupGauge";
import { HarvestPanel } from "@/components/HarvestPanel";
import { Tutorial, TutorialTrigger } from "@/components/Tutorial";
import { GameOverlay } from "@/components/GameOverlay";
import { usePlanetState } from "@/hooks/use-planet-state";
import { WIN_TARGET } from "@/hooks/use-planet-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Crust // Planetary Harvester" },
      { name: "description", content: "Orbital command surface above the cherry-glaze planet." },
    ],
  }),
  component: CrustView,
});

function CrustView() {
  const { data } = usePlanetState();
  const p = data?.syrup_pressure ?? 0;
  const refined = data?.refined ?? 0;
  const pct = Math.min(100, (refined / WIN_TARGET) * 100);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Tutorial />
      <GameOverlay />
      <header className="absolute top-8 left-8 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Sector ɸ-7 // The Crust</p>
        <h1 className="font-display text-3xl mt-1" style={{ color: "var(--crust)" }}>Planetary Harvester</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
          Cherry-pie macrocosm · Glaze layer 0.04
        </p>
        <div className="mt-3"><TutorialTrigger /></div>
      </header>

      {/* Win progress, top-right */}
      <div className="absolute top-8 right-8 z-10 w-64 text-right">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Refined Syrup · Quota
        </p>
        <p className="font-display text-2xl mt-1" style={{ color: "var(--syrup)" }}>
          {refined.toFixed(0)}<span className="text-sm text-muted-foreground"> / {WIN_TARGET}</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: "oklch(20% 0.06 18)" }}>
          <div className="h-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "var(--grad-syrup)" }} />
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
          tap juice inside the safe band to refine
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitNav />
        <CherryPlanet pressure={p} />
      </div>

      <section className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-16 z-10">
        <SyrupGauge pressure={p} />
        <HarvestPanel />
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <Stat label="Juice" value={data?.total_juice ?? 0} />
          <Stat label="Crust" value={data?.total_crust ?? 0} />
          <Stat label="Pit" value={data?.total_pit ?? 0} />
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12">{label}</span>
      <span className="font-display text-base" style={{ color: "var(--crust)" }}>
        {Number(value).toFixed(1)}
      </span>
    </div>
  );
}
