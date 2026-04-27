import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/workbench/Header";
import { InputPanel, type GeneratePayload } from "@/components/workbench/InputPanel";
import { OutputDisplay } from "@/components/workbench/OutputDisplay";
import { generateArchitecture, type Architecture } from "@/lib/api";

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
  const lastPayloadRef = useRef<GeneratePayload | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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
      const message = (err as Error).message || "Something went wrong.";
      setError(message);
      toast.error("Generation failed", { description: message });
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastPayloadRef.current) runGenerate(lastPayloadRef.current);
  }, [runGenerate]);

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
