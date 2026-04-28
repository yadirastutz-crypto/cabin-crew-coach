export type EquipmentCategory =
  | "Protective Equipment"
  | "Fire Fighting Equipment"
  | "Oxygen Equipment"
  | "Survival Equipment"
  | "Medical Equipment"
  | "Miscellaneous Emergency Equipment"
  | "Door / Exit Equipment"
  | "Cabin Safety Equipment";

export interface EquipmentQuizItem {
  question: string;
  options: string[];
  answer: number;
}

export interface EmergencyEquipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  purpose: string;
  location?: string;
  preflight?: string;
  presentAndSecure?: string;
  keyNumbers?: string;
  whenToUse?: string;
  whenNotToUse?: string;
  unserviceable?: string;
  memoryTrick: string;
  sayItOutLoud?: string;
  traineesForget?: string;
  contents?: string;
  keyRestriction?: string;
  keyDifference?: string;
  note?: string;
  quizItems?: EquipmentQuizItem[];
}

export const emergencyEquipment: EmergencyEquipment[] = [
  {
    id: "eq-1",
    name: "PBE (Protective Breathing Equipment)",
    category: "Protective Equipment",
    purpose:
      "Protects crew from smoke, toxic fumes, and oxygen-deficient environments during an in-flight fire or smoke event",
    location:
      "Galley areas, crew stations — specific stowage positions vary by aircraft type but always accessible to the working crew member at that station",
    preflight:
      "Check: (1) Sealed packaging — any puncture or opening makes it unserviceable. (2) Moisture indicator is PINK — blue means moisture has entered. (3) No visible damage to the hood or packaging. (4) In correct stowage position.",
    presentAndSecure:
      "In original sealed packaging, mounted or stowed in the designated position for that crew station, moisture indicator visible and pink",
    keyNumbers:
      "Provides approximately 15–20 minutes of breathable air (or oxygen, depending on type). Some types: 15 min minimum to full donning",
    whenToUse:
      "Any time you suspect or detect smoke, fumes, or toxic gases in the cabin or galley. Always use when fighting a fire. Use before entering a smoke-filled compartment.",
    whenNotToUse:
      "Do not use as a substitute for a passenger oxygen mask during decompression. Do not use if the packaging seal is broken.",
    unserviceable:
      "Moisture indicator is blue. Packaging is open, punctured, or damaged in any way. Expiry date has passed. Any physical damage to the hood.",
    memoryTrick:
      "PBE = Pink = Protected. Blue = Been used (or compromised). If it's blue, it's through.",
    sayItOutLoud:
      "The PBE provides 15 to 20 minutes of breathable air. I check the seal is intact and the moisture indicator is pink. Blue means unserviceable.",
    traineesForget:
      "The moisture indicator color — many say 'green' or 'white.' It is PINK for serviceable, BLUE for unserviceable.",
    quizItems: [
      {
        question: "What color must the PBE moisture indicator be to be considered serviceable?",
        options: ["Green", "White", "Pink", "Yellow"],
        answer: 2,
      },
      {
        question: "How long does a PBE provide breathable air?",
        options: ["5–10 minutes", "15–20 minutes", "30–45 minutes", "60 minutes"],
        answer: 1,
      },
      {
        question: "A PBE seal is slightly torn on the edge. What should you do?",
        options: [
          "Use it — the hood inside is probably fine",
          "Report it as unserviceable and replace it",
          "Seal the tear with tape and note it in the log",
          "Only remove it from service if the indicator is blue",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-2",
    name: "Halon Extinguisher (BCF)",
    category: "Fire Fighting Equipment",
    purpose:
      "Suppresses electrical fires and flammable liquid fires by interrupting the chemical chain reaction of combustion. Does not conduct electricity.",
    location:
      "Galleys (usually mounted in a bracket), crew stations, and sometimes forward cabin areas. Know the exact location at your assigned crew position before every flight.",
    preflight:
      "Check: (1) Pressure gauge in GREEN zone — not in red (under/over-pressurized). (2) Safety pin is intact and tamper seal is unbroken. (3) Nozzle is clear and undamaged. (4) Mounted securely in bracket.",
    presentAndSecure:
      "Mounted in designated bracket, gauge in green zone, safety pin intact, tamper seal unbroken, nozzle clear",
    keyNumbers:
      "Gauge must be in the GREEN zone. Halon discharge range: approximately 1–1.5 metres. Effective for approximately 8–10 seconds of continuous discharge.",
    whenToUse:
      "Class B fires (flammable liquids — fuel, oil, spirits) and Class C fires (electrical equipment, wiring, avionics). Use whenever the fire source is electrical or involves flammable liquids.",
    whenNotToUse:
      "Do NOT use on Class A fires (wood, paper, fabric, seat cushions, waste bins). Class A fires require water. Using Halon on a Class A fire smothers but does not cool — the fire can re-ignite.",
    unserviceable:
      "Gauge needle in red zone (over or under-pressurized). Safety pin missing. Tamper seal broken. Nozzle damaged. Any visible damage to the cylinder.",
    memoryTrick:
      "PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep side to side. Halon = Electrical. Water = Class A. NEVER swap them.",
    sayItOutLoud:
      "I check the Halon extinguisher: gauge is in the green zone, pin is intact, seal is unbroken, nozzle is clear. Halon is for electrical and flammable liquid fires — never for Class A.",
    traineesForget:
      "That Halon is NOT for Class A fires. Many trainees use the nearest extinguisher without identifying the fire class first. Always identify before you grab.",
    quizItems: [
      {
        question: "What type of fire should you NEVER use a Halon extinguisher on?",
        options: ["Electrical fire", "Class A fire (paper, fabric, wood)", "Flammable liquid fire", "Galley oven fire"],
        answer: 1,
      },
      {
        question: "The Halon extinguisher gauge is in the red zone. What does this mean?",
        options: [
          "It is fully charged — red means ready",
          "It is overheated but still usable",
          "It is unserviceable — must be replaced",
          "It needs to be shaken before use",
        ],
        answer: 2,
      },
      {
        question: "What does PASS stand for when using a fire extinguisher?",
        options: [
          "Pull, Aim, Squeeze, Sweep",
          "Press, Angle, Spray, Step back",
          "Point, Activate, Suppress, Secure",
          "Position, Aim, Start, Stop",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "eq-3",
    name: "H2O Extinguisher (Water Extinguisher)",
    category: "Fire Fighting Equipment",
    purpose:
      "Extinguishes Class A fires by cooling the burning material. Effective on fabric, paper, seat cushions, waste bin fires.",
    location:
      "Cabin locations — typically near lavatories and waste bins. Often mounted on a wall bracket near the rear galley or lavatory areas.",
    preflight:
      "Check: (1) Pressure gauge in GREEN zone. (2) Nozzle is clear. (3) Safety pin intact. (4) No visible damage.",
    presentAndSecure:
      "In designated bracket, gauge in green zone, pin and seal intact",
    keyNumbers:
      "Effective range: approximately 1 metre. Discharge time: approximately 30–40 seconds. Gauge must be in the GREEN zone.",
    whenToUse:
      "Class A fires only: burning fabric, seat cushions, waste bin contents, paper, food waste, and similar organic materials.",
    whenNotToUse:
      "NEVER on electrical fires — water conducts electricity and will electrocute the user. NEVER on flammable liquid fires — water spreads the burning liquid. If in doubt, use Halon.",
    unserviceable:
      "Gauge in red zone. Nozzle blocked or damaged. Safety pin missing. Tamper seal broken.",
    memoryTrick:
      "H2O = Class A only. Water on electrical = danger. 'If it's Class A, water's okay. Anything else, walk away.'",
    sayItOutLoud:
      "The water extinguisher is for Class A fires only — fabric, paper, waste bin contents. Never on electrical. The gauge must be in the green zone and the nozzle must be clear.",
    traineesForget:
      "The water extinguisher is often confused with the Halon. If a trainee grabs the wrong one, the consequences range from ineffective to dangerous. Identify the fire class before selecting the extinguisher.",
    quizItems: [
      {
        question: "Which fire type is the H2O extinguisher designed for?",
        options: ["Electrical fires", "Class A fires (fabric, paper, organic materials)", "Flammable liquid fires", "Galley equipment fires"],
        answer: 1,
      },
      {
        question: "A passenger's blanket has caught fire in their seat. Which extinguisher do you use?",
        options: [
          "Halon, because it's faster",
          "Water (H2O), because it's a Class A fire",
          "Either — they are interchangeable",
          "Neither — evacuate the aircraft first",
        ],
        answer: 1,
      },
      {
        question: "Why should you never use water on an electrical fire?",
        options: [
          "Water ruins electrical equipment",
          "Water conducts electricity and creates electrocution risk",
          "Water makes the fire smell worse",
          "Water is only effective above 500 degrees",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-4",
    name: "Portable Oxygen Bottle (POB)",
    category: "Oxygen Equipment",
    purpose:
      "Provides therapeutic oxygen to ill or hypoxic passengers and crew. Used in medical emergencies — not as emergency descent oxygen.",
    location:
      "Overhead stowage compartments or crew stations, typically near or in the galley areas. Exact position varies by aircraft but is always confirmed during preflight.",
    preflight:
      "Check: (1) PSI gauge reads at or above minimum (typically 1,800 PSI — confirm airline-specific limit). (2) Mask is attached to the bottle. (3) Flow selector is functional and in the closed/off position. (4) No visible damage to bottle, regulator, or mask tubing.",
    presentAndSecure:
      "Secured in correct holder or stowage, PSI at or above minimum, mask present and connected, regulator intact",
    keyNumbers:
      "Minimum serviceable pressure: typically 1,800 PSI (verify airline-specific minimum). Duration depends on flow rate and bottle size — typically 30–60 minutes at low therapeutic flow. Maximum pressure when full: approximately 1,800–2,000 PSI.",
    whenToUse:
      "Medical emergencies involving a passenger or crew member who requires supplemental oxygen: hypoxia, chest pain, shortness of breath, loss of consciousness. Also used when providing oxygen post-decompression event.",
    whenNotToUse:
      "Do not use if the mask is not connected. Do not use if PSI is below minimum — it may not provide sufficient flow. Do not substitute for passenger drop-down oxygen masks during decompression.",
    unserviceable:
      "PSI gauge below airline-specified minimum. Mask missing or disconnected. Regulator damaged. Any visible damage to the bottle.",
    memoryTrick:
      "POB = 1,800+ PSI = Proper. Below minimum = broken. Check three things: PSI, mask, flow selector. In that order.",
    sayItOutLoud:
      "The Portable Oxygen Bottle is checked as follows: PSI is above 1,800, mask is attached, flow selector is in the off position. It is used to provide therapeutic oxygen to ill passengers or crew.",
    traineesForget:
      "The minimum PSI value — they know it 'should be full' but cannot state the number. 1,800 PSI is the number most often tested. Also: trainees forget that the mask must be attached and confirmed before the preflight check is complete.",
    quizItems: [
      {
        question: "What is the typical minimum serviceable PSI for a Portable Oxygen Bottle?",
        options: ["500 PSI", "1,000 PSI", "1,800 PSI", "3,000 PSI"],
        answer: 2,
      },
      {
        question: "During preflight, the POB mask is missing. What should you do?",
        options: [
          "The bottle is still usable without the mask in an emergency",
          "Report it as unserviceable and replace or reattach the mask",
          "Write it in the cabin log and continue — it's not critical",
          "Borrow the mask from the demo kit temporarily",
        ],
        answer: 1,
      },
      {
        question: "The POB is used for which type of oxygen delivery?",
        options: [
          "Emergency decompression for all passengers",
          "Supplemental therapeutic oxygen for ill passengers or crew",
          "Pilot oxygen only",
          "Ground handling operations",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-5",
    name: "Oxygen Mask / Therapeutic Mask",
    category: "Oxygen Equipment",
    purpose:
      "Delivers supplemental or therapeutic oxygen from a Portable Oxygen Bottle to a passenger or crew member requiring respiratory assistance",
    location:
      "Attached to or stored with the Portable Oxygen Bottle",
    preflight:
      "Confirm mask is attached to the bottle. Confirm tubing is not kinked or cracked. Confirm flow selector is functional.",
    presentAndSecure:
      "Attached to POB, tubing intact, no cracks or damage to mask or reservoir bag if present",
    keyNumbers:
      "Flow must be confirmed before placing on patient. Typical flow settings: 2–4 LPM (litres per minute) for therapeutic use.",
    whenToUse:
      "Place on a conscious patient who needs supplemental oxygen — secure around head, confirm oxygen flow before applying.",
    whenNotToUse:
      "Do not use if mask is cracked, tubing is kinked, or flow cannot be confirmed. Do not use mask from the demo kit — it is not connected to oxygen.",
    unserviceable:
      "Cracked mask, damaged tubing, disconnected from POB, or no visible flow when selector is open.",
    memoryTrick:
      "Mask must have flow confirmed BEFORE it goes on the patient's face. 'Check flow, then apply.' Demo mask = no oxygen — do not confuse them.",
    sayItOutLoud:
      "I confirm oxygen flow before placing the mask. I secure it over the nose and mouth. I monitor the patient for improvement.",
    traineesForget:
      "Confusing the demo oxygen mask with the real one. The demo kit has a replica — it is not functional. In a real emergency, only the POB-attached mask delivers oxygen.",
  },
  {
    id: "eq-6",
    name: "Life Vest (Adult)",
    category: "Survival Equipment",
    purpose:
      "Provides personal flotation during a water evacuation or ditching. Keeps the wearer face-up and afloat without physical effort.",
    location:
      "Under each passenger seat (in the seat pocket or beneath the cushion) or in the seat back pocket depending on aircraft type.",
    preflight:
      "Check: (1) Pouch is sealed and intact. (2) Whistle is attached. (3) Light/beacon is present and attached. (4) Located under the correct seat.",
    presentAndSecure:
      "In sealed pouch under seat, whistle attached, light attached, in correct position",
    keyNumbers:
      "NEVER inflate inside the aircraft. Inflate only after exiting. Two inflation methods: pull tab (CO2 cartridge) OR blow tube (manual). Some vests: one tab per chamber.",
    whenToUse:
      "On command during a ditching or water evacuation. Don before evacuation commences. Do not inflate until you have exited the aircraft.",
    whenNotToUse:
      "Do NOT inflate inside the aircraft. An inflated vest in a flooding cabin pins the wearer against the ceiling and prevents escape through submerged exits.",
    unserviceable:
      "Pouch torn open or tampered with. Whistle missing. Light missing. Any visible damage to the vest material.",
    memoryTrick:
      "Don inside — inflate OUTSIDE. This instruction is the most critical detail of the safety demo. Say it clearly. Make eye contact during that line.",
    sayItOutLoud:
      "Life vests are located under your seat. To use: remove from pouch, place over your head, fasten and adjust at the waist. Do not inflate until you have left the aircraft. Inflate by pulling the red tab, or blow into the tube.",
    traineesForget:
      "The exact sequence: don first, exit second, inflate third. Also: trainees often forget to mention the manual blow tube as a backup inflation method.",
    quizItems: [
      {
        question: "When should a passenger inflate their life vest?",
        options: [
          "As soon as the captain announces ditching",
          "While still in their seat",
          "Only after exiting the aircraft",
          "When the water reaches the cabin floor",
        ],
        answer: 2,
      },
      {
        question: "What is the danger of inflating a life vest inside a flooding aircraft?",
        options: [
          "The vest may deflate in the water",
          "The buoyancy traps the wearer against the ceiling, preventing escape",
          "The CO2 cartridge is toxic in enclosed spaces",
          "The vest may ignite in contact with electrical wiring",
        ],
        answer: 1,
      },
      {
        question: "A life vest whistle is missing during preflight. What should you do?",
        options: [
          "The vest is still usable — the light is enough for signaling",
          "Report it as unserviceable and replace the vest",
          "Secure a replacement whistle from the galley",
          "Continue the flight and note it in the cabin report",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-7",
    name: "Infant Life Vest",
    category: "Survival Equipment",
    purpose:
      "Personal flotation device sized and designed for infants (typically under 2 years) during a water evacuation",
    location:
      "Stored at crew stations or available on request — not located at every seat. Crew must know exactly where it is stowed.",
    preflight:
      "Confirm it is present and in correct stowage, pouch intact, whistle and light attached.",
    presentAndSecure:
      "Sealed pouch at designated stowage location, all attachments intact",
    keyNumbers:
      "Different inflation method from adult vest — typically a different donning procedure. Some are wrap-around style, not over-head.",
    whenToUse:
      "For lap-held infants during a ditching or water evacuation, on command.",
    whenNotToUse:
      "Do not use an adult vest on an infant — it will not provide adequate flotation or positioning.",
    unserviceable:
      "Pouch opened or damaged. Whistle or light missing.",
    memoryTrick:
      "Infant vest is different. Know where it is BEFORE the flight — not during the emergency. It is not under the seat like adult vests.",
    sayItOutLoud:
      "The infant life vest is stored at the crew station. It must be requested by the crew — it is not at the seat. Donning procedure is different from the adult vest.",
    traineesForget:
      "Where it is stored. Unlike adult vests under seats, infant vests are at specific crew locations. Not knowing the location in an emergency is a critical failure.",
  },
  {
    id: "eq-8",
    name: "Life Raft",
    category: "Survival Equipment",
    purpose:
      "Provides a floating platform for passengers and crew after a ditching, enabling group survival during water rescue operations",
    location:
      "In overhead storage near main exit doors, or in designated slide/raft door compartments, depending on aircraft type",
    preflight:
      "Confirm raft is present, in correct stowage, inspection label current (within service date), and release mechanism is accessible.",
    presentAndSecure:
      "In designated stowage, inspection date current, properly secured",
    keyNumbers:
      "Each raft is rated for a specific number of persons — never exceed the rated capacity. Automatic or manual inflation via attached CO2 cylinders. Some slide rafts automatically detach and float as a raft.",
    whenToUse:
      "After ditching and evacuation, when the aircraft is in water. Deploy on command from the captain or senior crew.",
    whenNotToUse:
      "Do not deploy inside the aircraft or on dry land — the deployment sequence is designed for water.",
    unserviceable:
      "Inspection date expired. Stowage has been tampered with. Any visible damage to the container.",
    memoryTrick:
      "Raft = last resort floating platform. Not a slide — a survival vessel. Some slide/rafts are one unit: the slide deploys, then detaches and becomes the raft.",
    sayItOutLoud:
      "The life raft is carried for ditching operations. After water evacuation, the raft deploys to provide a floating platform. Capacity is marked on the raft — do not exceed it.",
    traineesForget:
      "The distinction between a slide and a slide/raft. A plain slide cannot be used as a raft. A slide/raft can detach and float. Knowing which type is on your aircraft is essential.",
    quizItems: [
      {
        question: "What is the primary purpose of a life raft on an aircraft?",
        options: [
          "To provide an additional evacuation slide if one fails",
          "To offer a floating platform for survivors after ditching",
          "To carry emergency supplies to shore",
          "To be used by crew during overwater operations",
        ],
        answer: 1,
      },
      {
        question: "What is the difference between a slide and a slide/raft?",
        options: [
          "There is no difference — all slides float",
          "A slide/raft can detach from the aircraft and float as a survival platform; a plain slide cannot",
          "A slide/raft is larger and used on wide-body aircraft only",
          "Slide/rafts are inflated manually; slides are automatic",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-9",
    name: "ELT (Emergency Locator Transmitter)",
    category: "Miscellaneous Emergency Equipment",
    purpose:
      "Transmits a distress signal on emergency frequencies (406 MHz) after a crash or ditching, enabling search and rescue teams to locate the aircraft or survivors",
    location:
      "Typically located in the cockpit, or in some aircraft types, accessible to the crew near a main exit. Location varies by aircraft.",
    preflight:
      "Confirm the ELT is present in its mount, arm switch is in ARMED position (not ON), and the unit is not damaged.",
    presentAndSecure:
      "In designated mount, arm switch set correctly, no visible damage",
    keyNumbers:
      "Transmits on 406 MHz (international distress frequency) and 121.5 MHz (aviation frequency). Signal detectable by COSPAS-SARSAT satellites. Duration: approximately 24–48 hours of continuous transmission.",
    whenToUse:
      "Activates automatically upon impact. Can also be activated manually in a survival situation. Always attempt to activate if the aircraft is abandoned.",
    whenNotToUse:
      "Do not activate accidentally — a false activation triggers a full search and rescue response with significant cost and resource implications.",
    unserviceable:
      "Battery expired. Unit damaged. Indicator shows fault or dead battery.",
    memoryTrick:
      "ELT = 406 MHz = rescue beacon. It can activate automatically or manually. Know where it is and how to activate it manually.",
    sayItOutLoud:
      "The ELT transmits a distress signal to satellites to assist with rescue location. It activates automatically on impact and can be activated manually. It transmits on 406 MHz.",
    traineesForget:
      "The ELT transmits on 406 MHz — not 121.5 MHz (that is secondary). Also: many trainees don't know it can be activated manually.",
    quizItems: [
      {
        question: "What frequency does a modern ELT primarily transmit on?",
        options: ["121.5 MHz", "406 MHz", "243 MHz", "8.364 MHz"],
        answer: 1,
      },
      {
        question: "When does the ELT activate automatically?",
        options: [
          "When the captain announces an emergency",
          "Upon impact or severe deceleration forces",
          "When the aircraft drops below 1,000 feet",
          "When ditching is announced by the crew",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-10",
    name: "Megaphone",
    category: "Miscellaneous Emergency Equipment",
    purpose:
      "Amplifies crew voice commands during an emergency evacuation when the PA system is unavailable, power is lost, or background noise makes verbal communication impossible",
    location:
      "Forward crew station or at a designated crew area — typically accessible to the senior crew member. Confirm exact location at crew position.",
    preflight:
      "Check: (1) Battery functional — test by briefly pressing the trigger. (2) No visible damage. (3) In correct stowage position.",
    presentAndSecure:
      "In designated stowage, battery functional, no visible damage",
    keyNumbers:
      "Range: approximately 300–500 metres at maximum volume. Battery life varies — check before every flight.",
    whenToUse:
      "During evacuation when the PA system is not available. Also useful when external noise (engines, wind) makes normal voice projection impossible.",
    whenNotToUse:
      "Do not test the megaphone at full volume inside the aircraft cabin unnecessarily — it is extremely loud and will alarm passengers.",
    unserviceable:
      "Battery dead or weak (no amplification). Physical damage to the unit. Trigger not functioning.",
    memoryTrick:
      "Megaphone = voice when the PA dies. Click it on for a brief test during preflight. One click is enough — you're checking that it works, not demonstrating it.",
    sayItOutLoud:
      "The megaphone is used when the PA system is unavailable during an emergency. I check it during preflight by pressing the trigger briefly to confirm the battery is functional.",
    traineesForget:
      "That the megaphone needs a battery check every flight. The brief trigger test during preflight is a required check — skipping it means you may discover a dead battery during the emergency.",
    quizItems: [
      {
        question: "When would you use a megaphone during an emergency?",
        options: [
          "To make regular passenger announcements",
          "When the PA system is unavailable and voice projection is insufficient",
          "Only when the captain orders it via interphone",
          "As a backup to the interphone system",
        ],
        answer: 1,
      },
      {
        question: "How do you check the megaphone during preflight?",
        options: [
          "Read the battery indicator only — no physical test needed",
          "Brief trigger test to confirm the battery is functional",
          "Full volume test to confirm range",
          "Check is not required — megaphone is checked by maintenance only",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-11",
    name: "First Aid Kit (FAK)",
    category: "Medical Equipment",
    purpose:
      "Provides basic medical treatment for minor in-flight injuries and illnesses — cuts, burns, headaches, minor allergic reactions, and similar conditions",
    location:
      "Forward and aft galley areas — specific locations confirmed during preflight. Must be accessible to all crew.",
    preflight:
      "Check: (1) Seal is unbroken — a broken seal indicates the kit has been opened and must be replenished or replaced. (2) Inspection date is current. (3) Contents list visible on exterior. (4) In correct location.",
    presentAndSecure:
      "Sealed (unbroken seal), inspection date current, in correct stowage",
    keyNumbers:
      "Number of FAKs on board is aircraft-specific. Each must have an unbroken seal and a current inspection date.",
    whenToUse:
      "For minor in-flight medical events: cuts, burns, headache, motion sickness, mild allergic reactions. Crew may use FAK without medical supervision.",
    whenNotToUse:
      "The FAK does not contain prescription medications or advanced medical equipment. For serious medical events, the Emergency Medical Kit (EMK) is required — and only with medical professional authorization.",
    unserviceable:
      "Seal is broken. Inspection date has expired. Visible damage to the kit.",
    memoryTrick:
      "FAK = First = Basic. Seal check every time. Broken seal = open kit = unusable until restocked.",
    sayItOutLoud:
      "The First Aid Kit is checked preflight: seal is intact, date is current, and it is in the correct location. A broken seal means the kit has been used and must be replaced before flight.",
    traineesForget:
      "That a broken seal makes the kit unserviceable — it must be replaced or replenished, not just reported after the flight.",
    quizItems: [
      {
        question: "The FAK seal is broken during preflight. What does this mean?",
        options: [
          "The kit is fine — seals break during normal storage",
          "The kit has been opened and must be replaced or replenished before departure",
          "Report it after the flight — the kit is still usable",
          "Only an expired inspection date makes a FAK unserviceable",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-12",
    name: "Emergency Medical Kit (EMK)",
    category: "Medical Equipment",
    purpose:
      "Contains prescription medications and advanced medical equipment for use in serious in-flight medical emergencies — cardiac events, anaphylaxis, serious respiratory distress",
    location:
      "Forward galley or designated crew station — secured and sealed",
    preflight:
      "Check: (1) Seal is unbroken. (2) Inspection date is current. (3) In correct stowage.",
    presentAndSecure:
      "Sealed, inspection date current, in correct location",
    keyNumbers:
      "Contents include: epinephrine, aspirin, nitroglycerin, IV supplies (varies by authority). Must be opened ONLY with medical professional authorization.",
    whenToUse:
      "Serious in-flight medical emergencies — cardiac arrest, anaphylaxis, severe respiratory distress — and only when a qualified medical professional (doctor, paramedic, nurse) is present and directs its use.",
    whenNotToUse:
      "Do NOT open or use the EMK without the direction of a qualified medical professional. Crew may not self-administer EMK medications without authorization.",
    unserviceable:
      "Seal broken. Inspection date expired. Contents compromised.",
    keyRestriction:
      "Must only be opened by or on the direct instruction of a qualified medical professional. Crew do not administer EMK medications independently.",
    memoryTrick:
      "EMK = Doctors Only. FAK = crew use. EMK = qualified medical professional direction. If no doctor, use FAK and AED only.",
    sayItOutLoud:
      "The Emergency Medical Kit is for serious medical emergencies only. It must only be opened under the direction of a qualified medical professional. The seal must be intact at preflight.",
    traineesForget:
      "That the EMK is NOT for crew to open on their own. Many trainees think it is an 'advanced FAK.' It is not — it requires a qualified medical professional to authorize its use.",
  },
  {
    id: "eq-13",
    name: "AED (Automated External Defibrillator)",
    category: "Medical Equipment",
    purpose:
      "Delivers a controlled electrical shock to restore normal heart rhythm during sudden cardiac arrest. Guides the user through the process with audio and visual instructions.",
    location:
      "Forward galley area in most aircraft. Some aircraft have them at multiple crew stations.",
    preflight:
      "Check: (1) Status indicator light is GREEN — green means ready. (2) Pads are connected (not expired). (3) Unit is not damaged. (4) In correct stowage.",
    presentAndSecure:
      "Status light green, pads connected and in date, in designated stowage",
    keyNumbers:
      "AED performs its own self-test — green light confirms readiness. Pad expiry dates must be current. Battery must be charged (confirmed by green light).",
    whenToUse:
      "Any time a passenger is in cardiac arrest (unresponsive, not breathing normally). Begin CPR immediately. Retrieve AED and apply as soon as possible. The AED will guide you through the process.",
    whenNotToUse:
      "Do not use on a conscious patient. Do not use if the patient is lying in water (move to dry surface first). Follow AED voice prompts.",
    unserviceable:
      "Status indicator is red, flashing amber, or showing any fault. Pads are expired. Battery is depleted.",
    memoryTrick:
      "Green light = Go. Red or no light = report and replace. The AED talks you through it — trust the machine, follow the prompts.",
    sayItOutLoud:
      "I check the AED: the status light is green, pads are connected and within expiry date, the unit is undamaged and in its stowage location. Green means the AED is ready.",
    traineesForget:
      "That the AED has a status indicator that must be GREEN — not just 'present.' Also: many forget to check pad expiry dates separately from the unit check.",
    quizItems: [
      {
        question: "What does a GREEN status light on an AED mean?",
        options: [
          "The AED is currently charging",
          "The AED is armed and ready to deliver a shock",
          "The AED has passed its self-test and is ready for use",
          "The AED battery is at 50% or above",
        ],
        answer: 2,
      },
      {
        question: "When should you NOT apply AED pads to a patient?",
        options: [
          "When the patient is unresponsive and not breathing",
          "When the patient is lying in a puddle of water",
          "When bystanders are nearby",
          "When it is the first minute of cardiac arrest",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-14",
    name: "Demo Kit / Safety Demo Equipment",
    category: "Cabin Safety Equipment",
    purpose:
      "Used to demonstrate safety equipment and procedures to passengers during the pre-flight safety demonstration. All items are replicas and are NOT functional emergency equipment.",
    location:
      "Designated crew stowage — usually in a bag or pouch at the crew station",
    preflight:
      "Check: (1) All demo items are present: seatbelt, life vest, oxygen mask model, safety card. (2) Seatbelt buckle operates correctly. (3) Demo oxygen mask is complete (tubing, mask, reservoir bag if applicable). (4) Safety card is current version.",
    presentAndSecure:
      "All demo items present, seatbelt functional, oxygen mask complete, safety card current",
    keyNumbers:
      "Every aircraft type has its own specific safety card and demo equipment — do not mix aircraft types.",
    whenToUse:
      "Before every departure. The safety demonstration is legally required on every passenger flight.",
    whenNotToUse:
      "Do NOT use demo equipment in an actual emergency — it is not functional. The demo oxygen mask is not connected to an oxygen supply. The demo life vest should not be used in a water evacuation.",
    unserviceable:
      "Any demo item missing. Safety card is the wrong version for the aircraft type. Seatbelt demo buckle does not function.",
    contents:
      "Seatbelt with working buckle, life vest replica, oxygen mask model with tubing, safety/briefing card",
    memoryTrick:
      "Demo kit = Show kit. Real equipment = Go kit. Never confuse the two. The demo oxygen mask does NOT provide oxygen.",
    sayItOutLoud:
      "The demo kit is checked: seatbelt buckle is operational, life vest is present, oxygen mask model is complete with tubing. The safety card is the correct current version for this aircraft type.",
    traineesForget:
      "That the demo oxygen mask is a replica — it provides no oxygen. This is a major test trap: confusing the demo mask with the actual therapeutic mask attached to the POB.",
    quizItems: [
      {
        question: "What is the purpose of the demo kit oxygen mask?",
        options: [
          "To be used in a medical emergency if the POB mask is unavailable",
          "To show passengers how to apply an oxygen mask — it is a replica and provides no oxygen",
          "To provide supplemental oxygen during the safety demonstration",
          "To test oxygen flow during preflight checks",
        ],
        answer: 1,
      },
      {
        question: "During preflight, you notice the safety card in the demo kit is from a different aircraft type. What should you do?",
        options: [
          "Use it — the safety information is the same for all aircraft",
          "Replace it with the correct version for this aircraft before departure",
          "Conduct the demo without the card",
          "Check with a passenger to see if they notice",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-15",
    name: "Girt Bar",
    category: "Door / Exit Equipment",
    purpose:
      "The metal bar that physically connects the evacuation slide pack to the floor brackets at the door threshold. When attached, it arms the door so the slide deploys automatically when the door is opened.",
    location:
      "At each main cabin door — attached to the door (disarmed) or to the floor bracket (armed)",
    preflight:
      "Confirm girt bar attachment status matches the required mode for flight phase. Before departure: girt bar should be attached to floor bracket (ARMED). After landing before doors open: girt bar must be on door (DISARMED).",
    presentAndSecure:
      "In the correct position for the current phase: floor bracket = armed for flight; door storage = disarmed for ground operations",
    keyNumbers:
      "Slide deploys in approximately 6 seconds when armed door is opened. Force of inflation: over 1,000 lbs. A ramp deployed slide can cause serious injury.",
    whenToUse:
      "Girt bar is attached to floor bracket (ARMED) before every departure — this is a normal operating procedure, not an emergency action.",
    whenNotToUse:
      "The girt bar must be on the DOOR (disarmed) whenever ground crew or passengers may open the door without an emergency evacuation. Never leave a door armed during ground operations.",
    unserviceable:
      "Girt bar is bent, cracked, or does not lock securely into the floor bracket or door stowage.",
    memoryTrick:
      "Girt bar on FLOOR = ARMED (ready to deploy slide). Girt bar on DOOR = DISARMED (safe to open). Floor = Flight. Door = Done.",
    sayItOutLoud:
      "The girt bar is on the floor bracket — the door is armed. The girt bar is on the door — the door is disarmed. I confirm my door status and cross-check with the crew.",
    traineesForget:
      "Which position means which status. Always visualize: floor bracket = the slide is set; door = the slide is stowed.",
    quizItems: [
      {
        question: "The girt bar is attached to the floor bracket. What does this mean?",
        options: [
          "The door is disarmed and safe to open",
          "The door is armed — the slide will deploy if the door is opened",
          "The slide has already deployed",
          "The girt bar position does not affect the arming status",
        ],
        answer: 1,
      },
      {
        question: "After landing, before opening the door to allow deplaning, what must you confirm?",
        options: [
          "The girt bar is attached to the floor bracket",
          "The girt bar has been moved from the floor bracket to the door (disarmed)",
          "The slide has been manually retracted",
          "The captain has confirmed it is safe to open",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "eq-16",
    name: "Flashlight / Torch",
    category: "Miscellaneous Emergency Equipment",
    purpose:
      "Provides illumination in the event of cabin lighting failure, smoke-filled compartments, or night evacuations. Essential during power failures.",
    location:
      "Each crew station — jumpseat area or adjacent stowage. Crew must have immediate access at their assigned position.",
    preflight:
      "Check: (1) Switch on briefly to confirm battery is functional. (2) No visible damage. (3) In correct stowage.",
    presentAndSecure:
      "In designated stowage at crew station, battery functional",
    keyNumbers:
      "Battery must be confirmed functional before every flight. LED torches: typical battery life 6–10 hours continuous use.",
    whenToUse:
      "Power failure, smoke event (to navigate in reduced visibility), locating emergency equipment in darkness, assisting passengers during evacuation in low-light conditions.",
    whenNotToUse:
      "Avoid using in conjunction with certain chemicals — though this is rare, be aware of fire risk if flammable materials are present.",
    unserviceable:
      "Battery dead or insufficient (dim or no light). Physical damage to the torch.",
    memoryTrick:
      "Click on, click off — that's the preflight check. One second is enough to confirm the battery works. If it's dim, it's done.",
    sayItOutLoud:
      "I check the flashlight at my crew station: click on, light is bright, click off, returned to stowage. Battery confirmed functional.",
    traineesForget:
      "To actually click it on during preflight. Many trainees 'check' the flashlight by looking at it rather than testing it. You must turn it on.",
  },
  {
    id: "eq-17",
    name: "Protective Gloves",
    category: "Protective Equipment",
    purpose:
      "Protects crew hands from heat, chemicals, and electrical hazards during fire fighting operations or when handling hazardous materials",
    location:
      "Galley area — typically stored with or adjacent to fire-fighting equipment",
    preflight:
      "Confirm gloves are present, intact, and in correct stowage.",
    presentAndSecure:
      "Present in designated location, no visible damage",
    keyNumbers:
      "Should be donned BEFORE handling any fire extinguisher during a fire event when time permits.",
    whenToUse:
      "Before handling fire-fighting equipment in a fire event. When handling potentially hazardous materials or liquids.",
    whenNotToUse:
      "Do not wear protective gloves when you need fine dexterity (e.g., operating interphone, connecting oxygen equipment). Remove them when no longer needed.",
    unserviceable:
      "Torn, punctured, or burned gloves provide no protection.",
    memoryTrick:
      "Gloves before you grab the Halon. Protect before you act.",
    sayItOutLoud:
      "Protective gloves are stowed with the fire-fighting equipment. I confirm they are present and intact during preflight.",
    traineesForget:
      "That protective gloves exist and where they are. They are often overlooked in preflight because they are considered secondary to the extinguisher.",
  },
  {
    id: "eq-18",
    name: "Seatbelt Extension",
    category: "Cabin Safety Equipment",
    purpose:
      "Extends the length of a passenger seatbelt for passengers who require additional length to fasten securely",
    location:
      "Available at crew stations or in overhead bins. Not pre-placed at passenger seats.",
    preflight:
      "Confirm extensions are present in correct quantity at crew station or stowage.",
    presentAndSecure:
      "Present at designated stowage location in correct quantity",
    keyNumbers:
      "One extension per passenger who requires it. Extensions are not to be shared between passengers simultaneously.",
    whenToUse:
      "When a passenger indicates they cannot fasten the standard seatbelt. Provide discreetly and without comment.",
    whenNotToUse:
      "Do not use a seatbelt extension on an infant or child — they require an approved child restraint system.",
    unserviceable:
      "Buckle mechanism does not latch and release correctly. Webbing is frayed or damaged.",
    memoryTrick:
      "Extension = extra length only. One per passenger. Provide discreetly. Never for infants or children.",
    sayItOutLoud:
      "Seatbelt extensions are stored at the crew station. I confirm the required quantity is present during preflight. I provide them discreetly upon request.",
    traineesForget:
      "That extensions should not be used for infants — a common test trap.",
  },
  {
    id: "eq-19",
    name: "Escape Rope",
    category: "Door / Exit Equipment",
    purpose:
      "Allows crew and passengers to descend safely from the aircraft in situations where the evacuation slide is unusable or unavailable at a specific exit",
    location:
      "Near specific exits — typically overwing exits or exits without slide deployment. Location is aircraft-type specific.",
    preflight:
      "Confirm escape rope is present, secured, and in correct stowage. Visual check of the rope anchor point.",
    presentAndSecure:
      "At correct exit, secured to anchor, no visible damage to rope",
    keyNumbers:
      "Length is matched to the aircraft exit height — do not use a rope intended for another aircraft type.",
    whenToUse:
      "When the evacuation slide at a specific exit has failed to deploy, or when the overwing exit leads to the wing surface and passengers must descend from there.",
    whenNotToUse:
      "Do not use if the primary slide is functional — the slide is faster and safer. Do not improvise with other rope or cording.",
    unserviceable:
      "Rope is frayed, damaged, or not securely anchored.",
    memoryTrick:
      "Rope = Rappel when the slide fails. Know your exits and know which ones have a rope vs a slide.",
    sayItOutLoud:
      "The escape rope at this exit is present, secured at the anchor point, and shows no visible damage.",
    traineesForget:
      "Which exits have ropes vs slides — many assume all exits have slides.",
  },
  {
    id: "eq-20",
    name: "Floor Proximity Lighting",
    category: "Cabin Safety Equipment",
    purpose:
      "Low-level pathway lighting installed along the cabin floor to guide passengers toward exits in smoke-filled or low-visibility conditions",
    location:
      "Installed along the aisle floor on both sides, leading to all exits. Also illuminates exit door sill areas.",
    preflight:
      "Floor proximity lighting is confirmed by maintenance check — crew verify the indicators on the system panel are functional during their preflight walk-through.",
    presentAndSecure:
      "System functional as confirmed by panel indicator; no visible damage to floor-level lights",
    keyNumbers:
      "Activates automatically in a cabin depressurization event, power failure, or emergency. Can also be manually activated. Designed to be visible from floor level even in dense smoke.",
    whenToUse:
      "Automatically activates in emergencies. Crew do not manually activate during normal operations.",
    whenNotToUse:
      "Do not disable or cover the lighting strips at any time.",
    unserviceable:
      "Individual lights not illuminating when tested. System panel shows fault.",
    memoryTrick:
      "Floor lights = follow the path. In smoke, crawl low and follow the floor lights to the exit. This is the instruction to give passengers.",
    sayItOutLoud:
      "Floor proximity lighting runs along the aisle and illuminates in an emergency to guide passengers to exits even in smoke. In smoke conditions, instruct passengers to stay low and follow the lights.",
    traineesForget:
      "That floor proximity lighting is distinct from normal cabin lighting. It is specifically designed for low-visibility emergency conditions and remains functional even when main cabin lights fail.",
  },
  {
    id: "eq-21",
    name: "Crash Axe",
    category: "Miscellaneous Emergency Equipment",
    purpose:
      "Used to breach aircraft structure — break through walls, floor, or overhead panels — to reach a fire source that cannot be accessed otherwise, or to free trapped occupants",
    location:
      "Cockpit (flight deck) — accessible to flight crew. In some larger aircraft, may be located in a crew area.",
    preflight:
      "Check that the axe is present and in its designated stowage. Confirm guard or cover is intact.",
    presentAndSecure:
      "In designated stowage, guard/cover intact",
    keyNumbers:
      "The crash axe is one of the most important firefighting tools — if the fire source is behind a concealed panel, the axe allows access. It is not a defensive weapon.",
    whenToUse:
      "To breach a bulkhead, wall, or floor panel to access a concealed fire source. As a last resort to free trapped crew or passengers.",
    whenNotToUse:
      "Do not use to open aircraft doors (door handles exist for this). Do not use indiscriminately — structural damage has flight safety implications.",
    unserviceable:
      "Handle is cracked or damaged. Blade is compromised.",
    memoryTrick:
      "Axe = Access. Break through to reach what you cannot see. Concealed fires need access before extinguishment.",
    sayItOutLoud:
      "The crash axe is located in the flight deck and is used to breach structure to access concealed fire sources. It is confirmed present at the designated stowage location.",
    traineesForget:
      "That the crash axe is primarily a fire-fighting tool — for accessing concealed fires — not just an 'emergency tool' with vague purpose.",
  },
  {
    id: "eq-22",
    name: "Flotation Seat Cushion",
    category: "Survival Equipment",
    purpose:
      "Some aircraft seat cushions are designed to be used as a personal flotation aid in a water emergency when a life vest is not available",
    location:
      "Built into the passenger seat — the cushion itself is the flotation device",
    preflight:
      "Crew verify during cabin walk-through that seats are clean and undamaged. Maintenance confirms flotation properties.",
    presentAndSecure:
      "Seat cushions in place and undamaged",
    keyNumbers:
      "Not all aircraft use flotation seat cushions — some use under-seat life vests instead. Check which type is on your aircraft.",
    whenToUse:
      "If a life vest is not available and the aircraft ditches, the seat cushion can be used as a flotation aid — held against the body, not worn.",
    whenNotToUse:
      "Not as effective as a life vest — it is a secondary flotation aid only. Cannot be strapped on.",
    unserviceable:
      "Damaged, waterlogged, or not the flotation-approved type for the aircraft.",
    memoryTrick:
      "Seat under = survival float. Grab the cushion and go. But a vest is always better.",
    sayItOutLoud:
      "Some aircraft seat cushions are approved flotation aids. In a water emergency, the cushion can be removed and used to support flotation if a life vest is not available.",
    traineesForget:
      "Whether their specific aircraft uses flotation cushions or under-seat life vests. These are mutually exclusive — know which one your aircraft carries.",
  },
  {
    id: "eq-23",
    name: "Overwing Exit",
    category: "Door / Exit Equipment",
    purpose:
      "Provides an additional emergency exit path over the wing surface, primarily in the event that standard door exits are blocked or unavailable",
    location:
      "Mid-cabin, positioned over the wing at specifically marked rows",
    preflight:
      "Confirm exit is not blocked by luggage or passenger items. Handle mechanism is accessible. Exit markings are visible.",
    presentAndSecure:
      "Clear of obstructions, handle accessible, markings visible",
    keyNumbers:
      "Passengers seated in exit rows must be briefed individually — confirm they understand the operating procedure and are physically able and willing to operate the exit.",
    whenToUse:
      "During an evacuation when door exits are blocked, on fire, or structurally inaccessible. The captain or crew determine which exits are usable based on external conditions.",
    whenNotToUse:
      "Do not use if there is fire or debris on the wing. Assess external conditions through the door viewing window before commanding exit use.",
    unserviceable:
      "Exit mechanism is obstructed. Handle is damaged.",
    memoryTrick:
      "Over-wing exits are escape route #2. Know where they are. Brief the exit row passengers. Always check outside before commanding their use.",
    sayItOutLoud:
      "The overwing exits are located at rows designated on the safety card. Exit row passengers are individually briefed on operating procedure, ability, and willingness. I check that the exits are clear of obstructions during my preflight walk-through.",
    traineesForget:
      "That exit row passengers must be individually briefed — a general cabin announcement is not sufficient for exit row occupants.",
  },
  {
    id: "eq-24",
    name: "Door Viewing Window",
    category: "Door / Exit Equipment",
    purpose:
      "Allows crew to check exterior conditions before opening a door — to confirm there is no fire, water, debris, or other hazard on the other side that would make opening the door dangerous",
    location:
      "Built into each main cabin door — a small porthole window at approximately eye level",
    preflight:
      "Confirm window is not obscured, cracked, or fogged. Check visibility through the window is clear.",
    presentAndSecure:
      "Clear visibility through window, no cracks or obscuring damage",
    keyNumbers:
      "Checking the viewing window is a required step BEFORE opening any door during an emergency evacuation — this takes approximately 2–3 seconds but can prevent catastrophic injury.",
    whenToUse:
      "Before opening any door during an emergency. This check is part of the evacuation door operating procedure.",
    whenNotToUse:
      "Never skip this check under time pressure — the few seconds it takes may prevent you from opening a door into fire, water, or onto a wing that has separated.",
    unserviceable:
      "Window is cracked, fogged, or externally obscured so that the view is not clear.",
    memoryTrick:
      "Look before you open. Always. No exceptions. 2 seconds of checking beats opening a door into a fire.",
    sayItOutLoud:
      "Before opening this door during an evacuation, I look through the viewing window to check external conditions: no fire, no water, no obstruction. Only then do I command the exit.",
    traineesForget:
      "To actually stop and look through the window during pressure drills. Under stress, trainees often skip this step because it 'feels' like it wastes time.",
  },
  {
    id: "eq-25",
    name: "Slide / Slide Raft",
    category: "Door / Exit Equipment",
    purpose:
      "The primary means of emergency evacuation from the aircraft. When the door is armed and opened, the slide inflates automatically and provides a rapid descent path to the ground or water.",
    location:
      "Contained within the door assembly (slide pack). Deploys outward from the door when activated.",
    preflight:
      "Check: (1) Girt bar is attached to floor bracket (ARMED mode). (2) Slide door/pack door is closed and latched. (3) No visible damage to slide pack exterior. (4) Inflation bottle connections are secure if accessible.",
    presentAndSecure:
      "Girt bar on floor bracket, slide door closed and latched, no visible damage to pack",
    keyNumbers:
      "Deploys in approximately 6 seconds. Once deployed, a slide/raft model can be detached from the aircraft and used as a water survival raft. Plain slides cannot be detached. Capacity for slide raft: varies, marked on the raft.",
    whenToUse:
      "On captain's command for evacuation. Each crew member at their assigned exit uses their exit unless directed otherwise based on external conditions.",
    whenNotToUse:
      "Do not deploy if there is fire below the exit, if the wing is the landing surface and a slide would reach it at a dangerous angle, or if the slide has deployed and is unserviceable (torn, deflated). In these cases, direct to an alternate exit.",
    unserviceable:
      "Slide pack door open. Girt bar missing. Visible damage to pack. Slide failed to inflate after door opening.",
    memoryTrick:
      "Slide = evacuate fast. Slide/raft = evacuate AND float. Know which type your aircraft has — test question guaranteed.",
    sayItOutLoud:
      "My door is armed — girt bar is on the floor bracket. Slide pack door is closed and latched. In an evacuation, I will check the viewing window, open the door, confirm slide is deployed, and command: JUMP AND SLIDE, LEAVE EVERYTHING BEHIND.",
    traineesForget:
      "The difference between a slide and a slide/raft — and that the distinction matters for ditching procedures. Also frequently forgotten: the precise command wording during evacuation.",
    quizItems: [
      {
        question: "Approximately how many seconds does it take for an evacuation slide to fully inflate?",
        options: ["1–2 seconds", "6 seconds", "30 seconds", "60 seconds"],
        answer: 1,
      },
      {
        question: "What is the difference between a plain slide and a slide/raft?",
        options: [
          "A slide/raft is longer and faster",
          "A slide/raft can detach from the aircraft and serve as a water survival raft; a plain slide cannot",
          "A slide raft deploys automatically; a plain slide requires manual activation",
          "There is no operational difference",
        ],
        answer: 1,
      },
      {
        question: "During evacuation, you open the door and the slide does not inflate. What do you do?",
        options: [
          "Wait 30 seconds and try again",
          "Redirect passengers to an alternate exit and inform the senior crew member",
          "Manually pull the inflation handle",
          "Tell passengers to jump to the wing",
        ],
        answer: 1,
      },
    ],
  },
];
