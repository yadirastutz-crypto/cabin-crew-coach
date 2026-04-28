import { useEffect, useState } from "react";
import { GameShell } from "@/components/GameShell";
import { interviewQuestions } from "@/data/interviewQuestions";
import { useUserProgress } from "@/context/UserProgressContext";
import { RefreshCw, Play, Pause, ChevronDown, ChevronUp } from "lucide-react";

const DURATION = 60;

function pickRandomIndex(exclude: number) {
  if (interviewQuestions.length <= 1) return 0;
  let i = Math.floor(Math.random() * interviewQuestions.length);
  while (i === exclude) i = Math.floor(Math.random() * interviewQuestions.length);
  return i;
}

export default function InterviewSpin() {
  const { progress, recordGameScore } = useUserProgress();
  const [qIdx, setQIdx] = useState(() => Math.floor(Math.random() * interviewQuestions.length));
  const [time, setTime] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [completed, setCompleted] = useState(0);

  const q = interviewQuestions[qIdx];

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      setCompleted((c) => {
        const next = c + 1;
        recordGameScore("interview-spin", next);
        return next;
      });
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, time]);

  function spin() {
    setQIdx((prev) => pickRandomIndex(prev));
    setTime(DURATION);
    setRunning(false);
    setShowStructure(false);
  }

  function startStop() {
    if (time <= 0) {
      setTime(DURATION);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  }

  const mins = Math.floor(time / 60);
  const secs = time % 60;
  const pct = (time / DURATION) * 100;
  const high = progress.gameStats["interview-spin"]?.highScore || 0;

  return (
    <GameShell title="Interview Spin" subtitle="60 seconds. No script. Just speak.">
      <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-accent">{q.category}</span>
          <div className="text-[11px] font-bold text-muted-foreground">
            Best streak: <span className="text-success">{high}</span>
          </div>
        </div>

        <h2 className="text-base font-bold text-foreground mb-5">"{q.question}"</h2>

        <div className="flex flex-col items-center mb-5">
          <div className="relative w-36 h-36 mb-3">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="hsl(var(--muted))" strokeWidth="6" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={time <= 10 ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(pct / 100) * 283} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold tabular-nums text-foreground">
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={startStop}
              className="flex-1 bg-success text-success-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2 flex items-center justify-center gap-1.5"
            >
              {running ? <><Pause className="w-4 h-4" /> Pause</> : time <= 0 ? <><RefreshCw className="w-4 h-4" /> Restart Timer</> : <><Play className="w-4 h-4" /> Start</>}
            </button>
            <button
              onClick={spin}
              className="px-4 bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm hover-elevate active-elevate-2 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Spin
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <button
            onClick={() => setShowStructure((v) => !v)}
            className="flex items-center justify-between w-full text-xs font-bold text-primary"
          >
            How to structure this answer {showStructure ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {showStructure && (
            <div className="mt-3 space-y-3">
              {q.answerStructure && (
                <div className="bg-muted/30 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Structure</p>
                  <p className="text-xs text-foreground leading-relaxed">{q.answerStructure}</p>
                </div>
              )}
              <div className="bg-success/10 border border-success/20 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-success mb-1">Sample Answer</p>
                <p className="text-xs text-foreground italic leading-relaxed">{q.sampleAnswer}</p>
              </div>
              {q.dontSay && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-destructive mb-1">Don't Say</p>
                  <p className="text-xs text-foreground leading-relaxed">{q.dontSay}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Practice runs this session: <span className="font-bold text-foreground">{completed}</span>
        </div>
      </div>
    </GameShell>
  );
}
