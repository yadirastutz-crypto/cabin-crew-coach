export interface TrainingTask {
  id: string;
  label: string;
  href: string;
  description: string;
}

export interface TrainingDay {
  day: number;
  title: string;
  theme: string;
  completionId: string;
  color: string;
  bg: string;
  icon: string;
  intro: string;
  tasks: TrainingTask[];
  keyLesson: string;
}

export const trainingPath: TrainingDay[] = [
  {
    day: 1,
    title: "Flight Attendant Mindset",
    theme: "Safety is the job. Service is the gift.",
    completionId: "path-day-1",
    color: "#17324D",
    bg: "rgba(23,50,77,0.08)",
    icon: "✈️",
    intro: "Day one is about understanding what this role actually is. Cabin crew are safety professionals first. The service is real, but the mission is safety. Get this right and everything else follows.",
    tasks: [
      { id: "d1-t1", label: "Read: Why Procedures Exist", href: "/written-in-blood", description: "Open a real case study and understand the cost of skipping steps." },
      { id: "d1-t2", label: "Explore: Academy Phase 1", href: "/academy", description: "Start the first training phase and read through the mindset module." },
      { id: "d1-t3", label: "Practice: One Scenario", href: "/practice/scenarios", description: "Run one standard-difficulty cabin scenario to test your instincts." },
    ],
    keyLesson: "Cabin crew are the last line of defence in an emergency. Every check, every command, every procedure exists for a reason.",
  },
  {
    day: 2,
    title: "Interview Basics",
    theme: "Tell me about yourself — and mean it.",
    completionId: "path-day-2",
    color: "#D7B267",
    bg: "rgba(215,178,103,0.09)",
    icon: "🎤",
    intro: "Your interview is won in preparation, not in the room. Today you build your answers, understand what recruiters want to hear, and practice saying it out loud.",
    tasks: [
      { id: "d2-t1", label: "Study: Interview Vault", href: "/interview-vault", description: "Read through the first 8 questions and study the model answers." },
      { id: "d2-t2", label: "Practice: Interview Answer", href: "/speak", description: "Use the Interview Practice mode. Set the 60-second timer. Do 3 questions." },
      { id: "d2-t3", label: "Drill: Interview Spin Game", href: "/games/interview-spin", description: "Rapid-fire interview questions. Spin the wheel. Answer out loud." },
    ],
    keyLesson: "Structure every answer: Situation → Task → Action → Result. Recruiters don't want speeches — they want proof you can think and communicate clearly.",
  },
  {
    day: 3,
    title: "Safety First Thinking",
    theme: "Know your equipment. Trust your checks.",
    completionId: "path-day-3",
    color: "#4F8A6D",
    bg: "rgba(79,138,109,0.08)",
    icon: "🛡️",
    intro: "Before you ever step in front of a passenger, you must know every piece of safety equipment on board, what it does, and how to check it. Today is dedicated to building that knowledge.",
    tasks: [
      { id: "d3-t1", label: "Drill: Present & Secure", href: "/practice/present-secure", description: "Practice identifying what to check for each piece of safety equipment." },
      { id: "d3-t2", label: "Study: Reference Terms", href: "/reference", description: "Review core aviation safety terminology and definitions." },
      { id: "d3-t3", label: "Quiz: Safety Knowledge", href: "/quiz", description: "Take a knowledge quiz focused on safety and equipment." },
    ],
    keyLesson: "PBE seal — pink moisture indicator — no damage. Every check has a sequence. Never skip the cross-check. Your partner's life depends on it.",
  },
  {
    day: 4,
    title: "Passenger Scenarios",
    theme: "How you respond defines the outcome.",
    completionId: "path-day-4",
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.09)",
    icon: "🧑‍✈️",
    intro: "You will face challenging passengers. A medical emergency. Someone who won't follow instructions. A child travelling alone. Today you build the decision-making instincts that matter.",
    tasks: [
      { id: "d4-t1", label: "Pressure Mode: 5 Scenarios", href: "/practice/scenarios", description: "Complete 5 scenarios at standard difficulty. Read the debriefs carefully." },
      { id: "d4-t2", label: "Game: Spot the Mistake", href: "/games/spot-mistake", description: "Identify what went wrong in each procedure — builds critical thinking." },
      { id: "d4-t3", label: "Game: Pressure Drill", href: "/games/pressure-drill", description: "8 seconds to decide. Real-feeling emergency prompts." },
    ],
    keyLesson: "Listen first. Stay calm. Protect safety. Solve one thing at a time. You are not alone — use your crew, your training, and your procedures.",
  },
  {
    day: 5,
    title: "Voice & Command Presence",
    theme: "Your voice is a professional tool.",
    completionId: "path-day-5",
    color: "#D7B267",
    bg: "rgba(215,178,103,0.09)",
    icon: "📢",
    intro: "In an emergency, your voice is everything. Clear, loud, and authoritative commands save lives. Today you practice delivering them — interview answers, cabin announcements, and evacuation commands.",
    tasks: [
      { id: "d5-t1", label: "Practice: Announcement Mode", href: "/speak", description: "Read all 5 cabin announcements out loud. Focus on pace and authority." },
      { id: "d5-t2", label: "Practice: Emergency Commands", href: "/speak", description: "Drill evacuation and brace commands with full voice projection." },
      { id: "d5-t3", label: "Practice: Announcement Coach", href: "/announcements", description: "Full announcement scripts with delivery feedback." },
    ],
    keyLesson: "Brace! Brace! Head down! Stay down! — repeat until impact. Jump and slide! Leave everything! — no pause, no hesitation. Loud is professional in an emergency.",
  },
  {
    day: 6,
    title: "City Code Practice",
    theme: "Know where you are going.",
    completionId: "path-day-6",
    color: "#6FA7A1",
    bg: "rgba(111,167,161,0.09)",
    icon: "🌍",
    intro: "Airport codes are part of your professional vocabulary as cabin crew. Today you drill them until they feel automatic — starting with the top 25 that every crew member should know cold.",
    tasks: [
      { id: "d6-t1", label: "Study: Airport Codes", href: "/airports", description: "Review the top 25 IATA codes and their cities." },
      { id: "d6-t2", label: "Game: City Code Blitz", href: "/games/city-code-blitz", description: "New game — code shown, choose the correct city. Beat your high score." },
      { id: "d6-t3", label: "Game: Fast Recall — Codes", href: "/games/fast-recall", description: "Mixed recall with airport codes. 6 seconds per question." },
    ],
    keyLesson: "JFK = New York. LHR = London. DXB = Dubai. DFW = Dallas. These should be instant — no hesitation in a briefing room.",
  },
  {
    day: 7,
    title: "Mini Final Exam",
    theme: "Show what you've learned.",
    completionId: "path-day-7",
    color: "#D7B267",
    bg: "rgba(215,178,103,0.10)",
    icon: "🏆",
    intro: "Day seven is your checkpoint. You've covered mindset, interviews, safety, scenarios, voice, and codes. Now it's time to test everything — under pressure, timed, without notes.",
    tasks: [
      { id: "d7-t1", label: "Final Exam", href: "/quiz/final-exam", description: "Full timed final exam. No notes. This is your assessment." },
      { id: "d7-t2", label: "5 Pressure Scenarios", href: "/practice/scenarios", description: "Complete 5 high-difficulty scenarios. Accept the debrief." },
      { id: "d7-t3", label: "Voice: Full Session", href: "/speak", description: "One interview question, one announcement, one emergency command." },
    ],
    keyLesson: "You don't rise to the occasion — you fall to your level of training. Seven days of focused practice makes you more prepared than 90% of applicants.",
  },
];
