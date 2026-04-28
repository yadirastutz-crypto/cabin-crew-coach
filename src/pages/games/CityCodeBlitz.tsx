import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, Zap, RefreshCw, Trophy, Flame, Globe } from "lucide-react";
import { airportCodes } from "@/data/airportCodes";
import { useUserProgress } from "@/context/UserProgressContext";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDistractors(correct: typeof airportCodes[0], pool: typeof airportCodes): string[] {
  const others = pool.filter((a) => a.code !== correct.code);
  const shuffled = shuffle(others);
  return shuffled.slice(0, 3).map((a) => a.city);
}

function buildQuestion(correct: typeof airportCodes[0], pool: typeof airportCodes) {
  const distractors = getDistractors(correct, pool);
  const options = shuffle([correct.city, ...distractors]);
  return { correct, options };
}

const ROUND_SIZE = 10;
const TIME_PER_Q = 8;

type Phase = "menu" | "playing" | "done";
type Filter = "all" | "top25";

export default function CityCodeBlitz() {
  const { progress, recordGameScore } = useUserProgress();
  const [phase, setPhase] = useState<Phase>("menu");
  const [filter, setFilter] = useState<Filter>("top25");
  const [questions, setQuestions] = useState<ReturnType<typeof buildQuestion>[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [wrong, setWrong] = useState<{ code: string; correct: string; picked: string | null }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const highScore = progress.gameStats["city-code-blitz"]?.highScore ?? 0;

  function startGame() {
    const pool = filter === "top25" ? airportCodes.filter((a) => a.isTop25) : airportCodes;
    const selected = shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
    const qs = selected.map((c) => buildQuestion(c, pool));
    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPicked(null);
    setTimeLeft(TIME_PER_Q);
    setWrong([]);
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing") return;
    if (picked !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handlePick(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [idx, phase, picked]);

  function handlePick(city: string | null) {
    if (picked !== null) return;
    clearInterval(timerRef.current!);
    setPicked(city ?? "");
    const q = questions[idx];
    const isCorrect = city === q.correct.city;
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
      setWrong((w) => [...w, { code: q.correct.code, correct: q.correct.city, picked: city }]);
    }

    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        const finalScore = score + (isCorrect ? 1 : 0);
        recordGameScore("city-code-blitz", finalScore);
        setPhase("done");
      } else {
        setIdx((i) => i + 1);
        setPicked(null);
        setTimeLeft(TIME_PER_Q);
      }
    }, 1000);
  }

  if (phase === "menu") {
    return (
      <div className="min-h-[100dvh] pb-24 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-6 rounded-b-3xl">
          <Link href="/games">
            <button className="flex items-center text-primary-foreground/80 mb-3 text-sm">
              <ChevronLeft className="w-4 h-4 mr-1" /> Games
            </button>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-black">City Code Blitz</h1>
          </div>
          <p className="text-primary-foreground/70 text-sm">Code shown · Pick the city · Beat the clock</p>

          {highScore > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(215,178,103,0.18)" }}>
              <Trophy className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-accent">High Score: {highScore}/{ROUND_SIZE}</span>
            </div>
          )}
        </div>

        <div className="px-5 mt-6 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Difficulty</p>
            <div className="flex gap-2">
              {(["top25", "all"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 h-10 rounded-xl font-bold text-sm transition-colors border ${filter === f ? "border-transparent text-white" : "border-card-border bg-background text-foreground"}`}
                  style={filter === f ? { backgroundColor: "#17324D" } : {}}
                >
                  {f === "top25" ? "Top 25 Codes" : "All Codes"}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {filter === "top25" ? "25 essential codes every crew member must know." : "Full library of 75+ international airport codes."}
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-accent">1</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">See the airport code</p>
                <p className="text-xs text-muted-foreground">e.g. DXB, LHR, JFK</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-accent">2</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Pick the correct city</p>
                <p className="text-xs text-muted-foreground">4 options · {TIME_PER_Q} seconds to answer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-black text-accent">3</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Build your streak</p>
                <p className="text-xs text-muted-foreground">Consecutive correct answers grow your streak counter</p>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full h-14 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: "#17324D" }}
          >
            <Zap className="w-4 h-4 text-accent" />
            Start Blitz
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct === 100 ? "Perfect score!" : pct >= 80 ? "Excellent!" : pct >= 60 ? "Good effort." : "Keep drilling.";

    return (
      <div className="min-h-[100dvh] pb-24 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-6 rounded-b-3xl">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-accent" />
            <h1 className="text-xl font-black">Round Complete</h1>
          </div>
        </div>

        <div className="px-5 mt-6 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-2">Your Score</p>
            <div className="text-6xl font-black text-primary mb-1">{score}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
            <p className="text-sm font-bold text-muted-foreground">{verdict}</p>
            {score > highScore - 1 && score > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(215,178,103,0.15)" }}>
                <Trophy className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-bold text-accent">New High Score!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-card-border rounded-2xl p-4 text-center">
              <Flame className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">{bestStreak}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-0.5">Best Streak</div>
            </div>
            <div className="bg-card border border-card-border rounded-2xl p-4 text-center">
              <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">{highScore}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-0.5">All-time High</div>
            </div>
          </div>

          {wrong.length > 0 && (
            <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Review Misses</p>
              <div className="space-y-2">
                {wrong.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-black text-sm w-10 text-primary flex-shrink-0">{w.code}</span>
                    <div className="flex-1">
                      <span className="text-xs text-destructive line-through">{w.picked ?? "Timed out"}</span>
                      <span className="text-xs text-foreground font-bold ml-2">→ {w.correct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#17324D" }}
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <Link href="/games" className="flex-1">
              <button className="w-full h-12 rounded-xl font-bold text-sm border border-card-border bg-card text-foreground">
                All Games
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  const q = questions[idx];
  const progress_pct = ((idx) / questions.length) * 100;
  const timerPct = (timeLeft / TIME_PER_Q) * 100;

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-5 px-5 rounded-b-3xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Trophy className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-white">{score}</span>
            </div>
            {streak >= 2 && (
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-bold text-white">×{streak}</span>
              </div>
            )}
          </div>
          <span className="text-xs font-bold text-primary-foreground/60">{idx + 1}/{questions.length}</span>
        </div>
        {/* Timer bar */}
        <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, backgroundColor: timerPct > 50 ? "#D7B267" : timerPct > 25 ? "#f59e0b" : "#ef4444" }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <div className="h-1 rounded-full bg-white/20 mt-2 overflow-hidden" style={{ width: "100%" }}>
            <div className="h-full rounded-full bg-white/50 transition-all duration-300" style={{ width: `${progress_pct}%` }} />
          </div>
        </div>
      </div>

      <div className="px-5 mt-8">
        {/* Code display */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What city is this?</p>
          <div
            className="inline-block px-8 py-4 rounded-2xl mb-2"
            style={{ backgroundColor: "rgba(23,50,77,0.08)", border: "2px solid rgba(23,50,77,0.15)" }}
          >
            <span className="text-5xl font-black tracking-widest text-primary">{q.correct.code}</span>
          </div>
          <p className="text-xs text-muted-foreground">{timeLeft}s remaining</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {q.options.map((city) => {
            const isCorrect = city === q.correct.city;
            const isPicked = picked === city;
            const isWrong = isPicked && !isCorrect;
            const isRevealed = picked !== null && isCorrect;

            let bg = "bg-card border-card-border";
            let textColor = "text-foreground";
            if (isRevealed) { bg = "bg-[#4F8A6D]/15 border-[#4F8A6D]/40"; textColor = "text-[#4F8A6D]"; }
            if (isWrong) { bg = "bg-destructive/10 border-destructive/40"; textColor = "text-destructive"; }

            return (
              <button
                key={city}
                onClick={() => handlePick(city)}
                disabled={picked !== null}
                className={`h-16 rounded-xl border-2 font-bold text-sm transition-colors ${bg} ${textColor} disabled:cursor-default`}
              >
                {city}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-5 text-center">
            <p className="text-xs text-muted-foreground">
              {q.correct.name} · {q.correct.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
