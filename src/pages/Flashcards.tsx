import { useState, useMemo } from "react";
import { terminology } from "@/data/terminology";
import { emergencyEquipment } from "@/data/emergencyEquipment";
import { airportCodes } from "@/data/airportCodes";
import { interviewQuestions } from "@/data/interviewQuestions";
import { FlashCard } from "@/components/FlashCard";
import { useUserProgress } from "@/context/UserProgressContext";
import { Link } from "wouter";
import { ChevronLeft, RefreshCw, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Terminology" | "Equipment" | "Airport Codes" | "Interview" | "Hard Only";

export default function Flashcards() {
  const { progress, toggleHardFlashcard } = useUserProgress();
  const [category, setCategory] = useState<Category>("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const allCards = useMemo(() => {
    const cards: any[] = [];
    terminology.forEach(t => cards.push({ id: t.id, front: t.name, back: t.definition, cat: "Terminology" }));
    emergencyEquipment.forEach(e => cards.push({ id: e.id, front: e.name, back: `${e.purpose}\n\nLocation: ${e.location || 'N/A'}\n\nPreflight: ${e.preflight || 'N/A'}`, cat: "Equipment" }));
    airportCodes.forEach(a => cards.push({ id: a.id, front: a.code, back: `${a.city}, ${a.country}\n${a.name}`, cat: "Airport Codes" }));
    interviewQuestions.forEach(i => cards.push({ id: i.id, front: i.question, back: i.sampleAnswer, cat: "Interview" }));
    return cards.sort(() => 0.5 - Math.random()); // Initial shuffle
  }, []);

  const filteredCards = useMemo(() => {
    let filtered = allCards;
    if (category !== "All") {
      if (category === "Hard Only") {
        filtered = allCards.filter(c => progress.hardFlashcards.includes(c.id));
      } else {
        filtered = allCards.filter(c => c.cat === category);
      }
    }
    return filtered;
  }, [allCards, category, progress.hardFlashcards]);

  const handleResult = (isGotIt: boolean) => {
    const card = filteredCards[currentIndex];
    
    // If they didn't get it, mark as hard. If they got it and it was hard, unmark it.
    if (!isGotIt && !progress.hardFlashcards.includes(card.id)) {
      toggleHardFlashcard(card.id);
    } else if (isGotIt && progress.hardFlashcards.includes(card.id)) {
      toggleHardFlashcard(card.id);
    }

    if (currentIndex < filteredCards.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const currentCard = filteredCards[currentIndex];
  const isFinished = currentIndex >= filteredCards.length && filteredCards.length > 0;

  return (
    <div className="min-h-[100dvh] pb-24 bg-background flex flex-col">
      <div className="bg-primary text-primary-foreground pt-12 pb-4 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/">
              <button className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="ml-2 text-xl font-bold">Flashcards</h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-white/10 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-accent" /> {progress.hardFlashcards.length} Hard
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {["All", "Terminology", "Equipment", "Airport Codes", "Interview", "Hard Only"].map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat as Category); setCurrentIndex(0); }}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-colors ${category === cat ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-white/10 text-primary-foreground hover:bg-white/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 py-8 flex flex-col items-center justify-center">
        {filteredCards.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground font-medium mb-4">No cards found for this category.</p>
            {category === "Hard Only" && <p className="text-sm text-muted-foreground">Mark cards as "Needs Practice" to see them here.</p>}
          </div>
        ) : isFinished ? (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Deck Completed</h2>
            <p className="text-muted-foreground mb-8">You've reviewed all {filteredCards.length} cards.</p>
            <Button 
              className="w-full h-14 text-lg font-bold rounded-xl"
              onClick={() => setCurrentIndex(0)}
            >
              Review Again
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-md animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
              <button onClick={() => setCurrentIndex(0)} className="text-muted-foreground p-1 hover:text-foreground">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <FlashCard 
              key={currentCard.id} // forces remount for animation
              front={currentCard.front} 
              back={<span className="whitespace-pre-wrap">{currentCard.back}</span>} 
              category={currentCard.cat}
              onResult={handleResult}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
}
