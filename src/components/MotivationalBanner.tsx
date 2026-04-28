import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "Confidence is trained, not given.",
  "Calm is part of your professionalism.",
  "You do not need perfection. You need repetition.",
  "The version of you that passes training is built here."
];

export function MotivationalBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden relative w-full text-center px-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-sm md:text-base font-serif italic text-muted-foreground absolute w-full"
        >
          "{messages[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
