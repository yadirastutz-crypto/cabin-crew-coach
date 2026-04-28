import { useUserProgress } from "@/context/UserProgressContext";
import { PhaseCard } from "@/components/PhaseCard";
import { phases } from "@/data/phases";
import { trainingPath } from "@/data/trainingPath";
import { Link } from "wouter";
import {
  ChevronRight, ArrowRight, Flame, BookOpen, Shield, Zap, Mic,
  Volume2, Heart, Globe, Star, Gamepad2, Trophy, CheckCircle2, Map, Info, Award, Layers
} from "lucide-react";

const dailyQuotes = [
  "In aviation, how you say something matters as much as what you say.",
  "The cabin crew member who hesitates costs precious seconds.",
  "Calm is a professional skill. Train it.",
  "Every procedure exists because someone paid for it with their safety.",
  "You don't rise to the occasion — you fall to your level of training.",
  "Confidence is trained, not given.",
  "Preparation is the only antidote to pressure.",
];

const goalQuotes: Record<string, string> = {
  interview: "Your interview is won in preparation, not in the room.",
  confidence: "Confidence is trained, not given. Start today.",
  safety: "Know every check. Trust your training.",
  bilingual: "Language is a competitive edge. Use it.",
};

function getTodayQuote(goal?: string | null) {
  if (goal && goalQuotes[goal]) return goalQuotes[goal];
  const idx = new Date().getDay();
  return dailyQuotes[idx % dailyQuotes.length];
}

// Personalised quick launch cards per goal
interface QuickCard {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  sub: string;
  priority?: boolean;
}

function getQuickCards(goal?: string | null): QuickCard[] {
  const base: QuickCard[] = [
    {
      href: "/practice/present-secure",
      icon: <Shield style={{ width: 18, height: 18 }} />,
      iconBg: "bg-[#4F8A6D]/15",
      title: "Present & Secure",
      sub: "Equipment checks · 9 items",
    },
    {
      href: "/practice/scenarios",
      icon: <Zap style={{ width: 18, height: 18 }} />,
      iconBg: "bg-destructive/10",
      title: "Scenario Mode",
      sub: "Pressure decisions · 12 scenarios",
    },
    {
      href: "/announcements",
      icon: <Volume2 style={{ width: 18, height: 18 }} />,
      iconBg: "bg-accent/15",
      title: "Announcement Coach",
      sub: "Scripts · Delivery · Feedback",
    },
    {
      href: "/interview-vault",
      icon: <Star style={{ width: 18, height: 18 }} />,
      iconBg: "bg-secondary/25",
      title: "Interview Vault",
      sub: "24 questions · Model answers",
    },
  ];

  if (!goal) return base;

  // Reorder: put goal-relevant cards first
  const priorityMap: Record<string, string[]> = {
    interview: ["/speak", "/interview-vault", "/announcements", "/practice/scenarios"],
    confidence: ["/calm", "/speak", "/practice/scenarios", "/announcements"],
    safety: ["/practice/present-secure", "/practice/scenarios", "/announcements", "/interview-vault"],
    bilingual: ["/announcements", "/speak", "/practice/present-secure", "/interview-vault"],
  };

  const order = priorityMap[goal] ?? [];
  const sorted = [...base].sort((a, b) => {
    const ai = order.indexOf(a.href);
    const bi = order.indexOf(b.href);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return sorted.slice(0, 4);
}

function goalLabel(goal: string | null | undefined): string {
  const map: Record<string, string> = {
    interview: "Ace My Interview",
    confidence: "Build Confidence",
    safety: "Master Safety",
    bilingual: "Bilingual Edge",
  };
  return goal ? (map[goal] ?? "") : "";
}

function goalColor(goal: string | null | undefined): string {
  const map: Record<string, string> = {
    interview: "#D7B267",
    confidence: "#6FA7A1",
    safety: "#4F8A6D",
    bilingual: "#6FA7A1",
  };
  return goal ? (map[goal] ?? "#D7B267") : "#D7B267";
}

// Icon helper used in quick card
function QuickCardIcon({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${bg}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const { progress } = useUserProgress();
  const goal = progress.primaryGoal;
  const firstName = progress.userName ? progress.userName.split(" ")[0] : null;

  const currentPhaseIndex = phases.findIndex(p => {
    const isPhaseComplete = p.lessons.every(l => progress.completedLessons.includes(l.id));
    return !isPhaseComplete;
  });

  const currentPhase = currentPhaseIndex >= 0 ? phases[currentPhaseIndex] : phases[phases.length - 1];
  const phaseProgress = currentPhase
    ? (currentPhase.lessons.filter(l => progress.completedLessons.includes(l.id)).length / currentPhase.lessons.length) * 100
    : 100;

  const vcStats = progress.voiceCoachStats;
  const totalPractice = progress.quizScores.totalTaken + (vcStats?.totalAttempts ?? 0);
  const quickCards = getQuickCards(goal);
  const accentColor = goalColor(goal);

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Hero header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-7 px-5 rounded-b-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 50% 0%, white 0%, transparent 70%)" }} />

        <div className="relative z-10">
          {goal && (
            <div className="flex items-center gap-1.5 mb-2">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
              >
                {goalLabel(goal)}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold mb-0.5">
            {firstName ? `Welcome back, ${firstName}.` : "Welcome back, future cabin crew."}
          </h1>
          <p className="text-primary-foreground/70 text-sm">Train like class starts tomorrow.</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center border border-white/10">
            <Flame className="w-5 h-5 mb-1" style={{ color: accentColor }} />
            <span className="text-xl font-bold">{progress.streakDays}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-70 mt-0.5">Streak</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center border border-white/10">
            <BookOpen className="w-5 h-5 text-secondary mb-1" />
            <span className="text-xl font-bold">{progress.completedLessons.length}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-70 mt-0.5">Lessons</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center border border-white/10">
            <Zap className="w-5 h-5 mb-1" style={{ color: accentColor }} />
            <span className="text-xl font-bold">{totalPractice}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-70 mt-0.5">Practice</span>
          </div>
        </div>
      </div>

      {/* Daily quote */}
      <div className="px-5 mt-5">
        <div className="bg-card border border-card-border rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
            Today's Focus
          </p>
          <p className="text-sm font-medium text-foreground italic leading-relaxed">"{getTodayQuote(goal)}"</p>
        </div>
      </div>

      <div className="px-5 space-y-5 mt-5">
        {/* 5 Main Action Buttons */}
        <section>
          <div className="grid grid-cols-3 gap-2.5 mb-2.5">
            <Link href="/start-here">
              <div className="bg-primary text-primary-foreground flex flex-col items-center justify-center rounded-2xl p-3 gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm h-[76px]">
                <Map className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-black leading-tight">Start Training</span>
              </div>
            </Link>
            <Link href="/speak">
              <div className="bg-card border border-card-border flex flex-col items-center justify-center rounded-2xl p-3 gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm h-[76px]">
                <Volume2 className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-black text-foreground leading-tight">Voice Practice</span>
              </div>
            </Link>
            <Link href="/games">
              <div className="bg-card border border-card-border flex flex-col items-center justify-center rounded-2xl p-3 gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm h-[76px]">
                <Gamepad2 className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-black text-foreground leading-tight">Training Games</span>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Link href="/interview-vault">
              <div className="bg-card border border-card-border flex flex-col items-center justify-center rounded-2xl p-3 gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm h-[68px]">
                <Mic className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-black text-foreground leading-tight">Practice Interview</span>
              </div>
            </Link>
            <Link href="/quiz/final-exam">
              <div
                className="flex flex-col items-center justify-center rounded-2xl p-3 gap-1.5 text-center active:scale-[0.97] transition-transform shadow-sm h-[68px]"
                style={{ background: "linear-gradient(135deg, #D7B267 0%, #c9a14a 100%)" }}
              >
                <Award className="w-5 h-5 text-white" />
                <span className="text-[10px] font-black text-white leading-tight">Final Exam Mode</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 7-Day Training Path Preview */}
        <section>
          <TrainingPathPreview completedLessons={progress.completedLessons} />
        </section>

        {/* Personalised priority section */}
        {goal && (
          <section>
            <PersonalisedSection goal={goal} />
          </section>
        )}

        {/* Final Exam Mode CTA */}
        <section>
          <Link href="/quiz/final-exam">
            <div
              className="p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #D7B267 0%, #c9a14a 100%)" }}
            >
              <div className="absolute -right-2 -top-3 opacity-15 pointer-events-none">
                <Award className="w-20 h-20 text-white" />
              </div>
              <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">50 Questions · 90 Minutes</div>
                <h3 className="font-black text-base text-white">Final Exam Mode</h3>
                <p className="text-xs text-white/70 mt-0.5">Test everything you've learned in one timed session.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* Build It Like Training */}
        <section>
          <Link href="/build-it">
            <div
              className="p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0f2033 0%, #17324D 100%)", border: "1px solid rgba(215,178,103,0.18)" }}
            >
              <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
                <Layers className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-accent mb-1">
                  <Layers className="w-3 h-3" /> 6 Training Blocks
                </div>
                <h3 className="font-black text-base text-white">Build It Like Training</h3>
                <p className="text-xs text-white/55 mt-0.5">Safety · Commands · Equipment · Scenarios · More</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* Current training */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-base font-bold text-foreground">Continue Training</h2>
            <Link href="/academy">
              <span className="text-xs font-bold text-accent flex items-center">
                All Phases <ChevronRight className="w-3 h-3 ml-0.5" />
              </span>
            </Link>
          </div>
          <PhaseCard
            phase={currentPhase}
            progress={phaseProgress}
          />
        </section>

        {/* Quick Launch Grid */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">
            {goal ? "Your Training Tools" : "Quick Launch"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickCards.map((card) => (
              <Link href={card.href} key={card.href}>
                <div className="bg-card border border-card-border p-4 rounded-2xl shadow-sm active:scale-[0.98] transition-transform h-full">
                  <QuickCardIcon bg={card.iconBg}>
                    <span className="text-foreground">{card.icon}</span>
                  </QuickCardIcon>
                  <h3 className="font-bold text-foreground text-sm">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Voice Coach highlight */}
        <section>
          <Link href="/speak">
            <div className="bg-primary text-primary-foreground p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full pointer-events-none" style={{ backgroundColor: `${accentColor}30` }} />
              <div className="absolute right-6 bottom-2 opacity-20 pointer-events-none">
                <Mic className="w-16 h-16" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: accentColor }}>
                  <Mic className="w-3 h-3" /> Command Presence Training
                </div>
                <h3 className="font-bold text-base">Train Your Voice & Presence</h3>
                <p className="text-xs text-primary-foreground/70 mt-0.5">
                  {goal === "interview"
                    ? "Interview answers · Delivery · Pressure mode"
                    : goal === "confidence"
                    ? "30-sec warmup · Delivery coaching · Scoring"
                    : "Commands · Announcements · Interview sim"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </section>

        {/* Calm to Command */}
        <section>
          <Link href="/calm">
            <div
              className="rounded-2xl p-5 shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #6FA7A1 0%, #17324D 100%)" }}
            >
              <div className="absolute -right-3 -bottom-3 opacity-15 pointer-events-none">
                <Heart className="w-20 h-20 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/70 mb-1">
                  <Heart className="w-3 h-3 text-white" /> Calm to Command
                </div>
                <h3 className="font-bold text-base text-white">Regulate. Reset. Return.</h3>
                <p className="text-xs text-white/60 mt-0.5">Box breathing · Grounding · Pre-interview reset</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* Written in Blood */}
        <section>
          <Link href="/written-in-blood">
            <div
              className="p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0f1f2e 0%, #17324D 100%)" }}
            >
              <div className="absolute -right-3 -bottom-3 opacity-[0.07] pointer-events-none">
                <BookOpen className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-accent mb-1">
                  <BookOpen className="w-3 h-3" /> Case Studies
                </div>
                <h3 className="font-bold text-base text-white">Written in Blood</h3>
                <p className="text-xs text-white/60 mt-0.5">8 case studies · Why procedures exist</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* About This App */}
        <section>
          <Link href="/about">
            <div
              className="p-5 rounded-2xl shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a2e42 0%, #17324D 100%)", border: "1px solid rgba(215,178,103,0.18)" }}
            >
              <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
                <Info className="w-20 h-20 text-white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-accent mb-1">
                  <Info className="w-3 h-3" /> Airlines · Study Guide · Our Story
                </div>
                <h3 className="font-bold text-base text-white">Welcome to Cabin Crew Coach</h3>
                <p className="text-xs text-white/55 mt-0.5">Why this app exists · Top airlines · Visual learning guide</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center relative z-10 ml-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* What trainees miss */}
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">What Trainees Often Miss</h2>
          <div className="bg-card border border-card-border p-5 rounded-2xl shadow-sm">
            <p className="text-sm text-foreground font-medium leading-relaxed">
              "Never inflate your life vest inside the aircraft. If water rushes in, you will float to the ceiling and be unable to swim down to the exit. Don inside. Inflate outside. Always."
            </p>
            <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-bold uppercase">Emergency Procedures</span>
              <Link href="/reference">
                <span className="text-xs font-bold text-primary flex items-center">Reference <ChevronRight className="w-3 h-3 ml-0.5" /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed px-2 pb-2">
            Cabin Crew Coach is an independent educational preparation tool for aspiring flight attendants. It is not affiliated with any airline and does not guarantee employment or training graduation.
          </p>
        </section>
      </div>
    </div>
  );
}

// ── Training Path Preview ──────────────────────────────────────────────────

function TrainingPathPreview({ completedLessons }: { completedLessons: string[] }) {
  const completedDays = trainingPath.filter((d) =>
    completedLessons.includes(d.completionId)
  ).length;
  const pct = Math.round((completedDays / trainingPath.length) * 100);
  const currentDay = trainingPath.find((d) => !completedLessons.includes(d.completionId));
  const allDone = completedDays === trainingPath.length;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ background: "linear-gradient(135deg, #17324D 0%, #0f1f2e 100%)", border: "1px solid rgba(215,178,103,0.15)" }}
    >
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-wider text-accent">7-Day Training Path</span>
          </div>
          <span className="text-[10px] font-bold text-white/50">{completedDays}/7 days</span>
        </div>

        {allDone ? (
          <p className="text-base font-black text-white mb-3">Path Complete! 🏆</p>
        ) : (
          <p className="text-base font-black text-white mb-1">
            {currentDay ? `Day ${currentDay.day}: ${currentDay.title}` : "Start Your Journey"}
          </p>
        )}
        {!allDone && currentDay && (
          <p className="text-xs text-white/50 mb-3">{currentDay.theme}</p>
        )}

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: "#D7B267" }}
          />
        </div>

        {/* Day dots */}
        <div className="flex gap-1.5 mb-4">
          {trainingPath.map((d) => {
            const done = completedLessons.includes(d.completionId);
            const active = d === currentDay;
            return (
              <div
                key={d.day}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: done ? "#D7B267" : active ? "rgba(215,178,103,0.4)" : "rgba(255,255,255,0.1)",
                }}
              />
            );
          })}
        </div>

        <Link href="/start-here">
          <div className="flex items-center justify-between bg-white/8 rounded-xl px-4 py-3 border border-white/10 active:bg-white/15 transition-colors">
            <span className="text-sm font-bold text-white">
              {allDone ? "Review Training Path" : completedDays === 0 ? "Begin Day 1 →" : `Continue Day ${(currentDay?.day ?? 1)} →`}
            </span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </div>
        </Link>
      </div>

      {/* Day row preview */}
      {!allDone && (
        <div className="flex border-t border-white/10">
          {trainingPath.map((d) => {
            const done = completedLessons.includes(d.completionId);
            const active = d === currentDay;
            return (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center py-3 gap-0.5"
                style={active ? { backgroundColor: "rgba(255,255,255,0.05)" } : {}}
              >
                {done ? (
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#D7B267" }} />
                ) : (
                  <span className="text-xs font-black" style={{ color: active ? "#D7B267" : "rgba(255,255,255,0.25)" }}>{d.day}</span>
                )}
                <span className="text-[8px] font-bold" style={{ color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>{d.icon}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Personalised Section ───────────────────────────────────────────────────

function PersonalisedSection({ goal }: { goal: string }) {
  if (goal === "interview") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2e42 0%, #17324D 100%)", border: "1px solid rgba(215,178,103,0.2)" }}>
        <div className="p-4 border-b border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-0.5">Your Priority</p>
          <h3 className="text-base font-bold text-white">Interview Readiness Path</h3>
          <p className="text-xs text-white/55 mt-1">Focus here first. These three features will have the highest impact on your result.</p>
        </div>
        <div className="divide-y divide-white/10">
          <PriorityItem icon={<Star className="w-4 h-4" />} color="#D7B267" href="/interview-vault" label="Interview Vault" sub="Practice 24 real questions with model answers" />
          <PriorityItem icon={<Mic className="w-4 h-4" />} color="#D7B267" href="/speak" label="Voice Coach" sub="Train your delivery, pace, and authority" />
          <PriorityItem icon={<Volume2 className="w-4 h-4" />} color="#D7B267" href="/announcements" label="Announcement Coach" sub="Sound professional and calm under pressure" />
        </div>
      </div>
    );
  }

  if (goal === "confidence") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a3038 0%, #17324D 100%)", border: "1px solid rgba(111,167,161,0.25)" }}>
        <div className="p-4 border-b border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#6FA7A1" }}>Your Priority</p>
          <h3 className="text-base font-bold text-white">Confidence-First Path</h3>
          <p className="text-xs text-white/55 mt-1">Calm under pressure, strong in voice. Start here.</p>
        </div>
        <div className="divide-y divide-white/10">
          <PriorityItem icon={<Heart className="w-4 h-4" />} color="#6FA7A1" href="/calm" label="Calm to Command" sub="Box breathing, grounding, pre-interview reset" />
          <PriorityItem icon={<Mic className="w-4 h-4" />} color="#6FA7A1" href="/speak" label="Voice Coach" sub="From Nervous to Command warmup + coaching" />
          <PriorityItem icon={<Zap className="w-4 h-4" />} color="#6FA7A1" href="/practice/scenarios" label="Scenario Mode" sub="Build composure through pressure practice" />
        </div>
      </div>
    );
  }

  if (goal === "safety") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2e26 0%, #17324D 100%)", border: "1px solid rgba(79,138,109,0.25)" }}>
        <div className="p-4 border-b border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#4F8A6D" }}>Your Priority</p>
          <h3 className="text-base font-bold text-white">Safety Mastery Path</h3>
          <p className="text-xs text-white/55 mt-1">Know every check, every command, every response — cold.</p>
        </div>
        <div className="divide-y divide-white/10">
          <PriorityItem icon={<Shield className="w-4 h-4" />} color="#4F8A6D" href="/practice/present-secure" label="Present & Secure" sub="9 equipment items, preflight drill training" />
          <PriorityItem icon={<Zap className="w-4 h-4" />} color="#4F8A6D" href="/practice/scenarios" label="Scenario Pressure Mode" sub="12 real scenarios, 3 difficulty levels" />
          <PriorityItem icon={<Volume2 className="w-4 h-4" />} color="#4F8A6D" href="/announcements" label="Emergency Commands" sub="Practice brace, evacuation, and compliance" />
        </div>
      </div>
    );
  }

  if (goal === "bilingual") {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2a38 0%, #17324D 100%)", border: "1px solid rgba(111,167,161,0.2)" }}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-[#6FA7A1]" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6FA7A1]">Your Priority</p>
          </div>
          <h3 className="text-base font-bold text-white">Bilingual Training Path</h3>
          <p className="text-xs text-white/55 mt-1">Bilingual modules are coming — you'll be first to unlock them.</p>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#6FA7A1]/20 flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-[#6FA7A1]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Bilingual Announcements</p>
              <p className="text-[11px] text-white/45">Coming soon — English + Spanish + French + Arabic</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto flex-shrink-0" style={{ backgroundColor: "rgba(215,178,103,0.15)", color: "#D7B267" }}>Soon</span>
          </div>
          <p className="text-xs text-white/40 leading-relaxed">In the meantime, practise all your announcements in the Announcement Coach to master the content in English first.</p>
        </div>
        <div className="divide-y divide-white/10 border-t border-white/10">
          <PriorityItem icon={<Volume2 className="w-4 h-4" />} color="#6FA7A1" href="/announcements" label="Announcement Coach" sub="Master scripts now, bilingual versions coming" />
          <PriorityItem icon={<Mic className="w-4 h-4" />} color="#6FA7A1" href="/speak" label="Voice Coach" sub="Delivery, clarity, and professionalism" />
        </div>
      </div>
    );
  }

  return null;
}

function PriorityItem({ icon, color, href, label, sub }: { icon: React.ReactNode; color: string; href: string; label: string; sub: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 px-4 py-3 active:bg-white/5 transition-colors">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18`, color }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white">{label}</p>
          <p className="text-[11px] text-white/45 mt-0.5">{sub}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-white/25 flex-shrink-0" />
      </div>
    </Link>
  );
}
