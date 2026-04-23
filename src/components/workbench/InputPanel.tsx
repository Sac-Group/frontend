import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  ShoppingBag,
  Cloud,
  Cpu,
  Users,
  Wallet,
  Server,
  Layers,
  ArrowUp,
  MessageSquare,
  Video,
  Banknote,
  GraduationCap,
  HeartPulse,
  Gamepad2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  {
    label: "E-commerce",
    icon: ShoppingBag,
    text: "A multi-tenant e-commerce platform supporting 100k+ products, real-time inventory, Stripe payments, personalized recommendations, and a mobile-first storefront with sub-second page loads.",
  },
  {
    label: "SaaS",
    icon: Cloud,
    text: "A B2B SaaS analytics dashboard with workspace-based tenancy, role-based access control, OAuth SSO, real-time data ingestion from third-party APIs, and customizable reports exportable to PDF/CSV.",
  },
  {
    label: "IoT",
    icon: Cpu,
    text: "An IoT telemetry platform ingesting 50k events/sec from edge devices, with time-series storage, real-time anomaly detection, geo-distributed processing, and a live monitoring dashboard.",
  },
  {
    label: "Chat App",
    icon: MessageSquare,
    text: "A real-time messaging app with end-to-end encryption, group chats up to 1000 members, presence indicators, message reactions, file sharing up to 2GB, and cross-device sync via WebSockets.",
  },
  {
    label: "Streaming",
    icon: Video,
    text: "A video streaming platform serving 4K HDR content to 1M+ concurrent viewers, adaptive bitrate via HLS, global CDN distribution, DRM protection, and personalized recommendations.",
  },
  {
    label: "Fintech",
    icon: Banknote,
    text: "A digital banking platform with KYC/AML compliance, instant ACH transfers, multi-currency wallets, fraud detection via ML, PCI-DSS compliance, and double-entry ledger accounting.",
  },
  {
    label: "EdTech",
    icon: GraduationCap,
    text: "An online learning platform with live video classrooms, interactive whiteboards, auto-graded assessments, progress analytics, course marketplace, and offline content access for mobile.",
  },
  {
    label: "Health",
    icon: HeartPulse,
    text: "A telemedicine platform with HIPAA-compliant video consultations, EHR integration, e-prescriptions, appointment scheduling, wearable device sync, and AI-powered symptom triage.",
  },
  {
    label: "Gaming",
    icon: Gamepad2,
    text: "A multiplayer game backend handling 100k concurrent players, real-time matchmaking, anti-cheat detection, global leaderboards, in-game purchases, and sub-50ms latency via edge servers.",
  },
];

type Props = {
  onGenerate: (payload: { requirements: string }) => void;
  loading: boolean;
};

export function InputPanel({ onGenerate, loading }: Props) {
  const [requirements, setRequirements] = useState("");
  const [scale, setScale] = useState("medium");
  const [teamSize, setTeamSize] = useState([8]);
  const [budget, setBudget] = useState("medium");
  const [deployment, setDeployment] = useState("cloud");
  const taRef = useRef<HTMLTextAreaElement>(null);

  // auto-resize
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 260) + "px";
  }, [requirements]);

  const submit = () => {
    if (!requirements.trim() || loading) return;
    onGenerate({ requirements });
  };

  return (
    <aside className="flex h-[calc(100vh-3.5rem)] w-[350px] shrink-0 flex-col border-r border-border/60 bg-sidebar">
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Title */}
        <div className="mb-5">
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Input Panel
          </div>
          <h2 className="font-display text-[17px] font-semibold tracking-tight text-foreground">
            Design your system
          </h2>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            Describe what you want to build. We'll architect the rest.
          </p>
        </div>

        {/* Templates */}
        <div className="mb-5">
          <Label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Start from template
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATES.map((t, i) => (
              <motion.button
                key={t.label}
                onClick={() => setRequirements(t.text)}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border/70 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors duration-300",
                  "hover:border-primary/60 hover:text-foreground",
                  "hover:shadow-[0_0_0_1px_var(--accent-glow),0_8px_24px_-8px_var(--accent-glow)]"
                )}
              >
                {/* shimmer sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                {/* radial glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 120%, var(--accent-glow), transparent 70%)",
                  }}
                />
                <t.icon className="relative h-3 w-3 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_var(--accent-glow)]" />
                <span className="relative">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Requirements textarea */}
        <div className="mb-6">
          <Label
            htmlFor="req"
            className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            <Sparkles className="h-3 w-3" />
            System Requirements
          </Label>
          <div className="glass overflow-hidden rounded-xl focus-within:glow-ring transition-all">
            <textarea
              id="req"
              ref={taRef}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe your app idea..."
              rows={5}
              className="w-full resize-none bg-transparent px-3.5 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              style={{ minHeight: 120, maxHeight: 260 }}
            />
            <div className="flex items-center justify-between border-t border-border/60 bg-background/40 px-3 py-1.5">
              <span className="font-mono text-[10px] text-muted-foreground">
                {requirements.length} chars
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">⌘ + ⏎</span>
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="mb-3 flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Constraints
          </span>
          <div className="ml-2 h-px flex-1 bg-border/60" />
        </div>

        <div className="space-y-4">
          {/* Scale */}
          <Field icon={<Layers className="h-3.5 w-3.5" />} label="Scale">
            <Select value={scale} onValueChange={setScale}>
              <SelectTrigger className="h-9 border-border/60 bg-muted/30 text-[12px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small · &lt;10k users</SelectItem>
                <SelectItem value="medium">Medium · 10k–1M users</SelectItem>
                <SelectItem value="enterprise">Enterprise · 1M+ users</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Team Size */}
          <Field
            icon={<Users className="h-3.5 w-3.5" />}
            label="Team Size"
            value={`${teamSize[0]} ${teamSize[0] === 1 ? "engineer" : "engineers"}`}
          >
            <div className="px-1 pt-1.5">
              <Slider
                min={1}
                max={50}
                step={1}
                value={teamSize}
                onValueChange={setTeamSize}
              />
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground/70">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
          </Field>

          {/* Budget */}
          <Field icon={<Wallet className="h-3.5 w-3.5" />} label="Budget">
            <ToggleGroup
              type="single"
              value={budget}
              onValueChange={(v) => v && setBudget(v)}
              className="grid w-full grid-cols-3 gap-1 rounded-lg border border-border/60 bg-muted/30 p-1"
            >
              {["low", "medium", "high"].map((b) => (
                <ToggleGroupItem
                  key={b}
                  value={b}
                  className={cn(
                    "h-7 rounded-md text-[11px] capitalize text-muted-foreground transition-all",
                    "data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-sm"
                  )}
                >
                  {b}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>

          {/* Deployment */}
          <Field icon={<Server className="h-3.5 w-3.5" />} label="Deployment">
            <RadioGroup value={deployment} onValueChange={setDeployment} className="space-y-1.5">
              {[
                { v: "cloud", l: "Cloud Native", d: "AWS, GCP, Azure" },
                { v: "onprem", l: "On-Premise", d: "Self-hosted infra" },
                { v: "hybrid", l: "Hybrid", d: "Mix of both" },
              ].map((o) => (
                <label
                  key={o.v}
                  htmlFor={`dep-${o.v}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 transition-all",
                    "hover:border-border hover:bg-muted/40",
                    deployment === o.v && "border-primary/50 bg-primary/5"
                  )}
                >
                  <RadioGroupItem id={`dep-${o.v}`} value={o.v} className="h-3.5 w-3.5" />
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-foreground">{o.l}</div>
                    <div className="text-[10px] text-muted-foreground">{o.d}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </Field>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-border/60 bg-sidebar/80 p-4 backdrop-blur-xl">
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          onClick={submit}
          disabled={loading || !requirements.trim()}
          className={cn(
            "group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-all",
            "bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--accent-glow)]",
            "hover:shadow-[0_0_32px_-4px_var(--accent-glow)]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          )}
        >
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-[13px]"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Gemini is thinking...</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-[13px]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Architecture</span>
              <ArrowUp className="h-3.5 w-3.5 rotate-45 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.div>
          )}
        </motion.button>
        <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/70">
          Powered by Gemini · No data stored
        </p>
      </div>
    </aside>
  );
}

function Field({
  icon,
  label,
  value,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/80">
          <span className="text-muted-foreground">{icon}</span>
          {label}
        </Label>
        {value && (
          <span className="font-mono text-[10px] text-muted-foreground">{value}</span>
        )}
      </div>
      {children}
    </div>
  );
}
