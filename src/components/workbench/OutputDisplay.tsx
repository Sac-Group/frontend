import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Boxes,
  Database,
  Cloud,
  Shield,
  Zap,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Lightbulb,
  Layers,
  ServerCog,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Architecture } from "@/lib/api";

type Props = {
  loading: boolean;
  result: Architecture | null;
  error: string | null;
  onRetry: () => void;
};

export function OutputDisplay({ loading, result, error, onRetry }: Props) {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <div className="relative h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div
          className={cn(
            "min-h-full p-8",
            (loading || (!result && !error)) && "flex items-center justify-center",
          )}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingState key="loading" />
            ) : error ? (
              <ErrorState key="error" message={error} onRetry={onRetry} />
            ) : result ? (
              <ResultView key="result" data={result} />
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </div>
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

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass-strong w-full max-w-md rounded-2xl p-6 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h2 className="font-display text-lg font-semibold">Generation failed</h2>
      <p className="mt-2 break-words text-sm text-muted-foreground">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-4 py-2 text-[12px] font-medium text-foreground transition-colors hover:bg-muted/50"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </button>
    </motion.div>
  );
}

function ResultView({ data }: { data: Architecture }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      toast.success("Copied JSON to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto w-full max-w-4xl space-y-8"
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" />
            Generated Architecture
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-gradient">
            {data.architectureName}
          </h1>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted/50 hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy JSON
            </>
          )}
        </button>
      </div>

      {/* Overview */}
      <Section icon={<Lightbulb className="h-3.5 w-3.5" />} title="Overview">
        <div className="glass rounded-xl p-5">
          <p className="text-[14px] leading-relaxed text-foreground/90">{data.overview}</p>
        </div>
      </Section>

      {/* Components */}
      <Section
        icon={<Boxes className="h-3.5 w-3.5" />}
        title="Components"
        count={data.components.length}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.components.map((c, i) => (
            <motion.div
              key={`${c.name}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.3 }}
              className="glass group rounded-xl p-4 transition-all hover:border-primary/40"
            >
              <div className="mb-1.5 flex items-start justify-between gap-2">
                <h3 className="font-display text-sm font-semibold text-foreground">{c.name}</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                <ServerCog className="h-2.5 w-2.5" />
                {c.technology}
              </span>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tech Stack — chips with hover tooltip showing reason */}
      <Section
        icon={<Layers className="h-3.5 w-3.5" />}
        title="Tech Stack"
        count={data.techStack.length}
        hint="Hover a chip to see why"
      >
        <div className="flex flex-wrap gap-1.5">
          {data.techStack.map((t, i) => (
            <Tooltip key={`${t.name}-${i}`}>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-2.5 py-1 text-[11.5px] font-medium text-foreground/85 transition-all hover:border-primary/60 hover:bg-primary/5 hover:text-foreground">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {t.name}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs whitespace-normal bg-popover text-popover-foreground"
              >
                <p className="text-[11.5px] leading-relaxed">{t.reason}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Section>

      {/* Design Decisions — accordion */}
      <Section
        icon={<Lightbulb className="h-3.5 w-3.5" />}
        title="Design Decisions"
        count={data.designDecisions.length}
      >
        <div className="glass rounded-xl px-4">
          <Accordion type="multiple" className="w-full">
            {data.designDecisions.map((d, i) => (
              <AccordionItem
                key={`${i}`}
                value={`d-${i}`}
                className="border-b-border/50 last:border-b-0"
              >
                <AccordionTrigger className="py-3 text-[13px] font-medium hover:no-underline">
                  <span className="flex items-center gap-3 text-left">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] text-primary">
                      {i + 1}
                    </span>
                    <span>{d.decision}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-3 pl-8 text-[12.5px] leading-relaxed text-muted-foreground">
                  {d.reason}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Risks — warning cards */}
      <Section
        icon={<AlertTriangle className="h-3.5 w-3.5" />}
        title="Risks & Mitigations"
        count={data.risks.length}
      >
        <div className="space-y-2.5">
          {data.risks.map((r, i) => (
            <motion.div
              key={`${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.25 }}
              className="rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-foreground">{r.risk}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      Mitigation ·{" "}
                    </span>
                    {r.mitigation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="pb-2 pt-1 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
        End of architecture · Iterate by adjusting constraints on the left
      </div>
    </motion.div>
  );
}

function Section({
  icon,
  title,
  count,
  hint,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        <h2 className="font-display text-[13px] font-semibold uppercase tracking-wider text-foreground/90">
          {title}
        </h2>
        {typeof count === "number" && (
          <span className="rounded-full bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {count}
          </span>
        )}
        <div className="ml-1 h-px flex-1 bg-border/60" />
        {hint && (
          <span className="font-mono text-[10px] text-muted-foreground/70">{hint}</span>
        )}
      </div>
      {children}
    </section>
  );
}
