import { useState } from "react";
import { Term } from "@/data/terminology";
import { Lightbulb, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

export function TermCard({ term }: { term: Term }) {
  const [expanded, setExpanded] = useState(false);
  const hasExtra = !!(term.memoryTrick || term.trainingContext);

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
      <div className="mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1 block">
          {term.category}
        </span>
        <h3 className="text-lg font-bold text-foreground">{term.name}</h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Definition</p>
          <p className="text-sm text-foreground font-medium">{term.definition}</p>
        </div>

        <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
          <p className="text-sm text-foreground italic">"{term.example}"</p>
        </div>

        {hasExtra && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:opacity-80 transition-opacity"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> Memory trick & training notes
              </>
            )}
          </button>
        )}

        {expanded && hasExtra && (
          <div className="space-y-3 pt-1">
            {term.memoryTrick && (
              <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" /> Memory Trick
                </p>
                <p className="text-sm text-foreground italic">{term.memoryTrick}</p>
              </div>
            )}
            {term.trainingContext && (
              <div className="bg-accent/10 rounded-xl p-3 border border-accent/20">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3" /> Training Context
                </p>
                <p className="text-sm text-foreground leading-relaxed">{term.trainingContext}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
