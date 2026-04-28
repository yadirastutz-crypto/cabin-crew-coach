import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizQuestion } from "@/components/QuizQuestion";
import { useUserProgress } from "@/context/UserProgressContext";
import { Button } from "@/components/ui/button";
import { X, Award, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuizSession() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const type = searchParams.get("type") || "quick";
  
  const { recordQuizScore } = useUserProgress();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Pick random questions based on type
  const questions = useMemo(() => {
    let pool = [...quizQuestions];
    if (type === "terms") pool = pool.filter(q => q.category === "Terminology");
    if (type === "equip") pool = pool.filter(q => q.category === "Emergency Equipment");
    if (type === "airports") pool = pool.filter(q => q.category === "Airport Codes");
    
    // Shuffle and pick
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const count = type === "quick" ? 5 : Math.min(10, shuffled.length);
    return shuffled.slice(0, count);
  }, [type]);

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const finalScore = Math.round((correctCount + (isCorrect ? 1 : 0)) / questions.length * 100);
      recordQuizScore(finalScore);
      setIsFinished(true);
    }
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center">No questions available for this category.</div>;
  }

  if (isFinished) {
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 80;

    return (
      <div className="min-h-[100dvh] bg-background p-6 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mb-6",
          passed ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
        )}>
          {passed ? <Award className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {passed ? "Excellent Work" : "Keep Practicing"}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          You scored <span className={cn("font-bold", passed ? "text-success" : "text-destructive")}>{score}%</span> ({correctCount} out of {questions.length})
        </p>

        <div className="bg-card border border-card-border p-5 rounded-2xl shadow-sm w-full max-w-sm mb-8 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2 block">Coach Note</span>
          <p className="text-sm text-foreground font-medium italic">
            {passed 
              ? "Solid performance. You're retaining the details. Consistency is everything." 
              : "A bad quiz is just data. Review the areas you missed and try again."}
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button 
            className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              setCurrentIndex(0);
              setCorrectCount(0);
              setIsFinished(false);
            }}
          >
            Try Again
          </Button>
          <Button 
            variant="outline"
            className="w-full h-14 text-lg font-bold rounded-xl"
            onClick={() => setLocation("/quiz")}
          >
            Back to Quiz Hub
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="h-14 px-4 flex items-center justify-between border-b border-border bg-background">
        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <button onClick={() => setLocation("/quiz")} className="p-2 text-muted-foreground">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 p-5 max-w-md mx-auto w-full">
        <QuizQuestion 
          key={currentIndex} // forces remount for new question
          question={questions[currentIndex]} 
          onNext={handleNext}
          timeLimit={type === "quick" ? 30 : 60}
        />
      </div>
    </div>
  );
}
