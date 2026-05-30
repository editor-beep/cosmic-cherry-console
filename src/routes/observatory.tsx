import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/observatory")({
  head: () => ({
    meta: [
      { title: "Observatory // Case File 002" },
      { name: "description", content: "Resistance and Response — a framework revision finding from the planetary observatory." },
    ],
  }),
  component: ObservatoryView,
});

const SEQUENCE_ORIGINAL = [
  "SUBSTRATE",
  "PRIMARY RESISTANCE",
  "RESPONSE DOMAIN",
  "INTERFACE EXPRESSION",
  "NEED / MOTIVATION",
];

const SEQUENCE_VARIANT_A = [
  "SUBSTRATE",
  "PRIMARY RESISTANCE",
  "RESPONSE DOMAIN",
  "SELF",
  "INTERFACE EXPRESSION",
  "NEED / MOTIVATION",
];

const SEQUENCE_VARIANT_B = [
  "SUBSTRATE",
  "PRIMARY RESISTANCE",
  "SELF",
  "RESPONSE DOMAIN",
  "INTERFACE EXPRESSION",
  "NEED / MOTIVATION",
];

function ObservatoryView() {
  return (
    <main
      className="relative min-h-screen w-screen overflow-x-hidden"
      style={{ background: "oklch(10% 0.04 22)" }}
    >
      <Link
        to="/"
        className="fixed top-8 left-8 z-20 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-syrup-glow"
        style={{ transition: "color 700ms var(--ease-viscous)" }}
      >
        ← Surface
      </Link>

      <header className="fixed top-8 right-8 z-20 text-right">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Observatory // Active Record
        </p>
        <h1 className="font-display text-3xl mt-1" style={{ color: "var(--crust)" }}>
          Case File 002
        </h1>
      </header>

      <div className="mx-auto max-w-2xl px-8 pt-32 pb-24 flex flex-col gap-10">

        {/* Case header */}
        <section className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            Resistance and Response
          </p>
          <h2 className="font-display text-5xl leading-tight" style={{ color: "var(--syrup)" }}>
            The Coordination Pattern
          </h2>
          <div
            className="mt-2 grid grid-cols-2 gap-px"
            style={{ background: "oklch(22% 0.06 20)" }}
          >
            <MetaCell label="Classification" value="Finding" />
            <MetaCell label="Finding Type" value="Framework Revision" accent />
            <MetaCell label="Confidence" value="Moderate" />
            <MetaCell label="Status" value="Active" />
          </div>
        </section>

        <Divider />

        {/* The Finding */}
        <section className="flex flex-col gap-5">
          <SectionLabel>The Finding</SectionLabel>
          <Prose>
            Two separate investigations produced the same structural surprise.
          </Prose>
          <Prose>
            In the money investigation, the initial hypothesis was that money functions
            as a coordination mechanism — a tool for resolving collective action problems.
            The investigation held. But pressure from edge cases revealed something
            underneath: money also functions as a carrier of identity, status, and meaning.
            Coordination was the surface. The deeper layer was something else.
          </Prose>
          <Prose>
            In the reputation investigation, the initial hypothesis was that reputation
            is an attractor within the Belonging domain — a signal that draws others closer.
            This also held, partially. But reputation turned out to operate across domains
            simultaneously, behaving differently depending on which substrate was active.
            Single-attractor theory could not contain it.
          </Prose>
          <Prose>
            The pattern across both investigations is identical: the response domain
            appeared to be the explanatory structure, but the resistance beneath it
            was doing most of the work.
          </Prose>
        </section>

        <Divider />

        {/* Against Maslow */}
        <section className="flex flex-col gap-5">
          <SectionLabel>Against Maslow</SectionLabel>
          <Prose>
            The standard reading of Maslow arranges human needs into a hierarchy —
            physiological first, then safety, then belonging, esteem, and self-actualization.
            The pyramid implies sequence: lower needs must be satisfied before higher ones activate.
          </Prose>
          <Prose>
            The response domains identified in this framework do not arrange into a hierarchy.
            They operate in parallel. The Meaning domain does not wait for the Belonging domain
            to resolve. Agency does not depend on Coordination being satisfied first.
          </Prose>
          <Prose>
            But the more significant difference is in the substrate. Maslow begins with the
            organism and its deficits. This framework begins with resistance — the forces that
            block, constrain, or demand response. The domains are not categories of need.
            They are categories of what emerges when specific resistances are encountered
            repeatedly enough to produce stable patterns.
          </Prose>
          <Prose>
            Maybe Maslow was looking at the same territory. But he named the outputs and
            called them the structure.
          </Prose>
        </section>

        <Divider />

        {/* The Domain Problem — NEW */}
        <section className="flex flex-col gap-5">
          <SectionLabel>The Domain Problem</SectionLabel>
          <Prose>
            The framework initially treated response domains as fundamental categories of analysis.
          </Prose>
          <div
            className="clip-hex px-8 py-6 flex flex-col gap-2"
            style={{ background: "oklch(16% 0.07 22)" }}
          >
            {["Coordination.", "Identity.", "Belonging.", "Meaning.", "Agency."].map((d) => (
              <p
                key={d}
                className="font-mono text-sm uppercase tracking-[0.35em]"
                style={{ color: "var(--crust)" }}
              >
                {d}
              </p>
            ))}
          </div>
          <Prose>
            Repeated investigations have begun to challenge this assumption.
          </Prose>
          <Prose>
            A competing interpretation is emerging: response domains may not be primitive
            structures at all. They may be adaptive responses generated by recurring forms
            of resistance. The domain is not the thing — it is what the system produces
            when it encounters a thing it cannot absorb directly.
          </Prose>
          <Prose>
            If this is correct, then the framework has been gradually moving one layer
            deeper than originally intended. The project would no longer be primarily
            concerned with cataloging domains. It would be investigating the conditions
            that produce domains.
          </Prose>
          <div
            className="border-l-2 pl-6 py-1"
            style={{ borderColor: "var(--syrup)" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] leading-relaxed" style={{ color: "var(--syrup)" }}>
              This remains unresolved, but it represents one of the most
              consequential implications currently active in the observatory.
            </p>
          </div>
        </section>

        <Divider />

        {/* Why This Matters */}
        <section className="flex flex-col gap-5">
          <SectionLabel>Why This Matters</SectionLabel>
          <Prose>
            If response domains are primitive, the work of the observatory is taxonomic.
            Find the domains. Map their boundaries. Identify which objects fall inside which domain.
            The framework is a filing system.
          </Prose>
          <Prose>
            If response domains are not primitive — if they are generated by something
            underneath — then the work is generative. The question is not which domain
            applies, but what resistance is producing this domain, and whether
            the same resistance would produce a different domain under different conditions.
            The framework becomes a diagnostic instrument instead.
          </Prose>
          <Prose>
            These are not equally ambitious projects. The second is harder and
            more consequential. The second also appears to be where the evidence is pointing.
          </Prose>
        </section>

        <Divider />

        {/* Structural Sequence */}
        <section className="flex flex-col gap-5">
          <SectionLabel>The Sequence Under Pressure</SectionLabel>
          <Prose>
            The working model of the framework's causal chain is currently under pressure
            from two directions: the findings above, and the investigation into Self
            which has not yet formally begun.
          </Prose>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
            <SequenceColumn label="Current Model" nodes={SEQUENCE_ORIGINAL} />
            <div className="pt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground self-start">
              vs
            </div>
            <div className="flex flex-col gap-4">
              <SequenceColumn label="Variant A" nodes={SEQUENCE_VARIANT_A} highlight="SELF" />
              <SequenceColumn label="Variant B" nodes={SEQUENCE_VARIANT_B} highlight="SELF" />
            </div>
          </div>

          <Prose>
            We do not know where Self belongs in the sequence. We do not yet know
            if it belongs to the sequence at all, or whether it reorganizes the sequence
            from within. That question is now the primary object of the observatory.
          </Prose>
        </section>

        <Divider />

        {/* Bridge to Case File 003 */}
        <section
          className="clip-hex px-8 py-7 flex flex-col gap-4"
          style={{ background: "oklch(14% 0.07 22)", borderLeft: "2px solid var(--syrup)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.5em]" style={{ color: "var(--syrup)" }}>
            Next Active Investigation
          </p>
          <p className="font-display text-2xl" style={{ color: "var(--crust)" }}>
            Case File 003: Self
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            Self is not the most interesting object in the observatory.
            It is the first object capable of attacking the framework's architecture
            instead of merely adding content to it. The investigation opens
            while the domain problem remains unresolved — deliberately.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Status: Pending
          </p>
        </section>

        {/* Footer metadata */}
        <footer className="flex items-center justify-between pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
            Observatory · Sector ɸ-7
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
            Case File 002 of ∞
          </p>
        </footer>

      </div>
    </main>
  );
}

function MetaCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="px-5 py-3 flex flex-col gap-1"
      style={{ background: "oklch(14% 0.05 22)" }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
        {label}
      </span>
      <span
        className="font-mono text-xs uppercase tracking-[0.25em]"
        style={{ color: accent ? "var(--syrup)" : "var(--crust)" }}
      >
        {value}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
      {children}
    </p>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-[12px] leading-[1.9] tracking-[0.02em]"
      style={{ color: "var(--crust)" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "oklch(25% 0.07 20)" }} />
      <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-muted-foreground">◈</span>
      <div className="flex-1 h-px" style={{ background: "oklch(25% 0.07 20)" }} />
    </div>
  );
}

function SequenceColumn({ label, nodes, highlight }: { label: string; nodes: string[]; highlight?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground mb-2">{label}</p>
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center">
          <div
            className="w-full px-3 py-2 text-center clip-hex"
            style={{
              background: node === highlight ? "oklch(24% 0.12 18)" : "oklch(18% 0.06 20)",
              borderColor: node === highlight ? "var(--syrup)" : "transparent",
            }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: node === highlight ? "var(--syrup)" : "var(--crust)" }}
            >
              {node}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <span className="font-mono text-[10px] text-muted-foreground my-0.5">↓</span>
          )}
        </div>
      ))}
    </div>
  );
}
