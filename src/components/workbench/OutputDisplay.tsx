import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Boxes, Database, Cloud, Shield, Zap } from "lucide-react";

type Props = { loading: boolean; hasResult: boolean };

export function OutputDisplay({ loading, hasResult }: Props) {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <div className="relative flex h-[calc(100vh-3.5rem)] items-center justify-center overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingState key="loading" />
          ) : hasResult ? (
            <ResultPlaceholder key="result" />
          ) : (
            <EmptyState key="empty" />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl text-center"
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl glass-strong">
        <Boxes className="h-6 w-6 text-primary" />
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-gradient">
        Architect at the speed of thought
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Describe your system on the left, set your constraints, and we'll generate a
        production-ready solution architecture with reasoning.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: Database, label: "Data Layer" },
          { icon: Cloud, label: "Infra" },
          { icon: Shield, label: "Security" },
          { icon: Zap, label: "Performance" },
        ].map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="glass flex flex-col items-center gap-1.5 rounded-xl p-3"
          >
            <f.icon className="h-4 w-4 text-primary/80" />
            <span className="text-[11px] font-medium text-muted-foreground">{f.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Awaiting input
      </div>
    </motion.div>
  );
}

function LoadingState() {
  const steps = [
    "Parsing requirements",
    "Evaluating constraints",
    "Selecting components",
    "Composing architecture",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="glass-strong w-full max-w-md rounded-2xl p-6"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <div className="absolute inset-0 animate-ping rounded-xl bg-primary/20" />
        </div>
        <div>
          <div className="font-display text-sm font-semibold">Gemini is thinking...</div>
          <div className="text-[11px] text-muted-foreground">
            Designing your solution architecture
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.3 }}
            className="flex items-center gap-2.5 text-[12px]"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.4 + 0.1 }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 font-mono text-[9px] text-primary"
            >
              {i + 1}
            </motion.span>
            <span className="text-foreground/80">{s}</span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: i * 0.4 + 0.2 }}
              className="ml-auto flex-1"
            >
              <div className="ml-3 h-px bg-gradient-to-r from-border to-transparent" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ResultPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass-strong w-full max-w-2xl rounded-2xl p-8 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <h2 className="font-display text-xl font-semibold">Architecture ready</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Your solution architecture will render here once the backend is wired up.
      </p>
    </motion.div>
  );
}
