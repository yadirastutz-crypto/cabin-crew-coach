import { useRoute, Link } from "wouter";
import { phases } from "@/data/phases";
import { useUserProgress } from "@/context/UserProgressContext";
import { ChevronLeft, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";

export default function AcademyPhase() {
  const [, params] = useRoute("/academy/:phaseId");
  const { progress, markLessonComplete } = useUserProgress();
  
  const phase = phases.find(p => p.id === params?.phaseId);

  if (!phase) {
    return <div className="p-8 text-center">Phase not found.</div>;
  }

  const completedInPhase = phase.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const phaseProgress = (completedInPhase / phase.lessons.length) * 100;
  const isComplete = phaseProgress >= 100;

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 h-14 flex items-center">
        <Link href="/academy">
          <button className="p-2 -ml-2 text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
        <span className="ml-2 font-bold text-sm uppercase tracking-wider text-muted-foreground">Phase {phase.number}</span>
      </div>

      <div className="px-5 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-3">{phase.title}</h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">{phase.description}</p>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-foreground">Progress</span>
            <span className="text-accent">{Math.round(phaseProgress)}%</span>
          </div>
          <ProgressBar progress={phaseProgress} className="h-3" />
        </div>

        {phase.traineesMiss && (
          <div className="bg-muted/30 border border-border rounded-2xl p-5 mb-8 flex gap-4">
            <AlertCircle className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-accent mb-1">What Trainees Miss</h3>
              <p className="text-sm font-medium text-foreground">{phase.traineesMiss}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground mb-4">Lessons</h2>
          
          {phase.lessons.map((lesson, idx) => {
            const isLessonComplete = progress.completedLessons.includes(lesson.id);
            
            return (
              <div 
                key={lesson.id}
                className={`p-4 rounded-2xl border transition-all ${isLessonComplete ? 'bg-success/5 border-success/20' : 'bg-card border-card-border'}`}
                onClick={() => markLessonComplete(lesson.id)}
              >
                <div className="flex gap-4 items-center cursor-pointer">
                  {isLessonComplete ? (
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isLessonComplete ? 'text-foreground/70 line-through' : 'text-foreground'}`}>
                      {idx + 1}. {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{lesson.durationMin} min</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/quiz/session">
            <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
              Take Phase Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
