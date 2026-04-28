import { Link } from "wouter";
import { useUserProgress } from "@/context/UserProgressContext";
import { ChevronLeft, Zap, Shuffle, ListOrdered, MessageCircle, Trophy, ChevronRight, Globe, Mic, Users } from "lucide-react";

const games = [
  {
    id: "city-code-blitz",
    title: "City Code Blitz",
    tagline: "Code → City · Beat the clock",
    description: "Airport code shown. Pick the correct city from 4 choices. 8 seconds per question. Build your streak.",
    icon: Globe,
    color: "bg-[#6FA7A1]/15 text-[#6FA7A1]",
    featured: true,
  },
  {
    id: "interview-spin",
    title: "Rapid Fire Interview",
    tagline: "Random Q with countdown",
    description: "60-second timer. Answer out loud. Spin for a new question. Track how many you complete.",
    icon: MessageCircle,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "pressure-drill",
    title: "Command Presence Challenge",
    tagline: "Emergency scenarios · Correct response",
    description: "Emergency commands and situations. Choose the safest, most professional response. Feedback after each.",
    icon: Mic,
    color: "bg-destructive/10 text-destructive",
  },
  {
    id: "spot-mistake",
    title: "Passenger Scenario Pick",
    tagline: "Find the right response",
    description: "A passenger situation is shown. Identify the most professional and safest course of action.",
    icon: Users,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "fast-recall",
    title: "Fast Recall",
    tagline: "Timed rapid answers",
    description: "Mixed terminology, codes, and equipment. 12 questions. 6 seconds each.",
    icon: Zap,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "match",
    title: "Match Mode",
    tagline: "Term ↔ definition pairs",
    description: "Match terms, equipment, and airport codes to their meanings.",
    icon: Shuffle,
    color: "bg-secondary/40 text-primary",
  },
  {
    id: "sequence",
    title: "Sequence Challenge",
    tagline: "Order procedures correctly",
    description: "Drag steps into the right order — pre-flight, evacuation, medical, more.",
    icon: ListOrdered,
    color: "bg-success/10 text-success",
  },
];

export default function Games() {
  const ctx = useUserProgress();
  const progress = ctx?.progress ?? ({} as any);
  const gameStats: Record<string, { highScore: number; played: number; lastScore: number }> =
    progress?.gameStats ?? {};

  const statsArr = Object.values(gameStats);
  const totalPlayed = statsArr.reduce((sum, s) => sum + (s?.played ?? 0), 0);
  const totalHigh = statsArr.reduce((sum, s) => sum + (s?.highScore ?? 0), 0);

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-6 px-6 rounded-b-3xl">
        <Link href="/">
          <button className="flex items-center text-primary-foreground/80 mb-3 text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-1">Training Games</h1>
        <p className="text-primary-foreground/80 text-sm">Sharpen instincts. Build speed. Train under pressure.</p>

        <div className="mt-5 flex gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 border border-white/10">
            <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold mb-1">Sessions</div>
            <div className="text-xl font-bold">{totalPlayed}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1 border border-white/10 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Total Highs</div>
              <div className="text-xl font-bold">{totalHigh}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 space-y-3">
        {games.map((g) => {
          const Icon = g.icon;
          const stat = gameStats[g.id];
          return (
            <Link key={g.id} href={`/games/${g.id}`}>
              <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm hover-elevate active-elevate-2 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl ${g.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-foreground">{g.title}</h3>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-accent mt-0.5">{g.tagline}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{g.description}</p>
                    {stat && (
                      <div className="flex items-center gap-3 mt-2 text-[11px] font-bold">
                        <span className="text-success">High: {stat.highScore}</span>
                        <span className="text-muted-foreground">Played: {stat.played}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
