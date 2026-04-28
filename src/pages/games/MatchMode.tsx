import { useEffect, useMemo, useState } from "react";
import { GameShell, ResultScreen } from "@/components/GameShell";
import { matchSets } from "@/data/gameContent";
import { useUserProgress } from "@/context/UserProgressContext";
import { Check, X } from "lucide-react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchMode() {
  const { progress, recordGameScore } = useUserProgress();
  const [setIndex, setSetIndex] = useState(0);
  const [seed, setSeed] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const set = matchSets[setIndex];
  const lefts = useMemo(() => shuffle(set.pairs.map((p, i) => ({ text: p.left, idx: i }))), [set, seed]);
  const rights = useMemo(() => shuffle(set.pairs.map((p, i) => ({ text: p.right, idx: i }))), [set, seed]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<{ l: number; r: number } | null>(null);

  function tryMatch(rightIdx: number) {
    if (selectedLeft === null) return;
    if (selectedLeft === rightIdx) {
      const newMatched = new Set(matched);
      newMatched.add(rightIdx);
      setMatched(newMatched);
      const newScore = score + 1;
      setScore(newScore);
      setSelectedLeft(null);
      if (newMatched.size === set.pairs.length) {
        setTimeout(() => finishSet(newScore), 500);
      }
    } else {
      setWrongFlash({ l: selectedLeft, r: rightIdx });
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedLeft(null);
      }, 500);
    }
  }

  function finishSet(currentScore: number = score) {
    if (setIndex + 1 >= matchSets.length) {
      recordGameScore("match", currentScore);
      setScore(currentScore);
      setDone(true);
    } else {
      setSetIndex((i) => i + 1);
      setMatched(new Set());
      setSelectedLeft(null);
      setSeed((s) => s + 1);
    }
  }

  function replay() {
    setSetIndex(0);
    setMatched(new Set());
    setSelectedLeft(null);
    setSeed((s) => s + 1);
    setScore(0);
    setDone(false);
  }

  useEffect(() => {
    setMatched(new Set());
    setSelectedLeft(null);
  }, [setIndex]);

  const totalPairs = matchSets.reduce((sum, s) => sum + s.pairs.length, 0);
  const high = progress.gameStats["match"]?.highScore || 0;

  if (done) {
    return (
      <GameShell title="Match Mode" subtitle="Term ↔ definition">
        <ResultScreen score={score} total={totalPairs} highScore={high} onReplay={replay} />
      </GameShell>
    );
  }

  return (
    <GameShell title="Match Mode" subtitle={set.title} progress={{ current: setIndex + 1, total: matchSets.length }}>
      <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-muted-foreground mb-3">{set.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Tap one</p>
            {lefts.map((l) => {
              const isMatched = matched.has(l.idx);
              const isSelected = selectedLeft === l.idx;
              const isWrong = wrongFlash?.l === l.idx;
              let cls = "border-card-border bg-background";
              if (isMatched) cls = "border-success bg-success/10 opacity-60";
              else if (isSelected) cls = "border-accent bg-accent/15";
              else if (isWrong) cls = "border-destructive bg-destructive/10";
              return (
                <button
                  key={l.idx}
                  disabled={isMatched}
                  onClick={() => !isMatched && setSelectedLeft(l.idx)}
                  className={`w-full text-left text-xs font-bold border rounded-lg px-3 py-2.5 transition-colors ${cls} hover-elevate active-elevate-2`}
                >
                  <span className="flex items-center justify-between gap-1">
                    <span className="truncate">{l.text}</span>
                    {isMatched && <Check className="w-3 h-3 text-success flex-shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Then tap match</p>
            {rights.map((r) => {
              const isMatched = matched.has(r.idx);
              const isWrong = wrongFlash?.r === r.idx;
              let cls = "border-card-border bg-background";
              if (isMatched) cls = "border-success bg-success/10 opacity-60";
              else if (isWrong) cls = "border-destructive bg-destructive/10";
              return (
                <button
                  key={r.idx}
                  disabled={isMatched || selectedLeft === null}
                  onClick={() => tryMatch(r.idx)}
                  className={`w-full text-left text-[11px] leading-snug border rounded-lg px-3 py-2.5 transition-colors ${cls} hover-elevate active-elevate-2 ${
                    selectedLeft === null && !isMatched ? "opacity-50" : ""
                  }`}
                >
                  <span className="flex items-start justify-between gap-1">
                    <span>{r.text}</span>
                    {isMatched ? <Check className="w-3 h-3 text-success flex-shrink-0 mt-0.5" /> : isWrong && <X className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Matched this round: <span className="font-bold text-foreground">{matched.size}/{set.pairs.length}</span>
        </div>
      </div>
    </GameShell>
  );
}
