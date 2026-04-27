import { Share2, Sparkles, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/70 px-5 backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--accent-glow)]">
          <Sparkles className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <span className="font-display text-[15px] font-semibold tracking-tight">
          Architecht<span className="text-primary">.ai</span>
        </span>
        <span className="ml-2 hidden rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline-block">
          Beta
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden h-8 gap-1.5 text-muted-foreground hover:text-foreground sm:inline-flex"
        >
          <Github className="h-4 w-4" />
          <span className="text-xs">Star</span>
        </Button>
        <Button
          size="sm"
          className="h-8 gap-1.5 bg-foreground text-background hover:bg-foreground/90"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Share</span>
        </Button>
      </div>
    </header>
  );
}
