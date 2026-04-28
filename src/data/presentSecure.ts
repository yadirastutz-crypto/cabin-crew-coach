export interface PSCheck {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  checkPhrase: string;
}

export interface PSItem {
  id: string;
  name: string;
  abbreviation?: string;
  category: "Firefighting" | "Oxygen" | "Signalling" | "Safety" | "Exits" | "Survival";
  description: string;
  location: string;
  checks: PSCheck[];
}

export const psItems: PSItem[] = [
  {
    id: "pob",
    name: "Portable Oxygen Bottle",
    abbreviation: "POB",
    category: "Oxygen",
    description: "Used to provide therapeutic oxygen to passengers or crew during medical emergencies and also for firefighting in smoke environments.",
    location: "Usually stowed in overhead bin near the forward and aft galleys.",
    checks: [
      {
        id: "pob-1",
        question: "What pressure reading confirms the POB is serviceable?",
        options: ["At or above 1,800 PSI", "At or above 1,000 PSI", "Any reading is acceptable", "Below 2,000 PSI"],
        correctIndex: 0,
        explanation: "The gauge must read at or above 1,800 PSI. Anything below is unserviceable and must be reported before departure.",
        checkPhrase: "Gauge reads at or above 1,800 PSI — serviceable.",
      },
      {
        id: "pob-2",
        question: "In what position must the flow selector be during preflight?",
        options: ["Flow selector in OFF position", "Flow selector set to 2 LPM", "Flow selector fully open", "Flow selector on AUTO"],
        correctIndex: 0,
        explanation: "The flow selector must be in the OFF position during preflight. It should only be turned on when the unit is in use.",
        checkPhrase: "Flow selector confirmed in OFF position.",
      },
      {
        id: "pob-3",
        question: "Which of the following makes a POB unserviceable?",
        options: ["Mask not connected to the unit", "Unit stored near the galley", "Gauge reading 1,850 PSI", "Flow selector in OFF position"],
        correctIndex: 0,
        explanation: "The mask must be securely connected and intact. An unattached or damaged mask renders the unit unserviceable.",
        checkPhrase: "Mask securely attached with tubing intact.",
      },
      {
        id: "pob-4",
        question: "What is the correct stowage condition for a POB?",
        options: ["Correct location, accessible without obstruction", "Anywhere in the overhead bin", "In the cockpit jump seat area", "Only in the forward galley"],
        correctIndex: 0,
        explanation: "The POB must be in its designated stowage position and accessible immediately — not buried under other equipment.",
        checkPhrase: "Located in designated stowage, unobstructed access confirmed.",
      },
    ],
  },
  {
    id: "pbe",
    name: "Protective Breathing Equipment",
    abbreviation: "PBE",
    category: "Firefighting",
    description: "A smoke hood that protects the crew member's head and face from smoke and toxic fumes during a firefighting operation.",
    location: "Near each crew station and in galleys. Exact location varies by aircraft type.",
    checks: [
      {
        id: "pbe-1",
        question: "What does a PINK moisture indicator on the PBE packaging confirm?",
        options: ["Unit is serviceable — no moisture detected", "Unit has been exposed to moisture and is unserviceable", "The indicator colour does not matter", "Unit requires testing by engineering"],
        correctIndex: 0,
        explanation: "The moisture indicator must be PINK to confirm the unit is serviceable. If it turns blue or white, the unit is compromised and must be replaced.",
        checkPhrase: "Moisture indicator PINK — unit confirmed serviceable.",
      },
      {
        id: "pbe-2",
        question: "What condition of the outer packaging makes a PBE unserviceable?",
        options: ["Seal is broken or shows signs of tampering", "Packaging has a small crease", "The label print is faded", "The packaging is slightly dusty"],
        correctIndex: 0,
        explanation: "The hermetic seal must be fully intact. Any break, hole, or sign of tampering means the unit must not be used and must be replaced immediately.",
        checkPhrase: "Outer seal intact — no damage or tampering visible.",
      },
      {
        id: "pbe-3",
        question: "Where should the PBE be located during preflight inspection?",
        options: ["Its designated stowage location, unobstructed", "Any available cabin space", "Stored in the overhead bin above row 1", "In the crew bag"],
        correctIndex: 0,
        explanation: "The PBE must be in its correct, designated location — not moved or displaced — and must be immediately accessible when needed.",
        checkPhrase: "PBE present in designated stowage with clear access.",
      },
      {
        id: "pbe-4",
        question: "During a smoke event, when should a crew member don the PBE?",
        options: ["Before fighting the fire or entering the smoke area", "Only after the fire is confirmed extinguished", "Only if wearing a uniform that may be damaged", "After all passengers have disembarked"],
        correctIndex: 0,
        explanation: "The PBE should be donned before entering any smoke environment. Waiting risks incapacitation from toxic fumes.",
        checkPhrase: "PBE available for immediate donning — crew trained on procedure.",
      },
    ],
  },
  {
    id: "halon",
    name: "Halon Fire Extinguisher",
    category: "Firefighting",
    description: "Used to suppress fires in confined spaces including lavatory, galley and electrical fires. Halon gas displaces oxygen and interrupts the chemical reaction of fire.",
    location: "Galleys, crew stations, and lavatory exterior. Aircraft-specific locations listed in the operations manual.",
    checks: [
      {
        id: "halon-1",
        question: "Which gauge reading indicates the Halon extinguisher is serviceable?",
        options: ["Needle in the green zone", "Needle in the red zone", "Needle at zero", "Any reading — all are acceptable"],
        correctIndex: 0,
        explanation: "The pressure gauge needle must be in the GREEN zone. A needle in the red zone or at zero indicates loss of pressure — the unit is unserviceable.",
        checkPhrase: "Pressure gauge needle confirmed in green zone.",
      },
      {
        id: "halon-2",
        question: "What does a broken tamper seal on a Halon extinguisher indicate?",
        options: ["The unit may have been used — report immediately", "Normal wear, no action needed", "The unit is ready for immediate use", "The unit was last checked recently"],
        correctIndex: 0,
        explanation: "A broken tamper seal suggests the unit has been activated or tampered with. It must be treated as used, reported, and replaced before departure.",
        checkPhrase: "Tamper seal confirmed intact.",
      },
      {
        id: "halon-3",
        question: "Which condition makes a Halon extinguisher unserviceable?",
        options: ["Safety pin is missing", "Unit is slightly dusty", "Unit is stored in a warm galley", "Handle is a different colour to the model manual"],
        correctIndex: 0,
        explanation: "The safety pin must be present and secured. A missing pin means the unit could have been discharged or is unsafe to operate.",
        checkPhrase: "Safety pin present and secured.",
      },
      {
        id: "halon-4",
        question: "What type of fire is Halon NOT recommended for?",
        options: ["Deep-seated fires in soft furnishings", "Electrical fires", "Galley oven fires", "Lavatory bin fires"],
        correctIndex: 0,
        explanation: "Halon is effective for Class B/C fires (flammable liquids, electrical). For deep-seated smouldering fires in soft materials, the H2O extinguisher is more effective.",
        checkPhrase: "Crew briefed on appropriate fire type for this extinguisher.",
      },
    ],
  },
  {
    id: "h2o",
    name: "H2O Fire Extinguisher",
    category: "Firefighting",
    description: "Water-based extinguisher used on Class A fires — smouldering materials such as upholstery, carpet, paper, and rubbish bin fires.",
    location: "Cabin crew station or galley. Aircraft-specific location in the operations manual.",
    checks: [
      {
        id: "h2o-1",
        question: "What fire class is the H2O extinguisher approved for?",
        options: ["Class A — smouldering solid material fires", "Class B — flammable liquid fires", "Class C — electrical equipment fires", "All classes equally"],
        correctIndex: 0,
        explanation: "The H2O extinguisher is for Class A fires only — materials like upholstery, carpet, rubbish. NEVER use water on electrical or flammable liquid fires.",
        checkPhrase: "H2O extinguisher confirmed Class A use only — crew awareness verified.",
      },
      {
        id: "h2o-2",
        question: "How do you confirm the H2O extinguisher is serviceable?",
        options: ["Gauge in green zone, seal intact, no visible damage", "Any level of pressure is acceptable", "Weight of unit feels appropriate", "Check is not required — manufacturer sealed"],
        correctIndex: 0,
        explanation: "As with all extinguishers: gauge must be in the green zone, tamper seal must be intact, and there must be no visible damage to the cylinder, nozzle, or handle.",
        checkPhrase: "Gauge in green zone. Seal intact. No damage visible.",
      },
      {
        id: "h2o-3",
        question: "Why should you NEVER use an H2O extinguisher on an electrical fire?",
        options: ["Water conducts electricity and risks electrocution", "It will worsen the fire", "The H2O extinguisher will not reach the fire", "It is too heavy to aim accurately"],
        correctIndex: 0,
        explanation: "Water is electrically conductive. Using it on live electrical equipment creates an electrocution risk for the user and passengers nearby.",
        checkPhrase: "Crew aware: H2O must NOT be used on electrical fires.",
      },
    ],
  },
  {
    id: "megaphone",
    name: "Megaphone",
    category: "Signalling",
    description: "Used during evacuations when the aircraft PA system is unavailable. Allows crew to give voice commands to a large number of passengers.",
    location: "Typically stowed in the overhead bin near the forward cabin or as designated by the airline.",
    checks: [
      {
        id: "meg-1",
        question: "How do you verify a megaphone is operational during preflight?",
        options: ["Activate and confirm clear amplified audio output", "Check the stowage location only", "Verify battery compartment is sealed", "Read the model number from the body"],
        correctIndex: 0,
        explanation: "The megaphone must be turned on briefly to confirm it produces clear, amplified output. A non-functioning megaphone is unserviceable.",
        checkPhrase: "Activated — clear audio output confirmed.",
      },
      {
        id: "meg-2",
        question: "What battery condition makes a megaphone unserviceable?",
        options: ["Low or missing batteries", "Batteries not matching the original brand", "Batteries installed more than 6 months ago", "Batteries are not rechargeable"],
        correctIndex: 0,
        explanation: "A megaphone with low or missing batteries must have the batteries replaced or be reported unserviceable before departure.",
        checkPhrase: "Battery level adequate — audio output clear.",
      },
      {
        id: "meg-3",
        question: "In what situation is the megaphone most critically needed?",
        options: ["When the PA system is unavailable during an evacuation", "During routine boarding announcements", "When speaking to the flight deck", "For passenger entertainment announcements"],
        correctIndex: 0,
        explanation: "The megaphone is an emergency backup. Its primary use is commanding passengers during evacuation when the aircraft PA is not functioning.",
        checkPhrase: "Crew aware of evacuation use — megaphone accessible and operational.",
      },
    ],
  },
  {
    id: "demo-kit",
    name: "Passenger Demo Kit",
    category: "Safety",
    description: "Used during the pre-flight safety demonstration. Must match the aircraft type and include all required components for a complete, accurate demonstration.",
    location: "Forward and aft crew stations. Accessible before boarding is complete.",
    checks: [
      {
        id: "demo-1",
        question: "Which component of the demo kit must be checked for correct aircraft type?",
        options: ["Safety card — must match this aircraft registration", "Life vest colour only", "Seatbelt buckle size", "The model number on the oxygen mask"],
        correctIndex: 0,
        explanation: "The safety card must be specific to this aircraft type and seat configuration. Using the wrong version is a regulatory violation.",
        checkPhrase: "Safety card confirmed correct for this aircraft type and registration.",
      },
      {
        id: "demo-2",
        question: "What seatbelt check confirms the demo kit seatbelt is serviceable?",
        options: ["Buckle clicks securely and releases cleanly", "The seatbelt is the same colour as the aircraft interior", "The seatbelt has no label attached", "Strap length matches the spare in the galley"],
        correctIndex: 0,
        explanation: "The buckle must click securely when inserted and release cleanly when the button is pressed. This mirrors exactly what you will demonstrate to passengers.",
        checkPhrase: "Seatbelt buckle — clicks and releases correctly.",
      },
      {
        id: "demo-3",
        question: "What life vest condition makes it unserviceable for demonstration?",
        options: ["Previously inflated and not replaced", "Vest is stored flat, not rolled", "Vest has a carry strap attached", "Vest is a slightly different shade of yellow"],
        correctIndex: 0,
        explanation: "A life vest that has been inflated — even partially — must be replaced before it can be used for demonstration. It must match the aircraft's actual emergency vest.",
        checkPhrase: "Demo life vest — not previously inflated. Correct type confirmed.",
      },
      {
        id: "demo-4",
        question: "What must you check on the demo oxygen mask?",
        options: ["Mask, tubing, and flow indicator bag all present and intact", "Mask colour matches the aircraft interior", "The serial number is legible", "Oxygen canister is attached"],
        correctIndex: 0,
        explanation: "The complete demo mask kit must include the mask, corrugated tubing, and flow indicator bag — all intact. Damaged or incomplete equipment cannot be used for demonstration.",
        checkPhrase: "Oxygen mask demo — mask, tubing, and flow bag all present and intact.",
      },
    ],
  },
  {
    id: "cabin-doors",
    name: "Cabin Doors",
    category: "Exits",
    description: "Primary evacuation exits. Must be armed for takeoff and landing, disarmed at the gate. Cross-checking confirms your partner's door is in the correct mode.",
    location: "Left and right side of aircraft fuselage at each door position.",
    checks: [
      {
        id: "door-1",
        question: "What does 'girt bar on the floor bracket' mean?",
        options: ["Door is ARMED — slide will auto-deploy if opened", "Door is DISARMED — safe to open manually", "Door is jammed and requires maintenance", "Door has been cross-checked by senior crew"],
        correctIndex: 0,
        explanation: "Girt bar on the floor bracket = ARMED. The slide is connected to the aircraft floor. Opening the door in this configuration instantly deploys the slide — potentially injuring ground personnel.",
        checkPhrase: "Girt bar on floor bracket — door confirmed ARMED for departure.",
      },
      {
        id: "door-2",
        question: "During a cross-check, what are you confirming about your partner's door?",
        options: ["That it is in the correct armed or disarmed position for the current phase of flight", "That the door handle is locked", "That no passengers are standing near the door", "That the door window is clean"],
        correctIndex: 0,
        explanation: "The cross-check is a mandatory confirmation that your partner's door is in the correct armed/disarmed mode. This is a two-person safety check — each crew member verifies the other's door.",
        checkPhrase: "Cross-check complete — partner's door confirmed [armed/disarmed].",
      },
      {
        id: "door-3",
        question: "What could happen if a door is opened while still ARMED?",
        options: ["The escape slide deploys automatically and explosively", "The door alarm activates only", "The slide inflates slowly as a warning", "Nothing — the safety catch prevents deployment"],
        correctIndex: 0,
        explanation: "An inadvertent slide deployment is one of the most dangerous events on the ground. Slides deploy at extreme force and speed — they have injured and killed ground personnel.",
        checkPhrase: "Armed status confirmed correct for phase of flight. Cross-check completed.",
      },
    ],
  },
  {
    id: "overwing",
    name: "Overwing Emergency Exits",
    category: "Exits",
    description: "Type III or Type IV exits used as additional evacuation points. Usually operated by passengers but crew must be able to demonstrate and guide their use.",
    location: "Over the aircraft wings — typically rows 10–15 depending on aircraft type.",
    checks: [
      {
        id: "ow-1",
        question: "What is the primary responsibility of crew regarding overwing exits?",
        options: ["Ensure exits are unobstructed, clearly marked, and crew can operate them", "Crew must personally operate every overwing exit", "Overwing exits are solely for crew use in emergencies", "Crew must check exits only on wide-body aircraft"],
        correctIndex: 0,
        explanation: "Crew must ensure the exit area is clear, operation instructions are visible, and seated passengers near the exit are capable of assisting. Crew must also be trained to open the exit themselves.",
        checkPhrase: "Exit area unobstructed. Exit card in seat pocket. Exit marked and accessible.",
      },
      {
        id: "ow-2",
        question: "What passenger seating consideration applies to overwing exit rows?",
        options: ["Passengers must be physically able, willing, and briefed to assist in an evacuation", "Any passenger may sit in an exit row", "Exit rows are reserved for frequent flyers only", "Passengers only need to be over 18 years old"],
        correctIndex: 0,
        explanation: "Overwing exit row passengers must be capable and willing to open the exit and assist others. Crew must brief them before departure and reseat them if they are unable or unwilling.",
        checkPhrase: "Exit row passengers assessed as capable and willing. Pre-departure briefing completed.",
      },
    ],
  },
  {
    id: "life-raft",
    name: "Life Raft / Emergency Equipment",
    category: "Survival",
    description: "Inflatable survival equipment used in ditching scenarios. Also includes EPIRB (Emergency Position Indicating Radio Beacon) and survival packs.",
    location: "Typically stowed in overhead bins near exits designated as ditching exits. Location specified in the operations manual.",
    checks: [
      {
        id: "raft-1",
        question: "What check confirms a life raft container is serviceable?",
        options: ["Seal intact, no damage, pressure indicator if fitted is in range, within service date", "Container is present in stowage", "Container weight feels appropriate", "Container is the same colour as the aircraft markings"],
        correctIndex: 0,
        explanation: "The container seal must be intact, there must be no visible damage, any pressure indicator must be in range, and the service/inspection date must not have expired.",
        checkPhrase: "Container seal intact. No damage. Service date within limit. Pressure indicator in range.",
      },
      {
        id: "raft-2",
        question: "What is the correct sequence for deploying a life raft during ditching?",
        options: ["Follow the specific aircraft type procedure — attach painter line before deploying overboard", "Throw the raft overboard first, then board from the wing", "Pull the inflation cord inside the aircraft then carry the raft out", "Wait for ground/water rescue to deploy the raft"],
        correctIndex: 0,
        explanation: "Life raft deployment is aircraft-specific. The golden rule is that the painter line (connecting the raft to the aircraft) must be secured before the raft enters the water, so it does not drift away.",
        checkPhrase: "Crew trained on painter line procedure. Raft in correct ditching exit stowage.",
      },
      {
        id: "raft-3",
        question: "What must crew do with the EPIRB during a ditching event?",
        options: ["Activate and attach to the life raft before or after entering water", "Leave the EPIRB on the aircraft — it activates automatically", "Only activate if given instruction by the captain", "EPIRB is only for crew in the water — not the raft"],
        correctIndex: 0,
        explanation: "The EPIRB must be activated and secured to the life raft. It transmits location data via satellite to rescue coordination centres. Activation is a survival-critical step.",
        checkPhrase: "EPIRB location confirmed. Crew trained on activation and raft attachment.",
      },
    ],
  },
];
