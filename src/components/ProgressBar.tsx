import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className, indicatorClassName, showLabel }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      <div className={cn("h-2 w-full bg-muted rounded-full overflow-hidden", className)}>
        <div 
          className={cn("h-full bg-accent transition-all duration-500 ease-out", indicatorClassName)}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground mt-1 text-right font-medium">
          {Math.round(clampedProgress)}%
        </p>
      )}
    </div>
  );
}
