import { useState } from "react";
import { Link } from "wouter";
import { terminology } from "@/data/terminology";
import { emergencyEquipment } from "@/data/emergencyEquipment";
import { crashLessons } from "@/data/crashLessons";
import { commonMistakes } from "@/data/commonMistakes";
import { TermCard } from "@/components/TermCard";
import { EquipmentCard } from "@/components/EquipmentCard";
import { ChevronLeft, Search, AlertTriangle, Zap } from "lucide-react";

type Tab = "terms" | "equipment" | "lessons" | "mistakes";

export default function Reference() {
  const [activeTab, setActiveTab] = useState<Tab>("terms");
  const [search, setSearch] = useState("");
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [openMistake, setOpenMistake] = useState<string | null>(null);

  const filteredTerms = terminology.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEquip = emergencyEquipment.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.purpose.toLowerCase().includes(search.toLowerCase())
  );

  const searchableTab = activeTab === "terms" || activeTab === "equipment";

  const tabs: { id: Tab; label: string }[] = [
    { id: "terms", label: "Terms" },
    { id: "equipment", label: "Equipment" },
    { id: "lessons", label: "Crash Lessons" },
    { id: "mistakes", label: "Trainee Fails" },
  ];

  return (
    <div className="min-h-[100dvh] pb-24 bg-background flex flex-col">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground pt-12 pb-4 px-4 shadow-sm">
        <div className="flex items-center mb-4">
          <Link href="/academy">
            <button className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="ml-2 text-xl font-bold">Library</h1>
        </div>

        <div className="flex gap-1 p-1 bg-white/10 rounded-xl mb-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-shrink-0 flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-primary"
                  : "text-primary-foreground hover:bg-white/5"
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                setSearch("");
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {searchableTab && (
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" />
            <input
              type="text"
              placeholder={`Search ${activeTab === "terms" ? "terminology" : "equipment"}...`}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:bg-white/20 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {activeTab === "lessons" && (
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
            <AlertTriangle className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <p className="text-xs text-primary-foreground/90 font-medium leading-snug">
              Regulations are written in blood. These cases explain why procedures exist.
            </p>
          </div>
        )}

        {activeTab === "mistakes" && (
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
            <p className="text-xs text-primary-foreground/90 font-medium leading-snug">
              Know what trainees fail on — before you fail on it.
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 px-5 py-6 space-y-4">
        {/* Terminology tab */}
        {activeTab === "terms" && (
          filteredTerms.length > 0 ? (
            filteredTerms.map((term) => <TermCard key={term.id} term={term} />)
          ) : (
            <p className="text-center text-muted-foreground mt-8">No terms found.</p>
          )
        )}

        {/* Equipment tab */}
        {activeTab === "equipment" && (
          filteredEquip.length > 0 ? (
            filteredEquip.map((item) => <EquipmentCard key={item.id} item={item} />)
          ) : (
            <p className="text-center text-muted-foreground mt-8">No equipment found.</p>
          )
        )}

        {/* Crash Lessons tab */}
        {activeTab === "lessons" && (
          <div className="space-y-4">
            {crashLessons.map((lesson) => (
              <div key={lesson.id} className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full text-left p-5"
                  onClick={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-destructive block mb-1">
                        {lesson.incident}
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug">{lesson.title}</h3>
                    </div>
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${openLesson === lesson.id ? "text-destructive" : "text-muted-foreground"}`} />
                  </div>
                </button>

                {openLesson === lesson.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-border/50">
                    <div className="pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">What Happened</p>
                      <p className="text-sm text-foreground leading-relaxed">{lesson.whatHappened}</p>
                    </div>

                    <div className="bg-destructive/5 rounded-xl p-4 border border-destructive/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1">Procedure Missed</p>
                      <p className="text-sm text-foreground leading-relaxed">{lesson.procedureMissed}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Why It Mattered</p>
                      <p className="text-sm text-foreground leading-relaxed">{lesson.whyItMattered}</p>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Lesson For Crew</p>
                      <p className="text-sm text-foreground leading-relaxed">{lesson.lessonForCrew}</p>
                    </div>

                    <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Key Takeaway</p>
                      <p className="text-sm font-semibold text-foreground">{lesson.keyTakeaway}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Common Mistakes tab */}
        {activeTab === "mistakes" && (
          <div className="space-y-4">
            {commonMistakes.map((mistake) => (
              <div key={mistake.id} className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full text-left p-5"
                  onClick={() => setOpenMistake(openMistake === mistake.id ? null : mistake.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground leading-snug">{mistake.mistake}</h3>
                    </div>
                    <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${openMistake === mistake.id ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                </button>

                {openMistake === mistake.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-border/50">
                    <div className="pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Why It Happens</p>
                      <p className="text-sm text-foreground leading-relaxed">{mistake.whyItHappens}</p>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">How to Fix It</p>
                      <p className="text-sm text-foreground leading-relaxed">{mistake.howToFix}</p>
                    </div>

                    <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Practice Instead</p>
                      <p className="text-sm text-foreground leading-relaxed">{mistake.practiceInstead}</p>
                    </div>

                    <div className="bg-destructive/5 rounded-xl p-3 border border-destructive/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-1">Warning Sign</p>
                      <p className="text-sm text-foreground italic">{mistake.warningSign}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
