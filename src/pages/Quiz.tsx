import { Link } from "wouter";
import { useUserProgress } from "@/context/UserProgressContext";
import { ChevronRight, Play, Award, BookOpen, Clock, HelpCircle, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Quiz() {
  const { progress } = useUserProgress();

  const quizTypes = [
    { id: "quick", title: "Quick Quiz", desc: "5 random questions, timed", icon: Clock, color: "text-accent", bg: "bg-accent/10", locked: false },
    { id: "terms", title: "Terminology Drill", desc: "Test your vocabulary", icon: BookOpen, color: "text-secondary-foreground", bg: "bg-secondary/30", locked: false },
    { id: "equip", title: "Emergency Equipment", desc: "PSI, limits, and locations", icon: HelpCircle, color: "text-destructive", bg: "bg-destructive/10", locked: false },
    { id: "airports", title: "Airport Codes", desc: "IATA code recall", icon: GraduationCap, color: "text-primary", bg: "bg-primary/10", locked: false },
    { id: "mixed", title: "Mixed Training", desc: "Full category shuffle", icon: Play, color: "text-success", bg: "bg-success/10", locked: false },
    { id: "final", title: "Final Exam Mode", desc: "50 questions, 90 minutes", icon: Award, color: "text-accent", bg: "bg-accent/10", locked: false }
  ];

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Quiz Engine</h1>
        <p className="text-primary-foreground/80 text-sm mb-6">Test your knowledge under pressure.</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex justify-around border border-white/10">
          <div className="text-center">
            <span className="block text-2xl font-bold text-accent">{progress.quizScores.totalTaken}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">Quizzes Taken</span>
          </div>
          <div className="w-px bg-white/20"></div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-success">{progress.quizScores.averageScore}%</span>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">Avg Score</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4">
        {quizTypes.map(quiz => {
          return (
            <Link key={quiz.id} href={`/quiz/session?type=${quiz.id}`}>
              <div className="p-4 rounded-2xl border transition-all active:scale-[0.98] flex items-center gap-4 bg-card border-card-border shadow-sm">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${quiz.bg}`}>
                  <quiz.icon className={`w-6 h-6 ${quiz.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-base">{quiz.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{quiz.desc}</p>
                </div>
                <div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          );
        })}

        <div className="mt-8">
          <Link href="/flashcards">
            <Button variant="outline" className="w-full h-14 rounded-xl border-border bg-card text-foreground font-bold text-base shadow-sm">
              Try Flashcards Instead
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
