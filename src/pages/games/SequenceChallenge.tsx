import { useEffect, useMemo, useState } from "react";
import { GameShell, ResultScreen } from "@/components/GameShell";
import { procedureSequences } from "@/data/gameContent";
import { useUserProgress } from "@/context/UserProgressContext";
import { GripVertical, Check, X, RotateCcw, ShieldAlert } from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SequenceChallenge() {
  const ctx = useUserProgress();
  const { recordGameScore } = ctx ?? {};
  const gameStats = ctx?.progress?.gameStats ?? {};

  const [seed, setSeed] = useState(0);
  const sequences = useMemo(() => shuffle(procedureSequences).slice(0, 5), [seed]);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const seq = sequences[idx];
  const indexed = useMemo(
    () => seq.steps.map((s, i) => ({ text: s, originalIndex: i })),
    [seq]
  );
  const [order, setOrder] = useState(() => shuffle(indexed));
  const [submitted, setSubmitted] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(false);

  useEffect(() => {
    setOrder(shuffle(seq.steps.map((s, i) => ({ text: s, originalIndex: i }))));
    setSubmitted(false);
    setRoundCorrect(false);
  }, [idx, seq]);

  function move(from: number, to: number) {
    if (submitted) return;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrder(next);
  }

  function check() {
    const correct = order.every((step, i) => step.originalIndex === i);
    setRoundCorrect(correct);
    setSubmitted(true);
    if (correct) setScore((s) => s + 1);
  }

  function nextSeq() {
    if (idx + 1 >= sequences.length) {
      recordGameScore?.("sequence", score);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  }

  function reshuffle() {
    setOrder(shuffle(seq.steps.map((s, i) => ({ text: s, originalIndex: i }))));
  }

  function replay() {
    setSeed((s) => s + 1);
    setIdx(0);
    setScore(0);
    setSubmitted(false);
    setRoundCorrect(false);
    setDone(false);
  }

  const high = gameStats["sequence"]?.highScore ?? 0;
  const allCorrect = submitted && order.every((step, i) => step.originalIndex === i);
  const wrongSteps = submitted
    ? order
        .map((step, i) => ({ step, userPos: i, correct: step.originalIndex === i }))
        .filter((x) => !x.correct)
    : [];

  if (done) {
    const pct = sequences.length > 0 ? Math.round((score / sequences.length) * 100) : 0;
    let coachNote: string;
    if (pct === 100) {
      coachNote = "Perfect procedural memory. You could train others on this material.";
    } else if (pct >= 60) {
      coachNote = "Good instincts. Review the sequences you missed — in real emergencies, step order prevents harm.";
    } else {
      coachNote = "Procedures are built on a logic of safety. Study why each step comes before the next, not just what the steps are.";
    }
    return (
      <GameShell title="Sequence Challenge" subtitle="Order the steps">
        <ResultScreen
          score={score}
          total={sequences.length}
          highScore={high}
          message={
            score === sequences.length
              ? "Perfect order. Procedure mastery."
              : `${score} of ${sequences.length} sequences in correct order.`
          }
          coachNote={coachNote}
          onReplay={replay}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Sequence Challenge" subtitle={seq.title} progress={{ current: idx + 1, total: sequences.length }}>
      <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
        <div className="text-[10px] uppercase tracking-wider font-bold text-accent mb-1">Scenario</div>
        <p className="text-sm text-foreground mb-4">{seq.scenario}</p>

        <div className="space-y-2 mb-4">
          {order.map((step, i) => {
            const isCorrect = submitted && step.originalIndex === i;
            const isWrong = submitted && step.originalIndex !== i;
            let cls = "border-card-border bg-background";
            if (isCorrect) cls = "border-success bg-success/10";
            else if (isWrong) cls = "border-destructive/40 bg-destructive/5";
            return (
              <div key={step.originalIndex} className={`flex items-center gap-2 border rounded-xl p-2.5 transition-colors ${cls}`}>
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0 || submitted}
                    className="text-xs px-1.5 py-0.5 rounded bg-muted text-foreground font-bold disabled:opacity-30 hover-elevate active-elevate-2"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(i, i + 1)}
                    disabled={i === order.length - 1 || submitted}
                    className="text-xs px-1.5 py-0.5 rounded bg-muted text-foreground font-bold disabled:opacity-30 hover-elevate active-elevate-2"
                  >
                    ▼
                  </button>
                </div>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-xs text-foreground flex-1 leading-snug">{step.text}</span>
                {submitted && (
                  isCorrect
                    ? <Check className="w-4 h-4 text-success flex-shrink-0" />
                    : <X className="w-4 h-4 text-destructive flex-shrink-0" />
                )}
                {!submitted && <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="flex gap-2">
            <button
              onClick={reshuffle}
              className="px-4 bg-muted text-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reshuffle
            </button>
            <button
              onClick={check}
              className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2"
            >
              Check Order
            </button>
          </div>
        )}

        {submitted && (
          <div className="space-y-3">
            <div className={`rounded-xl p-3 ${allCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
              <p className="text-xs font-bold mb-1">{allCorrect ? "Correct sequence ✓" : "Not quite — correct order:"}</p>
              {!allCorrect && (
                <ol className="space-y-1 text-xs text-foreground">
                  {seq.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {!allCorrect && wrongSteps.length > 0 && (
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">
                  Mistakes ({wrongSteps.length} step{wrongSteps.length > 1 ? "s" : ""} out of place)
                </p>
                <p className="text-xs text-muted-foreground">
                  You placed step {wrongSteps.map((w) => `"${w.step.text.slice(0, 30)}…"`).slice(0, 2).join(", ")} in the wrong position.
                </p>
              </div>
            )}

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 flex gap-2">
              <ShieldAlert className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-1">Why this order matters</p>
                <p className="text-xs text-foreground leading-relaxed">{seq.sequenceNote}</p>
              </div>
            </div>

            <button
              onClick={nextSeq}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2"
            >
              {idx + 1 >= sequences.length ? "See Results" : "Next Sequence →"}
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
