import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronDown, ChevronUp, BookOpen, Mic, Star, Eye } from "lucide-react";
import { ivQuestions, ivCategories, IVQuestion } from "@/data/interviewVault";

type View = "hub" | "category" | "question" | "practice";

export default function InterviewVault() {
  const [view, setView] = useState<View>("hub");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<IVQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showRecruiterLens, setShowRecruiterLens] = useState(false);
  const [practicePhase, setPracticePhase] = useState<"idle" | "timer" | "done">("idle");
  const [practiceTime, setPracticeTime] = useState(60);

  const categoryQs = ivQuestions.filter((q) => q.category === selectedCategory);

  function openQuestion(q: IVQuestion) {
    setSelectedQuestion(q);
    setShowAnswer(false);
    setShowRecruiterLens(false);
    setPracticePhase("idle");
    setPracticeTime(60);
    setView("question");
  }

  function openPractice() {
    setPracticePhase("idle");
    setPracticeTime(60);
    setView("practice");
  }

  // HUB
  if (view === "hub") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <Link href="/practice">
            <button className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground">
              <ChevronLeft className="w-4 h-4" /> Practice
            </button>
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Interview Vault</h1>
          </div>
          <p className="text-primary-foreground/70 text-sm mt-1">Your private coach for airline interview preparation.</p>
        </div>

        <div className="px-5 mt-5 space-y-4">
          {/* What recruiters are listening for */}
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">What Recruiters Are Really Listening For</h2>
            </div>
            <div className="space-y-2">
              {[
                { point: "Do you genuinely understand safety is primary — not just say it?", note: "Lead with safety in every safety-related question. Mean it." },
                { point: "Are you self-aware without being self-absorbed?", note: "Show reflection, but keep the focus on what you bring to the team." },
                { point: "Can you communicate clearly under pressure?", note: "Structured answers, no filler words, confident pace." },
                { point: "Do you research, or do you just apply everywhere?", note: "Specificity about the airline is the difference between yes and no." },
                { point: "Are you a team player who can also speak up?", note: "Balance is everything. Neither passive nor confrontational." },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-accent pl-3 py-0.5">
                  <p className="text-xs font-bold text-foreground">{item.point}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Question Categories</h2>
          <div className="space-y-2">
            {ivCategories.map((cat) => {
              const count = ivQuestions.filter((q) => q.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setView("category"); }}
                  className="w-full text-left bg-card border border-card-border rounded-xl px-4 py-3.5 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{cat}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{count} questions</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180 flex-shrink-0" />
                </button>
              );
            })}
          </div>

        </div>
      </div>
    );
  }

  // CATEGORY VIEW
  if (view === "category") {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <button onClick={() => setView("hub")} className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4 hover:text-primary-foreground">
            <ChevronLeft className="w-4 h-4" /> Interview Vault
          </button>
          <h1 className="text-xl font-bold">{selectedCategory}</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">{categoryQs.length} questions in this category</p>
        </div>
        <div className="px-5 mt-5 space-y-2">
          {categoryQs.map((q) => (
            <button
              key={q.id}
              onClick={() => openQuestion(q)}
              className="w-full text-left bg-card border border-card-border rounded-xl px-4 py-4 flex items-start gap-3 active:scale-[0.98] transition-transform shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-accent">{q.id.split("-")[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground leading-snug">{q.question}</p>
              </div>
              <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180 flex-shrink-0 mt-0.5" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // PRACTICE MODE
  if (view === "practice" && selectedQuestion) {
    let interval: ReturnType<typeof setInterval>;

    function startPracticeTimer() {
      setPracticeTime(60);
      setPracticePhase("timer");
      interval = setInterval(() => {
        setPracticeTime((v) => {
          if (v <= 1) {
            clearInterval(interval);
            setPracticePhase("done");
            return 0;
          }
          return v - 1;
        });
      }, 1000);
    }

    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <button onClick={() => setView("question")} className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Question
          </button>
          <h1 className="text-xl font-bold">Practice Out Loud</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Speak your answer before revealing the model response.</p>
        </div>
        <div className="px-5 mt-5 space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">{selectedQuestion.category}</p>
            <p className="text-base font-bold text-foreground leading-snug">"{selectedQuestion.question}"</p>
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-xl px-4 py-3">
            <p className="text-xs font-bold text-accent mb-1">Structure Hint</p>
            <p className="text-sm text-foreground">{selectedQuestion.structureHint}</p>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center py-6">
            <div className="relative w-28 h-28 mb-4">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle cx="56" cy="56" r="48" fill="none" stroke="hsl(var(--accent))" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (practicePhase === "idle" ? 1 : 1 - (practiceTime / 60))}`}
                  style={{ transition: "stroke-dashoffset 0.5s ease" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-bold">{practicePhase === "idle" ? "1:00" : `0:${practiceTime.toString().padStart(2, "0")}`}</span>
                {practicePhase === "done" && <span className="text-[10px] font-bold text-accent uppercase">Done</span>}
              </div>
            </div>
            {practicePhase === "timer" && (
              <div className="text-xs text-accent font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
                <Mic className="w-3 h-3" /> Speaking…
              </div>
            )}
          </div>

          {practicePhase === "idle" && (
            <button onClick={startPracticeTimer} className="w-full bg-success text-white rounded-xl py-3.5 font-bold text-sm">
              Start — Speak Your Answer
            </button>
          )}
          {practicePhase === "done" && (
            <div className="space-y-3">
              <div className="bg-card border border-card-border rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2">Model Answer</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedQuestion.strongAnswer}</p>
              </div>
              <button onClick={() => { setPracticePhase("idle"); setPracticeTime(60); }} className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // QUESTION DETAIL
  if (view === "question" && selectedQuestion) {
    return (
      <div className="min-h-[100dvh] pb-28 bg-background">
        <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl">
          <button onClick={() => setView("category")} className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mb-4">
            <ChevronLeft className="w-4 h-4" /> {selectedCategory}
          </button>
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">{selectedQuestion.category}</p>
          <h1 className="text-xl font-bold leading-snug">"{selectedQuestion.question}"</h1>
        </div>

        <div className="px-5 mt-5 space-y-3">
          {/* Recruiter Lens */}
          <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowRecruiterLens((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-4"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-foreground">What recruiters are listening for</span>
              </div>
              {showRecruiterLens ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            {showRecruiterLens && (
              <div className="border-t border-border/50 px-4 pb-4 pt-2">
                <p className="text-sm text-foreground leading-relaxed">{selectedQuestion.recruiterLens}</p>
              </div>
            )}
          </div>

          {/* Structure Hint */}
          <div className="bg-accent/5 border border-accent/15 rounded-xl px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Answer Structure</p>
            <p className="text-sm text-foreground">{selectedQuestion.structureHint}</p>
          </div>

          {/* Tips */}
          <div className="bg-card border border-card-border rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Coaching Tips</p>
            <div className="space-y-2">
              {selectedQuestion.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                  <p className="text-xs text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Model Answer */}
          <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowAnswer((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-4"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-foreground">Strong Example Answer</span>
              </div>
              {showAnswer ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
            {showAnswer && (
              <div className="border-t border-border/50 px-4 pb-4 pt-2">
                <p className="text-sm text-foreground leading-relaxed italic">"{selectedQuestion.strongAnswer}"</p>
              </div>
            )}
          </div>

          {/* Practice button */}
          <button onClick={openPractice} className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2">
            <Mic className="w-4 h-4" /> Practice Out Loud
          </button>

          {/* Navigate questions */}
          <div className="flex gap-2 pt-1">
            {categoryQs.findIndex((q) => q.id === selectedQuestion.id) > 0 && (
              <button
                onClick={() => {
                  const idx = categoryQs.findIndex((q) => q.id === selectedQuestion.id);
                  openQuestion(categoryQs[idx - 1]);
                }}
                className="flex-1 bg-card border border-card-border text-foreground rounded-xl py-3 font-bold text-sm"
              >
                ← Previous
              </button>
            )}
            {categoryQs.findIndex((q) => q.id === selectedQuestion.id) < categoryQs.length - 1 && (
              <button
                onClick={() => {
                  const idx = categoryQs.findIndex((q) => q.id === selectedQuestion.id);
                  openQuestion(categoryQs[idx + 1]);
                }}
                className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
