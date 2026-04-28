import { useState, useEffect, useRef } from "react";
import {
  Mic, Volume2, Zap, ArrowLeft, RefreshCw, ChevronRight,
  CheckSquare, Square, Trophy, BookOpen, ChevronDown, ChevronUp,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type Screen = "dashboard" | "interview" | "announcements" | "emergency";
type PracticePhase = "idle" | "active" | "done";

// ── Data ───────────────────────────────────────────────────────────────────

const INTERVIEW_QUESTIONS = [
  { id: "i1", q: "Tell me about yourself.", tip: "Background → relevant skills → why cabin crew → what you bring. Aim for 60 seconds." },
  { id: "i2", q: "Why do you want to be a flight attendant?", tip: "Lead with safety, not travel. Mention genuine service motivation." },
  { id: "i3", q: "Tell me about a time you handled a conflict.", tip: "Use STAR: Situation → Task → Action → Result. Focus on resolution." },
  { id: "i4", q: "Tell me about a time you stayed calm under pressure.", tip: "Name the stressor, name your response, name the outcome." },
  { id: "i5", q: "How would you handle an upset passenger?", tip: "Listen first. Acknowledge the feeling. Solve calmly. Escalate if needed." },
  { id: "i6", q: "What does excellent customer service mean to you?", tip: "Anticipation + warmth + professionalism when things go wrong." },
  { id: "i7", q: "Describe a time you worked as part of a team under pressure.", tip: "Use 'we' as much as 'I.' Show you know how to be part of a crew." },
  { id: "i8", q: "What is an area you are currently working to improve?", tip: "Be honest. Name it. Then explain what you are doing about it." },
  { id: "i9", q: "Why this airline specifically?", tip: "Name one specific thing you researched. Vague flattery is worse than silence." },
  { id: "i10", q: "How do you feel about irregular schedules and time away from home?", tip: "Show you've thought about it seriously. Genuine readiness matters." },
  { id: "i11", q: "What would you do if you noticed a safety issue a senior colleague had missed?", tip: "Speak up immediately. Frame it as a question. Safety has no hierarchy." },
  { id: "i12", q: "How do you handle stress?", tip: "Name a specific strategy. Say 'I rely on my training.' Avoid 'I don't get stressed.'" },
];

const ANNOUNCEMENT_PROMPTS = [
  {
    id: "a1",
    title: "Welcome Aboard",
    prompt: "Deliver a warm, professional boarding welcome announcement.",
    script: "Good morning, ladies and gentlemen, and welcome aboard. On behalf of the captain and your entire cabin crew, we are delighted to have you with us today. Before we depart, we will shortly ask for your full attention for our safety demonstration. We ask that carry-on baggage be stowed in the overhead bins or under the seat in front of you, and that personal electronic devices be switched to flight mode. We look forward to taking care of you today. Thank you for choosing to fly with us.",
    tip: "Smile while you speak — it carries in your voice. Pause between phrases. Warm but professional.",
  },
  {
    id: "a2",
    title: "Seatbelt Sign On — Turbulence",
    prompt: "Announce that the seatbelt sign has been illuminated due to turbulence.",
    script: "Ladies and gentlemen, the captain has illuminated the fasten seatbelt sign due to areas of turbulence ahead. We ask that you return to your seats and fasten your seatbelts at this time. Please ensure your tray tables are stowed and your seatbacks are in the upright position. We will be pausing our service until conditions improve. We appreciate your understanding. Thank you.",
    tip: "Your tone tells passengers how worried to be. Sound composed. Speak slightly slower than usual.",
  },
  {
    id: "a3",
    title: "Seatbelt Reminder",
    prompt: "Remind passengers to keep their seatbelts fastened while seated.",
    script: "Ladies and gentlemen, as a reminder, we ask that you keep your seatbelts fastened while you are seated, even when the seatbelt sign is switched off. Unexpected turbulence can occur at any time, and your safety is our highest priority. Thank you for your cooperation.",
    tip: "Short and confident. Don't rush. State it like a fact, not a suggestion.",
  },
  {
    id: "a4",
    title: "Flight Delay Announcement",
    prompt: "Announce a departure delay to passengers already on board.",
    script: "Ladies and gentlemen, we apologise for the delay to your departure today. We are currently waiting for clearance from air traffic control and expect to be underway shortly. We appreciate your patience and will keep you updated as soon as we have further information. In the meantime, please remain seated with your seatbelts fastened. Thank you for your understanding.",
    tip: "Acknowledge the frustration without over-explaining. Keep it brief, sincere, and calm.",
  },
  {
    id: "a5",
    title: "Thank You for Flying",
    prompt: "Deliver the end-of-flight thank you and farewell announcement.",
    script: "Ladies and gentlemen, we have now landed and the aircraft is taxiing to the gate. Please remain seated with your seatbelts fastened until the captain has switched off the seatbelt sign. On behalf of the captain and the entire crew, we would like to thank you for flying with us today. We hope you had a comfortable journey and we look forward to welcoming you on board again soon. Welcome to your destination.",
    tip: "Warm and genuine. You've spent hours with these passengers — the farewell should feel like it.",
  },
];

const EMERGENCY_COMMANDS = [
  {
    id: "ec1",
    command: "Release seatbelts and get out!",
    context: "Evacuation — passengers hesitating after door is open",
    note: "Project from your chest. Make eye contact. No hesitation.",
  },
  {
    id: "ec2",
    command: "Leave everything!",
    context: "Passengers attempting to take carry-on bags during evacuation",
    note: "Loud, sharp, repeated. A bag costs lives. Your authority saves them.",
  },
  {
    id: "ec3",
    command: "Jump and slide!",
    context: "Directing passengers onto the evacuation slide",
    note: "Arms directing to the slide. Continuous until all passengers clear.",
  },
  {
    id: "ec4",
    command: "Come this way!",
    context: "Directing passengers toward your exit in smoke or low visibility",
    note: "Clear, loud, with arm gestures. Repeat continuously.",
  },
  {
    id: "ec5",
    command: "Stay seated!",
    context: "Passengers attempting to stand during ground emergency or turbulence",
    note: "Command presence. One sharp delivery is more effective than pleading.",
  },
  {
    id: "ec6",
    command: "Brace! Brace! Head down! Stay down!",
    context: "Imminent impact — full cabin brace command",
    note: "Maximum volume. Repeated continuously until impact. This is not a request.",
  },
];

const CONFIDENCE_CHECKS = [
  "Did I speak clearly?",
  "Did I sound calm?",
  "Did I sound confident?",
  "Did I avoid rambling?",
  "Did I use safety-first language?",
];

const PRACTICE_STORAGE_KEY = "cabinCrewVoicePracticeCount";

function getPracticeCount(): number {
  try {
    return parseInt(localStorage.getItem(PRACTICE_STORAGE_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function incrementPracticeCount(): number {
  try {
    const next = getPracticeCount() + 1;
    localStorage.setItem(PRACTICE_STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

// ── Shared: Confidence Checklist ───────────────────────────────────────────

function ConfidenceChecklist({ onDone }: { onDone: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(CONFIDENCE_CHECKS.map(() => false));

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const total = checked.filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-accent" />
          <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Confidence Self-Check</h3>
        </div>
        <div className="space-y-3">
          {CONFIDENCE_CHECKS.map((item, i) => (
            <button
              key={item}
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-3 text-left group"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors border-2 ${checked[i] ? "bg-accent border-accent" : "border-border bg-background"}`}>
                {checked[i] && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <span className={`text-sm font-semibold transition-colors ${checked[i] ? "text-foreground" : "text-muted-foreground"}`}>
                {item}
              </span>
            </button>
          ))}
        </div>

        {/* Score bar */}
        <div className="mt-5 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Score</span>
            <span className="text-sm font-black" style={{ color: total >= 4 ? "#4F8A6D" : total >= 2 ? "#D7B267" : "#6FA7A1" }}>
              {total}/{CONFIDENCE_CHECKS.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(total / CONFIDENCE_CHECKS.length) * 100}%`,
                backgroundColor: total >= 4 ? "#4F8A6D" : total >= 2 ? "#D7B267" : "#6FA7A1",
              }}
            />
          </div>
        </div>
      </div>

      {/* Completion message */}
      <div
        className="rounded-2xl px-5 py-4 border text-center"
        style={{ backgroundColor: "rgba(111,167,161,0.08)", borderColor: "rgba(111,167,161,0.25)" }}
      >
        <p className="text-sm font-bold text-foreground">Practice completed.</p>
        <p className="text-sm text-muted-foreground mt-0.5">Your confidence is building.</p>
      </div>

      <button
        onClick={onDone}
        className="w-full h-12 rounded-xl font-bold text-sm text-primary-foreground"
        style={{ backgroundColor: "#17324D" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// ── Screen: Dashboard ──────────────────────────────────────────────────────

const DAILY_DRILLS = [
  { mode: "interview" as Screen, label: "Interview Question", example: "Tell me about yourself." },
  { mode: "announcements" as Screen, label: "Cabin Announcement", example: "Welcome aboard announcement." },
  { mode: "emergency" as Screen, label: "Emergency Command", example: "Brace! Brace! Head down! Stay down!" },
  { mode: "interview" as Screen, label: "Interview Question", example: "Why do you want to be a flight attendant?" },
  { mode: "announcements" as Screen, label: "Cabin Announcement", example: "Turbulence seatbelt announcement." },
  { mode: "emergency" as Screen, label: "Emergency Command", example: "Leave everything!" },
  { mode: "interview" as Screen, label: "Interview Question", example: "How do you handle stress?" },
];

function Dashboard({ onSelect }: { onSelect: (s: Screen) => void }) {
  const [count, setCount] = useState(getPracticeCount());
  const todayDrill = DAILY_DRILLS[new Date().getDay() % DAILY_DRILLS.length];

  useEffect(() => {
    setCount(getPracticeCount());
  }, []);

  const modes = [
    {
      screen: "interview" as Screen,
      icon: <Mic className="w-6 h-6" />,
      label: "Interview Answer Practice",
      tag: "Say It Out Loud",
      description: "12 real interview questions · 60-second timer · STAR method coaching · Confidence self-check.",
      accent: "#17324D",
      bg: "rgba(23,50,77,0.07)",
    },
    {
      screen: "announcements" as Screen,
      icon: <Volume2 className="w-6 h-6" />,
      label: "Passenger Announcement Practice",
      tag: "Say It Out Loud",
      description: "5 full cabin scripts — welcome, turbulence, seatbelt, delay, farewell. Read aloud with delivery tips.",
      accent: "#6FA7A1",
      bg: "rgba(111,167,161,0.10)",
    },
    {
      screen: "emergency" as Screen,
      icon: <Zap className="w-6 h-6" />,
      label: "Emergency Command Practice",
      tag: "Say It Out Loud",
      description: "6 evacuation and brace commands. Deliver with full voice projection. Your authority saves lives.",
      accent: "#D7B267",
      bg: "rgba(215,178,103,0.10)",
    },
  ];

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-7 px-6 rounded-b-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-5" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Mic className="w-4 h-4 text-accent" />
          </div>
          <h1 className="text-2xl font-black">Say It Out Loud</h1>
        </div>
        <p className="text-sm text-primary-foreground/60 mb-1">Voice practice for interview, safety, and service.</p>
        <p className="text-[10px] text-primary-foreground/40 font-bold uppercase tracking-wider">Speak the words. Build the habit. Own the room.</p>

        {/* Practice count */}
        {count > 0 && (
          <div
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(215,178,103,0.18)" }}
          >
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-bold text-accent">{count} session{count !== 1 ? "s" : ""} completed</span>
          </div>
        )}
      </div>

      <div className="px-5 mt-5 space-y-4">

        {/* Today's Drill */}
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background: "linear-gradient(135deg, #17324D 0%, #0f2033 100%)", border: "1px solid rgba(215,178,103,0.20)" }}
        >
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-accent mb-0.5">Today's Drill</p>
            <p className="text-sm font-bold text-white">{todayDrill.label}</p>
            <p className="text-xs text-white/50 mt-0.5 italic">"{todayDrill.example}"</p>
          </div>
          <button
            onClick={() => onSelect(todayDrill.mode)}
            className="h-8 px-3 rounded-lg bg-accent/20 text-accent text-xs font-bold flex-shrink-0 self-center border border-accent/30"
          >
            Start →
          </button>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">All Practice Modes</p>

        {modes.map((mode) => (
          <button
            key={mode.screen}
            onClick={() => onSelect(mode.screen)}
            className="w-full text-left bg-card border border-card-border rounded-2xl p-4 shadow-sm flex items-start gap-4 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: mode.bg, color: mode.accent }}
            >
              {mode.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-black text-foreground">{mode.label}</h2>
              </div>
              <span
                className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5"
                style={{ backgroundColor: `${mode.accent}18`, color: mode.accent }}
              >
                {mode.tag}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">{mode.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          </button>
        ))}

        {/* Recording note */}
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: "rgba(215,178,103,0.07)", border: "1px solid rgba(215,178,103,0.20)" }}
        >
          <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Mic className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground mb-0.5">Audio Recording — Coming Soon</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Future update will let you record your voice and play it back to hear how you sound. For now, practise speaking out loud into the timer — the habit is what matters most.
            </p>
          </div>
        </div>

        {/* Coaching tip */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
          <BookOpen className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">Voice Coach's Rule</p>
            <p className="text-xs text-foreground leading-relaxed">
              Slow, clear, and direct beats fast and uncertain every time. Pause between sentences. Breathe. Speak like you have already decided what to say.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Interview Answer Practice ─────────────────────────────────────

function InterviewMode({ onBack }: { onBack: () => void }) {
  const [qIndex, setQIndex] = useState(() => Math.floor(Math.random() * INTERVIEW_QUESTIONS.length));
  const [phase, setPhase] = useState<PracticePhase>("idle");
  const [timeLeft, setTimeLeft] = useState(60);
  const [showTip, setShowTip] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = INTERVIEW_QUESTIONS[qIndex];

  const nextQuestion = () => {
    const next = (qIndex + 1) % INTERVIEW_QUESTIONS.length;
    setQIndex(next);
    reset();
  };

  const randomQuestion = () => {
    let next = Math.floor(Math.random() * INTERVIEW_QUESTIONS.length);
    if (next === qIndex) next = (next + 1) % INTERVIEW_QUESTIONS.length;
    setQIndex(next);
    reset();
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("idle");
    setTimeLeft(60);
    setShowTip(false);
  };

  const start = () => {
    setPhase("active");
    setTimeLeft(60);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase("done");
          incrementPracticeCount();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("done");
    incrementPracticeCount();
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const progress = phase === "idle" ? 0 : phase === "done" ? ((60 - timeLeft) / 60) * 100 : ((60 - timeLeft) / 60) * 100;
  const circumference = 2 * Math.PI * 48;

  if (phase === "done") {
    return (
      <div className="min-h-[100dvh] pb-24 bg-background">
        <ModeHeader title="Interview Practice" onBack={onBack} />
        <div className="px-5 mt-6 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Question</p>
            <p className="text-base font-bold text-foreground leading-snug">"{question.q}"</p>
          </div>
          <ConfidenceChecklist onDone={() => { reset(); onBack(); }} />
          <button
            onClick={() => { reset(); nextQuestion(); }}
            className="w-full h-12 rounded-xl font-bold text-sm border border-card-border bg-card text-foreground"
          >
            Try Another Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <ModeHeader title="Interview Practice" onBack={onBack} />

      <div className="px-5 mt-6 space-y-4">
        {/* Question counter */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground">
            Question {qIndex + 1} of {INTERVIEW_QUESTIONS.length}
          </span>
          <button onClick={randomQuestion} className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className="w-3 h-3" /> Shuffle
          </button>
        </div>

        {/* Question card */}
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <p className="text-base font-bold text-foreground leading-snug mb-1">"{question.q}"</p>
          <p className="text-xs text-muted-foreground">Answer in 60 seconds — structured and clear.</p>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center py-4">
          <div className="relative w-32 h-32 mb-3">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="56" cy="56" r="48" fill="none"
                stroke={timeLeft <= 10 && phase === "active" ? "#ef4444" : "#D7B267"}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={String(circumference)}
                strokeDashoffset={String(circumference * (1 - (phase === "idle" ? 0 : (60 - timeLeft) / 60)))}
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-mono font-black ${timeLeft <= 10 && phase === "active" ? "text-destructive" : "text-foreground"}`}>
                {timeLeft < 10 ? `0:0${timeLeft}` : `0:${timeLeft < 60 ? (timeLeft < 10 ? "0" : "") + timeLeft : "60"}`}
              </span>
              {phase === "active" && (
                <span className="text-[10px] font-bold text-accent uppercase tracking-wide animate-pulse">Speaking</span>
              )}
            </div>
          </div>

          {phase === "active" && (
            <p className="text-xs text-muted-foreground text-center max-w-[240px]">
              Speak clearly and structure your answer. Pause instead of using filler words.
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {phase === "idle" && (
            <>
              <button
                onClick={start}
                className="flex-1 h-14 rounded-xl font-black text-sm text-primary-foreground flex items-center justify-center gap-2"
                style={{ backgroundColor: "#17324D" }}
              >
                <Mic className="w-4 h-4" />
                Start Practice
              </button>
              <button
                onClick={nextQuestion}
                className="h-14 w-14 rounded-xl border border-card-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          {phase === "active" && (
            <>
              <button
                onClick={stop}
                className="flex-1 h-14 rounded-xl font-black text-sm bg-destructive text-white"
              >
                Done — Rate Myself
              </button>
              <button
                onClick={reset}
                className="h-14 w-14 rounded-xl border border-card-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Tip */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setShowTip((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-foreground">How to structure this answer</span>
            </div>
            {showTip ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showTip && (
            <div className="border-t border-border/40 px-4 pb-4 pt-3">
              <p className="text-sm text-foreground leading-relaxed">{question.tip}</p>
            </div>
          )}
        </div>

        {/* All questions list */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">All Questions</p>
          <div className="space-y-1.5">
            {INTERVIEW_QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                onClick={() => { setQIndex(i); reset(); }}
                className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${i === qIndex ? "border-primary/30 bg-primary/5" : "border-card-border bg-background hover:bg-muted/30"}`}
              >
                <p className="text-xs font-semibold text-foreground leading-snug">"{q.q}"</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Announcement Practice ─────────────────────────────────────────

function AnnouncementsMode({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [showScript, setShowScript] = useState(true);
  const [done, setDone] = useState(false);

  const announcement = ANNOUNCEMENT_PROMPTS[index];

  const markDone = () => {
    incrementPracticeCount();
    setDone(true);
  };

  const next = () => {
    setIndex((i) => (i + 1) % ANNOUNCEMENT_PROMPTS.length);
    setDone(false);
    setShowScript(true);
  };

  if (done) {
    return (
      <div className="min-h-[100dvh] pb-24 bg-background">
        <ModeHeader title="Announcement Practice" onBack={onBack} />
        <div className="px-5 mt-6 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Completed</p>
            <p className="text-sm font-bold text-foreground">{announcement.title}</p>
          </div>
          <ConfidenceChecklist onDone={() => { setDone(false); onBack(); }} />
          <button
            onClick={() => { setDone(false); next(); }}
            className="w-full h-12 rounded-xl font-bold text-sm border border-card-border bg-card text-foreground"
          >
            Practice Next Announcement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <ModeHeader title="Announcement Practice" onBack={onBack} />

      <div className="px-5 mt-6 space-y-4">
        {/* Announcement selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {ANNOUNCEMENT_PROMPTS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => { setIndex(i); setDone(false); setShowScript(true); }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${i === index ? "text-white" : "bg-muted text-muted-foreground"}`}
              style={i === index ? { backgroundColor: "#6FA7A1" } : {}}
            >
              {a.title}
            </button>
          ))}
        </div>

        {/* Prompt */}
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "#6FA7A1" }}>
            Your Prompt
          </p>
          <p className="text-base font-bold text-foreground leading-snug">{announcement.prompt}</p>
        </div>

        {/* Delivery tip */}
        <div
          className="rounded-xl px-4 py-3 flex gap-3 border"
          style={{ backgroundColor: "rgba(111,167,161,0.08)", borderColor: "rgba(111,167,161,0.25)" }}
        >
          <Mic className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#6FA7A1" }} />
          <p className="text-xs text-foreground leading-relaxed">{announcement.tip}</p>
        </div>

        {/* Script */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setShowScript((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: "#6FA7A1" }} />
              <span className="text-xs font-bold text-foreground">Full Script — Read This Out Loud</span>
            </div>
            {showScript ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showScript && (
            <div className="border-t border-border/40 px-4 pb-5 pt-3">
              <p className="text-sm text-foreground leading-loose">{announcement.script}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={markDone}
            className="flex-1 h-14 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: "#6FA7A1" }}
          >
            <CheckSquare className="w-4 h-4" />
            I Practiced This
          </button>
          <button
            onClick={next}
            className="h-14 w-14 rounded-xl border border-card-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Emergency Command Practice ────────────────────────────────────

function EmergencyMode({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [practiced, setPracticed] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const command = EMERGENCY_COMMANDS[index];
  const isPracticed = practiced.has(command.id);

  const markPracticed = () => {
    setPracticed((prev) => new Set([...prev, command.id]));
  };

  const finishSession = () => {
    incrementPracticeCount();
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-[100dvh] pb-24 bg-background">
        <ModeHeader title="Emergency Commands" onBack={onBack} />
        <div className="px-5 mt-6 space-y-4">
          <div
            className="rounded-2xl px-5 py-4 border"
            style={{ backgroundColor: "rgba(215,178,103,0.08)", borderColor: "rgba(215,178,103,0.25)" }}
          >
            <p className="text-sm font-bold text-foreground">
              {practiced.size} of {EMERGENCY_COMMANDS.length} commands practiced.
            </p>
          </div>
          <ConfidenceChecklist onDone={() => { setDone(false); onBack(); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <ModeHeader title="Emergency Commands" onBack={onBack} />

      <div className="px-5 mt-6 space-y-4">
        {/* Authority note */}
        <div
          className="rounded-2xl px-4 py-3 border flex gap-3"
          style={{ backgroundColor: "rgba(215,178,103,0.08)", borderColor: "rgba(215,178,103,0.25)" }}
        >
          <Zap className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
          <p className="text-xs text-foreground leading-relaxed font-semibold">
            Commands must be practiced clearly, loudly, and with command presence. This is not a suggestion — in an emergency, your voice is your primary safety tool.
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center">
          {EMERGENCY_COMMANDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setIndex(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-colors border-2 ${
                practiced.has(c.id)
                  ? "text-white border-transparent"
                  : i === index
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-muted-foreground"
              }`}
              style={practiced.has(c.id) ? { backgroundColor: "#D7B267", borderColor: "#D7B267" } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Command card */}
        <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {command.context}
          </p>

          <div
            className="rounded-xl px-4 py-4 mb-4"
            style={{ backgroundColor: "rgba(215,178,103,0.10)", border: "2px solid rgba(215,178,103,0.30)" }}
          >
            <p className="text-xl font-black text-foreground text-center leading-snug">
              "{command.command}"
            </p>
          </div>

          <div className="flex gap-2 items-start">
            <Mic className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground leading-relaxed">{command.note}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={() => { markPracticed(); if (index < EMERGENCY_COMMANDS.length - 1) setIndex((i) => i + 1); }}
            className={`flex-1 h-14 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors ${isPracticed ? "bg-muted text-foreground border border-card-border" : "text-white"}`}
            style={!isPracticed ? { backgroundColor: "#D7B267" } : {}}
          >
            {isPracticed ? (
              <><CheckSquare className="w-4 h-4" /> Practiced</>
            ) : (
              <><Mic className="w-4 h-4" /> I Said It — Next</>
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex-1 h-11 rounded-xl border border-card-border bg-card text-sm font-bold text-foreground disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(EMERGENCY_COMMANDS.length - 1, i + 1))}
            disabled={index === EMERGENCY_COMMANDS.length - 1}
            className="flex-1 h-11 rounded-xl border border-card-border bg-card text-sm font-bold text-foreground disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {practiced.size > 0 && (
          <button
            onClick={finishSession}
            className="w-full h-12 rounded-xl font-bold text-sm border-2 border-primary/20 bg-primary/5 text-primary"
          >
            Finish Session ({practiced.size}/{EMERGENCY_COMMANDS.length} done)
          </button>
        )}
      </div>
    </div>
  );
}

// ── Shared: Mode Header ────────────────────────────────────────────────────

function ModeHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl shadow-sm">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold">Voice Dashboard</span>
      </button>
      <div className="flex items-center gap-2">
        <Mic className="w-5 h-5 text-accent" />
        <h1 className="text-xl font-black">{title}</h1>
      </div>
    </div>
  );
}

// ── Root Component ─────────────────────────────────────────────────────────

export default function Speak() {
  const [screen, setScreen] = useState<Screen>("dashboard");

  if (screen === "interview") return <InterviewMode onBack={() => setScreen("dashboard")} />;
  if (screen === "announcements") return <AnnouncementsMode onBack={() => setScreen("dashboard")} />;
  if (screen === "emergency") return <EmergencyMode onBack={() => setScreen("dashboard")} />;

  return <Dashboard onSelect={setScreen} />;
}
