export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  description: string;
  isPremiumLocked: boolean;
  lessons: Lesson[];
  traineesMiss: string;
}

export const phases: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    title: "Foundation",
    description: "The absolute basics of your career.",
    isPremiumLocked: false,
    traineesMiss: "Underestimating the importance of precise terminology.",
    lessons: [
      { id: "l-1-1", title: "Introduction to the Cabin Crew Role", durationMin: 10 },
      { id: "l-1-2", title: "The Aviation Environment", durationMin: 15 },
      { id: "l-1-3", title: "Professionalism and Image", durationMin: 10 },
      { id: "l-1-4", title: "Time Management and Lifestyle", durationMin: 10 }
    ]
  },
  {
    id: "phase-2",
    number: 2,
    title: "Aviation Terminology",
    description: "Learning the language of aviation.",
    isPremiumLocked: false,
    traineesMiss: "Confusing similar-sounding terms like arm and disarm.",
    lessons: [
      { id: "l-2-1", title: "Aircraft Parts and Geography", durationMin: 15 },
      { id: "l-2-2", title: "Cabin Crew Terms", durationMin: 15 },
      { id: "l-2-3", title: "Safety and Emergency Phrases", durationMin: 20 },
      { id: "l-2-4", title: "Airport Operations", durationMin: 10 }
    ]
  },
  {
    id: "phase-3",
    number: 3,
    title: "Emergency Equipment",
    description: "Where it is, what it does, how to use it.",
    isPremiumLocked: false,
    traineesMiss: "Forgetting the exact PSI requirements for POBs.",
    lessons: [
      { id: "l-3-1", title: "Fire Fighting Equipment", durationMin: 20 },
      { id: "l-3-2", title: "Oxygen Systems", durationMin: 15 },
      { id: "l-3-3", title: "Survival and Flotation", durationMin: 15 },
      { id: "l-3-4", title: "Medical Kits and AED", durationMin: 20 },
      { id: "l-3-5", title: "Communication and Exit Equipment", durationMin: 15 }
    ]
  },
  {
    id: "phase-4",
    number: 4,
    title: "Procedures and Commands",
    description: "The sequence of actions that keep everyone safe.",
    isPremiumLocked: false,
    traineesMiss: "Missing a step in the door arming sequence.",
    lessons: [
      { id: "l-4-1", title: "Preflight Checks", durationMin: 15 },
      { id: "l-4-2", title: "Boarding and Briefings", durationMin: 15 },
      { id: "l-4-3", title: "Door Procedures", durationMin: 20 },
      { id: "l-4-4", title: "Sterile Cockpit and Securing", durationMin: 15 },
      { id: "l-4-5", title: "Emergency Commands", durationMin: 20 }
    ]
  },
  {
    id: "phase-5",
    number: 5,
    title: "Customer Service and De-escalation",
    description: "Managing the passenger experience.",
    isPremiumLocked: false,
    traineesMiss: "Not recognizing when a service issue becomes a safety issue.",
    lessons: [
      { id: "l-5-1", title: "Service Standards", durationMin: 15 },
      { id: "l-5-2", title: "Handling Complaints", durationMin: 15 },
      { id: "l-5-3", title: "De-escalation Techniques", durationMin: 20 },
      { id: "l-5-4", title: "Special Needs Passengers", durationMin: 15 }
    ]
  },
  {
    id: "phase-6",
    number: 6,
    title: "Airport Codes and Geography",
    description: "Navigating the global network.",
    isPremiumLocked: false,
    traineesMiss: "Mixing up codes that look similar but are continents apart.",
    lessons: [
      { id: "l-6-1", title: "Top 25 Global Hubs", durationMin: 20 },
      { id: "l-6-2", title: "US and Regional Hubs", durationMin: 20 },
      { id: "l-6-3", title: "Time Zones and Routing", durationMin: 10 }
    ]
  },
  {
    id: "phase-7",
    number: 7,
    title: "Interview Readiness",
    description: "How to land the job.",
    isPremiumLocked: false,
    traineesMiss: "Rambling instead of using the STAR method.",
    lessons: [
      { id: "l-7-1", title: "The STAR Method", durationMin: 15 },
      { id: "l-7-2", title: "Common Interview Questions", durationMin: 20 },
      { id: "l-7-3", title: "Group Exercises", durationMin: 15 },
      { id: "l-7-4", title: "Final Tips and Confidence", durationMin: 10 }
    ]
  },
  {
    id: "phase-8",
    number: 8,
    title: "Final Review",
    description: "Putting it all together.",
    isPremiumLocked: false,
    traineesMiss: "Panicking on multiple-choice questions.",
    lessons: [
      { id: "l-8-1", title: "Comprehensive Overview", durationMin: 30 },
      { id: "l-8-2", title: "Study Strategies", durationMin: 15 }
    ]
  },
  {
    id: "phase-9",
    number: 9,
    title: "Final Exam Mode",
    description: "Test your readiness under pressure.",
    isPremiumLocked: false,
    traineesMiss: "Time management during the exam.",
    lessons: [
      { id: "l-9-1", title: "Mock Exam (50 Questions)", durationMin: 90 }
    ]
  }
];
