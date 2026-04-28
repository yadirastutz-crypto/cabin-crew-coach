import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight, Lock, Flame } from "lucide-react";
import { trainingPath } from "@/data/trainingPath";
import { useUserProgress } from "@/context/UserProgressContext";

export default function TrainingPath() {
  const [, navigate] = useLocation();
  const { progress, markLessonComplete } = useUserProgress();

  const completedDays = trainingPath.filter((d) =>
    progress.completedLessons.includes(d.completionId)
  ).length;

  const currentDay = trainingPath.findIndex(
    (d) => !progress.completedLessons.includes(d.completionId)
  );

  const pct = Math.round((completedDays / trainingPath.length) * 100);

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-7 px-5 rounded-b-3xl shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Home</span>
        </button>
        <h1 className="text-2xl font-black mb-1">7-Day Training Path</h1>
        <p className="text-primary-foreground/60 text-sm">Your complete beginner journey to interview-ready.</p>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-primary-foreground/70">
              {completedDays} of {trainingPath.length} days complete
            </span>
            <span className="text-xs font-bold text-accent">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: "#D7B267" }}
            />
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {completedDays === trainingPath.length && (
          <div
            className="rounded-2xl p-5 text-center border"
            style={{ backgroundColor: "rgba(215,178,103,0.10)", borderColor: "rgba(215,178,103,0.30)" }}
          >
            <div className="text-3xl mb-2">🏆</div>
            <p className="font-black text-foreground">7-Day Path Complete!</p>
            <p className="text-sm text-muted-foreground mt-1">You've finished the full training journey. Keep practising to stay sharp.</p>
          </div>
        )}

        {trainingPath.map((day, i) => {
          const isDone = progress.completedLessons.includes(day.completionId);
          const isActive = i === currentDay;
          const isLocked = i > currentDay && !isDone;

          return (
            <DayCard
              key={day.day}
              day={day}
              isDone={isDone}
              isActive={isActive}
              isLocked={isLocked}
              onMarkDone={() => markLessonComplete(day.completionId)}
              navigate={navigate}
            />
          );
        })}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground py-2 leading-relaxed">
          Cabin Crew Coach is an independent educational preparation tool. Not affiliated with any airline.
        </p>
      </div>
    </div>
  );
}

function DayCard({
  day,
  isDone,
  isActive,
  isLocked,
  onMarkDone,
  navigate,
}: {
  day: typeof trainingPath[0];
  isDone: boolean;
  isActive: boolean;
  isLocked: boolean;
  onMarkDone: () => void;
  navigate: (path: string) => void;
}) {
  const [expanded, setExpanded] = useState(isActive && !isDone);

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
        isDone ? "border-[#4F8A6D]/30" : isActive ? "border-primary/30 ring-1 ring-primary/10" : "border-card-border"
      }`}
      style={isDone ? { backgroundColor: "rgba(79,138,109,0.04)" } : { backgroundColor: "var(--card)" }}
    >
      {/* Card header */}
      <button
        onClick={() => !isLocked && setExpanded((v) => !v)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left"
        disabled={isLocked}
      >
        {/* Icon / check */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ backgroundColor: isDone ? "rgba(79,138,109,0.12)" : day.bg }}
        >
          {isDone ? <CheckCircle2 className="w-6 h-6" style={{ color: "#4F8A6D" }} /> : isLocked ? <Lock className="w-5 h-5 text-muted-foreground/50" /> : <span>{day.icon}</span>}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${day.color}15`, color: day.color }}
            >
              Day {day.day}
            </span>
            {isActive && !isDone && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> Today
              </span>
            )}
            {isDone && (
              <span className="text-[10px] font-bold text-[#4F8A6D]">Complete</span>
            )}
          </div>
          <h3 className={`font-black text-sm ${isLocked ? "text-muted-foreground/50" : "text-foreground"}`}>
            {day.title}
          </h3>
          <p className={`text-xs mt-0.5 ${isLocked ? "text-muted-foreground/40" : "text-muted-foreground"}`}>
            {day.theme}
          </p>
        </div>

        {!isLocked && (
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {/* Expanded content */}
      {expanded && !isLocked && (
        <div className="border-t border-border/40 px-5 pb-5 pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{day.intro}</p>

          {/* Tasks */}
          <div className="space-y-2.5 mb-4">
            {day.tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => navigate(task.href)}
                className="w-full flex items-start gap-3 text-left rounded-xl border border-card-border bg-background px-4 py-3 hover:bg-muted/30 transition-colors active:scale-[0.99]"
              >
                <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">{task.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              </button>
            ))}
          </div>

          {/* Key lesson */}
          <div
            className="rounded-xl px-4 py-3 mb-4"
            style={{ backgroundColor: `${day.color}10`, borderLeft: `3px solid ${day.color}` }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: day.color }}>
              Key Lesson
            </p>
            <p className="text-xs text-foreground leading-relaxed italic">"{day.keyLesson}"</p>
          </div>

          {/* Mark done */}
          {!isDone && (
            <button
              onClick={onMarkDone}
              className="w-full h-11 rounded-xl font-bold text-sm text-white transition-colors"
              style={{ backgroundColor: "#4F8A6D" }}
            >
              Mark Day {day.day} Complete ✓
            </button>
          )}
        </div>
      )}
    </div>
  );
}

