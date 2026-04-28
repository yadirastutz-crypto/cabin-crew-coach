import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, Volume2, RefreshCw, Mic, ChevronDown, ChevronUp, Star } from "lucide-react";
import { announcements, announcementCategories, Announcement, AnnouncementCategory } from "@/data/announcements";

type Phase = "idle" | "active" | "done";

interface FeedbackScore {
  confidence: number;
  pace: number;
  clarity: number;
  warmth: number;
  commandPresence: number;
}

function generateFeedback(elapsed: number, timer: number, category: AnnouncementCategory, attempts: number): FeedbackScore {
  const timePct = elapsed / timer;
  const seed = Date.now() % 1000;
  const r = (n: number) => (Math.sin(n * seed) * 0.5 + 0.5);
  const base = Math.min(5.5 + attempts * 0.15, 7);
  const isEmergency = category === "Emergency Commands";

  const pace = timePct < 0.5 ? 4 + r(1) * 2 : timePct < 0.85 ? 7 + r(2) * 2 : 6 + r(3) * 1.5;
  return {
    confidence: Math.round(Math.min(10, base + r(4) * 3)),
    pace: Math.round(Math.min(10, pace)),
    clarity: Math.round(Math.min(10, base + r(5) * 3)),
    warmth: Math.round(Math.min(10, isEmergency ? 5 + r(6) * 2 : base + r(6) * 2.5)),
    commandPresence: Math.round(Math.min(10, isEmergency ? base + 2 + r(7) * 1.5 : base + r(7) * 2.5)),
  };
}

const TIPS_POOL = [
  "Smile while speaking — warmth carries in your voice.",
  "Pause between phrases. Let each instruction land before the next.",
  "Project to the back of the cabin — not loudly, but clearly.",
  "Slow your pace by 10% for safety instructions.",
  "Remove filler words: 'um,' 'so,' 'you know.'",
  "Take a breath before you begin — it resets your pace immediately.",
  "For emergency commands: maximum volume, no softening.",
  "Your tone tells passengers how worried to be. Sound in control.",
];

export default function AnnouncementCoach() {
  const [activeCategory, setActiveCategory] = useState<AnnouncementCategory>("Boarding Welcome");
  const [currentScript, setCurrentScript] = useState<Announcement>(announcements[0]);
  const [useShortScript, setUseShortScript] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(currentScript.timer);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackScore | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [showScript, setShowScript] = useState(true);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [tip, setTip] = useState(TIPS_POOL[0]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phase === "active") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((v) => {
          if (v <= 1) {
            clearInterval(intervalRef.current!);
            handleDone();
            return 0;
          }
          return v - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  function handleDone() {
    const el = currentScript.timer - timeLeft;
    setElapsed(el);
    const fb = generateFeedback(el, currentScript.timer, currentScript.category, sessionAttempts);
    setFeedback(fb);
    setSessionAttempts((n) => n + 1);
    setTip(TIPS_POOL[Math.floor(Math.random() * TIPS_POOL.length)]);
    setPhase("done");
  }

  function stopEarly() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    handleDone();
  }

  function selectScript(a: Announcement) {
    setCurrentScript(a);
    setTimeLeft(a.timer);
    setPhase("idle");
    setFeedback(null);
    setShowTips(false);
    setUseShortScript(false);
  }

  function switchCategory(cat: AnnouncementCategory) {
    setActiveCategory(cat);
    const pool = announcements.filter((a) => a.category === cat);
    if (pool.length > 0) selectScript(pool[0]);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const timerProgress = ((currentScript.timer - timeLeft) / currentScript.timer) * 100;
  const poolForCategory = announcements.filter((a) => a.category === activeCategory);

  const dimensionLabels: { key: keyof FeedbackScore; label: string }[] = [
    { key: "confidence", label: "Confidence" },
    { key: "pace", label: "Pace" },
    { key: "clarity", label: "Clarity" },
    { key: "warmth", label: "Warmth" },
    { key: "commandPresence", label: "Command Presence" },
  ];

  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-5 px-5 rounded-b-3xl">
        <Link href="/speak">
          <button className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground">
            <ChevronLeft className="w-4 h-4" /> Voice Coach
          </button>
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <Volume2 className="w-6 h-6 text-accent" />
          <h1 className="text-2xl font-bold">Announcement Coach</h1>
        </div>
        <p className="text-primary-foreground/70 text-sm mt-1">Practice delivering cabin announcements with confidence, warmth, and authority.</p>

        {/* Category tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          {announcementCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                activeCategory === cat ? "bg-white text-primary border-white" : "border-white/30 text-primary-foreground/80 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Script card */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{currentScript.category}</span>
              <h3 className="text-sm font-bold text-foreground mt-0.5">{currentScript.title}</h3>
            </div>
            {phase === "idle" && (
              <button onClick={() => { const pool = poolForCategory; const next = pool[Math.floor(Math.random() * pool.length)]; selectScript(next); }} className="p-1.5 text-muted-foreground hover:text-foreground">
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tone indicator */}
          <div className="px-4 pb-2">
            <p className="text-[11px] text-muted-foreground italic">Tone: {currentScript.tone}</p>
          </div>

          {/* Script text */}
          <button onClick={() => setShowScript((v) => !v)} className="flex items-center justify-between w-full px-4 py-2 border-t border-border/30">
            <span className="text-[11px] font-bold text-muted-foreground">{useShortScript ? "Short version" : "Full script"}</span>
            {showScript ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showScript && (
            <div className="px-4 pb-4 bg-muted/20">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {useShortScript ? currentScript.shortScript : currentScript.script}
              </p>
            </div>
          )}
        </div>

        {/* Script toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setUseShortScript(false)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${!useShortScript ? "bg-primary text-primary-foreground border-primary" : "bg-background border-card-border text-foreground"}`}
          >
            Full Version
          </button>
          <button
            onClick={() => setUseShortScript(true)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${useShortScript ? "bg-primary text-primary-foreground border-primary" : "bg-background border-card-border text-foreground"}`}
          >
            Shorter Version
          </button>
        </div>

        {/* Timer + controls */}
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col items-center mb-5">
            <div className="relative w-24 h-24 mb-3">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
                <circle cx="48" cy="48" r="40" fill="none"
                  stroke={timeLeft <= 10 && phase === "active" ? "hsl(var(--destructive))" : "hsl(var(--accent))"}
                  strokeWidth="7" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - timerProgress / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.5s ease" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-mono font-bold ${timeLeft <= 10 && phase === "active" ? "text-destructive" : "text-foreground"}`}>{timerDisplay}</span>
                {phase === "done" && <span className="text-[10px] font-bold text-accent uppercase">Done</span>}
              </div>
            </div>
            {phase === "active" && (
              <div className="text-xs text-accent font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                <Mic className="w-3 h-3" /> Delivering…
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {phase === "idle" && (
              <button onClick={() => { setTimeLeft(currentScript.timer); setFeedback(null); setPhase("active"); }}
                className="flex-1 h-12 bg-success text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform">
                Record Practice
              </button>
            )}
            {phase === "active" && (
              <>
                <button onClick={stopEarly} className="flex-1 h-12 bg-destructive text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform">
                  Stop & Score
                </button>
                <button onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setPhase("idle"); setTimeLeft(currentScript.timer); setFeedback(null); }}
                  className="h-12 w-12 bg-muted text-foreground rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </>
            )}
            {phase === "done" && (
              <button onClick={() => { setPhase("idle"); setTimeLeft(currentScript.timer); setFeedback(null); }}
                className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl font-bold text-sm active:scale-[0.98] transition-transform">
                Try Again
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        {phase === "done" && feedback && (
          <div className="space-y-3">
            <div className="bg-card border border-card-border rounded-2xl p-4 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Delivery Feedback</p>
              {dimensionLabels.map(({ key, label }) => {
                const val = feedback[key];
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold text-foreground">{label}</span>
                      <span className={`text-xs font-bold ${val >= 8 ? "text-[#4F8A6D]" : val >= 5 ? "text-accent" : "text-destructive"}`}>{val}/10</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${val >= 8 ? "bg-[#4F8A6D]" : val >= 5 ? "bg-accent" : "bg-destructive"}`} style={{ width: `${val * 10}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coach tip */}
            <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 flex gap-2.5">
              <Volume2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Coach Tip</p>
                <p className="text-sm text-foreground leading-relaxed">{tip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Delivery tips */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
          <button onClick={() => setShowTips((v) => !v)} className="w-full flex items-center justify-between px-4 py-3.5">
            <span className="text-sm font-bold text-foreground">Delivery Tips for This Script</span>
            {showTips ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showTips && (
            <div className="border-t border-border/30 px-4 pb-4 pt-2 space-y-1.5">
              {currentScript.deliveryTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                  <p className="text-xs text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Script list */}
        {poolForCategory.length > 1 && (
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">All {activeCategory} Scripts</h3>
            <div className="space-y-2">
              {poolForCategory.map((a) => (
                <button
                  key={a.id}
                  onClick={() => selectScript(a)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                    currentScript.id === a.id ? "border-primary/40 bg-primary/5" : "border-card-border bg-background hover:border-primary/20"
                  }`}
                >
                  <p className="text-sm font-bold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.timer}s · {a.tone.split(".")[0]}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Link to Voice Coach */}
        <div className="bg-muted/50 border border-card-border rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-foreground">Open-ended voice training</p>
            <p className="text-[11px] text-muted-foreground">Interview, commands, terminology drills</p>
          </div>
          <Link href="/speak">
            <button className="text-xs font-bold text-primary">Voice Coach →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
