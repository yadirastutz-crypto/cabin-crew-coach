import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Wind, Heart, Mic, Zap, Star, ChevronRight, Play, Pause } from "lucide-react";

type Mode = "hub" | "breathing" | "grounding" | "voice-warmup" | "pre-interview" | "pre-training";

const confidenceReminders = [
  "Calm is part of your professionalism.",
  "You do not need perfection. You need consistency.",
  "Pressure is something you can train for — and you are.",
  "Every expert was once a beginner who kept going.",
  "Your preparation is your confidence. Trust it.",
  "Composure is a skill. You are practising it right now.",
  "The best crew members are not fearless. They are trained.",
  "Breathe. Think. Act. In that order.",
];

const groundingSteps = [
  { prompt: "Name 5 things you can see right now.", note: "Look slowly. Take your time with each one." },
  { prompt: "Name 4 things you can physically feel.", note: "Your feet on the floor. The air on your skin. Be specific." },
  { prompt: "Name 3 things you can hear.", note: "Ambient sounds. Background. Let them register." },
  { prompt: "Name 2 things you can smell.", note: "If nothing comes, breathe slowly and notice." },
  { prompt: "Name 1 thing you are grateful for right now.", note: "Just one. It can be small. Make it real." },
];

const voiceWarmupSteps = [
  { title: "Lip Trills", instruction: "Relax your lips and blow air through them — making a 'brrr' sound. Do this for 10 seconds. It warms up your lips and face muscles.", duration: 10 },
  { title: "Humming Scale", instruction: "Hum gently from low to high and back down. Feel the vibration in your chest. Do this twice. Slowly.", duration: 15 },
  { title: "Tongue Twisters", instruction: "Say clearly and slowly: 'Red leather, yellow leather.' Repeat 5 times. Accuracy over speed.", duration: 20 },
  { title: "Volume Ramp", instruction: "Say 'Good morning, ladies and gentlemen' at a whisper. Then again at normal volume. Then at cabin-projection volume.", duration: 20 },
  { title: "Slow Breathing", instruction: "Inhale through your nose for 4 counts. Hold for 2. Exhale slowly through your mouth for 6. Repeat twice. This is your reset before you deliver.", duration: 15 },
];

const preInterviewSteps = [
  { title: "Posture Reset", text: "Stand up. Drop your shoulders. Chin level. Feet hip-width apart. Take two slow breaths. This is your body's default professional position. Own it." },
  { title: "Know What You've Done", text: "You have prepared. You know the procedures. You know your answers. You are not winging this — you have put in the work. What you feel right now is not unreadiness. It is adrenaline." },
  { title: "Your Core Message", text: "You want to be here because you believe in safety, you care about people, and you are serious about this career. Keep returning to that. Everything else flows from it." },
  { title: "The One Breath Rule", text: "Before every answer in that room: take one breath. Silently. It slows your pace, it shows composure, and it gives you a moment to structure your thought. Use it every time." },
  { title: "They Want You to Succeed", text: "The panel is not trying to catch you out. They want to fill positions with great candidates. You being in that room is already a yes. Do the job of confirming it." },
  { title: "Final Check", text: "How do you feel right now? Take note of it. This is exactly the level of pressure that cabin crew work contains. You are already managing it. That is evidence you can do this job." },
];

export default function Calm() {
  const [mode, setMode] = useState<Mode>("hub");
  const [breathPhase, setBreathPhase] = useState<"idle" | "inhale" | "hold" | "exhale" | "rest">("idle");
  const [breathCount, setBreathCount] = useState(0);
  const [breathText, setBreathText] = useState("Tap to begin");
  const [groundingStep, setGroundingStep] = useState(0);
  const [warmupStep, setWarmupStep] = useState(0);
  const [warmupTimer, setWarmupTimer] = useState(0);
  const [warmupRunning, setWarmupRunning] = useState(false);
  const [preInterviewStep, setPreInterviewStep] = useState(0);
  const [reminderIdx, setReminderIdx] = useState(0);
  const breathIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warmupIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Box breathing cycle
  function startBoxBreathing() {
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    let cycle: ("inhale" | "hold" | "exhale" | "rest")[] = [];
    let idx = 0;
    let secondsIn = 0;
    const pattern: [string, number, "inhale" | "hold" | "exhale" | "rest"][] = [
      ["Breathe in…", 4, "inhale"], ["Hold…", 4, "hold"], ["Breathe out…", 4, "exhale"], ["Rest…", 4, "rest"],
    ];
    let pIdx = 0;
    let pSec = 0;
    setBreathPhase("inhale");
    setBreathText("Breathe in…");
    setBreathCount(0);
    breathIntervalRef.current = setInterval(() => {
      pSec++;
      if (pSec >= pattern[pIdx][1]) {
        pSec = 0;
        pIdx = (pIdx + 1) % 4;
        if (pIdx === 0) setBreathCount((c) => c + 1);
        setBreathPhase(pattern[pIdx][2]);
        setBreathText(pattern[pIdx][0]);
      }
    }, 1000);
  }

  function stopBreathing() {
    if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    setBreathPhase("idle");
    setBreathText("Tap to begin");
  }

  // Warmup timer
  useEffect(() => {
    if (warmupIntervalRef.current) clearInterval(warmupIntervalRef.current);
    if (warmupRunning && warmupTimer > 0) {
      warmupIntervalRef.current = setInterval(() => {
        setWarmupTimer((v) => {
          if (v <= 1) {
            clearInterval(warmupIntervalRef.current!);
            setWarmupRunning(false);
            return 0;
          }
          return v - 1;
        });
      }, 1000);
    }
    return () => { if (warmupIntervalRef.current) clearInterval(warmupIntervalRef.current); };
  }, [warmupRunning]);

  function startWarmupStep(idx: number) {
    setWarmupStep(idx);
    setWarmupTimer(voiceWarmupSteps[idx].duration);
    setWarmupRunning(true);
  }

  // Rotate confidence reminders
  useEffect(() => {
    const id = setInterval(() => setReminderIdx((i) => (i + 1) % confidenceReminders.length), 8000);
    return () => clearInterval(id);
  }, []);

  // HUB
  if (mode === "hub") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 relative overflow-hidden rounded-b-3xl"
          style={{ background: "linear-gradient(160deg, #6FA7A1 0%, #17324D 100%)" }}>
          <h1 className="text-2xl font-bold text-white mb-1">Calm to Command</h1>
          <p className="text-white/70 text-sm">Regulate. Reset. Return to your best.</p>
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-3">
            <p className="text-xs italic text-white/80 transition-all duration-500">"{confidenceReminders[reminderIdx]}"</p>
          </div>
        </div>

        <div className="px-5 mt-5 space-y-3">
          {[
            {
              key: "breathing" as Mode,
              icon: Wind,
              color: "bg-[#6FA7A1]/15",
              iconColor: "text-[#6FA7A1]",
              title: "Box Breathing",
              subtitle: "4 counts in · 4 hold · 4 out · 4 rest",
              desc: "Slow your nervous system in under 2 minutes.",
            },
            {
              key: "grounding" as Mode,
              icon: Heart,
              color: "bg-secondary/20",
              iconColor: "text-secondary-foreground",
              title: "Grounding Exercise",
              subtitle: "5-4-3-2-1 sensory anchor",
              desc: "Return to the present moment when anxiety spikes.",
            },
            {
              key: "voice-warmup" as Mode,
              icon: Mic,
              color: "bg-accent/15",
              iconColor: "text-accent",
              title: "Voice Warmup",
              subtitle: "5 exercises · 5 minutes",
              desc: "Prepare your voice before drills, practice, or an interview.",
            },
            {
              key: "pre-interview" as Mode,
              icon: Star,
              color: "bg-[#D7B267]/15",
              iconColor: "text-[#D7B267]",
              title: "Pre-Interview Reset",
              subtitle: "Mental preparation · 6 steps",
              desc: "Use this 10 minutes before an interview to centre yourself.",
            },
            {
              key: "pre-training" as Mode,
              icon: Zap,
              color: "bg-primary/8",
              iconColor: "text-primary",
              title: "Pre-Training Boost",
              subtitle: "Quick motivation · Posture · Focus",
              desc: "Get your mindset right before a study session.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => { setMode(item.key); if (item.key === "breathing") { setBreathPhase("idle"); setBreathText("Tap to begin"); setBreathCount(0); } }}
                className="w-full text-left bg-card border border-card-border rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-[11px] text-accent font-bold uppercase tracking-wider mt-0.5">{item.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // BOX BREATHING
  if (mode === "breathing") {
    const isActive = breathPhase !== "idle";
    const ringColor = breathPhase === "inhale" ? "#6FA7A1" : breathPhase === "hold" ? "#D7B267" : breathPhase === "exhale" ? "#17324D" : "#4F8A6D";
    const scale = breathPhase === "inhale" ? "scale-125" : breathPhase === "exhale" ? "scale-90" : "scale-100";

    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 rounded-b-3xl" style={{ background: "linear-gradient(160deg, #6FA7A1 0%, #17324D 100%)" }}>
          <button onClick={() => { stopBreathing(); setMode("hub"); }} className="flex items-center gap-1.5 text-white/70 text-sm mb-4">
            <span>←</span> Back
          </button>
          <h1 className="text-2xl font-bold text-white mb-1">Box Breathing</h1>
          <p className="text-white/70 text-sm">Equal counts of in · hold · out · rest. Slows the nervous system.</p>
        </div>

        <div className="px-5 mt-8 flex flex-col items-center">
          <div
            onClick={() => { if (!isActive) startBoxBreathing(); else stopBreathing(); }}
            className={`relative w-44 h-44 cursor-pointer flex items-center justify-center mb-8`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out ${scale}`}
              style={{ backgroundColor: `${ringColor}20` }} />
            <div className={`absolute inset-3 rounded-full transition-all duration-[4000ms] ease-in-out ${scale}`}
              style={{ backgroundColor: `${ringColor}30` }} />
            <div className="absolute inset-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${ringColor}40` }}>
              <Wind className="w-8 h-8 text-foreground/70" />
            </div>
          </div>

          <p className="text-xl font-bold text-foreground mb-1">{breathText}</p>
          {isActive && <p className="text-sm text-muted-foreground">{breathCount} cycles complete</p>}
          {!isActive && <p className="text-sm text-muted-foreground">Tap the circle to begin</p>}

          <div className="mt-8 grid grid-cols-4 gap-2 w-full max-w-xs">
            {[["In", "4s", "#6FA7A1"], ["Hold", "4s", "#D7B267"], ["Out", "4s", "#17324D"], ["Rest", "4s", "#4F8A6D"]].map(([label, time, color]) => (
              <div key={label} className="text-center p-2 rounded-xl" style={{ backgroundColor: color + "15" }}>
                <p className="text-[10px] font-bold uppercase" style={{ color }}>{label}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{time}</p>
              </div>
            ))}
          </div>

          {isActive && (
            <button onClick={stopBreathing} className="mt-8 px-8 py-3 bg-card border border-card-border rounded-xl text-sm font-bold text-foreground">
              Stop
            </button>
          )}
        </div>
      </div>
    );
  }

  // GROUNDING
  if (mode === "grounding") {
    const step = groundingSteps[groundingStep];
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 rounded-b-3xl" style={{ background: "linear-gradient(160deg, #6FA7A1 0%, #17324D 100%)" }}>
          <button onClick={() => { setGroundingStep(0); setMode("hub"); }} className="flex items-center gap-1.5 text-white/70 text-sm mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-white mb-1">Grounding Exercise</h1>
          <p className="text-white/70 text-sm">5-4-3-2-1 sensory anchor. Return to this moment.</p>
        </div>
        <div className="px-5 mt-8 space-y-5">
          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {groundingSteps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= groundingStep ? "bg-[#6FA7A1]" : "bg-muted"}`} />
            ))}
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#6FA7A1]/15 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-[#6FA7A1]">{5 - groundingStep}</span>
            </div>
            <p className="text-lg font-bold text-foreground mb-2">{step.prompt}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.note}</p>
          </div>

          <div className="flex gap-3">
            {groundingStep < groundingSteps.length - 1 ? (
              <button onClick={() => setGroundingStep((n) => n + 1)} className="flex-1 bg-[#6FA7A1] text-white rounded-xl py-3.5 font-bold text-sm">
                Next →
              </button>
            ) : (
              <button onClick={() => { setGroundingStep(0); setMode("hub"); }} className="flex-1 bg-[#6FA7A1] text-white rounded-xl py-3.5 font-bold text-sm">
                Complete ✓
              </button>
            )}
            {groundingStep > 0 && (
              <button onClick={() => setGroundingStep((n) => n - 1)} className="bg-card border border-card-border text-foreground rounded-xl px-4 font-bold text-sm">
                ←
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // VOICE WARMUP
  if (mode === "voice-warmup") {
    const step = voiceWarmupSteps[warmupStep];
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 rounded-b-3xl" style={{ background: "linear-gradient(160deg, #D7B267 0%, #17324D 100%)" }}>
          <button onClick={() => { setWarmupStep(0); setWarmupRunning(false); setMode("hub"); }} className="flex items-center gap-1.5 text-white/70 text-sm mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-white mb-1">Voice Warmup</h1>
          <p className="text-white/70 text-sm">Prepare your voice before drills, practice, or an interview.</p>
        </div>
        <div className="px-5 mt-5 space-y-4">
          <div className="flex justify-center gap-1.5">
            {voiceWarmupSteps.map((_, i) => (
              <div key={i} className={`h-1 rounded-full flex-1 transition-colors ${i < warmupStep ? "bg-[#D7B267]" : i === warmupStep ? "bg-[#D7B267]" : "bg-muted"}`} />
            ))}
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2">Step {warmupStep + 1} of {voiceWarmupSteps.length}</p>
            <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
            <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center py-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#D7B267]/30 flex items-center justify-center mb-3">
              <span className="text-xl font-mono font-bold text-foreground">
                {warmupRunning ? `0:${warmupTimer.toString().padStart(2, "0")}` : `0:${step.duration.toString().padStart(2, "0")}`}
              </span>
            </div>
            {warmupRunning ? (
              <button onClick={() => { if (warmupIntervalRef.current) clearInterval(warmupIntervalRef.current); setWarmupRunning(false); setWarmupTimer(step.duration); }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground font-bold">
                <Pause className="w-4 h-4" /> Stop
              </button>
            ) : (
              <button onClick={() => startWarmupStep(warmupStep)} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-bold text-sm">
                <Play className="w-4 h-4" /> Start Timer
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {warmupStep < voiceWarmupSteps.length - 1 ? (
              <button onClick={() => { setWarmupRunning(false); if (warmupIntervalRef.current) clearInterval(warmupIntervalRef.current); startWarmupStep(warmupStep + 1); }}
                className="flex-1 bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm">
                Next Exercise →
              </button>
            ) : (
              <button onClick={() => { setWarmupStep(0); setWarmupRunning(false); setMode("hub"); }}
                className="flex-1 bg-[#4F8A6D] text-white rounded-xl py-3.5 font-bold text-sm">
                Warmup Complete ✓
              </button>
            )}
          </div>

          <Link href="/speak">
            <button className="w-full bg-card border border-card-border text-foreground rounded-xl py-3 font-bold text-sm text-center">
              Go to Voice Coach →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // PRE-INTERVIEW RESET
  if (mode === "pre-interview") {
    const step = preInterviewSteps[preInterviewStep];
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 rounded-b-3xl" style={{ background: "linear-gradient(160deg, #D7B267 0%, #17324D 100%)" }}>
          <button onClick={() => { setPreInterviewStep(0); setMode("hub"); }} className="flex items-center gap-1.5 text-white/70 text-sm mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-white mb-1">Pre-Interview Reset</h1>
          <p className="text-white/70 text-sm">Use this 10 minutes before. Read slowly. Mean it.</p>
        </div>
        <div className="px-5 mt-5 space-y-4">
          <div className="flex gap-1.5">
            {preInterviewSteps.map((_, i) => (
              <div key={i} className={`h-1 rounded-full flex-1 transition-colors ${i <= preInterviewStep ? "bg-[#D7B267]" : "bg-muted"}`} />
            ))}
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm min-h-[200px] flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-3">{preInterviewStep + 1} of {preInterviewSteps.length}</p>
              <h3 className="text-lg font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-sm text-foreground leading-relaxed">{step.text}</p>
            </div>
          </div>

          {preInterviewStep < preInterviewSteps.length - 1 ? (
            <button onClick={() => setPreInterviewStep((n) => n + 1)} className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm">
              Continue →
            </button>
          ) : (
            <button onClick={() => { setPreInterviewStep(0); setMode("hub"); }} className="w-full bg-[#4F8A6D] text-white rounded-xl py-3.5 font-bold text-sm">
              You are ready. ✓
            </button>
          )}
        </div>
      </div>
    );
  }

  // PRE-TRAINING BOOST
  if (mode === "pre-training") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="pt-12 pb-6 px-5 rounded-b-3xl" style={{ background: "linear-gradient(160deg, #6FA7A1 0%, #17324D 100%)" }}>
          <button onClick={() => setMode("hub")} className="flex items-center gap-1.5 text-white/70 text-sm mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-white mb-1">Pre-Training Boost</h1>
          <p className="text-white/70 text-sm">Get your mindset right before a study session.</p>
        </div>
        <div className="px-5 mt-5 space-y-4">
          {[
            { title: "Posture", body: "Sit or stand up straight. Feet flat. Shoulders back and down. Chin level. This posture sends a signal to your brain: I am ready to learn." },
            { title: "Clear the Deck", body: "Close anything you're not using. Put your phone away or turn it to silent. You're giving yourself 20–30 minutes. That is enough to make meaningful progress." },
            { title: "Set One Goal", body: "Not a list. One specific thing you want to understand or remember by the time this session ends. Write it down or say it out loud." },
            { title: "Remember Why", body: "You are preparing for a career where your knowledge directly affects passenger safety. The 30 minutes you invest today has a real-world consequence. That is not pressure — it is purpose." },
            { title: "You Don't Have to Feel Ready to Begin", body: "Motivation follows action, not the other way around. Start before you feel like it. The momentum will come." },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6FA7A1] mb-1">{item.title}</p>
              <p className="text-sm text-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <Link href="/academy">
              <button className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm">Start Academy →</button>
            </Link>
            <Link href="/practice">
              <button className="w-full bg-card border border-card-border text-foreground rounded-xl py-3.5 font-bold text-sm">Open Practice →</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
