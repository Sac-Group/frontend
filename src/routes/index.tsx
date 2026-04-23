import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/workbench/Header";
import { InputPanel } from "@/components/workbench/InputPanel";
import { OutputDisplay } from "@/components/workbench/OutputDisplay";

export const Route = createFileRoute("/")({
  component: Workbench,
});

function Workbench() {
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setHasResult(false);
    // simulate Gemini call
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <InputPanel onGenerate={handleGenerate} loading={loading} />
        <OutputDisplay loading={loading} hasResult={hasResult} />
      </div>
    </div>
  );
}
