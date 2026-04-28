import { useState, useRef } from "react";
import { useUserProgress, PrimaryGoal } from "@/context/UserProgressContext";
import { ChevronRight, CheckCircle2, Mic, Shield, Heart, Globe } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface GoalOption {
  id: PrimaryGoal;
  label: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

interface StruggleOption {
  id: string;
  label: string;
  emoji: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const goalOptions: GoalOption[] = [
  {
    id: "interview",
    label: "Ace My Interview",
    sub: "Prepare answers, delivery, and confidence.",
    icon: <Mic className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.12)",
  },
  {
    id: "confidence",
    label: "Build Confidence",
    sub: "Speak with authority and stay calm under pressure.",
    icon: <Heart className="w-5 h-5" />,
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.12)",
  },
  {
    id: "safety",
    label: "Master Safety Procedures",
    sub: "Know every check, command, and response.",
    icon: <Shield className="w-5 h-5" />,
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.12)",
  },
  {
    id: "bilingual",
    label: "Gain a Bilingual Edge",
    sub: "Prepare in multiple languages for a broader reach.",
    icon: <Globe className="w-5 h-5" />,
    color: "#17324D",
    bg: "rgba(23,50,77,0.08)",
  },
];

const struggleOptions: StruggleOption[] = [
  { id: "pressure", label: "Freezing under pressure", emoji: "🧊" },
  { id: "details", label: "Forgetting details", emoji: "📋" },
  { id: "speaking", label: "Speaking with confidence", emoji: "🎤" },
  { id: "nerves", label: "Interview nerves", emoji: "😰" },
  { id: "organized", label: "Staying organized", emoji: "📂" },
  { id: "terminology", label: "Safety terminology", emoji: "✈️" },
];

// Supportive messages based on struggle
const getStruggleMessage = (struggles: string[]): string => {
  if (struggles.includes("nerves") || struggles.includes("pressure")) {
    return "Nerves are just untrained calm. We'll fix that together.";
  }
  if (struggles.includes("speaking") || struggles.includes("terminology")) {
    return "Your voice is a professional tool. We'll train it.";
  }
  if (struggles.includes("details") || struggles.includes("organized")) {
    return "Knowledge sticks when it's practised, not just read.";
  }
  return "Every struggle you named has a training solution. Let's start.";
};

// ── Step indicator ─────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            backgroundColor: i <= current ? "#D7B267" : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Onboarding() {
  const { completeOnboarding } = useUserProgress();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal | null>(null);
  const [selectedStruggles, setSelectedStruggles] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_STRUGGLES = 3;

  function goNext() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 180);
  }

  function toggleStruggle(id: string) {
    setSelectedStruggles((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= MAX_STRUGGLES) return prev;
      return [...prev, id];
    });
  }

  function handleFinish() {
    if (!selectedGoal) return;
    completeOnboarding({
      userName: name.trim() || "Future Crew",
      primaryGoal: selectedGoal,
      struggleAreas: selectedStruggles,
    });
  }

  const canAdvanceStep0 = selectedGoal !== null;
  const canAdvanceStep1 = selectedStruggles.length >= 1;
  const canFinish = name.trim().length >= 1;

  const goal = goalOptions.find((g) => g.id === selectedGoal);

  return (
    <div
      className="min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #17324D 0%, #0f1f2e 100%)" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent text-xs font-black">CC</span>
          </div>
          <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Cabin Crew Coach</span>
        </div>
        <StepDots current={step} total={3} />
      </div>

      {/* Content area with fade animation */}
      <div
        className="flex-1 flex flex-col px-6 pb-8 transition-opacity duration-200"
        style={{ opacity: animating ? 0 : 1 }}
      >

        {/* ── STEP 0: Goal ────────────────────────────────────────────────── */}
        {step === 0 && (
          <>
            <div className="pt-6 pb-7">
              <p className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Step 1 of 3</p>
              <h1 className="text-2xl font-bold text-white leading-snug mb-2">
                Why are you here?
              </h1>
              <p className="text-white/55 text-sm leading-relaxed">
                We'll tailor your training to help you succeed faster.
              </p>
            </div>

            <div className="space-y-3 flex-1">
              {goalOptions.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className="w-full text-left rounded-2xl border transition-all duration-200 p-4 flex items-center gap-4"
                    style={{
                      backgroundColor: isSelected ? g.bg : "rgba(255,255,255,0.04)",
                      borderColor: isSelected ? g.color : "rgba(255,255,255,0.1)",
                      transform: isSelected ? "scale(1.01)" : "scale(1)",
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: g.bg, color: g.color }}
                    >
                      {g.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm leading-snug">{g.label}</p>
                      <p className="text-white/50 text-xs mt-0.5 leading-snug">{g.sub}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: g.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={goNext}
              disabled={!canAdvanceStep0}
              className="mt-6 w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                backgroundColor: canAdvanceStep0 ? "#D7B267" : "rgba(255,255,255,0.08)",
                color: canAdvanceStep0 ? "#17324D" : "rgba(255,255,255,0.3)",
              }}
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ── STEP 1: Struggles ───────────────────────────────────────────── */}
        {step === 1 && (
          <>
            <div className="pt-6 pb-7">
              <p className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Step 2 of 3</p>
              <h1 className="text-2xl font-bold text-white leading-snug mb-2">
                What do you struggle with most?
              </h1>
              <p className="text-white/55 text-sm leading-relaxed">
                Pick up to {MAX_STRUGGLES}. We'll build your training around these.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {struggleOptions.map((s) => {
                const isSelected = selectedStruggles.includes(s.id);
                const isDisabled = !isSelected && selectedStruggles.length >= MAX_STRUGGLES;
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleStruggle(s.id)}
                    disabled={isDisabled}
                    className="rounded-2xl border transition-all duration-200 p-4 text-left"
                    style={{
                      backgroundColor: isSelected ? "rgba(215,178,103,0.12)" : "rgba(255,255,255,0.04)",
                      borderColor: isSelected ? "#D7B267" : "rgba(255,255,255,0.1)",
                      opacity: isDisabled ? 0.4 : 1,
                    }}
                  >
                    <div className="text-2xl mb-2">{s.emoji}</div>
                    <p className="text-xs font-bold text-white leading-snug">{s.label}</p>
                    {isSelected && (
                      <div className="mt-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D7B267" }}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedStruggles.length > 0 && (
              <div className="mt-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(215,178,103,0.08)", borderLeft: "2px solid #D7B267" }}>
                <p className="text-xs text-accent italic leading-relaxed">
                  "{getStruggleMessage(selectedStruggles)}"
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-4 rounded-2xl font-bold text-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
              >
                Back
              </button>
              <button
                onClick={goNext}
                disabled={!canAdvanceStep1}
                className="flex-1 py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: canAdvanceStep1 ? "#D7B267" : "rgba(255,255,255,0.08)",
                  color: canAdvanceStep1 ? "#17324D" : "rgba(255,255,255,0.3)",
                }}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 2: Name ────────────────────────────────────────────────── */}
        {step === 2 && (
          <>
            <div className="pt-6 pb-7">
              <p className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Step 3 of 3</p>
              <h1 className="text-2xl font-bold text-white leading-snug mb-2">
                What should we call you?
              </h1>
              <p className="text-white/55 text-sm leading-relaxed">
                Your training, your name. We'll personalise your experience.
              </p>
            </div>

            {/* Avatar initial preview */}
            <div className="flex justify-center mb-7">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                style={{
                  backgroundColor: goal ? goal.bg : "rgba(255,255,255,0.07)",
                  borderColor: goal ? goal.color : "rgba(255,255,255,0.15)",
                }}
              >
                {name.trim() ? (
                  <span
                    className="text-3xl font-black"
                    style={{ color: goal ? goal.color : "#D7B267" }}
                  >
                    {name.trim()[0].toUpperCase()}
                  </span>
                ) : (
                  <span className="text-white/20 text-3xl font-black">?</span>
                )}
              </div>
            </div>

            {/* Name input */}
            <div className="mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2 block">Your first name</label>
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && canFinish) handleFinish(); }}
                placeholder="Enter your name"
                maxLength={30}
                className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/25 font-bold text-base outline-none transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: `1.5px solid ${name.trim() ? "#D7B267" : "rgba(255,255,255,0.12)"}`,
                }}
                autoFocus
              />
            </div>

            {/* Summary of choices */}
            {goal && (
              <div
                className="rounded-xl p-4 mb-2"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] uppercase tracking-wider font-bold text-white/40 mb-2">Your Training Plan</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: goal.bg, color: goal.color }}>
                    {goal.icon}
                  </div>
                  <span className="text-xs font-bold text-white">{goal.label}</span>
                </div>
                {selectedStruggles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedStruggles.map((sid) => {
                      const s = struggleOptions.find((o) => o.id === sid);
                      return s ? (
                        <span key={sid} className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(215,178,103,0.12)", color: "#D7B267" }}>
                          {s.emoji} {s.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-4 rounded-2xl font-bold text-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={!canFinish}
                className="flex-1 py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: canFinish ? "#D7B267" : "rgba(255,255,255,0.08)",
                  color: canFinish ? "#17324D" : "rgba(255,255,255,0.3)",
                }}
              >
                Start Training <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
