export interface CommonMistake {
  id: string;
  mistake: string;
  whyItHappens: string;
  howToFix: string;
  practiceInstead: string;
  warningSign: string;
}

export const commonMistakes: CommonMistake[] = [
  {
    id: "cm-1",
    mistake: "Freezing Under Pressure",
    whyItHappens:
      "The brain under acute stress defaults to the most familiar behavior. If the trainee has not drilled a procedure enough times, there is no automatic response to fall back on. Freezing is the brain searching its database and coming up empty.",
    howToFix:
      "Drill until procedures become automatic, not just familiar. There is a difference between 'I know what to do' and 'I will do it instantly without thinking.' The second version only comes from repetition under pressure conditions.",
    practiceInstead:
      "Use the timed quiz mode. Set a 20-second timer per question. Do the Say It Out Loud drills at full volume, not quietly in your head. Practice commands out loud as if people are listening.",
    warningSign:
      "If you can answer questions easily on paper but feel your mind go blank when someone asks you out loud — you are not ready yet. The fix is more spoken practice, not more reading.",
  },
  {
    id: "cm-2",
    mistake: "Mixing Up the Step Sequence",
    whyItHappens:
      "Procedures have multiple steps that are individually easy to remember but difficult to recall in the correct order under stress. Trainees often remember all the steps but not the sequence, and sequence is everything in aviation.",
    howToFix:
      "Write procedures out from memory, in order, without looking. If you cannot write them correctly, you do not know them correctly. Then say them out loud in sequence. Use memory anchors (acronyms, physical actions) to lock the order.",
    practiceInstead:
      "For door procedures: say 'Arm — Cross-Check — All-Call' and physically mime each action as you say it. For emergency drills: trace the sequence on paper before drilling verbally. Sequence first, then speed.",
    warningSign:
      "If you frequently say 'I know all the steps, I just mixed up the order' — that IS not knowing the procedure. Order is part of the answer.",
  },
  {
    id: "cm-3",
    mistake: "Weak Terminology Recognition",
    whyItHappens:
      "Trainees often read terms passively — scanning the definitions without actively testing recall. Recognition (seeing a term and knowing it) is much weaker than recall (hearing a description and producing the term). Tests and trainers use recall.",
    howToFix:
      "Switch to active recall. Cover the definition and try to say it from the term. Then cover the term and try to produce it from the definition. Flashcards in both directions. Quiz yourself before you feel ready.",
    practiceInstead:
      "Use the Flashcards section in both directions: code to definition AND definition to code. Mark the ones you get wrong and drill them again before moving to new terms. Do not skip the ones you almost got right — 'almost' is wrong.",
    warningSign:
      "If you can recognize a term in a multiple-choice list but cannot define it unprompted — you are doing recognition training, not recall training.",
  },
  {
    id: "cm-4",
    mistake: "Forgetting the Small Exact Details",
    whyItHappens:
      "Training content emphasizes concepts and procedures, but tests frequently target the specific numbers, colors, sequences, and wording that make one answer correct and three answers plausible. These fine details require separate, targeted study.",
    howToFix:
      "Build a personal list of specific numbers and details from the Small Details section. Test them daily. These are the questions that separate well-prepared trainees from excellent ones: PSI levels, indicator colors, duration in minutes, altitude thresholds.",
    practiceInstead:
      "Review the Small Details That Get Tested section. Pick three details per day and quiz yourself on them. For equipment: know the exact PSI, not just 'above minimum.' For procedures: know the exact altitude, not just 'low down.'",
    warningSign:
      "Answers like 'the gauge should be full' or 'the indicator should be the right color' indicate insufficient detail. What is full? What color exactly?",
  },
  {
    id: "cm-5",
    mistake: "Studying Without Structure",
    whyItHappens:
      "Without a clear study path, trainees gravitate toward the material they already know (comfortable review) and avoid what they are weakest on (uncomfortable challenge). This creates false confidence and leaves real gaps.",
    howToFix:
      "Follow the Academy training phases in sequence. Do not skip ahead. Complete each phase before moving on. When you fail a quiz, that is the content you study next — not the content you passed.",
    practiceInstead:
      "After every quiz, look at your wrong answers only. Do not re-read what you got right. Study the wrong answers specifically. Then repeat the quiz. This is how you close gaps instead of widening them.",
    warningSign:
      "If you have been studying for weeks but always in the same sections — you are reinforcing strengths, not building the weaknesses that will fail you in a real assessment.",
  },
  {
    id: "cm-6",
    mistake: "Rambling in Interview Answers",
    whyItHappens:
      "Without a clear structure, nervous candidates fill silence with more words. More words create more opportunities to say the wrong thing, lose the thread of the answer, and leave the interviewer with no clear takeaway.",
    howToFix:
      "Use the STAR method for every behavioral question: Situation, Task, Action, Result. Practice answering in 60–90 seconds. If your answer is longer than 90 seconds, it is too long. Time yourself. Cut until it is clean.",
    practiceInstead:
      "Use the Speak & Shine section. Set the 60-second timer. Give your STAR answer. Stop at 60 seconds. If you haven't finished your answer, your answer is too long — restructure it, not the time limit.",
    warningSign:
      "If your interview practice answers frequently run over 2 minutes, or if you find yourself saying 'and then... and then... and also...' — your answer has no structure. STAR it.",
  },
  {
    id: "cm-7",
    mistake: "Panic After a Bad Quiz Score",
    whyItHappens:
      "Trainees often treat quiz scores as judgments of their potential rather than data about their current knowledge gaps. A bad score creates anxiety, which reduces study effectiveness, which leads to another bad score.",
    howToFix:
      "Reframe what a bad quiz means. A bad quiz on Emergency Equipment means: study Emergency Equipment next. It is a diagnostic, not a verdict. Write down what you got wrong, study only that material, and re-quiz within 24 hours.",
    practiceInstead:
      "After a bad score, open the Reference Library and find the specific section your quiz identified as weak. Read five entries in that section. Then go back and re-take only that quiz category. Progress on the retry is what matters.",
    warningSign:
      "If a bad quiz score makes you stop studying — that is the moment study most needs to continue. The version of you who passes training keeps going after a bad quiz.",
  },
  {
    id: "cm-8",
    mistake: "Answering What You Wish They Asked",
    whyItHappens:
      "Candidates prepare specific answers and then force those answers onto slightly different questions. Interviewers notice when the answer does not address the question asked. It signals poor listening and poor adaptability.",
    howToFix:
      "Listen to the complete question before forming your answer. Pause for 2–3 seconds to organize your response. If you are unsure what is being asked, it is better to briefly restate the question than to answer the wrong one confidently.",
    practiceInstead:
      "In the Speak & Shine section, practice responding to the random prompt as given — not your prepared version of it. The question is the question. Answer that specific question.",
    warningSign:
      "If you catch yourself saying 'that's similar to...' and then pivoting to a different story — you are answering a question you prepared for, not the one you were asked.",
  },
];
