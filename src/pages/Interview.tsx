import { useState } from "react";
import { Link } from "wouter";
import { interviewQuestions } from "@/data/interviewQuestions";
import { ChevronLeft, ChevronDown, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Interview() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group questions by category
  const categories = Array.from(new Set(interviewQuestions.map(q => q.category)));

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      <div className="bg-primary text-primary-foreground pt-12 pb-6 px-4 shadow-sm relative">
        <div className="flex items-center mb-4 relative z-10">
          <Link href="/academy">
            <button className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="ml-2 text-xl font-bold">Interview Prep</h1>
        </div>
        <p className="text-primary-foreground/80 text-sm px-2 relative z-10">
          Master the STAR method. Answer with calm authority.
        </p>
      </div>

      <div className="px-5 py-6 space-y-8">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 pl-1">{category}</h2>
            <div className="space-y-3">
              {interviewQuestions.filter(q => q.category === category).map(q => {
                const isExpanded = expandedId === q.id;
                
                return (
                  <div key={q.id} className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="w-full p-5 text-left flex items-start justify-between bg-card hover:bg-muted/30 transition-colors"
                    >
                      <span className="font-bold text-foreground text-base pr-4 leading-snug">"{q.question}"</span>
                      <ChevronDown className={cn("w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="p-5 pt-0 border-t border-border bg-card">
                        
                        <div className="mt-4 mb-5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">What They're Looking For</span>
                          <p className="text-sm font-medium text-foreground">{q.lookingFor}</p>
                        </div>

                        {q.starTip && (
                          <div className="mb-5 bg-accent/10 border border-accent/20 rounded-xl p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5"><Star className="w-3 h-3" /> STAR Tip</span>
                            <p className="text-sm text-foreground font-medium">{q.starTip}</p>
                          </div>
                        )}

                        <div className="mb-5 bg-success/5 border border-success/20 rounded-xl p-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-success mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Sample Answer</span>
                          <p className="text-sm text-foreground italic leading-relaxed">"{q.sampleAnswer}"</p>
                        </div>

                        {q.dontSay && (
                          <div className="mb-5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1 block">What NOT to Say</span>
                            <p className="text-sm text-foreground leading-relaxed line-through decoration-destructive/50">"{q.dontSay}"</p>
                          </div>
                        )}

                        {q.confidenceTip && (
                          <div className="bg-muted/50 border border-border rounded-xl p-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Confidence Tip</span>
                            <p className="text-sm text-foreground">{q.confidenceTip}</p>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
