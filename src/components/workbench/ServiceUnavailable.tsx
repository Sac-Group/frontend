import { motion } from "framer-motion";
import { AlertTriangle, Loader2, RefreshCw, ServerCrash, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api";

type Props = {
  checking: boolean;
  lastCheckedAt: number | null;
  nextCheckInSeconds: number | null;
  onRetry: () => void;
};

export function ServiceUnavailable({
  checking,
  lastCheckedAt,
  nextCheckInSeconds,
  onRetry,
}: Props) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="dot-grid absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-mesh)" }}
      />

      {/* mini header */}
      <header className="relative z-10 flex h-14 items-center border-b border-border/60 bg-background/70 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--accent-glow)]">
            <Sparkles className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Architecht<span className="text-primary">.ai</span>
          </span>
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Service Unavailable
          </span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-strong w-full max-w-lg rounded-2xl p-8 text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
            <ServerCrash className="h-7 w-7" />
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            We can't reach the server right now
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
            Architecht.ai's generation backend isn't responding. This usually clears up within a
            minute or two — we'll keep checking automatically. You can also retry manually below.
          </p>

          {/* Status row */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <StatusTile
              label="Backend status"
              value={
                <span className="inline-flex items-center gap-1.5 text-amber-300">
                  <AlertTriangle className="h-3 w-3" />
                  Unreachable
                </span>
              }
            />
            <StatusTile
              label={checking ? "Checking…" : "Next auto-check"}
              value={
                checking ? (
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    in progress
                  </span>
                ) : nextCheckInSeconds !== null ? (
                  <span className="font-mono text-foreground/85">
                    {nextCheckInSeconds}s
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )
              }
            />
          </div>

          <button
            onClick={onRetry}
            disabled={checking}
            className={cn(
              "mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--accent-glow)] transition-all",
              "hover:shadow-[0_0_32px_-4px_var(--accent-glow)]",
              "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
            )}
          >
            {checking ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Checking…
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5" />
                Try again now
              </>
            )}
          </button>

          <div className="mt-6 border-t border-border/50 pt-4">
            <p className="text-[11px] text-muted-foreground/80">
              Endpoint:{" "}
              <span className="font-mono text-foreground/70">{API_BASE_URL}/api/test</span>
            </p>
            {lastCheckedAt && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Last checked · {new Date(lastCheckedAt).toLocaleTimeString()}
              </p>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-border/60 bg-background/60 px-5 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 backdrop-blur-xl">
        Architecht.ai · Status page
      </footer>
    </div>
  );
}

function StatusTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="glass rounded-xl px-3.5 py-2.5 text-left">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
        {label}
      </div>
      <div className="mt-1 text-[12.5px] font-medium">{value}</div>
    </div>
  );
}
