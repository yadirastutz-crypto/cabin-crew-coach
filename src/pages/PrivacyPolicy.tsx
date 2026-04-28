import { useLocation } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
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
          <ShieldCheck className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Privacy Policy</h1>
        </div>
        <p className="text-xs text-primary-foreground/60 mt-1">Last updated: April 2026</p>
      </div>

      <div className="px-5 mt-6 space-y-5">
        {/* About */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#D7B267" }}>
            About This App
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cabin Crew Coach is an independent educational preparation tool designed to help aspiring flight attendants prepare for the interview and training process. It is not affiliated with, endorsed by, or sponsored by any airline or aviation authority.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#6FA7A1" }}>
            Data We Do Not Collect
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Cabin Crew Coach does not intentionally collect, transmit, or store any personal information on external servers. All your progress, preferences, and activity are saved locally on your device only.
          </p>
          <ul className="space-y-2">
            {[
              "No account or sign-up is required",
              "No personal information is sent to any server",
              "No analytics or tracking cookies are used",
              "No location data is collected",
              "No device identifiers are collected",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6FA7A1" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Local Storage */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#D7B267" }}>
            Local Storage
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your progress data (completed lessons, quiz scores, streak, and preferences) is stored in your browser's local storage. This data never leaves your device. You can clear it at any time by using the "Reset Progress" option in your Profile, or by clearing your browser's site data.
          </p>
        </section>

        {/* No Data Sales */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#6FA7A1" }}>
            No Data Sales
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not sell, trade, share, or rent any user data to third parties — because we do not collect any user data to begin with.
          </p>
        </section>

        {/* Affiliation */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#D7B267" }}>
            Airline Affiliation
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cabin Crew Coach does not claim to be affiliated with, endorsed by, or officially connected to any airline, aviation company, or regulatory body. All content is created for general educational purposes only.
          </p>
        </section>

        {/* Changes */}
        <section className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3" style={{ color: "#6FA7A1" }}>
            Changes to This Policy
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be reflected with an updated date at the top of this page.
          </p>
        </section>

        <p className="text-center text-xs text-muted-foreground pb-2">
          Cabin Crew Coach — Independent Educational Tool
        </p>
      </div>
    </div>
  );
}
