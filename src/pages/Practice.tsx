import { Link } from "wouter";
import { useUserProgress } from "@/context/UserProgressContext";
import { Shield, Zap, PlayCircle, Gamepad2, ChevronRight, BookOpen } from "lucide-react";

export default function Practice() {
  const { progress } = useUserProgress();

  const features = [
    {
      href: "/practice/present-secure",
      icon: Shield,
      iconBg: "bg-[#4F8A6D]/15",
      iconColor: "text-[#4F8A6D]",
      badge: null,
      title: "Present & Secure",
      subtitle: "Equipment inspection drills",
      description: "Practice identifying exactly what to check for every item of safety equipment — the way real crew are trained to do it.",
      detail: "9 equipment items · Multiple choice · Timed mode",
    },
    {
      href: "/practice/scenarios",
      icon: Zap,
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
      badge: "High pressure",
      badgeBg: "bg-destructive/10 text-destructive",
      title: "Scenario Pressure Mode",
      subtitle: "High-stakes decision training",
      description: "Real cabin situations. Countdown timer. Four options. One best answer. This is where your decision-making is tested.",
      detail: "12 scenarios · 3 difficulty levels · Debrief after each",
    },
    {
      href: "/quiz",
      icon: PlayCircle,
      iconBg: "bg-accent/15",
      iconColor: "text-accent",
      badge: null,
      title: "Knowledge Quiz",
      subtitle: "Aviation terminology & procedures",
      description: "Test your knowledge across aviation terms, emergency procedures, equipment, and airport codes.",
      detail: "120+ questions · Mixed or by category",
    },
    {
      href: "/games",
      icon: Gamepad2,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badge: "7 games",
      badgeBg: "bg-primary/10 text-primary",
      title: "Training Games",
      subtitle: "Speed, memory, and pattern recall",
      description: "Seven drill games including City Code Blitz, Rapid Fire Interview, Fast Recall, Match Mode, and more.",
      detail: "City Code Blitz · Interview Spin · Fast Recall · +4 more",
    },
    {
      href: "/interview-vault",
      icon: BookOpen,
      iconBg: "bg-secondary/30",
      iconColor: "text-secondary-foreground",
      badge: null,
      title: "Interview Vault",
      subtitle: "Deep interview preparation",
      description: "24 airline interview questions with model answers, recruiter coaching, and practice mode. Built for aspiring cabin crew.",
      detail: "8 categories · Model answers · What recruiters hear",
    },
  ];

  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-1">Practice</h1>
        <p className="text-primary-foreground/70 text-sm">Train the skills that matter on assessment day.</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-xl px-2 py-3 text-center">
            <div className="text-lg font-bold">{progress.quizScores.totalTaken}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mt-0.5">Quiz Done</div>
          </div>
          <div className="bg-white/10 rounded-xl px-2 py-3 text-center">
            <div className="text-lg font-bold">{progress.quizScores.averageScore}%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mt-0.5">Avg Score</div>
          </div>
          <div className="bg-white/10 rounded-xl px-2 py-3 text-center">
            <div className="text-lg font-bold">{progress.streakDays}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mt-0.5">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Link key={f.href} href={f.href}>
              <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-foreground text-sm">{f.title}</h3>
                    {f.badge && (
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${f.badgeBg}`}>
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-accent font-bold uppercase tracking-wider mb-1">{f.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{f.description}</p>
                  <p className="text-[11px] text-muted-foreground/70">{f.detail}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
