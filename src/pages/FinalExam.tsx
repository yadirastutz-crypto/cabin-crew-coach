import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { quizQuestions } from "@/data/quizQuestions";
import { useUserProgress } from "@/context/UserProgressContext";
import { Button } from "@/components/ui/button";
import { X, Award, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate 50 questions from our pool (duplicating if necessary for the mock exam)
const generateExamQuestions = () => {
  const pool = [...quizQuestions].sort(() => 0.5 - Math.random());
  const exam = [];
  while (exam.length < 50 && pool.length > 0) {
    exam.push(pool[exam.length % pool.length]); // Repeat questions if we have less than 50
  }
  return exam;
};

export default function FinalExam() {
  const { progress, recordQuizScore } = useUserProgress();
  const [, setLocation] = useLocation();

  const [hasStarted, setHasStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!hasStarted || isFinished) return undefined;
    if (timeLeft === 0) {
      finishExam();
      return undefined;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [hasStarted, isFinished, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const startExam = () => {
    setQuestions(generateExamQuestions());
    setHasStarted(true);
    setAnswers(new Array(50).fill(-1));
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIdx;
    setAnswers(newAnswers);

    if (currentIndex < 49) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const finishExam = () => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correctAnswer) correct++;
    });
    const score = Math.round((correct / 50) * 100);
    recordQuizScore(score);
    setIsFinished(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!hasStarted) {
    return (
      <div className="min-h-[100dvh] bg-background p-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Award className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Final Exam Mode</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          50 mixed questions. 90 minutes. Pass mark is 80%.
          Once you start, the timer cannot be paused.
          Are you ready to test your knowledge under pressure?
        </p>
        <div className="w-full max-w-sm space-y-3">
          <Button 
            className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={startExam}
          >
            Begin Exam
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 text-lg font-bold rounded-xl"
            onClick={() => setLocation("/quiz")}
          >
            Not Yet
          </Button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correctAnswer) correct++;
    });
    const score = Math.round((correct / 50) * 100);
    const passed = score >= 80;

    return (
      <div className="min-h-[100dvh] bg-background p-6 flex flex-col justify-center items-center text-center animate-in fade-in zoom-in-95 duration-500 pb-24">
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mb-6",
          passed ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
        )}>
          {passed ? <Award className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {passed ? "Exam Passed" : "Exam Failed"}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          You scored <span className={cn("font-bold text-2xl ml-2", passed ? "text-success" : "text-destructive")}>{score}%</span>
        </p>

        <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm w-full max-w-sm mb-8 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2 block">Coach Assessment</span>
          <p className="text-sm text-foreground font-medium leading-relaxed">
            {passed 
              ? "Outstanding performance. You have mastered the fundamentals and demonstrated you can recall critical information under pressure. You are ready." 
              : "Don't be discouraged. The pressure of the final exam is designed to reveal weak spots before the real thing. Review your missed categories and try again tomorrow."}
          </p>
        </div>

        <Button 
          className="w-full max-w-sm h-14 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setLocation("/quiz")}
        >
          Return to Quiz Hub
        </Button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== -1;

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <div className="sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Question {currentIndex + 1} of 50</span>
          <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{currentQ.category}</span>
        </div>
        <div className={cn("font-mono font-bold text-lg", timeLeft < 300 ? "text-destructive animate-pulse" : "text-foreground")}>
          {formatTime(timeLeft)}
        </div>
        <button onClick={() => { if(confirm("Are you sure you want to quit? Your progress will be lost.")) setLocation("/quiz"); }} className="text-muted-foreground p-1">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 p-5 max-w-md mx-auto w-full flex flex-col">
        <h2 className="text-xl font-bold text-foreground mb-8 mt-4 leading-snug">
          {currentQ.question}
        </h2>

        <div className="space-y-3 mb-8 flex-1">
          {currentQ.options.map((opt: string, idx: number) => {
            const isSelected = answers[currentIndex] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200",
                  isSelected 
                    ? "bg-accent/10 border-accent text-foreground font-medium shadow-[0_0_0_1px_rgba(215,178,103,0.5)]" 
                    : "bg-card border-card-border hover:border-primary text-foreground"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          <Button 
            variant="outline"
            className="flex-1 h-14 rounded-xl font-bold"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
          >
            Previous
          </Button>
          
          {currentIndex === 49 ? (
            <Button 
              className="flex-1 h-14 rounded-xl font-bold bg-success text-white hover:bg-success/90"
              onClick={() => { if(confirm("Are you sure you want to submit your exam?")) finishExam(); }}
            >
              Submit Exam
            </Button>
          ) : (
            <Button 
              className="flex-1 h-14 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setCurrentIndex(prev => prev + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
