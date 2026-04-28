export interface CrashLesson {
  id: string;
  title: string;
  incident: string;
  whatHappened: string;
  procedureMissed: string;
  whyItMattered: string;
  lessonForCrew: string;
  keyTakeaway: string;
}

export const crashLessons: CrashLesson[] = [
  {
    id: "cl-1",
    title: "The Door That Was Never Disarmed",
    incident: "Ground Incident — Slide Deployment",
    whatHappened:
      "After landing, a cabin door was opened by ground crew while it was still in the armed mode. The evacuation slide deployed instantly on the ramp, injuring a ground handler and causing significant aircraft damage.",
    procedureMissed:
      "The crew did not complete the Disarm Doors and Cross-Check procedure after landing. The all-call was either skipped or not confirmed before ground crew began door operations.",
    whyItMattered:
      "An armed door is a loaded device. Opening it triggers an explosive inflation of the escape slide — a 70-pound bladder deploying in under 6 seconds. In a confined ramp area, this is immediately life-threatening.",
    lessonForCrew:
      "Disarming doors is not a formality. It is the last safety-critical action before the aircraft opens to the outside world. Every crew member at every door must complete it — and confirm it. The all-call exists specifically to prevent this scenario.",
    keyTakeaway: "Never open a door before confirming your door is disarmed and cross-check is complete.",
  },
  {
    id: "cl-2",
    title: "When No One Repeated Back",
    incident: "Communication Failure During Emergency",
    whatHappened:
      "During a declared emergency, the captain gave critical instructions over the interphone. The receiving crew member said 'okay' and ended the call. The instructions were not fully understood, and critical preparation steps were missed before landing.",
    procedureMissed:
      "Closed-loop communication. The crew member did not repeat back the instructions to confirm understanding. 'Okay' is not confirmation — it is an assumption.",
    whyItMattered:
      "Under stress, the human brain hears what it expects to hear, not always what was said. The closed communication loop forces both parties to verify that the message was received accurately. Without it, critical steps can be missed or misinterpreted.",
    lessonForCrew:
      "In aviation communication, you confirm by repeating back the critical elements: 'Captain, L1 — understood, emergency landing, brace command on your mark, doors to manual.' Never accept 'okay' as confirmation during a safety-critical exchange.",
    keyTakeaway:
      "Repeat back critical information. 'Understood' only counts when both parties agree on what was understood.",
  },
  {
    id: "cl-3",
    title: "The Life Vest That Was Inflated Inside",
    incident: "Water Evacuation — Flotation Device Error",
    whatHappened:
      "During a ditching scenario, some passengers inflated their life vests inside the cabin before exiting. As water entered the aircraft and the cabin filled, those passengers were trapped against the ceiling by the buoyancy of the inflated vests and could not submerge to reach the exits.",
    procedureMissed:
      "The safety demonstration instruction to inflate the life vest only after exiting the aircraft. Passengers either missed or misremembered this specific detail.",
    whyItMattered:
      "An inflated life vest provides significant upward force. Inside a flooding aircraft, that force pins a person to the ceiling — directly above rising water, away from the underwater exits. The instruction is not arbitrary. It is the difference between escaping and not.",
    lessonForCrew:
      "Every word of the safety demonstration is deliberate. 'Do not inflate inside the aircraft' is not a preference — it is a survival instruction. Deliver it clearly. Make eye contact during that specific line. Repeat it if necessary.",
    keyTakeaway:
      "Life vests are inflated only after exiting the aircraft. Drill this line until it is automatic.",
  },
  {
    id: "cl-4",
    title: "The Fire That Seemed Small",
    incident: "In-Flight Lavatory Fire",
    whatHappened:
      "A small fire started in a lavatory waste bin. A crew member briefly checked it, saw no visible flame, and decided it had self-extinguished. Twenty minutes later, a hidden smoldering fire broke through the wall and spread rapidly through the ceiling of the cabin.",
    procedureMissed:
      "The crew member did not follow the full fire response protocol: contain, extinguish, confirm, report. Checking once and assuming self-extinguishment is not protocol — it is wishful thinking.",
    whyItMattered:
      "Concealed fires in aircraft interiors can smolder invisibly for extended periods before spreading catastrophically. Aviation fires move fast. A fire behind a wall in flight can become uncontrollable in minutes.",
    lessonForCrew:
      "If you see smoke, smell burning, or suspect fire — follow the full protocol every single time. Never assume self-extinguishment. Use the correct extinguisher, verify with a crew member, notify the flight deck. A fire that 'seems small' is the most dangerous kind.",
    keyTakeaway:
      "Every suspected fire gets a full response. There is no such thing as 'probably fine' when it comes to smoke or burning smells.",
  },
  {
    id: "cl-5",
    title: "The Oxygen Mask That Wasn't Checked",
    incident: "Medical Emergency — Oxygen Equipment Failure",
    whatHappened:
      "A passenger lost consciousness in flight and required oxygen. The crew retrieved the Portable Oxygen Bottle (POB), but the mask was detached and could not be located quickly. Valuable time was lost reconnecting the mask while the passenger was without supplemental oxygen.",
    procedureMissed:
      "The preflight equipment check. The mask had been separated from the bottle after a previous flight and was not reattached or confirmed during the preflight check.",
    whyItMattered:
      "Equipment is only useful if it is ready to use. In a medical emergency, seconds matter. A poorly checked POB, an expired AED pad, a sealed FAK with missing contents — these are all failures that happen in the quiet moment of a preflight check, not during the emergency.",
    lessonForCrew:
      "Preflight checks are not bureaucratic checkbox exercises. They are the difference between equipment that works when you need it and equipment that fails when it matters most. Check the POB: gauge in range, mask attached, flow selector functional. Every flight. Every time.",
    keyTakeaway:
      "The preflight check is your promise to every passenger that the equipment will work. Take it seriously.",
  },
  {
    id: "cl-6",
    title: "Nobody Said Brace",
    incident: "Emergency Landing — Command Delay",
    whatHappened:
      "An aircraft made an emergency landing following a technical issue. The brace command was given by the captain but was delayed as crew members waited for confirmation rather than acting immediately. Some passengers were not in the brace position when impact occurred.",
    procedureMissed:
      "Immediate and assertive command delivery. Crew members hesitated when they should have acted.",
    whyItMattered:
      "In an emergency, hesitation is the enemy. The brace command must be delivered immediately, loudly, and repeatedly: 'Brace! Brace! Brace!' — not 'um, I think we need to brace now.' The tone of your voice communicates authority. Passengers respond to confidence, not uncertainty.",
    lessonForCrew:
      "Practice the brace command out loud. Practice it until it comes automatically without hesitation or embarrassment. When the moment comes, you will not rise to the occasion — you will fall to the level of your training.",
    keyTakeaway:
      "Your voice in an emergency is a tool. Train it to be clear, loud, and immediate.",
  },
  {
    id: "cl-7",
    title: "The Oxygen Mask Demo That Was Rushed",
    incident: "Rapid Decompression — Passenger Response",
    whatHappened:
      "Following a rapid decompression event, multiple passengers struggled to correctly apply their oxygen masks. The masks deployed correctly but passengers pulled them over their faces without first pulling the tab to start oxygen flow, and many placed them incorrectly.",
    procedureMissed:
      "A thorough, clear safety demonstration with emphasis on the pull-tab sequence and mask application technique.",
    whyItMattered:
      "At altitude during decompression, useful consciousness may be as little as 15–30 seconds. A passenger who cannot apply their mask correctly in that window will lose consciousness before receiving oxygen. The safety demo is the only preparation they have.",
    lessonForCrew:
      "When demonstrating the oxygen mask, speak clearly and demonstrate physically: pull the tab, place over nose and mouth, breathe normally. Make eye contact with passengers who seem distracted. The safety demo is not a performance — it is training for a real scenario.",
    keyTakeaway:
      "Regulations are written in blood. The safety demonstration exists because of events exactly like this one.",
  },
];
