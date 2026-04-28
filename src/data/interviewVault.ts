export interface IVQuestion {
  id: string;
  category: string;
  question: string;
  recruiterLens: string;
  strongAnswer: string;
  tips: string[];
  structureHint: string;
}

export const ivCategories = [
  "Tell Me About Yourself",
  "Safety First Mindset",
  "Teamwork",
  "Conflict Resolution",
  "Customer Service",
  "Professionalism",
  "Flexibility & Adaptability",
  "Why This Airline",
];

export const ivQuestions: IVQuestion[] = [
  // TELL ME ABOUT YOURSELF
  {
    id: "tm-1",
    category: "Tell Me About Yourself",
    question: "Tell me about yourself in 60 seconds.",
    recruiterLens: "They want to hear relevance, confidence, and intentionality. They are not interested in a life biography — they want to know: does this person understand what this role requires, and have they prepared for it seriously?",
    strongAnswer: "I've spent the past three years working in guest-facing hospitality roles, most recently at a hotel where I managed high-pressure service situations daily. I'm drawn to cabin crew because the role combines the two things that matter most to me — genuine service and safety. I've been preparing seriously: studying aviation terminology, emergency procedures, and human factors. I'm calm under pressure, I work well in team environments, and I'm ready to commit to this career fully.",
    tips: [
      "Lead with your most relevant professional experience, not your personal story.",
      "Always connect your background to why it prepares you for cabin crew — don't assume they'll make that link.",
      "End with what you bring to this role, not what the role gives you.",
      "Practice until it sounds natural, not rehearsed. 60 seconds maximum.",
    ],
    structureHint: "Background → Relevant skills → Why cabin crew → What you bring",
  },
  {
    id: "tm-2",
    category: "Tell Me About Yourself",
    question: "Walk me through your career history and what led you to apply today.",
    recruiterLens: "Recruiters are looking for a thread — a logical progression of skills and experience that leads naturally to this role. Random job history with no connecting narrative raises questions about commitment.",
    strongAnswer: "I started in retail, where I learned to manage difficult situations with customers under pressure. I moved into hospitality, which taught me anticipatory service — how to read what people need before they ask. Both roles required me to stay professional when things went wrong. When I started seriously researching cabin crew, I realised my background was actually ideal preparation — safety-conscious, service-led, team-dependent. I've spent the last six months studying the technical side of the role so I'm ready to begin training with a strong foundation.",
    tips: [
      "Connect each job to the skills that matter in cabin crew: service, pressure, teamwork, communication.",
      "Avoid mentioning jobs that have no connection without explaining what you learned.",
      "Show that this application is a considered decision, not an impulse.",
    ],
    structureHint: "Early career → Progression → Skills gained → How it connects to cabin crew",
  },

  // SAFETY FIRST
  {
    id: "sf-1",
    category: "Safety First Mindset",
    question: "Why do you think safety is the primary function of a cabin crew member?",
    recruiterLens: "This question separates candidates who genuinely understand the role from those who think it's a customer service job with a side of safety. The correct answer must lead with safety — not service.",
    strongAnswer: "Because every single procedure cabin crew follow exists to protect life. The service elements — the welcome, the meal service, the passenger experience — are meaningful, but they are secondary to the core function: ensuring that if something goes wrong, every passenger has the best possible chance of surviving. The safety demonstration, the door arming, the equipment checks — these are not formalities. They are the foundation of every flight. Understanding this is what separates a professional from someone who sees this job as hospitality with a view.",
    tips: [
      "Never lead with service in this answer — lead with safety and keep it there.",
      "Reference specific elements of the safety role: door arming, emergency commands, equipment checks.",
      "Avoid sounding like you're reciting a policy. Sound like you believe it.",
    ],
    structureHint: "State the principle → Give the reason → Give a specific example from training",
  },
  {
    id: "sf-2",
    category: "Safety First Mindset",
    question: "What would you do if you noticed a safety issue that a senior colleague had missed?",
    recruiterLens: "They are testing your CRM knowledge and your willingness to speak up regardless of seniority. The wrong answer is to stay silent. The right answer shows professional assertiveness without confrontation.",
    strongAnswer: "I'd speak up immediately and professionally. I'd frame it as a question: 'I might be wrong, but I wanted to flag — the door indicator on L2 looks like it may still be armed. Can we cross-check before we open?' That removes any challenge to authority while making the concern visible and creating an opportunity to verify. Aviation has learned through tragedy that staying silent costs lives. CRM principles exist precisely because seniority doesn't make anyone infallible. I would always speak up.",
    tips: [
      "Reference CRM — 'Crew Resource Management' — if you can do so naturally.",
      "Frame the example as a question, not a correction. 'I might be wrong, but...'",
      "Be clear that you would never stay silent on a safety issue regardless of seniority.",
    ],
    structureHint: "What you would do → How you'd frame it → Why it matters",
  },
  {
    id: "sf-3",
    category: "Safety First Mindset",
    question: "How do you ensure you stay alert and focused during a long-haul flight?",
    recruiterLens: "They want to see that you understand the real demands of the role — fatigue is a major safety factor in aviation. They are not looking for 'I love flying' — they want strategies.",
    strongAnswer: "I understand that fatigue is a significant safety risk, not just a personal inconvenience. My strategies include using any crew rest opportunity fully, staying hydrated throughout the flight, maintaining structured routines during service so I'm not operating on autopilot, and staying engaged with my team — which naturally keeps awareness sharp. I also know that if I'm fatigued to the point of compromised judgement, I have a professional obligation to communicate that to the senior crew member. Fatigue is not a private problem in aviation.",
    tips: [
      "Name specific strategies — not general statements like 'I push through it.'",
      "Mention the team aspect — fatigue management is a crew issue, not just personal.",
      "Reference the safety dimension of fatigue openly — shows you understand the stakes.",
    ],
    structureHint: "Acknowledge the challenge → Specific strategies → Team dimension",
  },

  // TEAMWORK
  {
    id: "tw-1",
    category: "Teamwork",
    question: "Describe a time you worked effectively as part of a team under pressure.",
    recruiterLens: "They are assessing how you function in the team dynamic that cabin crew rely on — not whether you are likeable, but whether you are a reliable, proactive team member when things are hard.",
    strongAnswer: "During a fully-booked flight at the hotel I worked at, two of our four team members called in sick on the busiest weekend of the year. Rather than waiting for instructions, our remaining team immediately reorganised: I took on the dual responsibility of front desk and guest relations, my colleague covered the restaurant. We agreed on a 15-minute check-in rhythm so we could support each other. We didn't lose a single guest complaint that weekend. What made it work was that everyone stepped outside their usual role without being asked, and we communicated constantly.",
    tips: [
      "Use 'we' as often as 'I' — this is a team role, not a solo performance.",
      "Be specific about what you personally did AND what the team did together.",
      "Name the outcome clearly — what was the result?",
    ],
    structureHint: "STAR: Situation → Task → Action (yours and the team's) → Result",
  },
  {
    id: "tw-2",
    category: "Teamwork",
    question: "What would you do if a colleague wasn't pulling their weight during a flight?",
    recruiterLens: "They are assessing whether you would let resentment build silently, complain to other crew members, or handle it professionally. Only one of those is the right answer.",
    strongAnswer: "First, I'd consider whether there's a reason I'm not aware of — tiredness, something personal, a difficult passenger interaction earlier. If it's persistent and affecting the service, I'd speak to my colleague privately and directly: 'I want to check in with you — is everything okay? I could use some help with the rear section.' That gives them an opportunity to respond. If it continued to affect the team, I'd involve the senior crew member — not to complain, but because the senior crew member is there to manage exactly this kind of situation. I wouldn't carry resentment silently or involve other colleagues in gossip.",
    tips: [
      "Show empathy first — assume a reason before assuming laziness.",
      "Direct, private communication is the professional first step.",
      "Know when to escalate to the senior crew member — and frame it as team management, not complaint.",
    ],
    structureHint: "Consider context → Direct conversation → Escalate if needed → What you'd avoid doing",
  },

  // CONFLICT RESOLUTION
  {
    id: "cr-1",
    category: "Conflict Resolution",
    question: "Tell me about a time you resolved a conflict with a difficult customer.",
    recruiterLens: "They want evidence that you can manage emotion — yours and the customer's — while arriving at a resolution. They are NOT looking for a story about a customer being unreasonable and you being perfect. They want to see your process.",
    strongAnswer: "A guest at the hotel I worked at became extremely agitated about a billing error on checkout. He was loud and the lobby was busy. I immediately moved the conversation to a quiet area — removing the audience changed his tone almost instantly. I listened fully without interrupting, acknowledged his frustration specifically: 'I can see this has caused real inconvenience and I want to resolve it now.' I corrected the parts of the error I could, escalated the remaining billing issue to my manager with him present so he felt included in the resolution, and followed up personally afterward. He left satisfied and became a repeat guest.",
    tips: [
      "Show your process, not just the outcome.",
      "Name the specific actions you took — move the conversation, listen, acknowledge, resolve, follow up.",
      "The outcome should show the customer's perspective improved — not just that you were right.",
    ],
    structureHint: "STAR: situation → your task → your specific actions → resolution and what you learned",
  },
  {
    id: "cr-2",
    category: "Conflict Resolution",
    question: "Tell me about a conflict with a coworker and how you resolved it.",
    recruiterLens: "This tests your emotional maturity. They want to see that you can have professional adult conversations with colleagues and learn from disagreement — not that you avoid conflict or win arguments.",
    strongAnswer: "A colleague and I had a recurring disagreement about how we divided our section responsibilities. Rather than letting it become a tension, I asked for a direct conversation away from the floor. I explained how the current arrangement was affecting my ability to do my job well — not as a complaint, but as a problem I wanted to solve together. We agreed on a clearer structure for who did what in each section. The working relationship improved because we addressed it early rather than letting it fester. I learned that direct, private conversations solve most workplace conflicts before they escalate.",
    tips: [
      "Focus on the resolution process, not the details of the conflict itself.",
      "Show that you initiated the conversation — proactive, not reactive.",
      "End with a lesson. This signals maturity and self-awareness.",
    ],
    structureHint: "What the conflict was → What you did → How it resolved → What you learned",
  },

  // CUSTOMER SERVICE
  {
    id: "cs-1",
    category: "Customer Service",
    question: "What does excellent customer service mean to you in a cabin crew context?",
    recruiterLens: "They want to see that you understand the specific nature of cabin crew service — it is safety-first, pressure-driven, team-dependent, and delivered in an environment where passengers are often anxious, tired, or stressed. Generic 'the customer is always right' answers fail here.",
    strongAnswer: "Excellent cabin crew service means anticipating what passengers need before they have to ask, delivering it warmly but efficiently, and maintaining complete professionalism when things go wrong — because things always go wrong. It means treating every single passenger with equal dignity regardless of seat class or behaviour, and staying calm and competent in the moments that matter most — medical events, turbulence, delays. The measure of great service is how passengers feel when they exit the aircraft — and that standard holds whether the flight was smooth or difficult.",
    tips: [
      "Anticipation is a key service word — use it.",
      "Always connect service to the pressured, safety-conscious context of the cabin.",
      "Mention how you maintain service standards when things go wrong — not just when they go right.",
    ],
    structureHint: "Define excellence → Give the context (aircraft-specific) → Describe your standard",
  },
  {
    id: "cs-2",
    category: "Customer Service",
    question: "How would you handle a passenger who is extremely anxious about flying?",
    recruiterLens: "They want warmth, empathy, and competence. They want to see that you can calm without condescending and that you understand what genuinely helps an anxious passenger.",
    strongAnswer: "I'd acknowledge their fear without minimising it: 'I understand — flying can be uncomfortable, and that's completely normal.' I'd introduce myself by name, give them my seat location, and tell them to come to me with anything during the flight. During takeoff and landing I'd check in with them specifically. If they asked about turbulence or sounds, I'd explain calmly and accurately — most anxious passengers are not helped by vague reassurance, they're helped by information. I'd also ensure they knew where the call bell was so they didn't feel trapped.",
    tips: [
      "Acknowledge without dismissing — don't say 'don't worry.'",
      "Be specific about what you would physically do, not just how you'd feel.",
      "Information helps anxious passengers more than general comfort — name specific sounds or movements you'd explain.",
    ],
    structureHint: "Acknowledge → Introduce yourself → Practical check-ins → Information over reassurance",
  },

  // PROFESSIONALISM
  {
    id: "pro-1",
    category: "Professionalism",
    question: "How do you maintain professionalism when you are exhausted or having a bad day?",
    recruiterLens: "They know the lifestyle is demanding. They want to see self-awareness about the challenge and a genuine strategy — not 'I love people so it never bothers me.'",
    strongAnswer: "I separate my personal state from my professional standard. When I'm exhausted or going through something difficult, I use the routine of the role as an anchor — checking equipment, going through the briefing process, focusing on the team. Passengers cannot see what I'm carrying and they should never have to. That said, I believe professional honesty matters with your team: if I'm genuinely struggling in a way that affects my performance, I'd speak to the senior crew member privately rather than hiding it — because that's a safety consideration as much as a personal one.",
    tips: [
      "Don't pretend the challenge doesn't exist — show self-awareness.",
      "Describe a specific mechanism: using the routine, focusing on the team, etc.",
      "Mention the team element — tell your senior crew member if you're genuinely impaired.",
    ],
    structureHint: "Acknowledge the reality → Your personal strategy → When to be honest with your team",
  },
  {
    id: "pro-2",
    category: "Professionalism",
    question: "What does professional appearance mean to you in this role?",
    recruiterLens: "They are not just asking about grooming standards. They are asking whether you understand that your appearance is part of passenger confidence and the airline's brand.",
    strongAnswer: "In this role, my appearance is part of the service and part of passenger safety. When passengers see a crew member who looks composed, polished, and professional, it contributes to their sense of security. If something looks wrong with my uniform or presentation, a passenger notices — and it subtly undermines trust. I take grooming standards seriously not because they're a formality, but because they signal to passengers that this crew has high standards in all areas — including the areas that matter most: safety and emergency response.",
    tips: [
      "Connect appearance to passenger confidence and trust — not just personal pride.",
      "Show that you understand the uniform as a safety signal, not just a dress code.",
    ],
    structureHint: "The purpose of appearance → The passenger's perspective → Your commitment",
  },

  // FLEXIBILITY
  {
    id: "flex-1",
    category: "Flexibility & Adaptability",
    question: "How do you feel about irregular schedules, long-haul flights, and time away from home?",
    recruiterLens: "This is a lifestyle reality check. They want to see that you have genuinely thought through what the lifestyle requires — not just said 'I love travelling.' Unrealistic candidates drop out early. Prepared candidates last.",
    strongAnswer: "I've thought about this carefully, not just in theory. I've spoken with someone currently flying long-haul and asked them what the lifestyle genuinely looks like — the disrupted sleep, the time zone adjustments, missing events. My personal circumstances allow for the flexibility the role requires. My support network understands what I'm committing to. I've worked rotating shifts before and experienced what irregular hours do to routine — and I've found ways to manage it. I'm not going in with a romanticised version of this life. I'm going in prepared.",
    tips: [
      "Name specific lifestyle challenges — sleep disruption, time zones, missing events.",
      "Show you have actually researched it — ideally by speaking to current crew.",
      "Mention how your personal circumstances support this lifestyle choice.",
    ],
    structureHint: "Show you've done the research → Acknowledge the real challenges → Confirm your preparedness",
  },
  {
    id: "flex-2",
    category: "Flexibility & Adaptability",
    question: "Tell me about a time you had to adapt quickly to an unexpected change.",
    recruiterLens: "They want evidence of flexibility in a professional context. They are assessing your response to sudden change — do you freeze, complain, or adapt?",
    strongAnswer: "During a large event at the hotel, our entire planned dining setup had to be reconfigured one hour before guests arrived because of a venue change by the client. Rather than debating it, our team immediately divided the tasks: I took responsibility for the floor setup, my colleague managed the kitchen, and the manager liaised with the client. We were ready with eight minutes to spare. What made the difference was that everyone dropped their preference for the original plan and focused entirely on the new reality. I've found that the fastest adaptation happens when you stop referencing what was planned and commit fully to what's needed now.",
    tips: [
      "Be specific about what changed and what you personally did.",
      "The lesson at the end is important — it shows you learned from the experience.",
      "Avoid outcomes that imply someone else saved the situation.",
    ],
    structureHint: "STAR: what changed → what you did → outcome → what you took from it",
  },

  // WHY THIS AIRLINE
  {
    id: "wa-1",
    category: "Why This Airline",
    question: "Why do you want to work for this airline specifically?",
    recruiterLens: "They are testing whether you researched them or just applied everywhere. Vague compliments — 'you're such a great airline' — are the worst possible answer. Specificity is the only correct answer.",
    strongAnswer: "I've researched your safety record, your training programme, and your values — and all three stand out. Specifically, your investment in crew training and your commitment to [specific airline initiative or value, e.g., sustainability, cultural diversity, crew welfare] aligns with what matters to me professionally. I've also spoken with someone who works here, and they described a culture of accountability and high standards — which is exactly the environment I want to develop in. I'm not applying everywhere. I'm applying here because I've done the work to understand what this airline stands for.",
    tips: [
      "Name something specific — a route network, training programme, culture, values, or recent initiative.",
      "If possible, mention that you spoke with a current crew member — this is highly impressive to recruiters.",
      "Never say 'I love travelling' or 'it's always been my dream' without backing it up with substance.",
    ],
    structureHint: "What you researched → What stood out → Why it matters to you",
  },
  {
    id: "wa-2",
    category: "Why This Airline",
    question: "What do you know about our fleet and route network?",
    recruiterLens: "Basic research question. They want to see that you cared enough to look up basic facts about the airline before applying. Candidates who cannot answer this question have essentially not tried.",
    strongAnswer: "I know you currently operate [aircraft types, e.g., Boeing 737 and Airbus A320 family] on your short to medium-haul network, and [wide-body type] on your long-haul routes. Your network covers [key regions]. I understand this means crew can be rostered on both short-haul and long-haul operations, which requires adaptability in service standards and procedures. I've also looked at your recent fleet expansion, which suggests growth — and I want to be part of an airline that is building, not contracting.",
    tips: [
      "Look up the airline's actual fleet before any interview — this is basic preparation.",
      "Connect the fleet to what it means for crew operations.",
      "Mentioning fleet growth or expansion shows awareness beyond surface-level research.",
    ],
    structureHint: "Fleet types → Route network → What it means for crew operations → Why growth matters to you",
  },
];
