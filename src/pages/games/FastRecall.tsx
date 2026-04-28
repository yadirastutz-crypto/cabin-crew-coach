import { useEffect, useMemo, useState } from "react";
import { GameShell, ResultScreen, ReviewItem } from "@/components/GameShell";
import { fastRecallQuestions } from "@/data/gameContent";
import { useUserProgress } from "@/context/UserProgressContext";
import { Zap } from "lucide-react";

const ROUND_SIZE = 12;
const PER_QUESTION = 6;

type Category = "All" | "Terminology" | "Airport Codes" | "Equipment";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATEGORIES: Category[] = ["All", "Terminology", "Airport Codes", "Equipment"];

const CATEGORY_COLORS: Record<Category, string> = {
  All: "bg-primary text-primary-foreground",
  Terminology: "bg-accent/20 text-accent",
  "Airport Codes": "bg-secondary/60 text-primary",
  Equipment: "bg-success/20 text-success",
};

export default function FastRecall() {
  const ctx = useUserProgress();
  const { recordGameScore } = ctx ?? {};
  const gameStats = ctx?.progress?.gameStats ?? {};

  const [phase, setPhase] = useState<"select" | "playing" | "done">("select");
  const [category, setCategory] = useState<Category>("All");
  const [seed, setSeed] = useState(0);

  const questions = useMemo(() => {
    const pool =
      category === "All"
        ? fastRecallQuestions
        : fastRecallQuestions.filter((q) => q.topic === category);
    return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
  }, [seed, category]);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [time, setTime] = useState(PER_QUESTION);
  const [missed, setMissed] = useState<ReviewItem[]>([]);

  const q = questions[idx] ?? questions[0];

  useEffect(() => {
    if (phase !== "playing") return;
    if (picked !== null) return;
    if (time <= 0) {
      setPicked(-1);
      setMissed((prev) => [
        ...prev,
        {
          question: q.question,
          yourAnswer: "No answer — time ran out",
          correctAnswer: q.options[q.correctIndex],
          topic: q.topic,
        },
      ]);
      const t = setTimeout(() => nextQ(score, true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, picked, phase]);

  function pick(i: number) {
    if (picked !== null || phase !== "playing") return;
    setPicked(i);
    const correct = i === q.correctIndex;
    const newScore = correct ? score + 1 : score;
    if (correct) {
      setScore(newScore);
    } else {
      setMissed((prev) => [
        ...prev,
        {
          question: q.question,
          yourAnswer: q.options[i],
          correctAnswer: q.options[q.correctIndex],
          topic: q.topic,
        },
      ]);
    }
    setTimeout(() => nextQ(newScore, false), 600);
  }

  function nextQ(carryScore: number, _timedOut: boolean) {
    if (idx + 1 >= questions.length) {
      recordGameScore?.("fast-recall", carryScore);
      setScore(carryScore);
      setPhase("done");
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      setTime(PER_QUESTION);
    }
  }

  function startGame() {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setTime(PER_QUESTION);
    setMissed([]);
    setPhase("playing");
  }

  function replay() {
    setSeed((s) => s + 1);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setTime(PER_QUESTION);
    setMissed([]);
    setPhase("select");
  }

  const high = gameStats["fast-recall"]?.highScore ?? 0;

  if (phase === "select") {
    return (
      <GameShell title="Fast Recall" subtitle="Timed rapid answers">
        <div className="space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-1">How it works</p>
            <p className="text-sm text-foreground mb-1">
              {ROUND_SIZE} questions · {PER_QUESTION}s per question
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Answer before the timer runs out. Missed questions are reviewed at the end.
            </p>
            {high > 0 && (
              <p className="text-xs font-bold text-accent mt-2">Your best: {high} / {ROUND_SIZE}</p>
            )}
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-3">Choose category</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-xl py-3 px-4 text-sm font-bold border-2 transition-all hover-elevate active-elevate-2 ${
                    category === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-card-border bg-background text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-3 px-1">
              <p className="text-[11px] text-muted-foreground">
                {category === "All"
                  ? `All ${fastRecallQuestions.length} questions in the pool`
                  : `${fastRecallQuestions.filter((q) => q.topic === category).length} questions in this category`}
              </p>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-primary text-primary-foreground rounded-xl py-4 font-bold text-base hover-elevate active-elevate-2"
          >
            Start Game
          </button>
        </div>
      </GameShell>
    );
  }

  if (phase === "done") {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    let coachNote: string | undefined;
    if (category !== "All") {
      coachNote =
        pct >= 80
          ? `Strong ${category} knowledge. Mix in other categories to build full coverage.`
          : `Keep drilling ${category}. Focused repetition on one category accelerates recall speed.`;
    }
    return (
      <GameShell title="Fast Recall" subtitle="Timed rapid answers">
        <ResultScreen
          score={score}
          total={questions.length}
          highScore={high}
          coachNote={coachNote}
          reviewItems={missed}
          onReplay={replay}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Fast Recall" subtitle={`${category} · Q${idx + 1}`} progress={{ current: idx + 1, total: questions.length }}>
      <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[q.topic as Category] ?? "text-accent"}`}>
            {q.topic}
          </span>
          <div className="flex items-center gap-1.5">
            <Zap className={`w-4 h-4 ${time <= 2 ? "text-destructive" : "text-accent"}`} />
            <span className={`font-bold text-sm tabular-nums ${time <= 2 ? "text-destructive" : "text-foreground"}`}>{time}s</span>
          </div>
        </div>

        <div className="mb-1 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${time <= 2 ? "bg-destructive" : "bg-accent"}`}
            style={{ width: `${(time / PER_QUESTION) * 100}%` }}
          />
        </div>

        <h2 className="text-base font-bold text-foreground mt-4 mb-4">{q.question}</h2>
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
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Score: <span className="font-bold text-foreground">{score}</span></span>
          <span>{missed.length} missed</span>
        </div>
      </div>
    </GameShell>
  );
}
