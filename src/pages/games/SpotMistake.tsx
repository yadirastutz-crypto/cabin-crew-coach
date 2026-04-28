import { useEffect, useMemo, useState } from "react";
import { GameShell, ResultScreen } from "@/components/GameShell";
import { mistakeScenarios } from "@/data/gameContent";
import { useUserProgress } from "@/context/UserProgressContext";
import { Search, Check, X, ShieldAlert } from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SpotMistake() {
  const ctx = useUserProgress();
  const { recordGameScore } = ctx ?? {};
  const gameStats = ctx?.progress?.gameStats ?? {};

  const [seed, setSeed] = useState(0);
  const scenarios = useMemo(() => shuffle(mistakeScenarios).slice(0, 6), [seed]);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const s = scenarios[idx];

  useEffect(() => {
    setPicked(null);
  }, [idx]);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === s.wrongIndex) setScore((sc) => sc + 1);
  }

  function next() {
    if (idx + 1 >= scenarios.length) {
      const finalScore = picked === s.wrongIndex ? score : score;
      recordGameScore?.("spot-mistake", finalScore);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  }

  function replay() {
    setSeed((x) => x + 1);
    setIdx(0);
    setScore(0);
    setDone(false);
  }

  const high = gameStats["spot-mistake"]?.highScore ?? 0;
  const isCorrect = picked !== null && picked === s.wrongIndex;

  if (done) {
    const pct = scenarios.length > 0 ? Math.round((score / scenarios.length) * 100) : 0;
    let coachNote: string;
    if (pct >= 83) {
      coachNote = "Sharp eye for procedural errors. This skill is critical in real operations — spotting mistakes early prevents escalation.";
    } else if (pct >= 50) {
      coachNote = "Developing situational awareness. Review the scenarios you missed and understand why each mistake is dangerous.";
    } else {
      coachNote = "Study the explanations carefully. The mistakes in this game reflect real errors that have caused incidents. Pattern recognition takes practice.";
    }
    return (
      <GameShell title="Spot the Mistake" subtitle="Find the wrong detail">
        <ResultScreen
          score={score}
          total={scenarios.length}
          highScore={high}
          coachNote={coachNote}
          onReplay={replay}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Spot the Mistake" subtitle={s.title} progress={{ current: idx + 1, total: scenarios.length }}>
      <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-accent mb-2">
          <Search className="w-3.5 h-3.5" /> Find the wrong detail
        </div>
        <p className="text-sm text-foreground mb-4">{s.context}</p>

        <div className="space-y-2">
          {s.details.map((d, i) => {
            const isPicked = picked === i;
            const isWrongAnswer = i === s.wrongIndex;
            const showResult = picked !== null;
            let cls = "border-card-border bg-background text-foreground";
            if (showResult && isWrongAnswer) cls = "border-destructive bg-destructive/10 text-destructive";
            else if (showResult && isPicked && !isWrongAnswer) cls = "border-accent/40 bg-accent/5 text-foreground";
            else if (showResult && !isPicked && !isWrongAnswer) cls = "border-card-border bg-background text-muted-foreground";
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={`w-full text-left text-sm font-medium border rounded-xl px-4 py-3 transition-colors ${cls} hover-elevate active-elevate-2`}
              >
                <span className="flex items-start justify-between gap-2">
                  <span>{d}</span>
                  {showResult && isWrongAnswer && <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />}
                  {showResult && isPicked && !isWrongAnswer && <Check className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />}
                </span>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-4 space-y-2">
            <div className={`rounded-xl p-3 ${isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
              <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "Correct — that was the mistake" : "Not quite — the mistake was highlighted above"}
              </p>
              <p className="text-xs text-foreground leading-relaxed">{s.explanation}</p>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 flex gap-2">
              <ShieldAlert className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-1">Safety importance</p>
                <p className="text-xs text-foreground leading-relaxed">{s.safetyLink}</p>
              </div>
            </div>

            <button
              onClick={next}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2"
            >
              {idx + 1 >= scenarios.length ? "See Results" : "Next Scenario →"}
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
