import { Link } from "wouter";
import { Phase } from "@/data/phases";
import { ProgressBar } from "./ProgressBar";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhaseCardProps {
  phase: Phase;
  progress: number;
  isLocked?: boolean;
}

export function PhaseCard({ phase, progress }: PhaseCardProps) {
  const totalDuration = phase.lessons.reduce((acc, curr) => acc + curr.durationMin, 0);
  const isComplete = progress >= 100;

  return (
    <Link href={`/academy/${phase.id}`}>
      <div className={cn(
        "relative p-5 rounded-2xl border transition-all active:scale-[0.98]",
        isComplete
          ? "bg-success/5 border-success/20"
          : "bg-card border-card-border shadow-sm"
      )}>
        {isComplete && (
          <div className="absolute top-4 right-4">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
        )}

        {!isComplete && (
          <div className="absolute top-4 right-4">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        )}

        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Phase {phase.number}</span>
          <h3 className="text-lg font-bold mt-1 text-foreground">
            {phase.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {phase.description}
        </p>

        <div className="space-y-3 mt-4">
          <ProgressBar progress={progress} showLabel />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{phase.lessons.length} Lessons</span>
            <span>Est. {totalDuration} min</span>
          </div>

          {phase.traineesMiss && (
            <div className="mt-4 p-3 bg-muted/50 rounded-xl border border-muted-border">
              <span className="text-xs font-bold text-muted-foreground uppercase mb-1 block">What Trainees Miss</span>
              <p className="text-xs font-medium text-foreground">{phase.traineesMiss}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
