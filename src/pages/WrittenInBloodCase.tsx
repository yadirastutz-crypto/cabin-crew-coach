import { useState } from "react";
import { Link, useParams } from "wouter";
import { caseStudies } from "@/data/writtenInBlood";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";

export default function WrittenInBloodCase() {
  const { caseId } = useParams<{ caseId: string }>();
  const cs = caseStudies.find((c) => c.id === caseId);
  const currentIndex = caseStudies.findIndex((c) => c.id === caseId);
  const prevCase = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCase = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  const [quizPicked, setQuizPicked] = useState<number | null>(null);
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [reflectionOpen, setReflectionOpen] = useState(false);

  if (!cs) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 pb-24 bg-background">
        <BookOpen className="w-10 h-10 text-muted-foreground mb-3" />
        <p className="text-foreground font-bold mb-1">Case not found</p>
        <Link href="/written-in-blood">
          <button className="text-sm text-primary font-bold mt-3">Back to Written in Blood</button>
        </Link>
      </div>
    );
  }

  const quizCorrect = quizPicked === cs.quiz.correctIndex;

  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      {/* Header */}
      <div
        className="text-white pt-12 pb-7 px-5 rounded-b-3xl relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f1f2e 0%, #17324D 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.5) 28px, rgba(255,255,255,0.5) 29px)" }}
        />
        <Link href="/written-in-blood">
          <button className="flex items-center text-white/60 mb-4 text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Written in Blood
          </button>
        </Link>
        <p className="text-[10px] uppercase tracking-wider font-bold text-accent/70 mb-1">{cs.category}</p>
        <h1 className="text-xl font-bold leading-snug">{cs.title}</h1>
        <p className="text-white/60 text-sm mt-2 leading-relaxed">{cs.summary}</p>
      </div>

      <div className="px-5 mt-6 space-y-4">

        {/* What Happened */}
        <SectionCard
          label="What happened"
          icon={<AlertTriangle className="w-4 h-4 text-destructive" />}
          accent="destructive"
        >
          <p className="text-sm text-foreground leading-relaxed">{cs.whatHappened}</p>
        </SectionCard>

        {/* Procedure Failed + Why Exists */}
        <div className="grid grid-cols-1 gap-3">
          <SectionCard
            label="Procedure that failed"
            icon={<X className="w-4 h-4 text-destructive" />}
            accent="destructive"
          >
            <p className="text-sm text-foreground leading-relaxed">{cs.procedureFailed}</p>
          </SectionCard>
          <SectionCard
            label="Why this procedure exists"
            icon={<ShieldAlert className="w-4 h-4 text-accent" />}
            accent="accent"
          >
            <p className="text-sm text-foreground leading-relaxed">{cs.whyExists}</p>
          </SectionCard>
        </div>

        {/* Lesson */}
        <SectionCard
          label="Lesson for cabin crew"
          icon={<BookOpen className="w-4 h-4 text-primary" />}
          accent="primary"
          highlighted
        >
          <p className="text-sm text-foreground leading-relaxed font-medium">{cs.lesson}</p>
        </SectionCard>

        {/* Reflection (expandable) */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setReflectionOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Reflection Prompt</span>
            </div>
            {reflectionOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {reflectionOpen && (
            <div className="px-4 pb-4 border-t border-border/50 pt-3">
              <p className="text-sm text-foreground leading-relaxed italic">"{cs.reflectionQuestion}"</p>
              <p className="text-[11px] text-muted-foreground mt-2">Take 60 seconds to consider this before reading on.</p>
            </div>
          )}
        </div>

        {/* Quiz */}
        <div className="bg-card border border-card-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-accent">Knowledge Check</span>
          </div>
          <p className="text-sm font-bold text-foreground mb-3 leading-snug">{cs.quiz.question}</p>
          <div className="space-y-2">
            {cs.quiz.options.map((opt, i) => {
              const isPicked = quizPicked === i;
              const isCorrect = i === cs.quiz.correctIndex;
              const showResult = quizPicked !== null;
              let cls = "border-card-border bg-background text-foreground";
              if (showResult && isCorrect) cls = "border-success bg-success/10 text-success";
              else if (showResult && isPicked && !isCorrect) cls = "border-destructive bg-destructive/10 text-destructive";
              else if (showResult) cls = "border-card-border bg-background text-muted-foreground";
              return (
                <button
                  key={i}
                  onClick={() => { if (quizPicked === null) setQuizPicked(i); }}
                  disabled={quizPicked !== null}
                  className={`w-full text-left text-xs font-medium border rounded-xl px-4 py-3 transition-colors ${cls} hover-elevate active-elevate-2`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {quizPicked !== null && (
            <div className={`mt-3 rounded-xl p-3 ${quizCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
              <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${quizCorrect ? "text-success" : "text-destructive"}`}>
                {quizCorrect ? "Correct" : "Not quite"}
              </p>
              <p className="text-xs text-foreground leading-relaxed">{cs.quiz.explanation}</p>
            </div>
          )}
        </div>

        {/* What Would You Do (expandable scenario) */}
        <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setScenarioOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary">What Would You Do?</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-medium">{scenarioOpen ? "Hide" : "Show scenario"}</span>
              {scenarioOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </button>
          {scenarioOpen && (
            <div className="border-t border-border/50">
              <div className="px-4 py-3 bg-primary/5">
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1.5">Scenario</p>
                <p className="text-sm text-foreground leading-relaxed italic">"{cs.scenario.prompt}"</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-success mb-1.5">Strong Response</p>
                <p className="text-sm text-foreground leading-relaxed">{cs.scenario.goodResponse}</p>
              </div>
            </div>
          )}
        </div>

        {/* Test Takeaway */}
        <div
          className="rounded-2xl p-4 flex gap-3"
          style={{ background: "linear-gradient(135deg, #0f1f2e 0%, #17324D 100%)" }}
        >
          <BookOpen className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-accent mb-1">Test Takeaway</p>
            <p className="text-sm text-white leading-relaxed font-medium">{cs.testTakeaway}</p>
          </div>
        </div>

        {/* Case Navigation */}
        <div className="flex gap-3 pt-2">
          {prevCase ? (
            <Link href={`/written-in-blood/${prevCase.id}`} className="flex-1">
              <button className="w-full bg-muted text-foreground rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-1.5 hover-elevate active-elevate-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextCase ? (
            <Link href={`/written-in-blood/${nextCase.id}`} className="flex-1">
              <button className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-1.5 hover-elevate active-elevate-2">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <Link href="/written-in-blood" className="flex-1">
              <button className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold hover-elevate active-elevate-2">
                All Cases
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  label,
  icon,
  accent,
  highlighted,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  accent: "destructive" | "accent" | "primary";
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  const borderMap = {
    destructive: "border-destructive/20",
    accent: "border-accent/20",
    primary: "border-primary/20",
  };
  const bgMap = {
    destructive: "",
    accent: "",
    primary: highlighted ? "bg-primary/5" : "",
  };
  return (
    <div className={`bg-card border ${borderMap[accent]} ${bgMap[accent]} rounded-2xl p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}
