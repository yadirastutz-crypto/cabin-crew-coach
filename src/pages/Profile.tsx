import { useLocation } from "wouter";
import { useUserProgress } from "@/context/UserProgressContext";
import {
  Award, Flame, Settings, User, Zap, LogOut,
  RefreshCw, Target, CheckCircle, Mic, Shield, Heart, Globe, Star,
  ShieldCheck, AlertTriangle, ChevronRight, MapPin, BookOpen, Trophy
} from "lucide-react";

const GOAL_META: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  interview: {
    label: "Ace My Interview",
    color: "#D7B267",
    bg: "rgba(215,178,103,0.12)",
    icon: <Mic className="w-3.5 h-3.5" />,
  },
  confidence: {
    label: "Build Confidence",
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.12)",
    icon: <Heart className="w-3.5 h-3.5" />,
  },
  safety: {
    label: "Master Safety",
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.12)",
    icon: <Shield className="w-3.5 h-3.5" />,
  },
  bilingual: {
    label: "Bilingual Edge",
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.12)",
    icon: <Globe className="w-3.5 h-3.5" />,
  },
};

const STRUGGLE_LABELS: Record<string, { label: string; emoji: string }> = {
  pressure: { label: "Freezing under pressure", emoji: "🧊" },
  details: { label: "Forgetting details", emoji: "📋" },
  speaking: { label: "Speaking with confidence", emoji: "🎤" },
  nerves: { label: "Interview nerves", emoji: "😰" },
  organized: { label: "Staying organized", emoji: "📂" },
  terminology: { label: "Safety terminology", emoji: "✈️" },
};

export default function Profile() {
  const [, navigate] = useLocation();
  const { progress, resetProgress, retakeOnboarding } = useUserProgress();
  const goal = progress.primaryGoal;
  const goalMeta = goal ? GOAL_META[goal] : null;
  const firstName = progress.userName ? progress.userName.split(" ")[0] : "Future Crew";
  const initial = progress.userName?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-6 rounded-b-3xl shadow-sm flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-3 border-2 relative"
          style={{
            backgroundColor: goalMeta ? goalMeta.bg : "rgba(255,255,255,0.10)",
            borderColor: goalMeta ? `${goalMeta.color}60` : "rgba(215,178,103,0.4)",
          }}
        >
          {progress.userName ? (
            <span className="text-3xl font-black" style={{ color: goalMeta?.color ?? "#D7B267" }}>
              {initial}
            </span>
          ) : (
            <User className="w-10 h-10 text-accent" />
          )}
        </div>

        <h1 className="text-xl font-bold mb-1">{firstName}</h1>

        {/* Goal badge */}
        {goalMeta && (
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full mb-2"
            style={{ backgroundColor: goalMeta.bg, color: goalMeta.color }}
          >
            {goalMeta.icon}
            <span className="text-xs font-bold">{goalMeta.label}</span>
          </div>
        )}

      </div>

      <div className="px-5 mt-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-card-border p-4 rounded-2xl text-center shadow-sm">
            <Flame className="w-5 h-5 text-accent mx-auto mb-1" />
            <span className="block text-xl font-bold text-foreground">{progress.streakDays}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Day Streak</span>
          </div>
          <div className="bg-card border border-card-border p-4 rounded-2xl text-center shadow-sm">
            <Zap className="w-5 h-5 text-secondary-foreground mx-auto mb-1" />
            <span className="block text-xl font-bold text-foreground">{progress.completedLessons.length}</span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Lessons</span>
          </div>
          <div className="bg-card border border-card-border p-4 rounded-2xl text-center shadow-sm">
            <Award className="w-5 h-5 text-success mx-auto mb-1" />
            <span className="block text-xl font-bold text-foreground">{progress.quizScores.averageScore}%</span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Avg Score</span>
          </div>
        </div>

        {/* Training Focus */}
        {(goal || progress.struggleAreas.length > 0) && (
          <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground">Your Training Focus</h2>
            </div>
            {goalMeta && (
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3"
                style={{ backgroundColor: goalMeta.bg }}
              >
                <span style={{ color: goalMeta.color }}>{goalMeta.icon}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Primary Goal</p>
                  <p className="text-sm font-bold text-foreground">{goalMeta.label}</p>
                </div>
              </div>
            )}
            {progress.struggleAreas.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Working On</p>
                <div className="flex flex-wrap gap-1.5">
                  {progress.struggleAreas.map((sid) => {
                    const s = STRUGGLE_LABELS[sid];
                    return s ? (
                      <span
                        key={sid}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-muted text-foreground"
                      >
                        {s.emoji} {s.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Earned Badges */}
        <BadgesSection progress={progress} />

        {/* Settings */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">Settings</h2>
          <div className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            {/* Retake Onboarding */}
            <button
              onClick={() => {
                if (confirm("Retake the onboarding to update your goal and focus areas?")) {
                  retakeOnboarding();
                }
              }}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Retake Onboarding</span>
              </div>
              <span className="text-xs text-muted-foreground">Update goal & focus</span>
            </button>

            {/* App Preferences */}
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">App Preferences</span>
              </div>
            </div>

            {/* Reset Progress */}
            <button
              onClick={() => {
                if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
                  resetProgress();
                }
              }}
              className="w-full p-4 flex items-center justify-between hover:bg-destructive/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-destructive" />
                <span className="text-sm font-bold text-destructive">Reset Progress</span>
              </div>
            </button>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">Legal</h2>
          <div className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate("/disclaimer")}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Disclaimer</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground pb-2">
          Cabin Crew Coach · Independent Educational Tool
        </p>
      </div>
    </div>
  );
}

// ── Badges Section ────────────────────────────────────────────────────────────

interface BadgeDef {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  earned: (p: any) => boolean;
}

const BADGES: BadgeDef[] = [
  {
    id: "first-practice",
    label: "First Practice",
    desc: "Completed your first practice session",
    icon: <Star className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.15)",
    earned: (p) => p.quizScores.totalTaken >= 1 || p.voiceCoachStats?.totalAttempts >= 1,
  },
  {
    id: "interview-ready",
    label: "Interview Ready",
    desc: "Completed 5 or more interview practice sessions",
    icon: <Mic className="w-5 h-5" />,
    color: "#17324D",
    bg: "rgba(23,50,77,0.12)",
    earned: (p) => p.voiceCoachStats?.totalAttempts >= 5,
  },
  {
    id: "calm-under-pressure",
    label: "Calm Under Pressure",
    desc: "Completed 5+ scenario drills",
    icon: <Heart className="w-5 h-5" />,
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.15)",
    earned: (p) => {
      const gStats = p.gameStats ?? {};
      const scenarioPlayed = (gStats["pressure-drill"]?.played ?? 0) + (gStats["spot-mistake"]?.played ?? 0);
      return scenarioPlayed >= 5;
    },
  },
  {
    id: "safety-first",
    label: "Safety First",
    desc: "Completed the Present & Secure drill",
    icon: <Shield className="w-5 h-5" />,
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.15)",
    earned: (p) => p.completedLessons.some((l: string) => l.includes("present") || l.includes("safety")),
  },
  {
    id: "city-code-starter",
    label: "City Code Starter",
    desc: "Played City Code Blitz for the first time",
    icon: <Globe className="w-5 h-5" />,
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.15)",
    earned: (p) => (p.gameStats?.["city-code-blitz"]?.played ?? 0) >= 1,
  },
  {
    id: "seven-day-hero",
    label: "7-Day Hero",
    desc: "Completed the full 7-Day Training Path",
    icon: <Trophy className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.15)",
    earned: (p) => {
      const pathIds = ["path-day-1","path-day-2","path-day-3","path-day-4","path-day-5","path-day-6","path-day-7"];
      return pathIds.every((id) => p.completedLessons.includes(id));
    },
  },
  {
    id: "streak-3",
    label: "3-Day Streak",
    desc: "Practiced 3 days in a row",
    icon: <Flame className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.15)",
    earned: (p) => p.streakDays >= 3,
  },
  {
    id: "quiz-regular",
    label: "Quiz Regular",
    desc: "Taken 10 or more quizzes",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#17324D",
    bg: "rgba(23,50,77,0.12)",
    earned: (p) => p.quizScores.totalTaken >= 10,
  },
  {
    id: "lesson-complete",
    label: "Lesson Leader",
    desc: "Completed 5 or more lessons",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.15)",
    earned: (p) => p.completedLessons.filter((l: string) => !l.startsWith("path-")).length >= 5,
  },
  {
    id: "high-scorer",
    label: "High Scorer",
    desc: "Averaged 80% or more on quizzes",
    icon: <Award className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.15)",
    earned: (p) => p.quizScores.totalTaken >= 5 && p.quizScores.averageScore >= 80,
  },
  {
    id: "city-code-ace",
    label: "City Code Ace",
    desc: "Scored 9 or 10 on City Code Blitz",
    icon: <MapPin className="w-5 h-5" />,
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.15)",
    earned: (p) => (p.gameStats?.["city-code-blitz"]?.highScore ?? 0) >= 9,
  },
  {
    id: "game-devotee",
    label: "Game Devotee",
    desc: "Played training games 20 or more times total",
    icon: <Zap className="w-5 h-5" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.15)",
    earned: (p) => {
      const total = Object.values(p.gameStats ?? {}).reduce((sum: number, s: any) => sum + (s?.played ?? 0), 0);
      return total >= 20;
    },
  },
];

function BadgesSection({ progress }: { progress: any }) {
  const earned = BADGES.filter((b) => b.earned(progress));
  const locked = BADGES.filter((b) => !b.earned(progress));

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Badges</h2>
        <span className="text-xs text-muted-foreground font-bold">{earned.length}/{BADGES.length} earned</span>
      </div>

      {earned.length === 0 ? (
        <div className="bg-card border border-card-border rounded-2xl p-5 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">Complete your first practice to earn your first badge.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {earned.map((b) => (
            <div key={b.id} className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm"
                style={{ backgroundColor: b.bg }}
              >
                <span style={{ color: b.color }}>{b.icon}</span>
              </div>
              <span className="text-[10px] font-bold text-foreground leading-tight">{b.label}</span>
            </div>
          ))}
        </div>
      )}

      {locked.length > 0 && (
        <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Still to earn</p>
          <div className="space-y-2">
            {locked.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-muted/50">
                  <span className="text-muted-foreground/50">{b.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-muted-foreground">{b.label}</p>
                  <p className="text-[11px] text-muted-foreground/60">{b.desc}</p>
                </div>
              </div>
            ))}
            {locked.length > 4 && (
              <p className="text-[11px] text-muted-foreground/50 text-center pt-1">+{locked.length - 4} more to discover</p>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-2 pb-2">
        <p className="text-center text-[11px] text-muted-foreground leading-relaxed px-1">
          Cabin Crew Coach is an independent educational preparation tool for aspiring flight attendants. It is not affiliated with, endorsed by, or sponsored by any airline. This app does not guarantee job placement or training outcomes.
        </p>
      </div>
    </div>
  );
}
