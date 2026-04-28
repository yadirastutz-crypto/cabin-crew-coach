export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  whatHappened: string;
  procedureFailed: string;
  whyExists: string;
  lesson: string;
  reflectionQuestion: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  scenario: {
    prompt: string;
    goodResponse: string;
  };
  testTakeaway: string;
  isFree: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "seatbelt-turbulence",
    title: "Seatbelt Sign Ignored in Turbulence",
    category: "Passenger Safety",
    summary: "A passenger was seriously injured when turbulence struck and they were not properly secured.",
    whatHappened:
      "Mid-flight, the seatbelt sign had been illuminated due to moderate turbulence forecast. A passenger had unbuckled and stood in the aisle. When sudden, severe turbulence hit without further warning, the passenger was thrown against the overhead bins and sustained serious injuries. The crew had not enforced seatbelt compliance.",
    procedureFailed:
      "Failure to actively enforce seatbelt compliance and prepare the cabin for turbulence. The crew chose not to confront a non-compliant passenger.",
    whyExists:
      "Turbulence can occur suddenly and without prior warning, even in calm-looking skies. The seatbelt sign is a direct safety instruction — when illuminated, compliance is non-negotiable. Crew are legally empowered and professionally obligated to enforce it.",
    lesson:
      "Passenger compliance with the seatbelt sign is not optional. Your job is not to police — it is to protect. A calm, firm, respectful enforcement conversation is part of safety, not customer service. If a passenger refuses, notify the senior crew and document it.",
    reflectionQuestion:
      "A passenger says 'I'll be fine, I'm just going to the bathroom.' The seatbelt sign is on. What do you say — and how do you say it without conflict?",
    quiz: {
      question: "When the seatbelt sign is illuminated and a passenger refuses to sit down, your next step is:",
      options: [
        "Leave them standing — it's their choice as an adult",
        "Physically push them into their seat",
        "Calmly explain the legal requirement and notify the senior crew if refused",
        "Ask another passenger to speak to them",
      ],
      correctIndex: 2,
      explanation:
        "Your role is to communicate clearly and firmly, then escalate. Compliance with safety instructions is a legal requirement on a commercial aircraft. Notify the senior if the passenger continues to refuse — it becomes a safety/compliance issue, not just a service one.",
    },
    scenario: {
      prompt:
        "Turbulence is forecast. You've made the PA, the seatbelt sign is on, and you notice a passenger standing in the aisle near Row 22 talking to another passenger. A crew member next to you says 'Just leave it — they'll sit when they feel it.' What do you do?",
      goodResponse:
        "You approach Row 22 calmly. 'Excuse me — I need to ask you to return to your seat and fasten your seatbelt. The turbulence can come without further warning and your safety is my priority.' You wait for compliance, then return to your position. If the crew member next to you disagreed with the approach, you address it privately after the flight — not in front of passengers.",
    },
    testTakeaway:
      "Passenger compliance is a safety issue, not just a service issue. Calm, professional enforcement is part of the job.",
    isFree: true,
  },
  {
    id: "door-arming-error",
    title: "Door Arming / Disarming Error",
    category: "Emergency Equipment",
    summary: "A door was not in the correct mode, resulting in an unintended emergency slide deployment.",
    whatHappened:
      "During turnaround, a crew member was distracted and failed to disarm their assigned door before opening it for catering access. The slide deployed automatically, injuring a ground crew member standing in proximity. The cross-check had been skipped due to time pressure. The crew member had assumed the door had already been disarmed.",
    procedureFailed:
      "Failure to disarm the door before opening and failure to complete the cross-check. The verbal confirmation step — 'disarmed and cross-checked' — was skipped.",
    whyExists:
      "Door mode errors are among the most preventable — and most damaging — in aviation. The cross-check creates a two-person verification system. Even if one crew member makes an error, their partner is a second layer of defence. Skipping it removes that layer entirely.",
    lesson:
      "Door procedures must be deliberate, verbalized, and cross-checked every single time. There is no exception for time pressure. A slide deployment injures people, grounds aircraft, costs tens of thousands of dollars, and begins a formal investigation. Rushing the check is never worth it.",
    reflectionQuestion:
      "Why do you think experienced crew members still make door errors, even with years of training? What could you do personally to make sure you never skip this step?",
    quiz: {
      question: "Before opening a door during turnaround, your first check is:",
      options: [
        "That passengers have all deplaned",
        "That the door is disarmed and your partner has cross-checked",
        "That you have the captain's permission",
        "That the galley equipment is secured",
      ],
      correctIndex: 1,
      explanation:
        "The door must be confirmed disarmed and cross-checked before any door is opened at the gate. This is non-negotiable regardless of time pressure, distractions, or assumptions about what your colleague has already done.",
    },
    scenario: {
      prompt:
        "It's a tight turnaround. The senior crew member says 'Quick — open L1 for catering.' You haven't had time to fully confirm your cross-check verbally with the crew at L2. What do you do?",
      goodResponse:
        "You hold your door. You call across to the L2 crew member: 'Confirm disarmed and cross-check?' You wait for the verbal response before proceeding. Then you open your door. If the senior crew member pressures you to skip the cross-check, you explain clearly: 'I need to complete the cross-check before opening — it'll take ten seconds.' You do not open a door without confirmation.",
    },
    testTakeaway:
      "Never rush door procedures. Precise, verbalized, cross-checked — every time, without exception.",
    isFree: true,
  },
  {
    id: "smoke-fire-warning-missed",
    title: "Smoke Warning Signs Not Acted On",
    category: "Fire Safety",
    summary: "Smoke indicators were not recognized quickly enough, allowing a situation to develop.",
    whatHappened:
      "A faint smell of burning in the cabin was initially attributed to normal flight odors. A passenger reported it to the crew, who checked briefly and saw nothing obvious. Twenty minutes later, smoke began emerging from beneath a seat. By then, the situation required a significant emergency response. The delay in recognition and communication slowed the initial response.",
    procedureFailed:
      "Failure to treat an ambiguous smoke report as a confirmed emergency from the outset, and failure to immediately notify the flight deck and initiate the smoke and fire checklist.",
    whyExists:
      "In-flight fires can reach catastrophic levels within minutes. Any indication of smoke — even uncertain — must be treated as real until proven otherwise. The cost of treating a false alarm as real is embarrassment. The cost of treating a real fire as a false alarm can be the aircraft.",
    lesson:
      "Early recognition and assertive communication are your most powerful tools. If you smell something — report it. If a passenger reports something — investigate it. If you can't find the source — report it to the flight deck anyway. Always have your PBE and extinguisher accessible before approaching anything that might be fire.",
    reflectionQuestion:
      "A passenger reports 'a weird smell.' You check and don't see anything. What is your internal decision process in the next 60 seconds?",
    quiz: {
      question: "A passenger reports smelling something burning. You check and cannot immediately locate a source. You should:",
      options: [
        "Tell the passenger it's probably nothing and monitor",
        "Wait 5 minutes and check again",
        "Notify the flight deck immediately, continue investigating, and prepare your equipment",
        "Make a PA asking if any other passengers noticed anything",
      ],
      correctIndex: 2,
      explanation:
        "Notify the flight deck immediately — they need to know. An ambiguous smoke report is treated as real. You continue to investigate while your colleague prepares PBE and extinguisher. Time is the critical variable in any in-flight fire.",
    },
    scenario: {
      prompt:
        "You walk past Row 15 and notice a faint electrical smell. Another crew member says 'It's probably just the passenger's laptop charger.' What do you do?",
      goodResponse:
        "You don't dismiss it. You open the overhead bin, check under the seats, and confirm there is no visible source. You call the flight deck: 'Cockpit, this is the cabin — we have a faint electrical smell near Row 15, no source confirmed. We are investigating.' You get your colleague to retrieve a BCF extinguisher. You do not wait for the smell to get worse before reporting.",
    },
    testTakeaway:
      "Hesitation during any smoke or fire event is dangerous. Report first, investigate second, never the other way around.",
    isFree: false,
  },
  {
    id: "crew-communication-breakdown",
    title: "Breakdown in Crew Communication",
    category: "Crew Resource Management",
    summary: "Critical safety information failed to reach the right crew member at the right time.",
    whatHappened:
      "During a developing medical emergency, the crew member at the front of the aircraft was not fully informed of what was happening at the rear galley. Messages passed through intermediate crew members were shortened or softened. The flight deck received a delayed and incomplete picture of the situation. Coordination was poor, response was slower, and the passenger received delayed care as a result.",
    procedureFailed:
      "Poor CRM — Crew Resource Management. No closed-loop communication. Critical information was not verified. No single crew member took command of coordinating the response.",
    whyExists:
      "Aviation depends on precise, shared situational awareness. Every crew member must have the same operational picture. Incomplete communication creates gaps that emergencies exploit. Closed-loop communication — saying it, confirming it, and getting acknowledgment — exists because human memory and attention under stress are unreliable.",
    lesson:
      "Say it clearly, confirm it, and close the loop. In any developing situation, one crew member should coordinate, one should communicate, and all should update each other. Use the interphone. Use precise language. Never assume someone else has passed the message.",
    reflectionQuestion:
      "How do you professionally challenge a senior crew member if you believe they have made a decision that compromises safety?",
    quiz: {
      question: "During a medical emergency, you call the front galley to update the senior crew member. They do not acknowledge. You should:",
      options: [
        "Assume they heard and continue managing the situation",
        "Call again immediately and use their name to confirm receipt of the information",
        "Wait for them to call you",
        "Tell a passing passenger to relay the message",
      ],
      correctIndex: 1,
      explanation:
        "Closed-loop communication requires acknowledgment. If you don't receive it, re-send. Use their name, confirm the information, and wait for a response. In emergencies, assumption is risk.",
    },
    scenario: {
      prompt:
        "You are managing a passenger medical event at the rear. The senior crew member at the front has not responded to your last interphone call. You need them to notify the flight deck and prepare the first aid kit. What do you do?",
      goodResponse:
        "You try the interphone again with their name: 'Sarah, this is [your name] at the rear — I need you to notify the captain we have a medical situation at Row 34, and retrieve the first aid kit. Please confirm.' If no response, you send your colleague physically to the front. You continue managing the patient. You do not wait passively.",
    },
    testTakeaway:
      "Good communication is a safety tool. If the loop is not closed, the communication has not happened.",
    isFree: false,
  },
  {
    id: "equipment-knowledge-gap",
    title: "Emergency Equipment Knowledge Gap",
    category: "Emergency Equipment",
    summary: "A crew member could not confidently use emergency equipment when it was needed.",
    whatHappened:
      "During a medical event, a crew member retrieved the AED but hesitated significantly when attaching the pads. They had memorized the steps in training but had not physically practiced the process recently. Time was lost. In a separate incident, a crew member used the wrong type of extinguisher on a fire — choosing a water extinguisher for what was an electrical fire. Neither crew member had practiced their equipment under simulated pressure.",
    procedureFailed:
      "Insufficient equipment familiarity beyond theoretical knowledge. Crew could name the equipment but not operate it confidently under stress.",
    whyExists:
      "Knowing the name and purpose of equipment is not the same as being able to use it in 10 seconds with shaking hands in a noisy, stressful environment. Equipment checks, drills, and regular hands-on practice build the muscle memory that theory cannot.",
    lesson:
      "For every piece of safety equipment: know what it is, where it is on this aircraft, how to operate it, its limitations, and when NOT to use it. Practice the physical steps — not just the verbal descriptions. Equipment you can describe but not use in under 10 seconds is not equipment you can rely on.",
    reflectionQuestion:
      "Which piece of emergency equipment are you least confident using under pressure? What would it take to change that?",
    quiz: {
      question: "A fire has started in an overhead bin. It appears to be caused by a lithium battery. Which extinguisher is correct?",
      options: [
        "Water — to cool the battery",
        "Halon BCF — effective on lithium battery fires",
        "CO2 only — nothing else works",
        "No extinguisher — evacuate immediately",
      ],
      correctIndex: 1,
      explanation:
        "Halon BCF (Bromochlorodifluoromethane) is the standard in-flight extinguisher for most fire types including lithium battery fires. Water on a lithium battery fire can accelerate the reaction. The right tool matters — and must be known before the emergency, not during it.",
    },
    scenario: {
      prompt:
        "A passenger's bag in the overhead bin begins to emit smoke. You suspect a lithium battery. You have a halon extinguisher and a water extinguisher available. Describe your exact steps from the moment you see the smoke.",
      goodResponse:
        "Immediately don your PBE. Notify the flight deck via interphone. Retrieve the halon extinguisher. Have your colleague keep passengers clear of the area. Open the bin carefully, directing the extinguisher at the base of the smoke/flame. Do NOT use water. Close the bin if possible. Continue monitoring. Do not assume it is out — lithium fires can re-ignite. Keep the flight deck updated.",
    },
    testTakeaway:
      "Know it, locate it, and practice it. Small technical details about equipment are tested because they matter under pressure.",
    isFree: false,
  },
  {
    id: "service-vs-safety-mindset",
    title: "Service Mindset Over Safety Mindset",
    category: "Professional Judgment",
    summary: "A developing safety concern was treated as a service issue until it escalated.",
    whatHappened:
      "A passenger was acting erratically and becoming louder as the flight progressed. The crew interpreted the situation as a difficult customer and focused on keeping them calm through service — offering drinks, food, and accommodation. It was only when the behavior escalated to threatening other passengers that a crew member notified the flight deck. By then, a disruptive passenger situation was in full effect and options were limited.",
    procedureFailed:
      "Failure to identify the moment a customer service situation became a safety concern, and failure to escalate early to the senior crew and flight deck.",
    whyExists:
      "Cabin crew are trained safety professionals first. Service is part of the role — but it must never override safety judgment. Recognizing when a situation crosses the line from 'inconvenience' to 'risk' is a core professional skill.",
    lesson:
      "Always ask: is this inconvenience, or is this risk? When a passenger situation creates a threat to themselves, other passengers, or crew — it is a safety issue. It must be escalated early, documented, and communicated to the flight deck. Early escalation gives more options. Late escalation gives fewer.",
    reflectionQuestion:
      "At what point does a disruptive passenger become a safety concern rather than a service challenge? What are your early warning signs?",
    quiz: {
      question: "A passenger is becoming increasingly agitated and speaking loudly. Other passengers are looking uncomfortable. Your first action is:",
      options: [
        "Offer them a complimentary drink to calm them down",
        "Ignore it and hope they settle",
        "Notify the senior crew immediately and document what you've observed",
        "Confront them publicly to assert authority",
      ],
      correctIndex: 2,
      explanation:
        "Early notification to the senior crew creates a shared awareness and begins the escalation chain while options are still available. Documentation begins now. Service gestures can follow — but safety judgment must come first.",
    },
    scenario: {
      prompt:
        "A passenger in Row 10 has been drinking since before boarding. They aren't aggressive yet, but they're loud and their behavior is becoming the focus of other passengers' attention. A colleague says 'Just give them some water and food — they'll calm down.' What do you do?",
      goodResponse:
        "You tell your colleague you're going to notify the senior crew of the situation. You approach the senior: 'Passenger in 10C — pre-boarding drinks, increasing volume, other passengers are noticing. I want us to be aware in case this develops.' The senior logs it. You may offer water, but you do not serve any more alcohol and you continue to monitor. You don't wait for the situation to get worse before it's on the crew's radar.",
    },
    testTakeaway:
      "Safety-first judgment is what separates a strong cabin crew member from a good one. Service skills are learned. Safety judgment is developed.",
    isFree: false,
  },
  {
    id: "evacuation-command-hesitation",
    title: "Hesitation During Evacuation Commands",
    category: "Emergency Procedures",
    summary: "Delayed evacuation commands resulted in slower passenger response in a drill scenario — and in a real incident, in injury.",
    whatHappened:
      "Following a hard landing with aircraft damage, a cabin crew member at one of the exits froze briefly before beginning evacuation commands. The hesitation — estimated at 8–12 seconds — delayed passenger movement from that door. In another documented event, a crew member began the evacuation command but dropped their volume when passengers looked surprised, reducing compliance. Both came down to the same issue: commands felt unnatural to deliver.",
    procedureFailed:
      "Failure to deliver loud, assertive, continuous commands immediately and without hesitation. The brace for impact and evacuation commands must be instinctive — not deliberated.",
    whyExists:
      "Passengers look to crew for direction in emergencies. If the crew member hesitates or appears uncertain, passengers hesitate too. A 90-second evacuation standard exists — every second of hesitation erodes that window.",
    lesson:
      "Your commands save lives. They are not rude, not panicking, not embarrassing — they are essential. Drill the exact words until they feel automatic. 'BRACE! BRACE! BRACE!' must be shouted without thinking. The instinct to be polite is trained out. The instinct to command is trained in.",
    reflectionQuestion:
      "Have you ever practiced shouting evacuation commands out loud? What would it take to do it confidently in front of 150 frightened passengers?",
    quiz: {
      question: "During an evacuation, your commands should be:",
      options: [
        "Polite and calm — to avoid causing panic",
        "Loud, firm, repeated, and continuous until the cabin is clear",
        "Given once clearly, then silence to let passengers think",
        "Delivered only through the PA system",
      ],
      correctIndex: 1,
      explanation:
        "Commands must cut through noise, shock, and confusion. They must be repeated continuously. Silence is not calm — it is ambiguity. Passengers need to hear your voice and know exactly what to do. Loudness is a tool, not a character flaw.",
    },
    scenario: {
      prompt:
        "The aircraft has just come to a halt after an emergency landing. The captain has commanded evacuation. Your door is usable, the slide is deployed. There are 30 passengers in your section who are frozen in their seats looking at you. What do you say and how do you say it?",
      goodResponse:
        "'JUMP AND SLIDE! JUMP AND SLIDE! LEAVE EVERYTHING! COME THIS WAY!' You repeat it continuously. You point to the slide, you make eye contact with the nearest passenger, you gesture with your whole arm. You do not stop commanding until they move. You direct them one at a time. You physically guide the first hesitant passenger toward the slide if necessary. You are the loudest thing in the cabin.",
    },
    testTakeaway:
      "Your evacuation command is a safety tool. Practice it until it is instinct. Volume saves lives.",
    isFree: false,
  },
  {
    id: "cross-check-complacency",
    title: "Cross-Check Complacency After Repeated Flights",
    category: "Safety Culture",
    summary: "Experienced crew stopped verbalizing and confirming cross-checks — treating them as formalities.",
    whatHappened:
      "A veteran crew member with years of experience had stopped fully performing the verbal cross-check confirmation on turnarounds, instead giving a visual wave from across the cabin. On one occasion, their partner's door had not been fully disarmed. The visual wave was returned without confirmation. The door was opened. The slide deployed in a partially inflated state, injuring the crew member's arm.",
    procedureFailed:
      "Normalization of deviation — the gradual drift from standard procedure that feels harmless because 'nothing has gone wrong before.' The cross-check became a social gesture instead of a safety verification.",
    whyExists:
      "Cross-checks are not formalities. They are a formal transfer of verified safety information. The exact words 'disarmed and cross-checked' represent a specific, confirmed state — not an approximation, not a feeling, not a guess.",
    lesson:
      "Experience can be an asset or a liability. When procedures start to feel like formalities, that is when you are most at risk. Safety culture requires that standards are applied most carefully by the most experienced crew — because they set the norm for everyone watching.",
    reflectionQuestion:
      "How would you respond if a senior crew member demonstrated a casual approach to a procedure that you know should be completed precisely?",
    quiz: {
      question: "You've done 400 flights. The cross-check feels like a routine. The correct mindset is:",
      options: [
        "Trust your experience — you know when something is wrong",
        "Apply the procedure exactly as trained, every single time, regardless of experience",
        "Speed it up — experienced crew can shortcut safely",
        "Delegate the cross-check to junior crew so they practice",
      ],
      correctIndex: 1,
      explanation:
        "Experience does not reduce the need for procedure — it reinforces it. The cross-check exists because even experienced crew make errors. The 401st flight is not protected by the first 400.",
    },
    scenario: {
      prompt:
        "A senior crew member you respect says 'Just wave across when you're done — that's what we all do.' You are on the 3rd turnaround of the day. What do you do?",
      goodResponse:
        "You complete your own disarm procedure precisely and then call across vocally: '[Name], L1 disarmed — confirm L2?' You wait for the verbal response before proceeding. After the turnaround, if appropriate, you address it privately: 'I prefer to keep the verbal cross-check going — I know it feels slow but I don't want to develop a habit I'd regret.' You do not criticize publicly. You do not compromise.",
    },
    testTakeaway:
      "Complacency is the quiet danger. Procedures exist for the days when you are tired, distracted, or rushed. Apply them those days most carefully of all.",
    isFree: false,
  },
];

export const trainingPrinciples = [
  {
    title: "Procedures are memorized for a reason",
    detail: "In high-stress situations, you revert to what you have drilled. Procedures must be automatic — not recalled.",
  },
  {
    title: "Exact wording matters",
    detail: "'Armed and cross-checked' is not 'armed.' 'Disarmed' is not 'open.' Precision prevents ambiguity in emergencies.",
  },
  {
    title: "Repetition builds calm under pressure",
    detail: "The crew who stay calm in emergencies have done the actions so many times that they happen without panic.",
  },
  {
    title: "Small details become big consequences",
    detail: "A slide deployed wrong. A vest inflated inside. An extinguisher misused. Details are not details in aviation — they are outcomes.",
  },
  {
    title: "Cross-checks prevent human error",
    detail: "No single person is perfect under pressure. Cross-checks are not bureaucracy — they are the second pair of eyes that saves the first pair's mistake.",
  },
  {
    title: "Confidence must be paired with discipline",
    detail: "Confidence without procedure is overconfidence. The best crew members are self-assured and precise — not casual.",
  },
];

export const traineesMissOften = [
  "Treating commands as words instead of actions",
  "Memorizing facts without understanding consequences",
  "Underestimating how critical cross-checks are",
  "Forgetting that calm enforcement is part of safety",
  "Focusing on service before establishing safety",
  "Assuming experience removes the need for precision",
  "Waiting for someone else to escalate a concern",
];
