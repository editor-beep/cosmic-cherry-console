import { useEffect, useMemo, useState } from "react";

const KEY = "harvester.tutorial.v2";

type Step = {
  title: string;
  body: string;
  glyph: string;
  interact: "pulse" | "drag" | "tap" | "gauge" | "orbit";
};

const STEPS: Step[] = [
  {
    title: "Welcome, Harvester",
    body: "You stand on a cherry-textured planet adrift in a macro-cosmic pie. Your task: extract sweet substrate without destabilizing the seed core. Tap the orb below — feel the syrup respond.",
    glyph: "ɸ",
    interact: "pulse",
  },
  {
    title: "Three Orbital Nodes",
    body: "Crust hosts your harvest controls. Pit reads core stress. Filling logs refined output. Drag the ring to spin the orbit and reveal the glyphs.",
    glyph: "◐",
    interact: "orbit",
  },
  {
    title: "Calibrate Yield",
    body: "Authenticate via the hex glyph (top-right of the Crust). Then drag the YIELD slider below to set extraction volume per pull. Try it.",
    glyph: "≋",
    interact: "drag",
  },
  {
    title: "Tap, Mine, Pry",
    body: "TAP JUICE raises pressure. MINE CRUST relieves it. PRY PIT stabilizes the seed. Tap the three glyphs below in any order to feel the rhythm.",
    glyph: "✦",
    interact: "tap",
  },
  {
    title: "Watch the Gauge",
    body: "Keep pressure between 200 and 800 PSI. Below: a live demo. Drive the needle into the red and the lattice fractures — across all harvesters, in real time.",
    glyph: "◉",
    interact: "gauge",
  },
];

export function Tutorial({ force, onClose }: { force?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (force) { setOpen(true); setI(0); return; }
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, [force]);

  if (!open) return null;
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  const close = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 animate-fade-in"
      style={{ background: "oklch(8% 0.03 20 / 0.82)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="clip-blob-soft relative px-12 py-12 max-w-xl w-full ease-viscous animate-scale-in"
        style={{
          background: "oklch(16% 0.06 18)",
          boxShadow: "var(--shadow-deep), var(--shadow-glow)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground text-center">
          Initiation Protocol · {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </p>
        <h2 className="font-display text-3xl text-center mt-3 text-syrup-glow" style={{ color: "var(--syrup)" }}>
          {step.title}
        </h2>
        <p className="mt-5 text-center font-mono text-sm leading-relaxed" style={{ color: "var(--crust)" }}>
          {step.body}
        </p>

        <div className="mt-7 mb-2 flex items-center justify-center h-32">
          <StepInteraction kind={step.interact} glyph={step.glyph} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={close}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-syrup-glow"
            style={{ transition: "color 500ms var(--ease-viscous)" }}
          >
            Skip
          </button>

          <div className="flex gap-2">
            {STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Step ${idx + 1}`}
                className="block w-2.5 h-2.5 rounded-full hover:scale-125"
                style={{
                  background: idx === i ? "var(--syrup)" : idx < i ? "oklch(45% 0.15 22)" : "oklch(28% 0.06 20)",
                  transition: "all 500ms var(--ease-viscous)",
                  boxShadow: idx === i ? "0 0 10px var(--syrup)" : "none",
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {i > 0 && (
              <button
                onClick={() => setI(i - 1)}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-syrup-glow px-2"
                style={{ transition: "color 500ms var(--ease-viscous)" }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => (last ? close() : setI(i + 1))}
              className="clip-hex px-6 py-3 font-display uppercase tracking-[0.25em] text-xs"
              style={{
                background: "var(--grad-syrup)",
                color: "var(--pitted)",
                transition: "all 700ms var(--ease-viscous)",
              }}
            >
              {last ? "Descend" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepInteraction({ kind, glyph }: { kind: Step["interact"]; glyph: string }) {
  const [tick, setTick] = useState(0);
  const [yieldVal, setYieldVal] = useState(40);
  const [tapped, setTapped] = useState<string[]>([]);
  const [angle, setAngle] = useState(0);
  const [psi, setPsi] = useState(420);

  // gauge demo drift
  useEffect(() => {
    if (kind !== "gauge") return;
    const t = setInterval(() => setPsi((p) => p + (Math.random() - 0.5) * 60), 700);
    return () => clearInterval(t);
  }, [kind]);

  if (kind === "pulse") {
    return (
      <button
        onClick={() => setTick(tick + 1)}
        className="relative w-24 h-24 rounded-full font-display text-4xl hover:scale-105"
        style={{
          background: "var(--grad-syrup)",
          color: "var(--pitted)",
          boxShadow: `0 0 ${20 + (tick % 6) * 8}px var(--syrup)`,
          transition: "all 600ms var(--ease-viscous)",
          transform: `scale(${1 + (tick % 6) * 0.04})`,
        }}
      >
        {glyph}
      </button>
    );
  }

  if (kind === "orbit") {
    const nodes = ["⌬", "◈", "✺"];
    return (
      <div
        className="relative w-32 h-32 cursor-grab active:cursor-grabbing"
        onMouseMove={(e) => {
          if (e.buttons === 1) setAngle((a) => a + e.movementX * 2);
        }}
        onClick={() => setAngle((a) => a + 60)}
      >
        <div
          className="absolute inset-0 rounded-full border border-dashed"
          style={{ borderColor: "oklch(45% 0.15 22 / 0.5)", transform: `rotate(${angle}deg)`, transition: "transform 700ms var(--ease-viscous)" }}
        >
          {nodes.map((n, idx) => {
            const a = (idx / nodes.length) * Math.PI * 2;
            return (
              <span
                key={idx}
                className="absolute font-display text-lg"
                style={{
                  left: `calc(50% + ${Math.cos(a) * 56}px - 12px)`,
                  top: `calc(50% + ${Math.sin(a) * 56}px - 12px)`,
                  color: "var(--syrup)",
                  transform: `rotate(${-angle}deg)`,
                }}
              >
                {n}
              </span>
            );
          })}
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          drag
        </span>
      </div>
    );
  }

  if (kind === "drag") {
    return (
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <input
          type="range" min={0} max={100} value={yieldVal}
          onChange={(e) => setYieldVal(Number(e.target.value))}
          className="w-full accent-[oklch(70%_0.25_25)]"
        />
        <span className="font-display text-2xl" style={{ color: "var(--syrup)" }}>
          {yieldVal} u / pull
        </span>
      </div>
    );
  }

  if (kind === "tap") {
    const opts = [
      { id: "juice", label: "TAP", color: "var(--syrup)" },
      { id: "crust", label: "MINE", color: "var(--crust)" },
      { id: "pit", label: "PRY", color: "var(--glaze)" },
    ];
    return (
      <div className="flex gap-3">
        {opts.map((o) => {
          const hit = tapped.includes(o.id);
          return (
            <button
              key={o.id}
              onClick={() => setTapped((t) => (t.includes(o.id) ? t : [...t, o.id]))}
              className="clip-tear w-20 h-20 font-display text-xs uppercase tracking-[0.2em] hover:scale-110"
              style={{
                background: hit ? "var(--grad-syrup)" : "oklch(22% 0.08 20)",
                color: hit ? "var(--pitted)" : o.color,
                transition: "all 600ms var(--ease-viscous)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  // gauge
  const clamped = Math.max(0, Math.min(1000, psi));
  const danger = clamped > 800 || clamped < 200;
  return (
    <div className="flex flex-col items-center gap-2 w-56">
      <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ background: "oklch(22% 0.06 20)" }}>
        <div className="absolute inset-y-0 left-[20%] right-[20%]" style={{ background: "oklch(35% 0.1 30 / 0.4)" }} />
        <div
          className="absolute top-0 bottom-0 w-1"
          style={{
            left: `${(clamped / 1000) * 100}%`,
            background: danger ? "var(--destructive)" : "var(--syrup)",
            boxShadow: `0 0 8px ${danger ? "var(--destructive)" : "var(--syrup)"}`,
            transition: "all 500ms var(--ease-viscous)",
          }}
        />
      </div>
      <span className="font-display text-xl" style={{ color: danger ? "var(--destructive)" : "var(--syrup)" }}>
        {clamped.toFixed(0)} PSI
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
        {danger ? "lattice fracturing" : "nominal"}
      </span>
    </div>
  );
}

export function TutorialTrigger() {
  const [force, setForce] = useState(false);
  return (
    <>
      <button
        onClick={() => setForce(true)}
        className="clip-hex inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] hover:scale-105"
        style={{
          background: "oklch(20% 0.08 20)",
          color: "var(--syrup)",
          transition: "all 500ms var(--ease-viscous)",
          boxShadow: "0 0 16px oklch(70% 0.25 25 / 0.15)",
        }}
        title="Replay tutorial"
      >
        <span style={{ color: "var(--syrup)" }}>◎</span>
        Replay Protocol
      </button>
      {force && <Tutorial force onClose={() => setForce(false)} />}
    </>
  );
}
