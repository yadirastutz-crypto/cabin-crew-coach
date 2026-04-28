import { useLocation } from "wouter";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-6 px-5 rounded-b-3xl shadow-sm">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 mb-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back</span>
        </button>
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Disclaimer</h1>
        </div>
        <p className="text-xs text-primary-foreground/60 mt-1">Please read before using this app</p>
      </div>

      <div className="px-5 mt-6 space-y-5">
        {/* Main disclaimer */}
        <section
          className="rounded-2xl p-5 shadow-sm border"
          style={{ backgroundColor: "rgba(215,178,103,0.08)", borderColor: "rgba(215,178,103,0.25)" }}
        >
          <p className="text-sm font-bold leading-relaxed text-foreground">
            Cabin Crew Coach is an independent educational preparation tool. It is not affiliated with, endorsed by, or sponsored by any airline. It does not guarantee employment, interview success, or training graduation.
          </p>
        </section>

        {/* Independent tool */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#D7B267" }}>
            Independent Tool
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cabin Crew Coach is an independently developed product. Any airline names, routes, procedures, or terminology referenced within the app are used solely for educational context. We have no formal relationship with any airline, aviation authority, or training organisation.
          </p>
        </section>

        {/* No guarantee */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#6FA7A1" }}>
            No Outcome Guarantee
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Completing courses, quizzes, or exercises within this app does not guarantee a job offer, interview pass, or successful training graduation. Real-world outcomes depend on many individual factors beyond what any preparation tool can control.
          </p>
        </section>

        {/* Content accuracy */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#D7B267" }}>
            Content Accuracy
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All content within Cabin Crew Coach is created for general educational purposes. Aviation procedures, regulations, and airline-specific requirements vary by carrier and change over time. Always verify information with your airline's official training materials and documentation.
          </p>
        </section>

        {/* Professional advice */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#6FA7A1" }}>
            Not Professional Advice
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nothing in this app constitutes professional career, legal, or aviation safety advice. It is a self-study preparation tool only.
          </p>
        </section>

        <p className="text-center text-xs text-muted-foreground pb-2">
          Cabin Crew Coach — Independent Educational Tool
        </p>
      </div>
    </div>
  );
}
