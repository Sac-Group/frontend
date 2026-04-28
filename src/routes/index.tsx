import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/workbench/Header";
import { InputPanel, type GeneratePayload } from "@/components/workbench/InputPanel";
import { OutputDisplay } from "@/components/workbench/OutputDisplay";
import { ServiceUnavailable } from "@/components/workbench/ServiceUnavailable";
import { generateArchitecture, pingHealth, type Architecture } from "@/lib/api";

const RECHECK_INTERVAL_SEC = 15;
type HealthStatus = "checking" | "up" | "down";

export const Route = createFileRoute("/")({
  component: Workbench,
});

const SCALE_LABEL: Record<string, string> = {
  small: "Small (<10k users)",
  medium: "Medium (10k–1M users)",
  enterprise: "Enterprise (1M+ users)",
};

const BUDGET_LABEL: Record<string, string> = {
  low: "Low budget — minimize cost over performance.",
  medium: "Moderate budget — balance cost and capability.",
  high: "High budget — prioritize performance and resilience.",
};

const DEPLOYMENT_LABEL: Record<string, string> = {
  cloud: "Cloud-native (AWS / GCP / Azure).",
  onprem: "On-premise / self-hosted infrastructure.",
  hybrid: "Hybrid — mix of cloud and on-premise.",
};

function composeConstraints(p: GeneratePayload): string {
  return [
    `Scale: ${SCALE_LABEL[p.scale] ?? p.scale}.`,
    `Team size: ${p.teamSize} ${p.teamSize === 1 ? "engineer" : "engineers"}.`,
    `Budget: ${BUDGET_LABEL[p.budget] ?? p.budget}`,
    `Deployment: ${DEPLOYMENT_LABEL[p.deployment] ?? p.deployment}`,
  ].join(" ");
}

function Workbench() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Architecture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthStatus>("checking");
  const [lastCheckedAt, setLastCheckedAt] = useState<number | null>(null);
  const [nextCheckIn, setNextCheckIn] = useState<number | null>(null);
  const lastPayloadRef = useRef<GeneratePayload | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const checkHealth = useCallback(async () => {
    setHealth((prev) => (prev === "up" ? "up" : "checking"));
    const ok = await pingHealth();
    setLastCheckedAt(Date.now());
    setHealth(ok ? "up" : "down");
    return ok;
  }, []);

  // Initial health check on mount.
  useEffect(() => {
    void checkHealth();
  }, [checkHealth]);

  // While down, recheck every RECHECK_INTERVAL_SEC seconds and surface a countdown.
  useEffect(() => {
    if (health !== "down") {
      setNextCheckIn(null);
      return;
    }
    setNextCheckIn(RECHECK_INTERVAL_SEC);
    const tick = setInterval(() => {
      setNextCheckIn((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          void checkHealth();
          return RECHECK_INTERVAL_SEC;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [health, checkHealth]);

  const runGenerate = useCallback(async (payload: GeneratePayload) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    lastPayloadRef.current = payload;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const architecture = await generateArchitecture(
        {
          requirements: payload.requirements,
          constraints: composeConstraints(payload),
        },
        controller.signal,
      );
      if (controller.signal.aborted) return;
      setResult(architecture);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const apiError = err as { status?: number; message?: string };
      const message = apiError.message || "Something went wrong.";
      // Network error (status 0) or 502/503 → backend is effectively down,
      // hand off to the service-unavailable page instead of an inline error.
      if (apiError.status === 0 || apiError.status === 502 || apiError.status === 503) {
        setHealth("down");
        setLastCheckedAt(Date.now());
      } else {
        setError(message);
        toast.error("Generation failed", { description: message });
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastPayloadRef.current) runGenerate(lastPayloadRef.current);
  }, [runGenerate]);

  const handleHealthRetry = useCallback(async () => {
    const ok = await checkHealth();
    if (ok) toast.success("Service is back online");
  }, [checkHealth]);

  if (health !== "up") {
    return (
      <ServiceUnavailable
        checking={health === "checking"}
        lastCheckedAt={lastCheckedAt}
        nextCheckInSeconds={health === "down" ? nextCheckIn : null}
        onRetry={handleHealthRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <InputPanel onGenerate={runGenerate} loading={loading} />
        <OutputDisplay
          loading={loading}
          result={result}
          error={error}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}
