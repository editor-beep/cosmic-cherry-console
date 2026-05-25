import { useEffect, useState } from "react";

const KEY = "harvester.tutorial.v1";

const STEPS = [
  {
    title: "Welcome, Harvester",
    body: "You stand on a cherry-textured planet adrift in a macro-cosmic pie. Your task: extract its sweet substrate without destabilizing the seed core.",
  },
  {
    title: "Three Orbital Nodes",
    body: "Crust (this surface) hosts your harvest controls. Pit shows seed-core stress telemetry. Filling logs your refined output. Tap any glyph in orbit to descend.",
  },
  {
    title: "Calibrate Yield",
    body: "Authenticate via the hex glyph (top-right). Then drag the YIELD slider to set extraction volume per pull.",
  },
  {
    title: "Tap, Mine, Pry",
    body: "TAP JUICE raises syrup pressure. MINE CRUST relieves it. PRY PIT stabilizes the seed. Keep pressure between 200 and 800 PSI — beyond that the lattice fractures.",
  },
  {
    title: "Watch the Gauge",
    body: "The Syrup Gauge (bottom-left) and Vessel Load in the Refinery reflect planetary pressure in real time across all harvesters.",
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
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "oklch(8% 0.03 20 / 0.78)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="clip-blob relative px-14 py-16 max-w-xl w-full ease-viscous"
        style={{
          background: "oklch(16% 0.06 18)",
          boxShadow: "var(--shadow-deep), var(--shadow-glow)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground text-center">
          Initiation Protocol · {i + 1} / {STEPS.length}
        </p>
        <h2
          className="font-display text-3xl text-center mt-3 text-syrup-glow"
          style={{ color: "var(--syrup)" }}
        >
          {step.title}
        </h2>
        <p
          className="mt-6 text-center font-mono text-sm leading-relaxed"
          style={{ color: "var(--crust)" }}
        >
          {step.body}
        </p>

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            onClick={close}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-syrup-glow ease-viscous"
            style={{ transition: "color 500ms var(--ease-viscous)" }}
          >
            Skip
          </button>

          <div className="flex gap-2">
            {STEPS.map((_, idx) => (
              <span
                key={idx}
                className="block w-2 h-2 rounded-full ease-viscous"
                style={{
                  background: idx === i ? "var(--syrup)" : "oklch(30% 0.08 20)",
                  transition: "background 500ms var(--ease-viscous)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => (last ? close() : setI(i + 1))}
            className="clip-hex px-6 py-3 font-display uppercase tracking-[0.25em] text-xs ease-viscous"
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
  );
}

export function TutorialTrigger() {
  const [force, setForce] = useState(false);
  return (
    <>
      <button
        onClick={() => setForce(true)}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-syrup-glow ease-viscous"
        style={{ transition: "color 500ms var(--ease-viscous)" }}
        title="Replay tutorial"
      >
        ? Protocol
      </button>
      {force && <Tutorial force onClose={() => setForce(false)} />}
    </>
  );
}
