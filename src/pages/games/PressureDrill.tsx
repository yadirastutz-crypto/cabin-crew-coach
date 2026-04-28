import { useEffect, useMemo, useState } from "react";
import { GameShell, ResultScreen } from "@/components/GameShell";
import { pressurePrompts } from "@/data/gameContent";
import { useUserProgress } from "@/context/UserProgressContext";
import { Timer, AlertCircle } from "lucide-react";

const PER_QUESTION = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PressureDrill() {
  const ctx = useUserProgress();
  const { recordGameScore } = ctx ?? {};
  const gameStats = ctx?.progress?.gameStats ?? {};

  const [seed, setSeed] = useState(0);
  const prompts = useMemo(() => shuffle(pressurePrompts).slice(0, 8), [seed]);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [time, setTime] = useState(PER_QUESTION);
  const [done, setDone] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const q = prompts[idx];

  useEffect(() => {
    if (done || picked !== null) return;
    if (time <= 0) {
      setPicked(-1);
      setShowExplain(true);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, picked, done]);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.correctIndex;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setShowExplain(true);
  }

  function next(carryScore: number = score) {
    if (idx + 1 >= prompts.length) {
      recordGameScore?.("pressure-drill", carryScore);
      setScore(carryScore);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      setTime(PER_QUESTION);
      setShowExplain(false);
    }
  }

  function handleNext() {
    const correct = picked === q.correctIndex;
    const carryScore = correct ? score : score;
    next(carryScore);
  }

  function replay() {
    setSeed((s) => s + 1);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setTime(PER_QUESTION);
    setShowExplain(false);
    setDone(false);
  }

  const high = gameStats["pressure-drill"]?.highScore ?? 0;

  if (done) {
    const pct = prompts.length > 0 ? Math.round((score / prompts.length) * 100) : 0;
    let coachNote: string;
    if (pct >= 87) {
      coachNote = "You're making fast, correct decisions. That's the goal — instinct built through training.";
    } else if (pct >= 62) {
      coachNote = "Good instincts with room to sharpen. Focus on the scenarios you missed — they reveal gaps in your priority thinking.";
    } else {
      coachNote = "Pressure situations demand pre-built responses. Study the explanations, understand the logic, and drill again. Speed comes with repetition.";
    }
    return (
      <GameShell title="Pressure Drill" subtitle="Realistic scenarios">
        <ResultScreen
          score={score}
          total={prompts.length}
          highScore={high}
          coachNote={coachNote}
          onReplay={replay}
        />
      </GameShell>
    );
  }

  const timePct = (time / PER_QUESTION) * 100;

  return (
    <GameShell title="Pressure Drill" subtitle="Decide fast" progress={{ current: idx + 1, total: prompts.length }}>
      <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-destructive">
            <AlertCircle className="w-3.5 h-3.5" /> Scenario
          </div>
          <div className="flex items-center gap-1.5">
            <Timer className={`w-4 h-4 ${time <= 3 ? "text-destructive" : "text-accent"}`} />
            <span className={`font-bold text-sm tabular-nums ${time <= 3 ? "text-destructive" : "text-foreground"}`}>{time}s</span>
          </div>
        </div>

        <div className="mb-4 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${time <= 3 ? "bg-destructive" : "bg-accent"}`}
            style={{ width: `${timePct}%` }}
          />
        </div>

        <p className="text-sm text-foreground italic mb-3 leading-relaxed">{q.scenario}</p>
        <h2 className="text-base font-bold text-foreground mb-4">{q.question}</h2>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = q.correctIndex === i;
            const showResult = picked !== null;
            let cls = "border-card-border bg-background text-foreground";
            if (showResult && isCorrect) cls = "border-success bg-success/10 text-success";
            else if (showResult && isPicked && !isCorrect) cls = "border-destructive bg-destructive/10 text-destructive";
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={`w-full text-left text-sm font-medium border rounded-xl px-4 py-3 transition-colors ${cls} hover-elevate active-elevate-2`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showExplain && (
          <div className="mt-4 bg-primary/5 border border-primary/15 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">
              {picked === q.correctIndex ? "Correct — why this works" : picked === -1 ? "Time's up — the answer" : "Not quite — why this matters"}
            </p>
            <p className="text-xs text-foreground leading-relaxed">{q.explanation}</p>
            <button
              onClick={handleNext}
              className="w-full mt-3 bg-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm hover-elevate active-elevate-2"
            >
              {idx + 1 >= prompts.length ? "See Results" : "Next Scenario →"}
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Score: <span className="font-bold text-foreground">{score}</span>
        </div>
      </div>
    </GameShell>
  );
}
