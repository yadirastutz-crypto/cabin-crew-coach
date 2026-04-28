import { useLocation } from "wouter";
import {
  ArrowLeft, Zap, Shield, Mic, Globe, ChevronDown, ChevronUp,
  Heart, BookOpen, Award, Star
} from "lucide-react";
import { useState } from "react";

const VISUAL_CATEGORIES = [
  {
    icon: <Shield className="w-7 h-7" />,
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.12)",
    title: "Emergency Equipment",
    description: "PBE, life vests, oxygen masks, fire extinguishers, first aid kits. Know what every item does and how to check it before every flight.",
    href: "/practice/present-secure",
    cta: "Drill Equipment Checks",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.12)",
    title: "Airport Codes",
    description: "JFK, LHR, DXB, CDG, SIN. Cabin crew are expected to know the world's major airports by their three-letter IATA codes instantly.",
    href: "/games/city-code-blitz",
    cta: "Play City Code Blitz",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    color: "#D7B267",
    bg: "rgba(215,178,103,0.12)",
    title: "Evacuation Commands",
    description: "Brace! Brace! Head down! Stay down! Leave everything! Jump and slide! These must be automatic. You have seconds to get everyone off an aircraft.",
    href: "/speak",
    cta: "Practise Commands",
  },
  {
    icon: <Mic className="w-7 h-7" />,
    color: "#17324D",
    bg: "rgba(23,50,77,0.10)",
    title: "Airline Interview Prep",
    description: "Tell me about yourself. Why this airline? How do you handle pressure? 24 real questions with model answers and structured coaching.",
    href: "/interview-vault",
    cta: "Open Interview Vault",
  },
];

const AIRLINES = [
  {
    name: "United Airlines",
    flag: "🇺🇸",
    tagline: "The largest airline in the world by fleet size",
    known: "Customer-first culture, diverse routes, and a comprehensive training programme based in Houston.",
    focus: "United places heavy emphasis on customer service standards, conflict de-escalation, and safety protocol recall.",
    tips: [
      "Know their 'Every Flight, Every Customer' service culture statement",
      "Study how to handle a disruptive passenger professionally",
      "Practise multi-step emergency procedure recall without notes",
      "Research their hub airports: EWR, ORD, IAH, DEN, LAX, SFO",
      "Have a confident, genuine answer ready for 'Why United specifically?'",
    ],
    color: "#0047AB",
    bg: "rgba(0,71,171,0.07)",
  },
  {
    name: "American Airlines",
    flag: "🇺🇸",
    tagline: "Largest airline in the world by passengers carried",
    known: "Major hub carrier with one of the highest training standards in the US industry.",
    focus: "American prioritises safety compliance, teamwork under pressure, and professional appearance standards.",
    tips: [
      "Study American's core values: safety, reliability, caring, and efficiency",
      "Know the difference between their domestic and international service standards",
      "Practise STAR-format answers for competency-based questions",
      "Research their key hubs: DFW, CLT, MIA, PHX, ORD, PHL, JFK",
      "Be ready to explain how you'd manage a medical emergency onboard",
    ],
    color: "#E41937",
    bg: "rgba(228,25,55,0.06)",
  },
  {
    name: "Delta Air Lines",
    flag: "🇺🇸",
    tagline: "Most on-time major airline, highest customer satisfaction ratings",
    known: "Consistently ranked as one of the best airlines to work for in the USA. Strong team culture.",
    focus: "Delta looks for warmth, genuine service orientation, and crew members who can de-escalate without supervision.",
    tips: [
      "Research Delta's 'The Delta Difference' philosophy",
      "Know their hub airports: ATL, DTW, JFK, LAX, MSP, SLC",
      "Prepare examples of times you showed initiative under pressure",
      "Study their commitment to accessibility and special-needs passenger support",
      "Delta values long-term crew — show you see this as a career, not a job",
    ],
    color: "#003A6C",
    bg: "rgba(0,58,108,0.07)",
  },
  {
    name: "Southwest Airlines",
    flag: "🇺🇸",
    tagline: "No assigned seating, legendary customer service culture",
    known: "Known for humour, friendliness, and a unique 'people-first' approach to service.",
    focus: "Southwest actively looks for personality — genuine warmth, quick wit, and the ability to make passengers feel comfortable.",
    tips: [
      "Learn Southwest's 'Warrior Spirit, Servant's Heart, Fun-LUVing Attitude' values",
      "Have a genuine answer for 'Tell me something that makes you unique'",
      "Show personality — Southwest crews are known for their humour and energy",
      "Study their open boarding system and how to manage it professionally",
      "Practise making people feel genuinely welcome, not just processed",
    ],
    color: "#304CB2",
    bg: "rgba(48,76,178,0.07)",
  },
  {
    name: "Emirates",
    flag: "🇦🇪",
    tagline: "World's largest long-haul airline based in Dubai (DXB)",
    known: "Five-star service reputation, international crew, one of the most competitive cabin crew programmes globally.",
    focus: "Emirates demands exceptional grooming standards, multi-language aptitude, composure under pressure, and world-class customer care.",
    tips: [
      "Know that Emirates crew are based in Dubai — be ready to relocate",
      "Research their service standards: Business Class, First Class, and private suites",
      "Study basic Arabic courtesies and show cultural awareness",
      "Practise flawless grooming — Emirates has specific appearance requirements",
      "Have a clear answer for 'Why Emirates?' that shows genuine global awareness",
    ],
    color: "#C41A2C",
    bg: "rgba(196,26,44,0.06)",
  },
];

function AirlineCard({ airline }: { airline: typeof AIRLINES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ borderColor: `${airline.color}25`, backgroundColor: airline.bg }}
    >
      <button
        className="w-full flex items-start gap-4 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-3xl flex-shrink-0 mt-0.5">{airline.flag}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-foreground text-base">{airline.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{airline.tagline}</p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        }
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-border/30 pt-4 space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Known For</p>
            <p className="text-sm text-foreground leading-relaxed">{airline.known}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">What to Focus On</p>
            <p className="text-sm text-foreground leading-relaxed">{airline.focus}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Study Tips</p>
            <div className="space-y-2">
              {airline.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black text-white"
                    style={{ backgroundColor: airline.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-8 px-5 rounded-b-3xl shadow-sm relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(215,178,103,0.12) 0%, transparent 60%)" }}
        />
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-5 text-primary-foreground/70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Home</span>
        </button>
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">About This App</div>
          <h1 className="text-2xl font-black text-white leading-tight mb-2">Welcome to<br />Cabin Crew Coach</h1>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">Built for every aspiring flight attendant who knows they are capable — and just needs the right preparation.</p>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-7">

        {/* Section 1 — Welcome / Story */}
        <section>
          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: "linear-gradient(135deg, #17324D 0%, #0f2033 100%)", border: "1px solid rgba(215,178,103,0.15)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Introduction</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed mb-3">
              Flight attendant training doesn't fail people — stress does.
            </p>
            <p className="text-sm text-white/90 leading-relaxed mb-3">
              Most people don't struggle because they're not smart. They struggle because they're overwhelmed, under pressure, and don't know what to expect.
            </p>
            <p className="text-sm text-white/90 leading-relaxed mb-3">
              Cabin Crew Coach was created to help aspiring flight attendants prepare, practice, and build confidence before training begins.
            </p>
            <p className="text-sm text-white/70 leading-relaxed italic">
              This app is designed to give you clarity, structure, and the tools you need to stay calm, learn faster, and succeed.
            </p>
          </div>
        </section>

        {/* Section 2 — Why Training Feels Hard */}
        <section>
          <h2 className="text-lg font-black text-foreground mb-4">Why Training Feels Hard</h2>

          <div className="space-y-3 mb-4">
            {[
              { emoji: "📚", title: "Too much information too fast", desc: "Aviation training covers safety, service, procedures, and regulations — all at once. It's an information overload without structure." },
              { emoji: "⏱️", title: "High-pressure testing", desc: "Written exams, practical assessments, and timed drills all happening in your first weeks. The pressure is real." },
              { emoji: "😰", title: "Anxiety and self-doubt", desc: "Most trainees experience imposter syndrome. You're surrounded by confident-looking people and wonder if you belong." },
              { emoji: "🗺️", title: "Not knowing what to study first", desc: "Without a structured study path, it's easy to waste hours on the wrong content while missing the things recruiters actually test." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-card-border rounded-2xl p-4 shadow-sm flex items-start gap-3"
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</div>
                <div>
                  <p className="font-bold text-sm text-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Positive message */}
          <div
            className="rounded-2xl p-5 text-center shadow-sm"
            style={{ background: "linear-gradient(135deg, rgba(79,138,109,0.12) 0%, rgba(111,167,161,0.08) 100%)", border: "1px solid rgba(79,138,109,0.25)" }}
          >
            <div className="text-2xl mb-2">💪</div>
            <p className="text-sm font-black text-foreground leading-relaxed">
              You are capable of passing.
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              You just need the right tools, repetition, and confidence. That is exactly what this app is built to give you.
            </p>
          </div>
        </section>

        {/* Section 3 — Visual Learning / Learn With Pictures */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-black text-foreground">Learn With Pictures</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Tap any card to go straight to that training section.</p>

          <div className="grid grid-cols-2 gap-3">
            {VISUAL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => navigate(cat.href)}
                className="bg-card border border-card-border rounded-2xl p-4 text-left shadow-sm active:scale-[0.97] transition-transform"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: cat.bg, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-black text-sm text-foreground leading-tight mb-1">{cat.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{cat.description}</p>
                <div
                  className="mt-3 text-[10px] font-black uppercase tracking-wider"
                  style={{ color: cat.color }}
                >
                  {cat.cta} →
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Section 4 — Top Airlines */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-black text-foreground">Top Airlines to Study For</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Each airline has a distinct culture, service standard, and hiring focus. Tap to expand.
          </p>

          <div className="space-y-3">
            {AIRLINES.map((airline) => (
              <AirlineCard key={airline.name} airline={airline} />
            ))}
          </div>
        </section>

        {/* More airlines note */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{ backgroundColor: "rgba(215,178,103,0.08)", border: "1px solid rgba(215,178,103,0.20)" }}
        >
          <Award className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-xs font-bold text-foreground">More Airlines Coming</p>
          <p className="text-xs text-muted-foreground mt-1">British Airways, Qatar Airways, Air Canada, Lufthansa, Singapore Airlines and more are being added.</p>
        </div>

        {/* Disclaimer */}
        <div className="pb-2">
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            Cabin Crew Coach is an independent study tool and is not affiliated with, endorsed by, or sponsored by any airline. Information is for educational preparation only.
          </p>
        </div>
      </div>
    </div>
  );
}
