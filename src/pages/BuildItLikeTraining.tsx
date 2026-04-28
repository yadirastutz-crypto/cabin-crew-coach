import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Circle, ChevronDown, ChevronUp, Layers } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

interface Block {
  id: string;
  title: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  points: string[];
}

const BLOCKS: Block[] = [
  {
    id: "build-safety-mindset",
    title: "Safety Mindset",
    emoji: "🛡️",
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.09)",
    border: "rgba(79,138,109,0.25)",
    points: [
      "Understand why procedures exist — they are written in blood",
      "Never assume safety has already been checked by someone else",
      "Speak up even when a senior colleague may have missed something",
      "Your first priority is always safety, never speed or service",
      "Remain calm — passengers read your body language before your words",
    ],
  },
  {
    id: "build-emergency-commands",
    title: "Emergency Commands",
    emoji: "⚡",
    color: "#D7B267",
    bg: "rgba(215,178,103,0.09)",
    border: "rgba(215,178,103,0.25)",
    points: [
      '"Brace! Brace! Head down! Stay down!" — drill it until it is automatic',
      '"Leave everything!" — carry-on bags cost lives during evacuations',
      '"Release seatbelts and get out!" — direct, no negotiation',
      '"Jump and slide!" — one clear instruction at a time, no hesitation',
      "Project from your chest — quiet commands are not commands",
    ],
  },
  {
    id: "build-equipment-basics",
    title: "Equipment Basics",
    emoji: "🔧",
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.09)",
    border: "rgba(111,167,161,0.25)",
    points: [
      "PBE (Protective Breathing Equipment) — for smoke and toxic fumes",
      "Life vest — always don inside the aircraft, inflate only outside",
      "Fire extinguisher — know the type and exact location on your aircraft",
      "Oxygen bottle — passenger and crew units are different, know both",
      "First aid kit — locate it before departure on every single flight",
    ],
  },
  {
    id: "build-real-life-scenarios",
    title: "Real-Life Scenarios",
    emoji: "🎯",
    color: "#5B7FA6",
    bg: "rgba(91,127,166,0.09)",
    border: "rgba(91,127,166,0.25)",
    points: [
      "Medical emergency: assess, call for assistance, retrieve equipment",
      "Disruptive passenger: de-escalate first, document everything, escalate if needed",
      "Turbulence mid-service: secure the trolley, sit down, stay visibly calm",
      "Smoke in the cabin: identify source, communicate with crew, follow checklist",
      "Missed PA: stay composed, deliver it once more — never apologise in a flustered way",
    ],
  },
  {
    id: "build-passenger-service",
    title: "Passenger Service",
    emoji: "✈️",
    color: "#17324D",
    bg: "rgba(23,50,77,0.09)",
    border: "rgba(23,50,77,0.20)",
    points: [
      "Anticipate needs before passengers ask — that is the standard",
      "Use names when possible — people respond warmly to being seen",
      "Warm tone does not mean casual — stay professional and approachable",
      "De-escalate complaints with acknowledgement, then action",
      "Every passenger remembers how you made them feel, not the words",
    ],
  },
  {
    id: "build-interview-readiness",
    title: "Interview Readiness",
    emoji: "🎤",
    color: "#9B6FA6",
    bg: "rgba(155,111,166,0.09)",
    border: "rgba(155,111,166,0.25)",
    points: [
      "Use the STAR method: Situation → Task → Action → Result",
      "Lead every answer with safety or service — not travel perks",
      "Prepare one genuine answer for 'Why this airline specifically?'",
      "Never say 'I don't get stressed' — name a real strategy instead",
      "Your composure in the room is your first demonstration of cabin crew ability",
    ],
  },
];

const STORAGE_KEY = "cabinCrewBuildBlocks";

function getCompleted(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveCompleted(state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// ── Block Card ─────────────────────────────────────────────────────────────

function BlockCard({
  block,
  index,
  completed,
  onToggle,
}: {
  block: Block;
  index: number;
  completed: boolean;
  onToggle: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border transition-all"
      style={{
        borderColor: completed ? `${block.color}50` : block.border,
        backgroundColor: completed ? `${block.color}07` : "var(--card)",
      }}
    >
      {/* Header row */}
      <button
        className="w-full flex items-center gap-3 px-4 py-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Step number bubble */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black"
          style={{
            backgroundColor: completed ? block.color : block.bg,
            color: completed ? "white" : block.color,
            border: `2px solid ${completed ? block.color : block.border}`,
          }}
        >
          {completed ? "✓" : index + 1}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{block.emoji}</span>
            <h3
              className="font-black text-sm"
              style={{ color: completed ? block.color : "var(--foreground)" }}
            >
              {block.title}
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {completed ? "Block complete" : `${block.points.length} key points`}
          </p>
        </div>

        {/* Progress pill + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {expanded
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-4 pb-4 border-t"
          style={{ borderColor: block.border }}
        >
          {/* Bullet points */}
          <div className="pt-4 space-y-3 mb-5">
            {block.points.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-black text-white"
                  style={{ backgroundColor: block.color }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* Mark complete toggle */}
          <button
            onClick={() => onToggle(block.id)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.97]"
            style={
              completed
                ? { backgroundColor: `${block.color}15`, color: block.color, border: `1.5px solid ${block.color}40` }
                : { backgroundColor: block.color, color: "white" }
            }
          >
            {completed
              ? <><CheckCircle2 className="w-4 h-4" /> Completed — tap to undo</>
              : <><Circle className="w-4 h-4" /> Mark block as complete</>
            }
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function BuildItLikeTraining() {
  const [, navigate] = useLocation();
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>(getCompleted);

  useEffect(() => {
    saveCompleted(completedMap);
  }, [completedMap]);

  const toggle = (id: string) => {
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = BLOCKS.filter((b) => completedMap[b.id]).length;
  const totalCount = BLOCKS.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-[100dvh] pb-24 bg-background">
      {/* Header */}
      <div
        className="pt-12 pb-7 px-5 rounded-b-3xl shadow-sm relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #17324D 0%, #0f2033 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 90% 10%, rgba(215,178,103,0.10) 0%, transparent 60%)" }}
        />
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-5 text-white/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Home</span>
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Training Blocks</span>
          </div>
          <h1 className="text-2xl font-black text-white leading-tight mb-2">
            Build It Like Training
          </h1>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            Work through each block. Learn the key points. Mark it complete when it feels solid.
          </p>

          {/* Overall progress */}
          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/70">Overall Progress</span>
              <span className="text-xs font-black text-accent">{completedCount}/{totalCount} blocks</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: "#D7B267" }}
              />
            </div>
            {completedCount === totalCount && (
              <p className="text-center text-xs font-bold text-accent mt-2">
                All blocks complete. You are ready. 🏆
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3">
        {/* Instruction note */}
        <div
          className="rounded-xl px-4 py-3 flex items-start gap-2.5"
          style={{ backgroundColor: "rgba(215,178,103,0.08)", border: "1px solid rgba(215,178,103,0.18)" }}
        >
          <span className="text-base flex-shrink-0">💡</span>
          <p className="text-xs text-foreground leading-relaxed">
            Tap any block to expand it. Read through the key points, then mark it complete. Your progress saves automatically.
          </p>
        </div>

        {/* Block cards */}
        {BLOCKS.map((block, i) => (
          <BlockCard
            key={block.id}
            block={block}
            index={i}
            completed={!!completedMap[block.id]}
            onToggle={toggle}
          />
        ))}

        {/* Completion message */}
        {completedCount === totalCount && (
          <div
            className="rounded-2xl p-5 text-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, #17324D 0%, #0f2033 100%)",
              border: "1px solid rgba(215,178,103,0.25)",
            }}
          >
            <div className="text-3xl mb-2">🏆</div>
            <p className="font-black text-white text-base">All blocks complete.</p>
            <p className="text-sm text-white/60 mt-1 leading-relaxed">
              You have covered the fundamentals. Now practise them until they feel automatic.
            </p>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-[11px] text-muted-foreground leading-relaxed pb-2">
          More blocks will be added as the app grows. Each block represents a core area of cabin crew training.
        </p>
      </div>
    </div>
  );
}
