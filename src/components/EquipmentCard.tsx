import { useState } from "react";
import { EmergencyEquipment } from "@/data/emergencyEquipment";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Mic, BookOpen } from "lucide-react";

export function EquipmentCard({ item }: { item: EmergencyEquipment }) {
  const [expanded, setExpanded] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

  const currentQuiz = item.quizItems?.[quizIndex];

  function handleAnswer(idx: number) {
    if (showQuizAnswer) return;
    setSelectedAnswer(idx);
    setShowQuizAnswer(true);
  }

  function nextQuiz() {
    const next = (quizIndex + 1) % (item.quizItems?.length ?? 1);
    setQuizIndex(next);
    setSelectedAnswer(null);
    setShowQuizAnswer(false);
  }

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1 block">
          {item.category}
        </span>
        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Purpose</p>
          <p className="text-sm text-foreground font-medium">{item.purpose}</p>
        </div>

        {item.location && (
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-1">Location</p>
            <p className="text-sm text-foreground">{item.location}</p>
          </div>
        )}

        {item.preflight && (
          <div className="bg-muted/30 rounded-xl p-3 border border-border/50">
            <p className="text-sm font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-accent" /> Preflight Check
            </p>
            <p className="text-sm text-foreground font-medium">{item.preflight}</p>
          </div>
        )}

        {item.keyNumbers && (
          <div className="bg-accent/10 rounded-xl p-3 border border-accent/20">
            <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">Key Numbers</p>
            <p className="text-sm text-foreground font-semibold">{item.keyNumbers}</p>
          </div>
        )}

        {item.traineesForget && (
          <div className="bg-destructive/5 rounded-xl p-3 border border-destructive/20">
            <p className="text-sm font-bold text-destructive uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3" /> Often Forgotten
            </p>
            <p className="text-sm text-foreground">{item.traineesForget}</p>
          </div>
        )}

        <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
          <p className="text-sm font-bold text-primary uppercase text-[10px] tracking-wider mb-1">Memory Trick</p>
          <p className="text-sm text-foreground italic font-medium">{item.memoryTrick}</p>
        </div>

        {/* Expandable section */}
        {(item.whenToUse || item.whenNotToUse || item.unserviceable || item.sayItOutLoud || item.quizItems) && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="w-full flex items-center justify-between text-sm font-bold text-primary py-2 border-t border-border/50 mt-2 pt-3"
          >
            <span>{expanded ? "Show less" : "Full training detail"}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {expanded && (
          <div className="space-y-4 pt-1">
            {item.whenToUse && (
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-3 border border-green-200 dark:border-green-900/50">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-green-700 dark:text-green-400">When to Use</p>
                <p className="text-sm text-foreground">{item.whenToUse}</p>
              </div>
            )}

            {item.whenNotToUse && (
              <div className="bg-destructive/5 rounded-xl p-3 border border-destructive/20">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-destructive flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" /> When NOT to Use
                </p>
                <p className="text-sm text-foreground">{item.whenNotToUse}</p>
              </div>
            )}

            {item.unserviceable && (
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-200 dark:border-amber-900/50">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-amber-700 dark:text-amber-400">Makes It Unserviceable</p>
                <p className="text-sm text-foreground">{item.unserviceable}</p>
              </div>
            )}

            {item.sayItOutLoud && (
              <div className="bg-primary/5 rounded-xl p-3 border border-primary/15">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-primary flex items-center gap-1.5">
                  <Mic className="w-3 h-3" /> Say It Out Loud
                </p>
                <p className="text-sm text-foreground italic leading-relaxed">"{item.sayItOutLoud}"</p>
              </div>
            )}

            {item.quizItems && item.quizItems.length > 0 && currentQuiz && (
              <div className="bg-card rounded-xl p-4 border-2 border-primary/20">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3 text-primary flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3" /> Quick Quiz — {quizIndex + 1}/{item.quizItems.length}
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">{currentQuiz.question}</p>
                <div className="space-y-2">
                  {currentQuiz.options.map((opt, idx) => {
                    let cls = "w-full text-left rounded-xl px-4 py-2.5 text-sm border transition-colors ";
                    if (!showQuizAnswer) {
                      cls += "border-border/50 hover:border-primary/40 hover:bg-muted/30";
                    } else if (idx === currentQuiz.answer) {
                      cls += "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 font-semibold";
                    } else if (idx === selectedAnswer) {
                      cls += "border-destructive bg-destructive/5 text-destructive";
                    } else {
                      cls += "border-border/30 opacity-50";
                    }
                    return (
                      <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showQuizAnswer && (
                  <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {selectedAnswer === currentQuiz.answer ? "✓ Correct" : "✗ Review the detail above"}
                    </p>
                    {item.quizItems.length > 1 && (
                      <button onClick={nextQuiz} className="text-xs font-bold text-primary">
                        Next question →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
