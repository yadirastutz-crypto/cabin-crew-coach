export type ScenarioDifficulty = "standard" | "fast" | "chaos";
export type ScenarioCategory =
  | "Medical"
  | "Passenger"
  | "Turbulence"
  | "Fire/Smoke"
  | "Lavatory"
  | "Unaccompanied Minor"
  | "Language Barrier"
  | "Boarding";

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  title: string;
  situation: string;
  timer: number;
  options: ScenarioOption[];
  debrief: string;
  principle: string;
}

export const scenarios: Scenario[] = [
  // MEDICAL
  {
    id: "med-1",
    category: "Medical",
    difficulty: "standard",
    title: "Passenger Feels Faint",
    situation: "During cruise, a passenger in 14C presses the call button. When you arrive, she is pale, sweating, and says she feels dizzy and may pass out. She has no known medical conditions and ate normally today.",
    timer: 45,
    options: [
      { id: "a", text: "Recline her seat, raise her legs, offer water, assess further and call for any medical personnel onboard.", isCorrect: true, explanation: "This is the correct immediate response. Raising the legs assists venous return. Assess AVPU (Alert, Voice, Pain, Unresponsive), check for known conditions, and get the POB ready if needed." },
      { id: "b", text: "Give her orange juice immediately for possible low blood sugar.", isCorrect: false, explanation: "Never give food or drink to a passenger who may be about to lose consciousness — aspiration risk is serious. Assess first before offering anything orally." },
      { id: "c", text: "Ask her to move to the back galley so she has more space.", isCorrect: false, explanation: "Moving a patient who may faint is dangerous. Keep her seated, legs elevated, and assess in place. Movement could trigger a collapse." },
      { id: "d", text: "Call the flight deck and declare a medical emergency immediately.", isCorrect: false, explanation: "Assess the patient first. The flight deck should be notified, but a medical emergency declaration is premature — this may resolve with standard care. Gather information before escalating." },
    ],
    debrief: "Syncope (fainting) is one of the most common in-flight medical events. First response: recline seat, raise legs, assess responsiveness (AVPU), check for known conditions, and call for any medical personnel on board. Notify the flight deck once you have an assessment.",
    principle: "Assess before escalating. Never give anything by mouth to a patient who may lose consciousness.",
  },
  {
    id: "med-2",
    category: "Medical",
    difficulty: "fast",
    title: "Passenger Unresponsive in Seat",
    situation: "Approaching final descent, you notice a passenger in 22A has not moved in 40 minutes. His eyes are closed, he does not respond to the call bell, and his neighbour says he has been 'asleep' the whole flight. When you tap his shoulder, there is no response.",
    timer: 30,
    options: [
      { id: "a", text: "Attempt to rouse him using a sternal rub, call for help, prepare the AED and POB, and notify the flight deck immediately.", isCorrect: true, explanation: "Unresponsive passenger = treat as a potential cardiac event. Use the sternal rub, call for medical professionals on board, get the AED, and get the flight deck informed now. Do not wait." },
      { id: "b", text: "Ask his neighbour what medication he is on before taking any action.", isCorrect: false, explanation: "You cannot delay responding to an unresponsive passenger. Get help and begin assessment simultaneously — information gathering can happen in parallel." },
      { id: "c", text: "Wait two more minutes to see if he wakes up on his own.", isCorrect: false, explanation: "Every minute without assessment in an unresponsive patient is a risk. You must act now." },
      { id: "d", text: "Shake him firmly and splash water on his face.", isCorrect: false, explanation: "The sternal rub is the correct arousal stimulus for an unresponsive patient. Splashing water is not a clinical tool and wastes time." },
    ],
    debrief: "Unresponsive passenger: rouse using sternal rub → call for assistance and medical professionals → get AED and POB → inform flight deck → begin CPR if no pulse/breathing confirmed. Time is critical.",
    principle: "Unresponsive = emergency until proven otherwise. Act immediately.",
  },
  {
    id: "med-3",
    category: "Medical",
    difficulty: "chaos",
    title: "Seizure During Descent",
    situation: "Five minutes before landing, a passenger in 31D begins convulsing. Other passengers in surrounding rows are panicking. The seatbelt sign is on. Two passengers are standing up trying to help. The senior crew member is at the back.",
    timer: 25,
    options: [
      { id: "a", text: "Clear the area, tell bystanders to sit and belt up, protect the passenger's head, do not restrain them, and immediately notify the senior crew member and flight deck.", isCorrect: true, explanation: "During a seizure, never restrain the patient — this can cause injury. Protect the head, clear surrounding space, ensure bystanders are seated and belted (for your safety in descent), and notify senior crew and flight deck immediately." },
      { id: "b", text: "Try to open his mouth to prevent him biting his tongue.", isCorrect: false, explanation: "This is a dangerous and outdated practice. Never put anything in the mouth of a person having a seizure. You risk serious injury to yourself and the patient." },
      { id: "c", text: "Ask the captain to declare a medical emergency while you physically restrain the passenger.", isCorrect: false, explanation: "Restraining a seizing patient can cause fractures and increases the risk of injury. Focus on safety of the environment, not physical control." },
      { id: "d", text: "Wait for the seizure to stop, then assess.", isCorrect: false, explanation: "You must act during the seizure: clear the space, protect the head, notify the flight deck. Post-ictal assessment follows. Don't wait passively." },
    ],
    debrief: "Seizure response: do NOT restrain, do NOT put anything in the mouth. Protect the head, clear the space, note the seizure duration, ensure other passengers are seated and belted, notify flight deck. Post-seizure: recovery position, assess breathing, monitor.",
    principle: "Protection, not restraint. Time the seizure and report duration to the flight deck.",
  },

  // PASSENGER
  {
    id: "pax-1",
    category: "Passenger",
    difficulty: "standard",
    title: "Intoxicated Passenger",
    situation: "A passenger in 7B who boarded appearing mildly intoxicated has consumed three glasses of wine during the flight. He is now speaking loudly, making offensive comments to the passenger next to him, and refusing to lower his voice when asked.",
    timer: 45,
    options: [
      { id: "a", text: "Stop serving alcohol, speak to him calmly but firmly in private, document the behaviour, and inform the senior crew member.", isCorrect: true, explanation: "Cease alcohol service immediately. Speak privately if possible — public confrontation escalates situations. Document clearly. Inform your senior crew and continue to monitor. If behaviour continues, the flight deck must be notified." },
      { id: "b", text: "Offer him a coffee and move on — he will calm down.", isCorrect: false, explanation: "Ignoring disruptive behaviour is not acceptable. You have a duty of care to all passengers. This also fails to document or manage a potential safety risk." },
      { id: "c", text: "Tell him loudly in front of other passengers that he will be reported to police on landing.", isCorrect: false, explanation: "Public ultimatums humiliate passengers and escalate conflict. This often makes situations dramatically worse. Use de-escalation and involve senior crew, not threats." },
      { id: "d", text: "Ask another passenger to speak to him as a neutral third party.", isCorrect: false, explanation: "Involving other passengers in crew management issues is unprofessional and creates additional safety and liability risks." },
    ],
    debrief: "Intoxicated passenger procedure: stop alcohol service, speak privately and calmly, document behaviour in writing, involve senior crew, notify flight deck if needed. Aviation law gives crew authority to manage disruptive passengers. Use it professionally.",
    principle: "De-escalate. Document. Involve your chain of command. Never manage alone.",
  },
  {
    id: "pax-2",
    category: "Passenger",
    difficulty: "fast",
    title: "Passenger Refuses Safety Belt",
    situation: "The seatbelt sign has been on for 10 minutes due to moderate turbulence. A passenger in 18C has repeatedly unbuckled and is now standing in the aisle reaching for the overhead bin. He says he needs his medication urgently.",
    timer: 30,
    options: [
      { id: "a", text: "Ask him to sit down immediately, explain this is a legal safety requirement, and offer to retrieve his bag yourself if the turbulence allows.", isCorrect: true, explanation: "Safety is non-negotiable — but show empathy. The passenger may genuinely need medication. Offer to retrieve the bag yourself when safe, but he must be seated now. Explain the legal requirement, not just the preference." },
      { id: "b", text: "Let him get his bag since it will only take a second.", isCorrect: false, explanation: "Moderate turbulence can become severe without warning. A passenger who is standing when turbulence hits can be thrown and seriously injured. The Aloha Airlines and Air Canada incidents show how quickly this happens." },
      { id: "c", text: "Physically push him back into his seat.", isCorrect: false, explanation: "Physical contact without reasonable cause constitutes assault. Use verbal authority — calm, firm, clear — not physical force." },
      { id: "d", text: "Ignore it since you're in the jump seat and it's not your row.", isCorrect: false, explanation: "Cabin safety is every crew member's responsibility regardless of position. You must act." },
    ],
    debrief: "Passenger non-compliance with the seatbelt sign: state clearly that this is a legal safety requirement, not a preference. Offer to help (retrieve item yourself when safe). Escalate to senior crew if they refuse. Document it. In severe cases, the captain can involve authorities on landing.",
    principle: "Safety is a legal requirement, not a suggestion. Say it clearly. Be empathetic, not apologetic.",
  },

  // TURBULENCE
  {
    id: "turb-1",
    category: "Turbulence",
    difficulty: "standard",
    title: "Turbulence During Service",
    situation: "You are halfway through the meal service at row 20 when the aircraft suddenly begins light turbulence. The seatbelt sign illuminates. You have a full trolley, two colleagues in the aisle, and approximately 60 passengers still awaiting their meal.",
    timer: 45,
    options: [
      { id: "a", text: "Stop service immediately, stow the trolley, return to your seat and belt up. Announce that meal service will resume when the sign clears.", isCorrect: true, explanation: "When the seatbelt sign illuminates during service, you must stop immediately. A moving trolley in turbulence is a dangerous projectile. Your safety, and passenger safety, comes before completing service." },
      { id: "b", text: "Speed up service to finish quickly before turbulence worsens.", isCorrect: false, explanation: "This increases risk significantly. Turbulence can intensify without warning. A crew member standing with a trolley in severe turbulence is at serious risk of injury." },
      { id: "c", text: "Leave the trolley in the aisle temporarily while you sit down — passengers can serve themselves.", isCorrect: false, explanation: "An unsecured trolley is an extremely dangerous projectile in turbulence. It must be stowed immediately." },
      { id: "d", text: "Continue service since it's only light turbulence right now.", isCorrect: false, explanation: "The seatbelt sign represents the captain's command — not a suggestion. When it illuminates, service stops regardless of current turbulence severity." },
    ],
    debrief: "Service ceases immediately when the seatbelt sign illuminates. Secure the trolley, instruct passengers to fasten belts, return to jump seat. Service resumes only when the sign is extinguished and it is safe to stand. The sign is law, not guidance.",
    principle: "Trolleys in turbulence are projectiles. Stow first. Always.",
  },
  {
    id: "turb-2",
    category: "Turbulence",
    difficulty: "chaos",
    title: "Severe Unexpected Turbulence",
    situation: "Without warning, the aircraft drops significantly. You are in the aisle collecting rubbish when severe turbulence hits. You grab the overhead bins. A passenger is thrown into the aisle. Two call bells are ringing. Your trolley slides forward. You are unhurt.",
    timer: 20,
    options: [
      { id: "a", text: "Brace yourself, assess if you are able to safely reach your jump seat, and assess the passenger who fell — treat this as a potential injury event. Notify flight deck.", isCorrect: true, explanation: "Your safety is priority — an injured crew member cannot help anyone. Once stable, assess fallen passenger (spinal precautions if indicated), use the interphone to notify the flight deck, and manage the cabin from a position of safety." },
      { id: "b", text: "Immediately go to the passenger who fell, regardless of ongoing turbulence.", isCorrect: false, explanation: "Moving in severe turbulence risks you becoming a second casualty. Stabilise yourself first. Assess from where you are." },
      { id: "c", text: "Make a PA announcement asking passengers to remain calm while standing in the aisle.", isCorrect: false, explanation: "You should not remain standing in severe turbulence. Reach your nearest brace position and stabilise before any PA." },
      { id: "d", text: "Wait for the turbulence to completely stop before doing anything.", isCorrect: false, explanation: "You can assess and notify the flight deck from a braced, stable position without waiting for full cessation. Time matters for an injured passenger." },
    ],
    debrief: "In unexpected severe turbulence: stabilise yourself first (brace against nearest surface), then assess casualties, notify the flight deck immediately, document all injuries. Every turbulence-related injury must be reported — it is an aviation occurrence.",
    principle: "An injured crew member cannot help. Stabilise first, then respond.",
  },

  // FIRE/SMOKE
  {
    id: "fire-1",
    category: "Fire/Smoke",
    difficulty: "standard",
    title: "Lavatory Smoke Smell",
    situation: "During cruise, you detect a faint smell of smoke near the lavatories at row 28. When you check the lavatory, the smoke detector has not triggered, but you can still smell something unusual. The lavatory appears normal. No passengers reported anything.",
    timer: 45,
    options: [
      { id: "a", text: "Investigate the bin, check for smouldering materials, notify the flight deck immediately, retrieve firefighting equipment, and monitor closely.", isCorrect: true, explanation: "A smoke smell is always treated seriously — the detector not triggering does not mean there is no fire. Check the waste bin first (most common source). Notify the flight deck immediately. Get equipment ready. Never assume it's nothing." },
      { id: "b", text: "Open the lavatory window to ventilate and wait to see if the smell continues.", isCorrect: false, explanation: "Aircraft lavatories do not have openable windows. Additionally, waiting is inappropriate — any smoke smell requires immediate investigation and flight deck notification." },
      { id: "c", text: "Wait for the smoke detector to trigger before taking action.", isCorrect: false, explanation: "Detectors can fail or lag. Your nose is a detection tool. Treat any smoke smell as a potential fire — investigate and notify immediately." },
      { id: "d", text: "Ask a passenger nearby if they noticed anything and decide based on their response.", isCorrect: false, explanation: "Passenger input is useful but secondary. You cannot delay investigation and flight deck notification based on what a passenger does or does not notice." },
    ],
    debrief: "Any smoke smell = treat as potential fire. Check the lavatory waste bin (most common source of in-flight fires). Notify the flight deck with precise information (who you are, where you are, what you observed). Retrieve firefighting equipment. Continue monitoring.",
    principle: "Never wait for the detector. Your senses are a detection tool. Notify the flight deck for any smoke smell.",
  },
  {
    id: "fire-2",
    category: "Fire/Smoke",
    difficulty: "fast",
    title: "Galley Oven Fire",
    situation: "You open the oven during meal service and see flames inside. The fire is confined to the interior of the oven. The galley smoke detector has triggered. Passengers in the first three rows are watching.",
    timer: 25,
    options: [
      { id: "a", text: "Close the oven door to starve the fire of oxygen, turn off the oven, notify the flight deck, retrieve the Halon extinguisher and stand by — open only if smoke continues.", isCorrect: true, explanation: "For a contained oven fire: close the door first (removes oxygen), turn off the oven power, notify the flight deck. Have the Halon extinguisher ready. If the fire continues (smoke persists), then discharge Halon inside." },
      { id: "b", text: "Immediately discharge the Halon extinguisher into the open oven.", isCorrect: false, explanation: "Opening the oven feeds oxygen to the fire and releases smoke and hot gases. Close the door first — Halon is a secondary step if the fire continues." },
      { id: "c", text: "Use the H2O extinguisher since water is safer in a kitchen environment.", isCorrect: false, explanation: "Never use water in an oven — the heating elements are electrical. Halon is correct for this type of fire. H2O is for Class A smouldering material fires only." },
      { id: "d", text: "Ask passengers to move back and begin evacuating the forward cabin.", isCorrect: false, explanation: "This is a contained galley fire — not an evacuation scenario yet. Premature evacuation creates panic and danger. Manage the fire first, notify the flight deck, and follow their instructions." },
    ],
    debrief: "Galley oven fire: CLOSE THE DOOR → TURN OFF OVEN → NOTIFY FLIGHT DECK → STAND BY WITH HALON. Only open the oven if smoke continues despite the door being closed. Do not use water on electrical oven fires.",
    principle: "Starve the fire first. Close before you extinguish.",
  },

  // LAVATORY
  {
    id: "lav-1",
    category: "Lavatory",
    difficulty: "standard",
    title: "Passenger Locked in Lavatory",
    situation: "Forty minutes into the flight, a passenger's companion approaches and says her friend has been in the lavatory for 20 minutes and is not responding to knocking. You knock twice firmly and call through the door. There is no response.",
    timer: 40,
    options: [
      { id: "a", text: "Open the lavatory using the external override mechanism, be prepared for a medical emergency, call for assistance.", isCorrect: true, explanation: "An unresponsive passenger in a locked lavatory is a medical emergency until proven otherwise. Lavatories have an external override. Open it, assess, and have a colleague ready with equipment." },
      { id: "b", text: "Wait another 10 minutes and knock again before escalating.", isCorrect: false, explanation: "Twenty minutes of no response is already beyond acceptable wait time. Every additional minute delays a potentially critical medical response." },
      { id: "c", text: "Make a PA announcement asking the passenger to please return to their seat.", isCorrect: false, explanation: "If they are unresponsive, a PA is useless. This wastes time and causes passenger alarm without addressing the emergency." },
      { id: "d", text: "Ask the companion to try talking to them loudly through the door.", isCorrect: false, explanation: "This delays the response. You have already knocked. Use the override — you have the authority and the responsibility to do so in a potential emergency." },
    ],
    debrief: "Unresponsive in lavatory: use the external override immediately. Approach as a medical emergency. Have AED, POB, and a colleague ready. Notify the flight deck as you open the door. Time matters.",
    principle: "You have authority to override a locked lavatory in an emergency. Use it without hesitation.",
  },

  // UNACCOMPANIED MINOR
  {
    id: "um-1",
    category: "Unaccompanied Minor",
    difficulty: "standard",
    title: "UM Cannot Be Collected at Destination",
    situation: "You are on final approach to the destination. A review of the UM paperwork shows the child has been booked to be collected by 'a family member,' but no specific person, ID number, or contact detail has been recorded. The child is 7 years old.",
    timer: 40,
    options: [
      { id: "a", text: "Notify the senior crew member and ensure the UM is handed only to a verified, documented individual at the destination — do not release the child without confirmation.", isCorrect: true, explanation: "UM documentation must include the full name, contact details, and ID of the authorised collector. Without this, the child must NOT be released. Ground staff and the airline's UM department must be notified to handle the arrival procedure correctly." },
      { id: "b", text: "Hand the child to the first adult who claims to know them at the arrival gate.", isCorrect: false, explanation: "This is a child safeguarding failure. The UM must only be released to the verified authorised person documented in the paperwork. 'Knowing them' is not verification." },
      { id: "c", text: "Allow the child to find their own family in the arrivals hall since they are almost 8.", isCorrect: false, explanation: "An unaccompanied minor is the airline's legal responsibility until formally handed over to the verified authorised collector. Age is irrelevant." },
      { id: "d", text: "Call the parents during the flight to confirm arrangements.", isCorrect: false, explanation: "While contacting guardians is appropriate, this should have been handled before departure. On approach, the priority is notifying ground staff of the documentation issue before arrival." },
    ],
    debrief: "UM procedure: child must ONLY be released to the verified authorised person — name, contact, and ID documented and confirmed. If documentation is incomplete, notify ground staff and the airline's UM department before arrival. Never release without verification.",
    principle: "An UM is the airline's responsibility until verified handover. Never release without confirmation.",
  },

  // LANGUAGE BARRIER
  {
    id: "lang-1",
    category: "Language Barrier",
    difficulty: "standard",
    title: "Non-English Speaking Medical Event",
    situation: "A passenger in 24F is showing signs of distress — clutching her chest and breathing rapidly. She speaks no English and is frightened. Her seatmate is also non-English speaking. Your airline has no multilingual crew on this flight.",
    timer: 40,
    options: [
      { id: "a", text: "Use the universal medical cards/pictograms if available, make a PA requesting a translator, assess using visual cues (AVPU), and treat this as a priority medical event regardless of communication barriers.", isCorrect: true, explanation: "Communication barriers never delay a medical assessment. Use visual assessment (AVPU, breathing rate, skin colour), pictogram cards if available, make a PA requesting language assistance from other passengers, and treat the clinical signs you observe." },
      { id: "b", text: "Wait until a translator is found before beginning any assessment.", isCorrect: false, explanation: "Chest pain + rapid breathing = potential cardiac or respiratory event. You cannot wait. Clinical observation happens immediately regardless of language." },
      { id: "c", text: "Speak loudly in English and use hand gestures only.", isCorrect: false, explanation: "Speaking louder in English does not help comprehension. Gestures and pictograms are appropriate — shouting is not." },
      { id: "d", text: "Ask her seatmate to act as a translator since they know each other.", isCorrect: false, explanation: "If neither speaks English, the seatmate cannot translate. Make a PA for any passenger who speaks the language. Meanwhile, assessment continues visually." },
    ],
    debrief: "Language barriers in medical events: observe and assess clinically without delay. Make a PA for translator. Use visual communication tools. Treat what you observe. Communication is helpful — it is never a prerequisite for care.",
    principle: "Observe, assess, act. Language is a challenge, not a barrier to care.",
  },

  // BOARDING
  {
    id: "board-1",
    category: "Boarding",
    difficulty: "standard",
    title: "Passenger Refuses to Check Oversize Bag",
    situation: "At the gate during boarding, a passenger with a clearly oversize carry-on bag refuses to gate-check it. He insists it has always been accepted and becomes aggressive when you explain it must be checked. The boarding is 60% complete and others are watching.",
    timer: 40,
    options: [
      { id: "a", text: "Remain calm and firm, explain the safety and regulatory reason clearly, involve the senior crew member, and involve ground staff if the passenger continues to refuse.", isCorrect: true, explanation: "Oversize bags block exit access and are a safety issue. Calmly explain this is a regulatory requirement, not a personal decision. Involve the senior crew member and ground staff. If the passenger refuses, ground staff have authority to manage next steps — including rebooking if necessary." },
      { id: "b", text: "Let him keep the bag onboard this once to avoid the conflict.", isCorrect: false, explanation: "Oversize bags are a genuine safety hazard — they block aisle access and exit routes. Allowing it 'once' also sets a precedent and exposes the airline to regulatory issues." },
      { id: "c", text: "Raise your voice to be heard over other passengers and insist the bag goes in the hold.", isCorrect: false, explanation: "Raising your voice in front of other passengers escalates the situation and erodes professional authority. Stay calm and low-volume — involve senior crew." },
      { id: "d", text: "Tell him he is being difficult and that you have rules to follow.", isCorrect: false, explanation: "'You're being difficult' is accusatory and inflammatory. Frame it as a safety requirement, not a personal rule. The passenger's behaviour has a name — but don't label it publicly." },
    ],
    debrief: "Oversize bag: explain the safety reason (exit access, overhead bin load limits). Remain calm. Involve senior crew. Involve ground staff who have authority to enforce. Document if the passenger becomes aggressive. Safety requirements are not negotiable.",
    principle: "Safety reasons, not personal preferences. Calm, firm, escalate correctly.",
  },
];
