import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  front: string;
  back: string | React.ReactNode;
  category?: string;
  onResult?: (isGotIt: boolean) => void;
}

export function FlashCard({ front, back, category, onResult }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-[400px] perspective-[1000px]">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className={cn(
          "absolute w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-md border",
          "bg-card border-card-border"
        )}>
          {category && (
            <span className="absolute top-6 text-xs font-bold uppercase tracking-wider text-accent">
              {category}
            </span>
          )}
          <h3 className="text-2xl font-bold text-foreground leading-snug">
            {front}
          </h3>
          <p className="absolute bottom-6 text-sm text-muted-foreground font-medium animate-pulse">
            Tap to flip
          </p>
        </div>

        {/* Back */}
        <div className={cn(
          "absolute w-full h-full backface-hidden rounded-3xl p-8 flex flex-col shadow-md border",
          "bg-primary text-primary-foreground border-primary-border"
        )} style={{ transform: "rotateY(180deg)" }}>
          <div className="flex-1 flex items-center justify-center text-center overflow-y-auto">
            <div className="text-lg font-medium">
              {back}
            </div>
          </div>
          
          {onResult && (
            <div className="flex gap-3 mt-6 pt-6 border-t border-primary-foreground/10" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => { onResult(false); setIsFlipped(false); }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors text-sm"
              >
                Needs Practice
              </button>
              <button 
                onClick={() => { onResult(true); setIsFlipped(false); }}
                className="flex-1 py-3 px-4 rounded-xl bg-success text-white hover:bg-success/90 font-bold transition-colors shadow-sm text-sm"
              >
                Got It
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
