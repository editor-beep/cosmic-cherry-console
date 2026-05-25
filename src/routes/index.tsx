import { createFileRoute } from "@tanstack/react-router";
import { CherryPlanet } from "@/components/CherryPlanet";
import { OrbitNav } from "@/components/OrbitNav";
import { SyrupGauge } from "@/components/SyrupGauge";
import { HarvestPanel } from "@/components/HarvestPanel";
import { Tutorial, TutorialTrigger } from "@/components/Tutorial";
import { usePlanetState } from "@/hooks/use-planet-state";

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
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Tutorial />
      {/* top-left telemetry */}
      <header className="absolute top-8 left-8 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Sector ɸ-7 // The Crust</p>
        <h1 className="font-display text-3xl mt-1" style={{ color: "var(--crust)" }}>Planetary Harvester</h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
          Cherry-pie macrocosm · Glaze layer 0.04
        </p>
        <div className="mt-3"><TutorialTrigger /></div>
      </header>

      {/* center orbit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitNav />
        <CherryPlanet pressure={p} />
      </div>

      {/* bottom gauge + harvest controls */}
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
      <span className="text-syrup-glow font-display text-base" style={{ color: "var(--crust)" }}>
        {Number(value).toFixed(1)}
      </span>
    </div>
  );
}
