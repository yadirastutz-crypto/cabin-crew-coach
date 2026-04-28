import { Link } from "wouter";
import { caseStudies, trainingPrinciples, traineesMissOften } from "@/data/writtenInBlood";
import { ChevronLeft, ChevronRight, BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function WrittenInBlood() {
  return (
    <div className="min-h-[100dvh] pb-28 bg-background">
      {/* Header */}
      <div
        className="text-primary-foreground pt-12 pb-8 px-5 rounded-b-3xl relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f1f2e 0%, #17324D 60%, #1e3d5c 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(255,255,255,0.5) 28px, rgba(255,255,255,0.5) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(255,255,255,0.5) 28px, rgba(255,255,255,0.5) 29px)" }}
        />
        <Link href="/">
          <button className="flex items-center text-white/60 mb-4 text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>
        </Link>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
            <BookOpen className="w-5 h-5 text-white/80" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Written in Blood</h1>
            <p className="text-white/60 text-sm mt-0.5">Real lessons behind aviation procedures</p>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed border-l-2 border-white/20 pl-3 italic">
          "Regulations are written in blood. Every checklist, command, and safety rule exists because someone, somewhere, learned the hard way that details matter."
        </p>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Case Studies */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Case Studies</h2>
            <span className="text-xs text-muted-foreground">{caseStudies.length} of {caseStudies.length} accessible</span>
          </div>

          <div className="space-y-3">
            {caseStudies.map((cs, i) => (
              <Link key={cs.id} href={`/written-in-blood/${cs.id}`}>
                <div className="bg-card border border-card-border rounded-2xl p-4 hover-elevate active-elevate-2 cursor-pointer">
                  <CaseCard cs={cs} index={i} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* What This Means for Training */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">What This Means for Training</h2>
          <div className="space-y-2">
            {trainingPrinciples.map((p, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Trainees Often Miss */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">What Trainees Often Miss</h2>
          <div className="bg-card border border-card-border rounded-2xl p-4 space-y-3">
            {traineesMissOften.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <AlertTriangle className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ cs, index }: { cs: (typeof caseStudies)[number]; index: number }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{ background: "#17324D1A", color: "#17324D" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">{cs.category}</p>
              <h3 className="font-bold text-foreground text-sm leading-tight">{cs.title}</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{cs.summary}</p>
          <div className="mt-2 flex gap-2">
            <span className="text-[9px] uppercase tracking-wider font-bold bg-accent/15 text-accent px-2 py-0.5 rounded-full">Quiz included</span>
            <span className="text-[9px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Scenario</span>
          </div>
        </div>
      </div>
    </div>
  );
}
