import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, Zap, CheckCircle2, XCircle, RotateCcw, Timer } from "lucide-react";
import { scenarios, Scenario, ScenarioDifficulty, ScenarioCategory } from "@/data/scenarios";

type Phase = "select" | "active" | "answered" | "results";

const DIFFICULTY_CONFIG: Record<ScenarioDifficulty, { label: string; timer: number; description: string; color: string }> = {
  standard: { label: "Standard", timer: 0, description: "No time pressure. Think it through.", color: "bg-accent/10 text-accent border-accent/20" },
  fast: { label: "Fast Response", timer: 30, description: "30 second decision. Like real life.", color: "bg-[#4F8A6D]/10 text-[#4F8A6D] border-[#4F8A6D]/20" },
  chaos: { label: "Chaos Mode", timer: 20, description: "20 seconds. Pressure environment.", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const CATEGORIES: (ScenarioCategory | "All")[] = [
  "All", "Medical", "Passenger", "Turbulence", "Fire/Smoke", "Lavatory",
  "Unaccompanied Minor", "Language Barrier", "Boarding",
];

export default function ScenarioMode() {
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<ScenarioDifficulty>("standard");
  const [category, setCategory] = useState<ScenarioCategory | "All">("All");
  const [queue, setQueue] = useState<Scenario[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; scenario: Scenario }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = queue[qIdx];

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (phase === "active" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((v) => {
          if (v <= 1) {
            clearInterval(timerRef.current!);
            // Auto-select wrong if time runs out
            if (!selected) handleSelect("__timeout__");
            return 0;
          }
          return v - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, qIdx]);

  function startSession() {
    const pool = category === "All" ? scenarios : scenarios.filter((s) => s.category === category);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(pool.length, 6));
    setQueue(shuffled);
    setQIdx(0);
    setResults([]);
    setSelected(null);
    const timer = DIFFICULTY_CONFIG[difficulty].timer;
    setTimeLeft(timer);
    setPhase("active");
  }

  function handleSelect(optionId: string) {
    if (selected || phase !== "active") return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(optionId);
    const isCorrect = optionId !== "__timeout__" && current.options.find((o) => o.id === optionId)?.isCorrect === true;
    setResults((prev) => [...prev, { correct: !!isCorrect, scenario: current }]);
    setPhase("answered");
  }

  function next() {
    if (qIdx >= queue.length - 1) {
      setPhase("results");
      return;
    }
    setQIdx((n) => n + 1);
    setSelected(null);
    const timer = DIFFICULTY_CONFIG[difficulty].timer;
    setTimeLeft(timer);
    setPhase("active");
  }

  const correct = results.filter((r) => r.correct).length;
  const pct = results.length > 0 ? Math.round((correct / results.length) * 100) : 0;
  const dc = DIFFICULTY_CONFIG[difficulty];

  // SELECT
  if (phase === "select") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <Link href="/practice">
            <button className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground">
              <ChevronLeft className="w-4 h-4" /> Practice
            </button>
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <Zap className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Scenario Pressure Mode</h1>
          </div>
          <p className="text-primary-foreground/70 text-sm mt-1">Real cabin situations. High-stakes decisions. No second chances.</p>
        </div>

        <div className="px-5 mt-5 space-y-5">
          {/* Difficulty */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Difficulty Level</p>
            <div className="space-y-2">
              {(Object.keys(DIFFICULTY_CONFIG) as ScenarioDifficulty[]).map((d) => {
                const cfg = DIFFICULTY_CONFIG[d];
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`w-full text-left border rounded-xl px-4 py-3 transition-all ${difficulty === d ? cfg.color + " border-[1.5px]" : "bg-card border-card-border"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-bold ${difficulty === d ? "" : "text-foreground"}`}>{cfg.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cfg.description}</p>
                      </div>
                      {cfg.timer > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Timer className="w-3.5 h-3.5" />
                          {cfg.timer}s
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Scenario Category</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background border-card-border text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startSession}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-bold text-base shadow-sm active:scale-[0.98] transition-transform"
          >
            Begin Scenario Training
          </button>
        </div>
      </div>
    );
  }

  // RESULTS
  if (phase === "results") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <h2 className="text-xl font-bold">Session Complete</h2>
          <p className="text-primary-foreground/70 text-sm mt-1">Your decision-making under pressure.</p>
        </div>
        <div className="px-5 mt-5 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-6 text-center">
            <div className="text-6xl font-bold text-foreground mb-1">{pct}<span className="text-2xl text-muted-foreground">%</span></div>
            <p className={`text-sm font-bold ${pct >= 80 ? "text-[#4F8A6D]" : pct >= 60 ? "text-accent" : "text-destructive"}`}>
              {pct >= 90 ? "Outstanding decision-making." : pct >= 70 ? "Good instincts. Review the misses." : "Keep training. Pressure reveals the gaps."}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{correct}/{results.length} correct · {dc.label}</p>
          </div>

          {results.filter((r) => !r.correct).length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-foreground mb-2">Scenarios to Review</h3>
              <div className="space-y-3">
                {results.filter((r) => !r.correct).map((r, i) => (
                  <div key={i} className="bg-destructive/5 border border-destructive/15 rounded-xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1">{r.scenario.category}</p>
                    <p className="text-sm font-bold text-foreground mb-1">{r.scenario.title}</p>
                    <p className="text-xs text-foreground leading-relaxed mb-2">{r.scenario.debrief}</p>
                    <p className="text-[11px] font-bold text-accent italic">Principle: {r.scenario.principle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={startSession} className="flex-1 bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Go Again
            </button>
            <button onClick={() => setPhase("select")} className="flex-1 bg-card border border-card-border text-foreground rounded-xl py-3.5 font-bold text-sm">
              Change Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE / ANSWERED
  if (!current) return null;
  const timerPct = dc.timer > 0 ? (timeLeft / dc.timer) * 100 : 100;

  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-5 px-5 rounded-b-3xl">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setPhase("select")} className="flex items-center gap-1 text-primary-foreground/70 text-sm">
            <ChevronLeft className="w-4 h-4" /> Exit
          </button>
          <span className="text-sm font-bold text-primary-foreground/80">{qIdx + 1} / {queue.length}</span>
        </div>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${(qIdx / queue.length) * 100}%` }} />
        </div>

        {dc.timer > 0 && phase === "active" && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-primary-foreground/60 mb-1">
              <span>Time remaining</span>
              <span className={timeLeft <= 8 ? "text-red-300 font-bold" : ""}>{timeLeft}s</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${timeLeft <= 8 ? "bg-red-400" : "bg-accent"}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Category + difficulty badge */}
        <div className="flex gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-1 rounded-full">{current.category}</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${dc.color}`}>{dc.label}</span>
        </div>

        {/* Scenario */}
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">The Situation</p>
          <h3 className="text-base font-bold text-foreground mb-3">{current.title}</h3>
          <p className="text-sm text-foreground leading-relaxed">{current.situation}</p>
        </div>

        {/* Options */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">What do you do?</p>
          <div className="space-y-2.5">
            {current.options.map((opt) => {
              const isSelected = selected === opt.id;
              const isTimeout = selected === "__timeout__";
              let bg = "bg-card border-card-border";
              let textColor = "text-foreground";
              if (phase === "answered") {
                if (opt.isCorrect) { bg = "bg-[#4F8A6D]/10 border-[#4F8A6D]/30"; textColor = "text-[#4F8A6D]"; }
                else if (isSelected && !opt.isCorrect) { bg = "bg-destructive/8 border-destructive/25"; textColor = "text-destructive"; }
              }
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={phase === "answered"}
                  className={`w-full text-left border rounded-xl px-4 py-3.5 transition-all ${bg} ${phase === "active" ? "active:scale-[0.98]" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      phase === "answered" && opt.isCorrect ? "border-[#4F8A6D] bg-[#4F8A6D]" :
                      phase === "answered" && isSelected && !opt.isCorrect ? "border-destructive bg-destructive" :
                      "border-border"
                    }`}>
                      {phase === "answered" && opt.isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      {phase === "answered" && isSelected && !opt.isCorrect && <XCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-medium leading-snug ${textColor}`}>{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Debrief */}
        {phase === "answered" && (
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Debrief</p>
            <p className="text-sm text-foreground leading-relaxed">{current.debrief}</p>
            <p className="text-[11px] font-bold text-accent italic mt-1">"{current.principle}"</p>
            {selected && selected !== "__timeout__" && current.options.find((o) => o.id === selected) && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Why your answer matters</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {current.options.find((o) => o.id === selected)!.explanation}
                </p>
              </div>
            )}
            <button
              onClick={next}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm mt-2 active:scale-[0.98] transition-transform"
            >
              {qIdx >= queue.length - 1 ? "See Results" : "Next Scenario →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
