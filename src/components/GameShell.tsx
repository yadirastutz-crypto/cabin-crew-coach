import { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronLeft, BookOpen, Trophy } from "lucide-react";

interface GameShellProps {
  title: string;
  subtitle?: string;
  progress?: { current: number; total: number };
  children: ReactNode;
}

export function GameShell({ title, subtitle, progress, children }: GameShellProps) {
  const pct = progress ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-5 px-5 rounded-b-3xl">
        <Link href="/games">
          <button className="flex items-center text-primary-foreground/80 mb-2 text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Games
          </button>
        </Link>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">{title}</h1>
            {subtitle && <p className="text-primary-foreground/70 text-xs mt-0.5">{subtitle}</p>}
          </div>
          {progress && (
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Progress</div>
              <div className="text-sm font-bold">
                {progress.current} / {progress.total}
              </div>
            </div>
          )}
        </div>
        {progress && (
          <div className="mt-3 h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div className="h-full bg-accent transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      <div className="px-5 mt-5">{children}</div>
    </div>
  );
}

export interface ReviewItem {
  question: string;
  yourAnswer?: string;
  correctAnswer: string;
  topic?: string;
}

interface ResultScreenProps {
  score: number;
  total: number;
  highScore: number;
  message?: string;
  coachNote?: string;
  reviewItems?: ReviewItem[];
  onReplay: () => void;
}

export function ResultScreen({ score, total, highScore, message, coachNote, reviewItems, onReplay }: ResultScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const isNewHigh = score > 0 && score >= highScore;

  let verdict = "Keep training. Every repetition builds instinct.";
  let coachEmphasis = "Focus on the areas you missed and run the drill again.";
  if (pct >= 90) {
    verdict = "Outstanding. Cabin-ready performance.";
    coachEmphasis = "You're operating at a high standard. Maintain it with regular review.";
  } else if (pct >= 75) {
    verdict = "Strong. You're on track.";
    coachEmphasis = "Solid performance. Revisit the questions you missed to close the gaps.";
  } else if (pct >= 50) {
    verdict = "Solid foundation. Drill it again.";
    coachEmphasis = "You have the basics. Focused repetition on weak areas will accelerate your progress.";
  }

  const hasReview = reviewItems && reviewItems.length > 0;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm text-center">
        <div className="text-[10px] uppercase tracking-wider font-bold text-accent mb-2">Session Complete</div>
        <div className="text-5xl font-bold text-primary mb-1">
          {score}
          <span className="text-2xl text-muted-foreground">/{total}</span>
        </div>
        <div className="text-sm font-bold text-success mb-1">{pct}%</div>

        {isNewHigh && (
          <div className="inline-flex items-center gap-1.5 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Trophy className="w-3 h-3" /> New High Score
          </div>
        )}

        <div className="mt-3 bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-left">
          <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">Coach</p>
          <p className="text-sm font-semibold text-foreground">{message || verdict}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{coachNote || coachEmphasis}</p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onReplay}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2"
          >
            Play Again
          </button>
          <Link href="/games" className="flex-1">
            <button className="w-full bg-muted text-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2">
              All Games
            </button>
          </Link>
        </div>
      </div>

      {hasReview && (
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-accent">Review — Missed Questions</span>
          </div>
          <div className="space-y-3">
            {reviewItems!.map((item, i) => (
              <div key={i} className="border border-destructive/20 bg-destructive/5 rounded-xl p-3">
                {item.topic && (
                  <span className="text-[9px] uppercase tracking-wider font-bold text-accent/70">{item.topic}</span>
                )}
                <p className="text-xs font-bold text-foreground mt-0.5 mb-1">{item.question}</p>
                {item.yourAnswer && (
                  <p className="text-[11px] text-destructive">
                    Your answer: <span className="font-semibold">{item.yourAnswer}</span>
                  </p>
                )}
                <p className="text-[11px] text-success font-semibold">
                  Correct: {item.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
