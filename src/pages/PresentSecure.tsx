import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, CheckCircle2, XCircle, Shield, Timer, RotateCcw } from "lucide-react";
import { psItems, PSItem, PSCheck } from "@/data/presentSecure";

type Phase = "select" | "session" | "results";

function categoryColor(cat: PSItem["category"]) {
  switch (cat) {
    case "Firefighting": return { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" };
    case "Oxygen": return { bg: "bg-[#DCEEFF]/80", text: "text-primary", border: "border-primary/20" };
    case "Signalling": return { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" };
    case "Safety": return { bg: "bg-[#6FA7A1]/15", text: "text-[#6FA7A1]", border: "border-[#6FA7A1]/20" };
    case "Exits": return { bg: "bg-primary/8", text: "text-primary", border: "border-primary/15" };
    case "Survival": return { bg: "bg-[#4F8A6D]/15", text: "text-[#4F8A6D]", border: "border-[#4F8A6D]/20" };
    default: return { bg: "bg-muted", text: "text-foreground", border: "border-border" };
  }
}

export default function PresentSecure() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedItems, setSelectedItems] = useState<PSItem[]>(psItems);
  const [timedMode, setTimedMode] = useState(false);
  const [currentItemIdx, setCurrentItemIdx] = useState(0);
  const [currentCheckIdx, setCurrentCheckIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ correct: boolean; check: PSCheck; item: PSItem }[]>([]);
  const [allChecks, setAllChecks] = useState<{ check: PSCheck; item: PSItem }[]>([]);

  function startSession(items: PSItem[]) {
    const checks: { check: PSCheck; item: PSItem }[] = [];
    items.forEach((item) => item.checks.forEach((ch) => checks.push({ check: ch, item })));
    // Shuffle
    const shuffled = [...checks].sort(() => Math.random() - 0.5);
    setAllChecks(shuffled);
    setSessionResults([]);
    setCurrentItemIdx(0);
    setCurrentCheckIdx(0);
    setSelected(null);
    setRevealed(false);
    setPhase("session");
  }

  function handleOption(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const current = allChecks[currentCheckIdx];
    setSessionResults((prev) => [
      ...prev,
      { correct: idx === current.check.correctIndex, check: current.check, item: current.item },
    ]);
  }

  function next() {
    if (currentCheckIdx >= allChecks.length - 1) {
      setPhase("results");
      return;
    }
    setCurrentCheckIdx((n) => n + 1);
    setSelected(null);
    setRevealed(false);
  }

  function restart() {
    setPhase("select");
    setSessionResults([]);
    setSelected(null);
    setRevealed(false);
    setCurrentCheckIdx(0);
  }

  const correct = sessionResults.filter((r) => r.correct).length;
  const total = sessionResults.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  // SELECT screen
  if (phase === "select") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-[#4F8A6D] text-white pt-12 pb-6 px-5 rounded-b-3xl">
          <Link href="/practice">
            <button className="flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> Practice
            </button>
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-6 h-6 text-white/80" />
            <h1 className="text-2xl font-bold">Present & Secure</h1>
          </div>
          <p className="text-white/70 text-sm mt-1">Train your equipment inspection knowledge the way real airline training requires it.</p>
        </div>

        <div className="px-5 mt-5 space-y-4">
          {/* Timed mode toggle */}
          <div className="bg-card border border-card-border rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-accent" />
              <div>
                <p className="text-sm font-bold text-foreground">Timed Mode</p>
                <p className="text-[11px] text-muted-foreground">20 seconds per check</p>
              </div>
            </div>
            <button
              onClick={() => setTimedMode((v) => !v)}
              className={`w-11 h-6 rounded-full transition-colors relative ${timedMode ? "bg-accent" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${timedMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {/* Quick start */}
          <button
            onClick={() => startSession(psItems)}
            className="w-full bg-[#4F8A6D] text-white rounded-2xl py-4 font-bold text-base shadow-sm active:scale-[0.98] transition-transform"
          >
            Start Full Inspection Drill
          </button>

          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-5 mb-2">Choose Equipment</div>

          {psItems.map((item) => {
            const c = categoryColor(item.category);
            return (
              <button
                key={item.id}
                onClick={() => startSession([item])}
                className="w-full text-left bg-card border border-card-border rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <Shield className={`w-5 h-5 ${c.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                    {item.abbreviation && (
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>{item.abbreviation}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{item.category} · {item.checks.length} checks</p>
                </div>
                <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // SESSION screen
  if (phase === "session") {
    const current = allChecks[currentCheckIdx];
    const progressPct = ((currentCheckIdx) / allChecks.length) * 100;
    const c = categoryColor(current.item.category);

    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-[#4F8A6D] text-white pt-12 pb-5 px-5 rounded-b-3xl">
          <div className="flex items-center justify-between mb-3">
            <button onClick={restart} className="flex items-center gap-1 text-white/70 text-sm">
              <ChevronLeft className="w-4 h-4" /> Exit
            </button>
            <span className="text-sm font-bold text-white/80">{currentCheckIdx + 1} / {allChecks.length}</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="px-5 mt-5 space-y-4">
          {/* Item badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{current.item.name}</span>
          </div>

          {/* Question */}
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Preflight Check</p>
            <p className="text-base font-bold text-foreground leading-snug">{current.check.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {current.check.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === current.check.correctIndex;
              let bg = "bg-card border-card-border";
              let textColor = "text-foreground";
              if (revealed) {
                if (isCorrect) { bg = "bg-[#4F8A6D]/10 border-[#4F8A6D]/30"; textColor = "text-[#4F8A6D]"; }
                else if (isSelected && !isCorrect) { bg = "bg-destructive/8 border-destructive/25"; textColor = "text-destructive"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleOption(i)}
                  disabled={revealed}
                  className={`w-full text-left border rounded-xl px-4 py-3.5 transition-all ${bg} ${revealed ? "" : "active:scale-[0.98]"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      revealed && isCorrect ? "border-[#4F8A6D] bg-[#4F8A6D]" :
                      revealed && isSelected && !isCorrect ? "border-destructive bg-destructive" :
                      "border-border"
                    }`}>
                      {revealed && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      {revealed && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-medium leading-snug ${textColor}`}>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Check Procedure</p>
              <p className="text-xs font-bold text-[#4F8A6D] italic">"{current.check.checkPhrase}"</p>
              <p className="text-sm text-foreground leading-relaxed">{current.check.explanation}</p>
              <button
                onClick={next}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm mt-1 active:scale-[0.98] transition-transform"
              >
                {currentCheckIdx >= allChecks.length - 1 ? "See Results" : "Next Check →"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // RESULTS screen
  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      <div className="bg-[#4F8A6D] text-white pt-12 pb-6 px-5 rounded-b-3xl">
        <h2 className="text-xl font-bold mb-0.5">Inspection Complete</h2>
        <p className="text-white/70 text-sm">Review your performance below.</p>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Score */}
        <div className="bg-card border border-card-border rounded-2xl p-6 text-center shadow-sm">
          <div className="text-6xl font-bold text-foreground mb-1">{pct}<span className="text-2xl text-muted-foreground">%</span></div>
          <p className={`text-sm font-bold mb-1 ${pct >= 80 ? "text-[#4F8A6D]" : pct >= 60 ? "text-accent" : "text-destructive"}`}>
            {pct >= 90 ? "Excellent. Ready for the real thing." : pct >= 70 ? "Good. Review the missed checks." : "Keep drilling. These checks save lives."}
          </p>
          <p className="text-xs text-muted-foreground">{correct} correct out of {total} checks</p>
        </div>

        {/* Missed answers */}
        {sessionResults.filter((r) => !r.correct).length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Missed Checks — Review These</h3>
            <div className="space-y-2">
              {sessionResults.filter((r) => !r.correct).map((r, i) => (
                <div key={i} className="bg-destructive/5 border border-destructive/15 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1">{r.item.name}</p>
                  <p className="text-xs font-bold text-foreground mb-1">{r.check.question}</p>
                  <p className="text-xs text-[#4F8A6D] italic">Correct: {r.check.options[r.check.correctIndex]}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.check.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => startSession(psItems)} className="flex-1 bg-[#4F8A6D] text-white rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Drill Again
          </button>
          <button onClick={restart} className="flex-1 bg-card border border-card-border text-foreground rounded-xl py-3.5 font-bold text-sm">
            Choose Items
          </button>
        </div>
      </div>
    </div>
  );
}
