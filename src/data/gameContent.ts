export interface ProcedureSequence {
  id: string;
  title: string;
  scenario: string;
  steps: string[];
  sequenceNote: string;
}

export const procedureSequences: ProcedureSequence[] = [
  {
    id: "seq-1",
    title: "Pre-flight cabin check",
    scenario: "You arrive on board for your duty. Place these in the correct order.",
    steps: [
      "Stow your bag and uniform items in the assigned crew area",
      "Conduct your safety equipment check at your assigned station",
      "Check your assigned doors for arming pins, slide indicators, and viewing window clarity",
      "Report your equipment status to the senior crew member",
      "Take your boarding position and welcome passengers",
    ],
    sequenceNote:
      "Stowing personal items first prevents clutter during safety checks. Equipment checks must be completed and reported before passengers board — finding a missing item after boarding causes delays and safety risks.",
  },
  {
    id: "seq-2",
    title: "Door arming after boarding",
    scenario: "Boarding is complete and the captain has called for doors. Order the steps.",
    steps: [
      "Receive the captain's command to arm doors and cross-check",
      "Visually confirm the area around your door is clear",
      "Move the girt bar from the door bracket to the floor bracket",
      "Verify the slide armed indicator shows correctly",
      "Cross-check your partner's door across the cabin",
      "Report on the all-call: 'L1 armed and cross-checked'",
    ],
    sequenceNote:
      "Confirmation comes before arming, arming comes before cross-check, and reporting closes the loop. Skipping cross-check is one of the most common serious errors in cabin crew training.",
  },
  {
    id: "seq-3",
    title: "Rapid decompression response",
    scenario: "The cabin loses pressure rapidly at cruise altitude. Order your immediate actions.",
    steps: [
      "Grab the nearest oxygen mask and place it on yourself",
      "Sit down or hold on — protect yourself from injury",
      "Wait for the aircraft to stabilize during emergency descent",
      "Once below 10,000 ft, remove your mask and begin assisting passengers",
      "Check the cabin for injuries and report status to the flight deck",
    ],
    sequenceNote:
      "Own mask first is non-negotiable — useful consciousness at 35,000 ft is 15–30 seconds. You cannot help others if you pass out. Self-protection then stabilise then assist.",
  },
  {
    id: "seq-4",
    title: "Evacuation on land — usable exit",
    scenario: "The captain commands evacuation. You are at L1 and the door is usable. Order your actions.",
    steps: [
      "Shout the brace command and assess outside conditions through the viewing window",
      "Open the door — the slide deploys automatically",
      "Confirm the slide is fully inflated and usable",
      "Block the exit briefly and shout your evacuation commands",
      "Direct passengers to jump and slide — one at a time, no bags",
      "Once cabin is clear, exit yourself with emergency equipment if possible",
    ],
    sequenceNote:
      "Assess before opening — an obstruction or fire outside makes the exit unusable. Confirm the slide before committing passengers. Crew exits last — always.",
  },
  {
    id: "seq-5",
    title: "Medical event — suspected cardiac arrest",
    scenario: "A passenger collapses and is unresponsive. Order your team response.",
    steps: [
      "Check responsiveness and breathing — confirm cardiac arrest",
      "Call for crew assistance and notify the flight deck immediately",
      "Begin CPR — 30 compressions followed by 2 breaths",
      "Send another crew member to retrieve the AED",
      "Apply AED pads as soon as the device arrives — follow voice prompts",
      "Make a PA call for any medical professional on board",
    ],
    sequenceNote:
      "Assess before acting — starting CPR on a breathing person is harmful. Notify the flight deck early so a divert can be initiated. Every minute without defibrillation reduces survival by 10%.",
  },
  {
    id: "seq-6",
    title: "Cabin secure for landing",
    scenario: "Final approach. Order your secure-cabin sweep.",
    steps: [
      "Confirm seatbelts fastened on every passenger",
      "Check tray tables stowed and seatbacks upright",
      "Confirm overhead bins closed and latched",
      "Stow loose galley items and secure carts",
      "Take your jumpseat, fasten harness, and complete silent review",
      "Report 'cabin secure' to the senior crew member",
    ],
    sequenceNote:
      "Each step reduces projectile hazards on landing. The silent review (30-second review) is your mental rehearsal of emergency actions — required by many operators and proven to reduce hesitation in emergencies.",
  },
];

export interface MistakeScenario {
  id: string;
  title: string;
  context: string;
  details: string[];
  wrongIndex: number;
  explanation: string;
  safetyLink: string;
}

export const mistakeScenarios: MistakeScenario[] = [
  {
    id: "mis-1",
    title: "Door arming report",
    context: "A new crew member at door L2 reports the following on the all-call. Which detail is wrong?",
    details: [
      "L2 armed and cross-checked",
      "Girt bar attached to floor bracket",
      "Slide indicator visible and green",
      "Door opened to confirm arming",
    ],
    wrongIndex: 3,
    explanation:
      "You NEVER open an armed door to confirm arming — that deploys the slide. Visual confirmation through the indicator and viewing window only.",
    safetyLink:
      "An inadvertently deployed slide can injure ground crew, delay departure, and cost thousands to repack. It has caused fatalities.",
  },
  {
    id: "mis-2",
    title: "Decompression response",
    context: "A trainee describes their response to a rapid decompression. Which step is wrong?",
    details: [
      "Grab nearest oxygen mask and place on yourself first",
      "Sit down or hold on to a fixed structure",
      "Stand up and walk through the cabin handing out masks",
      "Wait until below 10,000 ft to assist passengers",
    ],
    wrongIndex: 2,
    explanation:
      "You do NOT walk the cabin during decompression. You sit, hold on, and put your own mask on first. Time of useful consciousness is seconds — moving will cause you to pass out.",
    safetyLink:
      "An incapacitated crew member during decompression becomes a casualty who cannot assist the 100+ passengers who need you conscious and functional.",
  },
  {
    id: "mis-3",
    title: "Fire fighting setup",
    context: "A crew member is preparing to fight a galley oven fire. Which detail is wrong?",
    details: [
      "Halon extinguisher selected for electrical fire",
      "PBE donned before approaching the fire",
      "Pour water onto the electrical fire to cool it",
      "Notify the flight deck immediately",
    ],
    wrongIndex: 2,
    explanation:
      "NEVER pour water on an electrical fire — it conducts electricity and will make the situation worse. Halon (or appropriate extinguisher) only.",
    safetyLink:
      "Water on an electrical fire can cause electrocution, flash steam burns, and spread the fire. In-flight fires are among the most rapidly fatal emergencies in aviation.",
  },
  {
    id: "mis-4",
    title: "Brace command",
    context: "A crew member describes giving the brace command for an emergency landing. Which is wrong?",
    details: [
      "Shout 'Brace! Brace! Brace!' loudly and repeatedly",
      "Shout once quietly so as not to alarm passengers",
      "Demonstrate the brace position",
      "Continue commanding until impact",
    ],
    wrongIndex: 1,
    explanation:
      "The brace command must be LOUD and REPEATED. A quiet single command will not cut through the noise of an emergency. Many passengers will be panicking.",
    safetyLink:
      "Analysis of survivable crashes shows that passengers who adopted the brace position had significantly higher survival and lower injury rates. Your voice is a safety tool.",
  },
  {
    id: "mis-5",
    title: "Ditching preparation",
    context: "A crew member preps passengers for a water landing. Which is wrong?",
    details: [
      "Instruct passengers to don life vests",
      "Tell passengers to inflate life vests inside the cabin",
      "Explain the brace position",
      "Identify able-bodied passengers near exits",
    ],
    wrongIndex: 1,
    explanation:
      "Life vests are donned inside but inflated OUTSIDE the aircraft. Inflating inside a flooding cabin can trap people against the ceiling and prevent them escaping.",
    safetyLink:
      "In ditching accidents where passengers inflated inside, they were pinned to the ceiling as water rose. This single error has cost lives in real incidents.",
  },
  {
    id: "mis-6",
    title: "Smoke in cabin",
    context: "Smoke is reported in the cabin. Which crew action is wrong?",
    details: [
      "Locate the source of the smoke",
      "Notify the flight deck with all available information",
      "Open all overhead bins to ventilate the cabin",
      "Don PBE before fighting any visible fire",
    ],
    wrongIndex: 2,
    explanation:
      "You do NOT open bins indiscriminately to ventilate. Opening bins can introduce oxygen to a smoldering fire and worsen it. Locate, isolate, and fight the source first.",
    safetyLink:
      "In-flight fires can reach catastrophic levels within minutes. Every oxygen source introduced before isolation accelerates that timeline. This is why fire response is the most drilled emergency procedure.",
  },
  {
    id: "mis-7",
    title: "Unaccompanied minor",
    context: "A 9-year-old unaccompanied minor is on board. Which crew action is wrong?",
    details: [
      "Verify the UM paperwork at boarding",
      "Confirm pickup person details for arrival",
      "Allow the UM to deplane unsupervised at destination",
      "Check on the UM throughout the flight",
    ],
    wrongIndex: 2,
    explanation:
      "A UM is NEVER released without the verified pickup person matching paperwork and ID. Deplaning unsupervised is a critical breach of duty of care.",
    safetyLink:
      "Airlines have faced serious legal consequences and safeguarding failures when UM protocols were not followed. The crew bears full duty of care from boarding to handover.",
  },
  {
    id: "mis-8",
    title: "Final checks at 10,000 ft",
    context: "Cabin secure for landing. Which is incorrect?",
    details: [
      "Seatbelts fastened on every passenger",
      "Tray tables stowed and seatbacks upright",
      "Overhead bins open for quick access",
      "Loose galley items secured",
    ],
    wrongIndex: 2,
    explanation:
      "Overhead bins must be CLOSED and LATCHED. Open bins risk items falling on passengers during turbulence or hard landing — a leading cause of in-cabin injuries.",
    safetyLink:
      "Head injuries from falling luggage on hard landings are among the most common in-flight injuries. Latched bins are a basic but critical protection layer.",
  },
];

export interface PressurePrompt {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const pressurePrompts: PressurePrompt[] = [
  {
    id: "pp-1",
    scenario: "Mid-flight, a passenger collapses in the aisle.",
    question: "Your FIRST action?",
    options: [
      "Call the flight deck immediately",
      "Check responsiveness and breathing",
      "Grab the AED",
      "Make a PA for a doctor",
    ],
    correctIndex: 1,
    explanation: "Always assess first — you cannot manage what you have not assessed. Then call for help.",
  },
  {
    id: "pp-2",
    scenario: "The captain commands: 'Cabin crew, brace for impact.'",
    question: "What do you do FIRST?",
    options: [
      "Stand up and shout brace commands",
      "Sit in your jumpseat and shout brace commands",
      "Run to check passengers",
      "Go to the cockpit for instructions",
    ],
    correctIndex: 1,
    explanation: "Sit in your jumpseat, harness on, and shout brace commands continuously. Standing risks injury or being thrown.",
  },
  {
    id: "pp-3",
    scenario: "Your door indicator shows DISARMED but you remember setting it to ARMED.",
    question: "Your action?",
    options: [
      "Open the door to check the girt bar",
      "Re-arm and request a cross-check",
      "Ignore — the indicator is probably faulty",
      "Tell the senior after takeoff",
    ],
    correctIndex: 1,
    explanation: "Re-arm and immediately get a cross-check from your partner. Never open. Never ignore. Never wait.",
  },
  {
    id: "pp-4",
    scenario: "Smoke is coming from an overhead bin.",
    question: "First action?",
    options: [
      "Open the bin to investigate",
      "Don PBE, get extinguisher, then approach",
      "Evacuate the row",
      "Call the captain only",
    ],
    correctIndex: 1,
    explanation: "Protective equipment FIRST. Approach a fire without PBE and you become the next casualty.",
  },
  {
    id: "pp-5",
    scenario: "A passenger refuses to fasten their seatbelt before takeoff.",
    question: "Your response?",
    options: [
      "Take off anyway — it's their choice",
      "Calmly explain it's a legal requirement and notify senior if refused",
      "Physically fasten it for them",
      "Move them to another seat",
    ],
    correctIndex: 1,
    explanation: "Communicate the legal requirement calmly. If still refused, notify the senior — this becomes a safety/compliance escalation.",
  },
  {
    id: "pp-6",
    scenario: "Rapid decompression — masks drop.",
    question: "Your IMMEDIATE action?",
    options: [
      "Help the nearest passenger first",
      "Put your own mask on first, then assist",
      "Call the cockpit",
      "Walk down the aisle",
    ],
    correctIndex: 1,
    explanation: "OWN MASK FIRST. Always. Useful consciousness at altitude is seconds. Without oxygen you cannot help anyone.",
  },
  {
    id: "pp-7",
    scenario: "A passenger appears intoxicated and aggressive at boarding.",
    question: "Your action?",
    options: [
      "Allow boarding to avoid confrontation",
      "Notify the senior crew and the flight deck before pushback",
      "Serve them more water and hope they calm down",
      "Confront them yourself in front of others",
    ],
    correctIndex: 1,
    explanation: "Pre-flight is the time to escalate. Once airborne the situation becomes much harder to manage. Notify senior + flight deck.",
  },
  {
    id: "pp-8",
    scenario: "You smell something burning in the lavatory.",
    question: "FIRST action?",
    options: [
      "Open the lavatory door to investigate",
      "Don PBE, grab extinguisher, then carefully open the door",
      "Pour water under the door",
      "Wait to see if it goes away",
    ],
    correctIndex: 1,
    explanation: "PBE on, extinguisher in hand BEFORE opening. A lavatory fire can flash on contact with oxygen — protect yourself first.",
  },
  {
    id: "pp-9",
    scenario: "An unaccompanied minor is upset and crying mid-flight.",
    question: "Best first action?",
    options: [
      "Tell them to be quiet",
      "Sit with them, listen, reassure, offer something to drink",
      "Move them to an empty row alone",
      "Call the cockpit",
    ],
    correctIndex: 1,
    explanation: "UMs are your duty of care. Calm presence, listening, basic comfort. Never isolate them.",
  },
  {
    id: "pp-10",
    scenario: "The captain is on the PA but you cannot hear due to galley noise.",
    question: "Your action?",
    options: [
      "Guess what was said",
      "Call the flight deck on the interphone to confirm",
      "Ask a passenger what they heard",
      "Wait for someone to repeat it",
    ],
    correctIndex: 1,
    explanation: "Closed-loop communication. If you didn't hear it, confirm it. Guessing safety information is unacceptable.",
  },
];

export interface FastRecallQuestion {
  id: string;
  topic: "Terminology" | "Airport Codes" | "Equipment";
  question: string;
  options: string[];
  correctIndex: number;
}

export const fastRecallQuestions: FastRecallQuestion[] = [
  { id: "fr-1", topic: "Terminology", question: "What is the empennage?", options: ["The wings", "The tail section", "The cockpit", "The galley"], correctIndex: 1 },
  { id: "fr-2", topic: "Terminology", question: "Girt bar to FLOOR means...", options: ["Disarmed", "Armed", "Open", "Locked"], correctIndex: 1 },
  { id: "fr-3", topic: "Terminology", question: "Sterile cockpit applies below...", options: ["5,000 ft", "10,000 ft", "18,000 ft", "FL350"], correctIndex: 1 },
  { id: "fr-4", topic: "Terminology", question: "PAX stands for...", options: ["Pilots", "Passengers", "Pax aircraft", "Pacific routes"], correctIndex: 1 },
  { id: "fr-5", topic: "Terminology", question: "Mayday is repeated...", options: ["Once", "Twice", "Three times", "Five times"], correctIndex: 2 },
  { id: "fr-6", topic: "Terminology", question: "Time of Useful Consciousness at 35,000 ft is approximately...", options: ["5 minutes", "1 minute", "15–30 seconds", "60 seconds"], correctIndex: 2 },
  { id: "fr-7", topic: "Terminology", question: "Pan-pan indicates...", options: ["Life-threatening emergency", "Urgent but not life-threatening", "All clear", "Mechanical issue"], correctIndex: 1 },
  { id: "fr-8", topic: "Airport Codes", question: "JFK is in...", options: ["New York", "New Jersey", "Boston", "Chicago"], correctIndex: 0 },
  { id: "fr-9", topic: "Airport Codes", question: "LHR is...", options: ["London Heathrow", "Long Haul Reno", "Lisbon", "Liverpool"], correctIndex: 0 },
  { id: "fr-10", topic: "Airport Codes", question: "DXB is...", options: ["Doha", "Dubai", "Delhi", "Damascus"], correctIndex: 1 },
  { id: "fr-11", topic: "Airport Codes", question: "SIN is in...", options: ["Sydney", "Singapore", "Seoul", "Shanghai"], correctIndex: 1 },
  { id: "fr-12", topic: "Airport Codes", question: "CDG is in...", options: ["Paris", "Brussels", "Geneva", "Madrid"], correctIndex: 0 },
  { id: "fr-13", topic: "Airport Codes", question: "ORD is in...", options: ["Orlando", "Chicago", "Oregon", "Ottawa"], correctIndex: 1 },
  { id: "fr-14", topic: "Airport Codes", question: "HND is in...", options: ["Hong Kong", "Hanoi", "Tokyo", "Honolulu"], correctIndex: 2 },
  { id: "fr-15", topic: "Airport Codes", question: "AMS is in...", options: ["Amsterdam", "Athens", "Antwerp", "Algiers"], correctIndex: 0 },
  { id: "fr-16", topic: "Equipment", question: "Halon extinguishers are used for...", options: ["Paper fires only", "Electrical and combustible fires", "Water-based fires", "Cooking oil only"], correctIndex: 1 },
  { id: "fr-17", topic: "Equipment", question: "PBE protects against...", options: ["Cold air", "Smoke and toxic fumes", "Sunlight", "Loud noise"], correctIndex: 1 },
  { id: "fr-18", topic: "Equipment", question: "AED is used for...", options: ["Broken bones", "Cardiac arrest", "Burns", "Seizures"], correctIndex: 1 },
  { id: "fr-19", topic: "Equipment", question: "POB stands for...", options: ["Passenger Onboard", "Portable Oxygen Bottle", "Pre-Operation Briefing", "Pilot On Break"], correctIndex: 1 },
  { id: "fr-20", topic: "Equipment", question: "ELT activates...", options: ["When pulled by crew", "Automatically on impact or via switch", "Only on the ground", "By radio command"], correctIndex: 1 },
  { id: "fr-21", topic: "Equipment", question: "First Aid Kit broken seal means...", options: ["Ready for use", "Must be replaced before flight", "Use anyway", "Report after landing"], correctIndex: 1 },
  { id: "fr-22", topic: "Equipment", question: "Megaphone is used...", options: ["For PA announcements", "When PA system fails — evacuation commands", "Only on the ground", "By the captain only"], correctIndex: 1 },
  { id: "fr-23", topic: "Terminology", question: "An ARP is...", options: ["Aviation Rest Period", "Aircraft Reference Point", "All-Round Patrol", "Approved Routing Plan"], correctIndex: 1 },
  { id: "fr-24", topic: "Terminology", question: "CRM stands for...", options: ["Crew Resource Management", "Cabin Refuel Mode", "Critical Reaction Maneuver", "Cargo Restraint Method"], correctIndex: 0 },
  { id: "fr-25", topic: "Terminology", question: "SOP stands for...", options: ["Standard Operating Procedure", "Safety On-board Protocol", "Senior Officer Present", "Secured On Position"], correctIndex: 0 },
  { id: "fr-26", topic: "Terminology", question: "What does NITS stand for in a captain's briefing?", options: ["Nature, Intention, Time, Special instructions", "Notify, Inspect, Test, Secure", "Normal, Immediate, Tactical, Safety", "None of the above"], correctIndex: 0 },
  { id: "fr-27", topic: "Airport Codes", question: "LAX is in...", options: ["Las Vegas", "Los Angeles", "Long Beach", "Louisville"], correctIndex: 1 },
  { id: "fr-28", topic: "Airport Codes", question: "SYD is in...", options: ["Shanghai", "Singapore", "Sydney", "Seoul"], correctIndex: 2 },
  { id: "fr-29", topic: "Airport Codes", question: "FRA is in...", options: ["France (Paris)", "Frankfurt", "Florence", "Faro"], correctIndex: 1 },
  { id: "fr-30", topic: "Equipment", question: "When is a life vest inflated?", options: ["Before boarding the aircraft", "Inside the aircraft for practice", "Outside the aircraft after evacuation", "Only on the slide"], correctIndex: 2 },
];

export interface MatchPair {
  left: string;
  right: string;
}

export interface MatchSet {
  id: string;
  title: string;
  description: string;
  pairs: MatchPair[];
}

export const matchSets: MatchSet[] = [
  {
    id: "match-terms",
    title: "Term ↔ Definition",
    description: "Match each term to its correct definition.",
    pairs: [
      { left: "Girt bar", right: "Connects slide to floor — arming mechanism" },
      { left: "Empennage", right: "The aircraft tail section" },
      { left: "Bulkhead", right: "Structural dividing wall in the cabin" },
      { left: "Jumpseat", right: "Crew fold-down seat for taxi/takeoff/landing" },
      { left: "Sterile cockpit", right: "No non-essential talk below 10,000 ft" },
    ],
  },
  {
    id: "match-equipment",
    title: "Equipment ↔ Purpose",
    description: "Match each piece of equipment to its primary purpose.",
    pairs: [
      { left: "AED", right: "Restore heart rhythm in cardiac arrest" },
      { left: "PBE", right: "Protect against smoke and toxic fumes" },
      { left: "Halon extinguisher", right: "Electrical and combustible fires" },
      { left: "Life vest", right: "Flotation in water emergencies" },
      { left: "ELT", right: "Transmit position after a crash" },
    ],
  },
  {
    id: "match-airports",
    title: "Code ↔ City",
    description: "Match each airport code to its city.",
    pairs: [
      { left: "JFK", right: "New York" },
      { left: "LHR", right: "London" },
      { left: "DXB", right: "Dubai" },
      { left: "SIN", right: "Singapore" },
      { left: "HND", right: "Tokyo" },
    ],
  },
];
