export type AnnouncementCategory =
  | "Boarding Welcome"
  | "Safety Compliance"
  | "Turbulence"
  | "Cabin Secure"
  | "Emergency Commands"
  | "Deplaning";

export interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  script: string;
  shortScript: string;
  tone: string;
  deliveryTips: string[];
  keyFocus: string[];
  timer: number;
}

export const announcements: Announcement[] = [
  // BOARDING WELCOME
  {
    id: "bw-1",
    category: "Boarding Welcome",
    title: "Welcome Aboard Announcement",
    script: "Good morning, ladies and gentlemen — and welcome aboard. On behalf of the captain and your entire cabin crew, we would like to welcome you to this flight. We hope you enjoy the journey today. Before we depart, we will shortly ask for your full attention for our safety demonstration. We ask that at this time you please stow your carry-on luggage in the overhead bins or under the seat in front of you, and ensure all personal electronic devices are switched off or set to flight mode. We will be departing shortly. Thank you for choosing to fly with us today — we look forward to taking care of you.",
    shortScript: "Welcome aboard. We ask that you stow your luggage and switch all devices to flight mode. We'll be departing shortly. Thank you for flying with us.",
    tone: "Warm, calm, professional. Smile while you speak — it carries in your voice.",
    deliveryTips: [
      "Smile while speaking — passengers can hear warmth even without seeing your face.",
      "Pause between phrases. Let the words land.",
      "Never rush the welcome. It sets the tone for the entire flight.",
      "Project to the back of the cabin — not loudly, but clearly.",
      "Avoid filler words: 'um,' 'so,' 'like.'",
    ],
    keyFocus: ["Warmth", "Clarity", "Pace"],
    timer: 60,
  },
  {
    id: "bw-2",
    category: "Boarding Welcome",
    title: "Welcome Back / Loyalty Tier",
    script: "Good evening, ladies and gentlemen, and welcome aboard. We're delighted to have you with us today. A special welcome to our premium cabin passengers and to our frequent flyers — thank you for your continued loyalty. Before we begin our safety demonstration, we ask that you please ensure your bags are stowed in the overhead lockers or under the seat in front of you, that all large electronic devices are placed in flight mode, and that your seatbelt is fastened. We'll be departing shortly and look forward to making your journey as comfortable as possible. If there is anything we can do for you, please do not hesitate to ask.",
    shortScript: "Good evening and welcome aboard. Bags stowed, devices to flight mode, seatbelt fastened. We look forward to your journey.",
    tone: "Polished and elevated. Premium feel without being stiff.",
    deliveryTips: [
      "Elevate your tone slightly for a premium welcome — more composed, less casual.",
      "The phrase 'please do not hesitate to ask' must sound sincere, not automatic.",
      "Slow your pace by 10% compared to your natural speed.",
    ],
    keyFocus: ["Warmth", "Authority", "Pace"],
    timer: 60,
  },

  // SAFETY COMPLIANCE
  {
    id: "sc-1",
    category: "Safety Compliance",
    title: "Seatbelt Reminder During Boarding",
    script: "Ladies and gentlemen, a reminder that while the seatbelt sign is illuminated, we ask that you remain seated with your seatbelt fastened. To fasten your seatbelt, insert the metal fitting into the buckle and pull the strap firmly until it fits low and tight across your hips. To release, simply lift the top of the buckle. For your safety and the safety of others, we ask for your cooperation. Thank you.",
    shortScript: "Please remain seated and keep your seatbelt fastened while the sign is on. Insert the metal fitting into the buckle and pull tight across your hips. Thank you.",
    tone: "Clear and direct. Not apologetic. This is a safety instruction, not a request.",
    deliveryTips: [
      "Do not soften safety instructions with excessive politeness. Be clear.",
      "Demonstrate confidence — you are the authority on this aircraft.",
      "Pause after 'thank you' — give passengers a moment to comply.",
    ],
    keyFocus: ["Authority", "Clarity", "Command Presence"],
    timer: 40,
  },
  {
    id: "sc-2",
    category: "Safety Compliance",
    title: "Electronic Device Compliance",
    script: "Ladies and gentlemen, we ask that at this time all portable electronic devices including mobile phones, tablets, and laptops be switched to flight mode. If your device does not have a flight mode function, we ask that it be completely switched off for the duration of the flight. This includes devices stored in overhead bins. We appreciate your cooperation and thank you.",
    shortScript: "All portable electronic devices must now be in flight mode. Devices without flight mode should be switched off completely. Thank you.",
    tone: "Firm but polite. Regulatory but not robotic.",
    deliveryTips: [
      "State the instruction clearly before explaining the reason.",
      "Don't apologise for the requirement — it's a regulation.",
      "'Including devices stored in overhead bins' — pause here for emphasis.",
    ],
    keyFocus: ["Clarity", "Authority", "Confidence"],
    timer: 35,
  },

  // TURBULENCE
  {
    id: "turb-1",
    category: "Turbulence",
    title: "Light Turbulence — Service Pause",
    script: "Ladies and gentlemen, the captain has illuminated the fasten seatbelt sign due to light turbulence ahead. We ask that you return to your seats and fasten your seatbelts. We will be pausing our service temporarily until conditions improve. If you are in a lavatory or the aisle, please return to your seat as soon as possible. We apologise for any inconvenience and hope to resume our service shortly. Thank you for your patience.",
    shortScript: "Please return to your seat and fasten your seatbelt. We're pausing service due to light turbulence. Thank you for your patience.",
    tone: "Calm and reassuring. Acknowledge the inconvenience but do not over-apologise.",
    deliveryTips: [
      "Your calm tone tells passengers whether to be concerned. Sound calm — they will be calm.",
      "Do not say 'unfortunately' or 'I'm so sorry' repeatedly — it signals alarm.",
      "Speak slightly slower than normal. It signals control.",
    ],
    keyFocus: ["Calm", "Clarity", "Warmth"],
    timer: 45,
  },
  {
    id: "turb-2",
    category: "Turbulence",
    title: "Moderate Turbulence — Immediate Compliance",
    script: "Ladies and gentlemen, this is your cabin crew. The captain has requested that all passengers return to their seats immediately and fasten their seatbelts. This includes all passengers currently in the aisles or in the lavatories — please return to your seat now. Fasten your seatbelt by inserting the fitting into the buckle and pulling the strap firmly tight. We ask for your immediate compliance for your own safety. Thank you.",
    shortScript: "All passengers must return to their seats and fasten seatbelts immediately. This is a safety instruction. Please comply now.",
    tone: "Urgent but controlled. More directive than the light turbulence version.",
    deliveryTips: [
      "The word 'immediately' must be said with full weight — do not soften it.",
      "Drop the warmth slightly. This is a command, not a request.",
      "If the seatbelt sign is on and passengers are standing — this announcement is your tool. Use it firmly.",
    ],
    keyFocus: ["Command Presence", "Authority", "Urgency"],
    timer: 40,
  },

  // CABIN SECURE
  {
    id: "cs-1",
    category: "Cabin Secure",
    title: "Pre-Landing Cabin Secure Check",
    script: "Ladies and gentlemen, we are now beginning our descent. At this time, we ask that you return to your seats, fasten your seatbelts, and return your seat backs and tray tables to their full upright and locked positions. Window blinds should be raised and all portable electronic devices stowed. Any remaining service items will be collected shortly. We ask for your cooperation at this time as we prepare the cabin for landing. Thank you.",
    shortScript: "We're descending. Seats upright, tray tables stowed, seatbelts on, blinds up, devices stowed. Thank you.",
    tone: "Efficient, clear, and calm. Businesslike without being cold.",
    deliveryTips: [
      "This announcement has multiple instructions — pace yourself clearly between each one.",
      "Don't let the list blur together. Brief pause between each instruction.",
      "Project warmth alongside efficiency — you're wrapping up a service.",
    ],
    keyFocus: ["Clarity", "Pace", "Confidence"],
    timer: 45,
  },
  {
    id: "cs-2",
    category: "Cabin Secure",
    title: "Final Check — Doors to Manual",
    script: "All crew, please take your seats for landing.",
    shortScript: "All crew, seats for landing.",
    tone: "Crisp, professional. This is a crew communication — not a passenger announcement.",
    deliveryTips: [
      "Short and clear. This is not the time for warm tone — it is professional precision.",
      "Every word must be distinct. 'All crew — seats — for landing.'",
      "This should sound like you mean it. Because you do.",
    ],
    keyFocus: ["Authority", "Clarity", "Confidence"],
    timer: 15,
  },

  // EMERGENCY COMMANDS
  {
    id: "ec-1",
    category: "Emergency Commands",
    title: "Brace Command",
    script: "BRACE! BRACE! BRACE! HEAD DOWN! STAY DOWN! BRACE! BRACE! BRACE! HEAD DOWN! STAY DOWN!",
    shortScript: "BRACE! BRACE! BRACE! HEAD DOWN! STAY DOWN!",
    tone: "Maximum volume. Repeated continuously. No hesitation. This saves lives.",
    deliveryTips: [
      "This command must be at full volume — louder than anything else you've said today.",
      "Repeat without pause. You do not stop until impact.",
      "Remove ALL softness from your voice. This is not a request.",
      "Face the cabin. Arms out. Show the brace position as you command it.",
      "Practice this until it feels natural to be that loud. Hesitation costs lives.",
    ],
    keyFocus: ["Authority", "Urgency", "Volume"],
    timer: 20,
  },
  {
    id: "ec-2",
    category: "Emergency Commands",
    title: "Evacuation Command",
    script: "JUMP AND SLIDE! LEAVE EVERYTHING! JUMP AND SLIDE! LEAVE EVERYTHING! COME THIS WAY! JUMP AND SLIDE! LEAVE EVERYTHING!",
    shortScript: "JUMP AND SLIDE! LEAVE EVERYTHING! COME THIS WAY!",
    tone: "Full command presence. Repeated continuously. Passengers must hear and obey immediately.",
    deliveryTips: [
      "Point to the slide as you command — physical direction reinforces the voice command.",
      "'Leave everything' must be said with conviction. Passengers will try to grab bags.",
      "Continuous repetition — never stop commanding while the exit is in use.",
      "Maintain eye contact with the slide exit, not the crowd.",
    ],
    keyFocus: ["Authority", "Urgency", "Command Presence"],
    timer: 20,
  },

  // DEPLANING
  {
    id: "dep-1",
    category: "Deplaning",
    title: "Landing Welcome / Arrival",
    script: "Ladies and gentlemen, welcome to [destination]. The local time is [time] and the temperature is [temperature]. On behalf of the captain and your cabin crew, thank you for flying with us today. We hope you enjoyed your journey. Please remain seated with your seatbelt fastened until the captain has turned off the fasten seatbelt sign and the aircraft has come to a complete stop at the gate. When it is safe to do so, please take care when opening overhead lockers as items may have shifted during the flight. We hope to see you on board again soon. Have a wonderful stay.",
    shortScript: "Welcome to [destination]. Please remain seated until the sign is off and we've stopped. Take care with overhead lockers. Have a wonderful stay.",
    tone: "Warm, genuine, energised. End on a high note — this is the final impression.",
    deliveryTips: [
      "Sound genuinely pleased to have arrived. Your energy here reflects the whole flight.",
      "The 'overhead lockers' warning must be clear — passengers ignore it and get hurt.",
      "Pause after 'have a wonderful stay.' Let it land.",
      "Smile — this is the farewell.",
    ],
    keyFocus: ["Warmth", "Pace", "Confidence"],
    timer: 50,
  },
  {
    id: "dep-2",
    category: "Deplaning",
    title: "Farewell at the Door",
    script: "Thank you for flying with us today. It was a pleasure having you on board. We look forward to welcoming you back on a future flight. Have a safe onward journey.",
    shortScript: "Thank you for flying with us. It was a pleasure. Safe travels.",
    tone: "Personal, warm, genuine. This is face-to-face — it should feel like you mean it.",
    deliveryTips: [
      "Make eye contact. This is a person-to-person moment.",
      "Do not say 'have a nice day' on auto-repeat — vary the phrase.",
      "Let your warmth carry — this is your final impression on every passenger.",
    ],
    keyFocus: ["Warmth", "Genuineness", "Confidence"],
    timer: 20,
  },
];

export const announcementCategories: AnnouncementCategory[] = [
  "Boarding Welcome",
  "Safety Compliance",
  "Turbulence",
  "Cabin Secure",
  "Emergency Commands",
  "Deplaning",
];
