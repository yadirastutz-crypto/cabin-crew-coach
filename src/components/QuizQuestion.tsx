import { useState, useEffect } from "react";
import { QuizQuestion as QuizQuestionType } from "@/data/quizQuestions";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onNext: (isCorrect: boolean) => void;
  timeLimit?: number; // seconds
}

export function QuizQuestion({ question, onNext, timeLimit = 30 }: QuizQuestionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleSelect(-1); // timeout = wrong answer
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
  };

  const isCorrect = selectedIdx === question.correctAnswer;
  const progressPercent = (timeLeft / timeLimit) * 100;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">{question.category}</span>
          {!isAnswered && (
            <span className={cn("text-sm font-medium", timeLeft <= 5 ? "text-destructive animate-pulse" : "text-muted-foreground")}>
              {timeLeft}s
            </span>
          )}
        </div>
        {!isAnswered && (
          <ProgressBar 
            progress={progressPercent} 
            indicatorClassName={timeLeft <= 5 ? "bg-destructive" : "bg-primary"} 
            className="h-1.5" 
          />
        )}
      </div>

      <h2 className="text-xl font-bold text-foreground mb-8">
        {question.question}
      </h2>

      <div className="space-y-3 mb-8 flex-1">
        {question.options.map((opt, idx) => {
          let stateClass = "bg-card border-card-border hover:border-primary text-foreground";
          
          if (isAnswered) {
            if (idx === question.correctAnswer) {
              stateClass = "bg-success/10 border-success text-foreground font-medium shadow-[0_0_0_1px_rgba(79,138,109,0.5)]";
            } else if (idx === selectedIdx) {
              stateClass = "bg-destructive/10 border-destructive text-foreground";
            } else {
              stateClass = "bg-card border-card-border opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between",
                stateClass
              )}
            >
              <span className="pr-4">{opt}</span>
              {isAnswered && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
              {isAnswered && idx === selectedIdx && idx !== question.correctAnswer && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="animate-in slide-in-from-bottom-2 mt-auto">
          <div className={cn(
            "p-4 rounded-xl border mb-6",
            isCorrect ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <div className="flex gap-3">
              <AlertCircle className={cn("w-5 h-5 flex-shrink-0 mt-0.5", isCorrect ? "text-success" : "text-destructive")} />
              <div>
                <p className="font-bold mb-1 text-foreground">
                  {isCorrect ? "Correct" : (selectedIdx === -1 ? "Time's up" : "Incorrect")}
                </p>
                <p className="text-sm text-foreground/80 mb-3">{question.explanation}</p>
                {!isCorrect && (
                  <div className="bg-background/50 rounded-lg p-3 text-sm font-medium border border-border/50 text-foreground">
                    <span className="text-accent font-bold uppercase text-[10px] tracking-wider block mb-1">Coach Note</span>
                    "{question.coachFeedback}"
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold rounded-xl shadow-lg"
            onClick={() => onNext(isCorrect)}
          >
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
}
