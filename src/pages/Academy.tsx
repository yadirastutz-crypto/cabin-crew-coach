import { useUserProgress } from "@/context/UserProgressContext";
import { phases } from "@/data/phases";
import { PhaseCard } from "@/components/PhaseCard";
import { Link } from "wouter";
import { BookOpen, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function Academy() {
  const { progress } = useUserProgress();

  const totalLessons = phases.reduce((acc, p) => acc + p.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallProgress = (completedCount / totalLessons) * 100;

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-3xl shadow-sm relative">
        <h1 className="text-2xl font-bold mb-2 relative z-10">Academy</h1>
        <p className="text-primary-foreground/80 text-sm relative z-10">Follow the structured path to master the fundamentals.</p>
        
        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-1">Overall Progress</span>
              <span className="font-bold text-lg">{completedCount} / {totalLessons} Lessons</span>
            </div>
            <span className="font-bold text-accent">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {phases.map((phase) => {
          const completedInPhase = phase.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const phaseProgress = (completedInPhase / phase.lessons.length) * 100;
          return (
            <PhaseCard 
              key={phase.id}
              phase={phase}
              progress={phaseProgress}
            />
          );
        })}
      </div>

      <div className="px-5 mt-8 mb-4">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Resources</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/reference">
            <div className="bg-card border border-card-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm font-bold text-foreground">Library</span>
            </div>
          </Link>
          <Link href="/airports">
            <div className="bg-card border border-card-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform">
              <MapPin className="w-6 h-6 text-accent mb-2" />
              <span className="text-sm font-bold text-foreground">Airports</span>
            </div>
          </Link>
          <Link href="/interview">
            <div className="bg-card border border-card-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform">
              <Award className="w-6 h-6 text-secondary-foreground mb-2" />
              <span className="text-sm font-bold text-foreground">Interview Prep</span>
            </div>
          </Link>
          <Link href="/flashcards">
            <div className="bg-card border border-card-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-success mb-2" />
              <span className="text-sm font-bold text-foreground">Flashcards</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
