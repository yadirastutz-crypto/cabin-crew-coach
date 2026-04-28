export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  lookingFor: string;
  answerStructure?: string;
  starTip?: string;
  sampleAnswer: string;
  dontSay?: string;
  confidenceTip?: string;
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "int-1",
    category: "Tell Me About Yourself",
    question: "Tell me about yourself.",
    lookingFor: "A clear, confident, relevant 60-second summary — not a life story. They want to hear communication skills, composure, and relevance to the role.",
    answerStructure: "Background (1 sentence) → relevant skills or experience (2 sentences) → why cabin crew / this airline (1 sentence) → what you bring (1 sentence).",
    sampleAnswer:
      "I have a background in customer-facing service, where I've worked with diverse people under pressure and learned to stay composed and professional in difficult moments. I've been building toward a career in aviation for the past two years — studying safety procedures, earning my first aid certification, and preparing seriously. I'm drawn to this role because I want work that genuinely matters: safety, service, and being part of a professional team. I'm ready to train hard and commit fully.",
    dontSay:
      "'Well, I've always loved to travel...' — don't start with your personal motivation. Start with what you bring.",
    confidenceTip:
      "Prepare and rehearse a 60-second version until it sounds like a natural conversation, not a memorized script. Time yourself.",
  },
  {
    id: "int-2",
    category: "Why This Airline",
    question: "Why do you want to be a flight attendant?",
    lookingFor:
      "Safety awareness and genuine service motivation — not just 'I love to travel.' They want to hear that you understand this is a safety profession first.",
    answerStructure:
      "Safety-first framing → genuine service motivation → career commitment → specific attraction to the role.",
    sampleAnswer:
      "I want to be a flight attendant because I'm genuinely drawn to the combination of safety responsibility and meaningful service. This is a job where your professionalism and alertness can make a real difference — not just to someone's comfort, but potentially to their life. I also have a genuine love for customer interaction and working within a team that holds itself to high standards. This is a career I've researched, prepared for, and take seriously.",
    dontSay:
      "'I love traveling and meeting people.' — too generic and signals you don't understand the safety-first nature of the role.",
    confidenceTip:
      "Mention safety explicitly and early. Interviewers are listening for it.",
  },
  {
    id: "int-3",
    category: "Why This Airline",
    question: "Why this airline specifically?",
    lookingFor:
      "Research and genuine fit — not flattery. They want evidence that you chose them deliberately and know something specific about the airline.",
    answerStructure:
      "Specific reason #1 (values, culture, network, reputation) → specific reason #2 → how this airline fits your long-term career intentions.",
    sampleAnswer:
      "I've researched your training standards, and they're among the most rigorous in the industry — which is exactly what I'm looking for. I also respect your safety record and the way your crew culture is described by people who work here. I've spoken with current crew members and what they told me about team culture and professional standards confirmed this is where I want to build my career — not just any airline.",
    dontSay:
      "'You're a great airline' or 'I've always wanted to fly with you' — too vague and unresearched.",
    confidenceTip:
      "Do real research before the interview. Know one specific fact about this airline's training, values, or network. Use it.",
  },
  {
    id: "int-4",
    category: "Difficult Passenger Scenarios",
    question: "Describe a time you dealt with a difficult customer.",
    lookingFor:
      "Calm under pressure, professional tone, solution-focused outcome, and no negativity toward the customer.",
    answerStructure:
      "STAR: Situation (brief) → Task (your responsibility) → Action (what you specifically did) → Result (positive resolution).",
    starTip: "Situation → Task → Action → Result",
    sampleAnswer:
      "A customer at my previous role became very upset after a long wait caused by a system failure. I acknowledged their frustration immediately and validated it — the wait was genuinely unacceptable. I explained the situation honestly and offered what was within my authority. I stayed calm throughout, lowered my own voice and pace, and by the end of the conversation they thanked me by name. The manager later commended how I handled it. I learned that calm, honest communication almost always de-escalates even the most tense situations.",
    dontSay:
      "'The customer was being unreasonable' or 'I had to explain to them that...' — never speak negatively about the customer in your answer.",
    confidenceTip:
      "Focus on your actions and the outcome, not on how difficult the customer was. Interviewers want to see your process, not your frustration.",
  },
  {
    id: "int-5",
    category: "Difficult Passenger Scenarios",
    question: "What would you do if a passenger refused to follow a safety instruction?",
    lookingFor:
      "Safety-first mindset, calm authority, awareness of escalation procedures, and the ability to distinguish between preference and compliance.",
    answerStructure:
      "Acknowledge → explain safety requirement → give time to comply → escalate if needed → never compromise safety.",
    sampleAnswer:
      "I would approach the passenger calmly and explain that the instruction isn't optional — it exists for the safety of everyone on board, including them. I'd give them a moment to comply after a clear explanation. If they continued to refuse, I would notify the senior crew member and, if necessary, the captain, because this is a safety issue, not a personal preference. I would remain professional throughout — firm, but not confrontational.",
    dontSay:
      "'I'd give them one more chance and then leave them alone.' — passengers do not have the option to decline safety instructions.",
    confidenceTip:
      "Say 'safety issue' explicitly — interviewers want to hear those words. And emphasize calm authority, not confrontation.",
  },
  {
    id: "int-6",
    category: "Teamwork",
    question: "Describe a time you worked under pressure as part of a team.",
    lookingFor:
      "Collaboration, communication, composure, and a focus on the team's outcome — not just your own contribution.",
    answerStructure:
      "STAR: Set up the pressure scenario → describe your role → describe how you communicated and collaborated → outcome.",
    starTip: "Situation → Task → Action → Result",
    sampleAnswer:
      "We were short-staffed during a particularly busy shift and had a large event group arrive unexpectedly. I immediately checked in with my manager, took on additional responsibilities without being asked, and made sure I was communicating clearly with my colleagues so we weren't duplicating or missing tasks. We got through it as a team without any customer complaints. Afterward, the manager said our coordination during that shift was exceptional. What I took away was that in pressure situations, communication and calm are the two most valuable things you can offer your team.",
    dontSay:
      "'I basically did most of the work' — avoid anything that implies you outperformed your team rather than worked within it.",
    confidenceTip:
      "Use 'we' as much as 'I.' Aviation is highly team-oriented. Show that you know how to be part of a crew, not just a solo performer.",
  },
  {
    id: "int-7",
    category: "Teamwork",
    question: "Describe a conflict with a coworker and how you resolved it.",
    lookingFor:
      "Maturity, professionalism, resolution focus, and the ability to manage conflict without escalation or bitterness.",
    answerStructure:
      "STAR: Describe the disagreement without blame → what you did → how you resolved it → what you learned.",
    starTip: "Situation → Task → Action → Result",
    sampleAnswer:
      "A colleague and I had different approaches to handling a recurring customer issue, and tensions had started to build over it. Rather than letting it fester, I asked if we could talk privately and briefly. I listened to their perspective first before sharing mine. It turned out we agreed on the goal — we just had different methods. We found a combined approach that was actually better than either of our individual ones. The relationship improved afterward. What I learned is that most workplace conflicts are about approach, not intent.",
    dontSay:
      "'My coworker was wrong and I told them so.' — any framing that suggests the other person was the problem signals poor conflict resolution skills.",
    confidenceTip:
      "End with a lesson learned — it shows emotional intelligence and growth, which is what interviewers are looking for.",
  },
  {
    id: "int-8",
    category: "Behavioral / STAR Format",
    question: "How do you handle stress?",
    lookingFor:
      "Concrete strategies, training reliance, self-awareness, and evidence that you perform well rather than shut down under pressure.",
    answerStructure:
      "Acknowledge that stress is real → describe your specific approach → give a brief example.",
    sampleAnswer:
      "I handle stress by focusing on what's within my control and relying on my training. When I'm in a high-pressure situation, I slow my breathing deliberately — this sounds small, but it has a measurable effect on clarity. I prioritize the most critical task first and communicate clearly with anyone around me. I've been in genuinely stressful situations in previous roles, and what I've found is that preparation is the foundation of composure. If you've drilled the right responses, the stress doesn't disappear — but it stops being disabling.",
    dontSay:
      "'I don't really get stressed' — this is not credible and signals a lack of self-awareness.",
    confidenceTip:
      "Saying 'I rely on my training' is gold in a cabin crew interview. It shows you understand that aviation requires trained responses, not improvised ones.",
  },
  {
    id: "int-9",
    category: "Customer Service",
    question: "What does good customer service mean to you?",
    lookingFor:
      "Anticipation of needs, warmth, professionalism, consistency, and respect — especially when things go wrong.",
    answerStructure:
      "Define the core principle → give a concrete example of what that looks like in practice → connect it to the cabin crew role.",
    sampleAnswer:
      "Good customer service to me means making someone feel genuinely seen and respected — not just processed efficiently. It means anticipating what they need before they have to ask, responding with warmth even when the situation is difficult, and maintaining professionalism when things don't go as planned. In a cabin crew context, that means every passenger interaction — no matter how brief — is an opportunity to make someone feel that their comfort and safety are being taken seriously. That's the standard I hold myself to.",
    dontSay:
      "'It means making the customer happy' — this is passive and doesn't show understanding of service as a professional skill.",
    confidenceTip:
      "Bring it back to the cabin crew role specifically. Generic customer service answers are forgettable. Connect your definition to what service means at 35,000 feet.",
  },
  {
    id: "int-10",
    category: "Flexibility & Lifestyle",
    question: "How do you feel about irregular schedules and relocation?",
    lookingFor:
      "Intentional preparation, realistic expectations, and genuine readiness — not just willingness.",
    answerStructure:
      "Affirm readiness → show preparation → demonstrate understanding of what the lifestyle actually involves.",
    sampleAnswer:
      "I've prepared for this intentionally. I've spoken with working cabin crew, researched what the schedule reality looks like, and made the personal adjustments in my life that make this viable for me. I genuinely see the irregular schedule as part of what makes this career distinct — it requires adaptability, which is a quality I've cultivated and value. Relocation is something I've thought through practically and I'm ready for it. This isn't something I've stumbled into — I've chosen it with full understanding of what it involves.",
    dontSay:
      "'Oh I'm very flexible, I don't mind' — this sounds like you haven't thought about it. Show that you HAVE thought about it and you're still choosing this.",
    confidenceTip:
      "Say that you've spoken to current crew members. It signals real research and genuine preparation — most candidates haven't done this.",
  },
  {
    id: "int-11",
    category: "Behavioral / STAR Format",
    question: "Tell me about a mistake you made and what you learned from it.",
    lookingFor:
      "Accountability, reflection, growth, and the ability to discuss failure professionally without deflecting blame.",
    answerStructure:
      "State the mistake clearly (no excuses) → what you did about it → what you changed afterward → what you now do differently.",
    sampleAnswer:
      "Early in my customer service role, I once gave a customer incorrect information because I hadn't verified the answer before responding. It wasn't malicious — I was trying to be helpful — but the impact was that they made a decision based on wrong information. I took ownership of it immediately, corrected the situation as best I could, and apologized directly. Afterward I created a personal rule: if I'm not certain, I say I'll confirm rather than assume. That habit has stuck and I've never made the same mistake since.",
    dontSay:
      "'I can't think of a mistake' or 'I tend to be a perfectionist' — both are deflections and interviewers will notice.",
    confidenceTip:
      "End with what changed as a result. A mistake without a lesson is a story about failure. A mistake with a clear lesson is a story about growth.",
  },
  {
    id: "int-12",
    category: "Safety Questions",
    question: "What would you do if you noticed a safety issue that a colleague had missed?",
    lookingFor:
      "Safety-first mindset, assertiveness, CRM principles, and willingness to speak up regardless of seniority.",
    answerStructure:
      "State that you would always speak up → explain how (CRM/assertiveness) → give a brief example or framing → connect to the non-negotiability of safety.",
    sampleAnswer:
      "I would speak up immediately and directly — calmly but clearly. Safety is never something I would stay quiet about out of deference to seniority or social awkwardness. I would say exactly what I observed: 'I just noticed X — is that correct?' — framing it as a question rather than a challenge is often more effective. If the concern was dismissed without adequate explanation and I still believed it was a genuine safety issue, I would escalate to the senior crew member or flight deck. CRM training exists precisely to normalize this kind of communication.",
    dontSay:
      "'I'd probably mention it if I was sure.' — 'probably' and 'if I was sure' both signal hesitation on a safety matter, which is a red flag.",
    confidenceTip:
      "Use the phrase 'CRM' if you can — it signals training knowledge. Say that you would frame it as a question to reduce friction while still ensuring it's addressed.",
  },
  {
    id: "int-13",
    category: "Strengths & Weaknesses",
    question: "What is your greatest strength in relation to this role?",
    lookingFor:
      "Self-awareness, relevance to the cabin crew role, and a strength that is demonstrated rather than just claimed.",
    answerStructure:
      "Name the strength → connect it directly to the cabin crew role → give a concrete example of it in action.",
    sampleAnswer:
      "My strongest attribute for this role is composure under pressure. I've been in situations where things went wrong unexpectedly — in customer-facing roles and in personal emergencies — and I've consistently found that I am someone who slows down rather than shuts down when stress increases. That quality is central to effective cabin crew performance, particularly in emergency scenarios. I've worked to build it intentionally, not just rely on it naturally.",
    dontSay:
      "'I'm a people person' or 'I work hard' — these are too generic. The strength must be specific and demonstrable.",
    confidenceTip:
      "One strong, specific, demonstrated strength is worth more than three vague ones. Say it once, back it up with evidence, and stop.",
  },
  {
    id: "int-14",
    category: "Strengths & Weaknesses",
    question: "What is an area you are working to improve?",
    lookingFor:
      "Genuine self-awareness, a real weakness (not a strength disguised as a weakness), and evidence that you are actively addressing it.",
    answerStructure:
      "Name a real developmental area → explain why you recognize it as a gap → describe what you are doing about it.",
    sampleAnswer:
      "I sometimes move too fast when learning something new — I want to be competent quickly, which occasionally means I don't slow down enough to ask a clarifying question before moving forward. I've been actively working on this by building in a moment to review my understanding before I act, especially in unfamiliar procedures. In training, I now specifically ask 'is there anything I should confirm before I proceed?' before completing a new task. It's a small habit change, but it has made a real difference.",
    dontSay:
      "'I'm a perfectionist' or 'I care too much' — these are not weaknesses. Interviewers hear them constantly and they signal a lack of self-awareness.",
    confidenceTip:
      "The weakness must be real, but the answer must end on a growth action. 'I noticed X, and I'm doing Y about it' — that's the structure.",
  },
];
