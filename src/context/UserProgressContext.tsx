import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GameStat {
  highScore: number;
  played: number;
  lastScore: number;
}

export interface VoiceCoachStats {
  totalAttempts: number;
  bestScore: number;
  totalScoreSum: number;
  dailyAttempts: number;
  lastDate: string | null;
}

export type PrimaryGoal = "interview" | "confidence" | "safety" | "bilingual";

interface UserProgress {
  completedLessons: string[];
  isPremium: boolean;
  streakDays: number;
  lastActiveDate: string | null;
  quizScores: {
    totalTaken: number;
    averageScore: number;
  };
  hardFlashcards: string[];
  gameStats: Record<string, GameStat>;
  voiceCoachStats: VoiceCoachStats;
  // Onboarding
  onboardingComplete: boolean;
  userName: string;
  primaryGoal: PrimaryGoal | null;
  struggleAreas: string[];
}

const defaultVoiceCoachStats: VoiceCoachStats = {
  totalAttempts: 0,
  bestScore: 0,
  totalScoreSum: 0,
  dailyAttempts: 0,
  lastDate: null,
};

const defaultProgress: UserProgress = {
  completedLessons: [],
  isPremium: true,
  streakDays: 0,
  lastActiveDate: null,
  quizScores: {
    totalTaken: 0,
    averageScore: 0,
  },
  hardFlashcards: [],
  gameStats: {},
  voiceCoachStats: defaultVoiceCoachStats,
  onboardingComplete: false,
  userName: '',
  primaryGoal: null,
  struggleAreas: [],
};

interface UserProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  unlockPremium: () => void;
  recordQuizScore: (score: number) => void;
  toggleHardFlashcard: (cardId: string) => void;
  recordGameScore: (gameId: string, score: number) => void;
  recordVoiceCoach: (score: number) => void;
  resetProgress: () => void;
  completeOnboarding: (data: { userName: string; primaryGoal: PrimaryGoal; struggleAreas: string[] }) => void;
  retakeOnboarding: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('cabinCrewProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProgress,
          ...parsed,
          isPremium: true,
          quizScores: { ...defaultProgress.quizScores, ...(parsed?.quizScores ?? {}) },
          gameStats: { ...defaultProgress.gameStats, ...(parsed?.gameStats ?? {}) },
          voiceCoachStats: { ...defaultVoiceCoachStats, ...(parsed?.voiceCoachStats ?? {}) },
          completedLessons: Array.isArray(parsed?.completedLessons) ? parsed.completedLessons : [],
          hardFlashcards: Array.isArray(parsed?.hardFlashcards) ? parsed.hardFlashcards : [],
          struggleAreas: Array.isArray(parsed?.struggleAreas) ? parsed.struggleAreas : [],
        };
      } catch (e) {
        return defaultProgress;
      }
    }
    return defaultProgress;
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      let newStreak = prev.streakDays;
      if (prev.lastActiveDate) {
        const last = new Date(prev.lastActiveDate);
        const curr = new Date(today);
        const diffTime = Math.abs(curr.getTime() - last.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) newStreak += 1;
        else if (diffDays > 1) newStreak = 0;
      } else {
        newStreak = 1;
      }
      if (prev.lastActiveDate === today && prev.streakDays === newStreak) return prev;
      return { ...prev, streakDays: newStreak, lastActiveDate: today };
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cabinCrewProgress', JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }));
  };

  const unlockPremium = () => {
    setProgress(prev => ({ ...prev, isPremium: true }));
  };

  const recordQuizScore = (score: number) => {
    setProgress(prev => {
      const total = prev.quizScores.totalTaken + 1;
      const avg = ((prev.quizScores.averageScore * prev.quizScores.totalTaken) + score) / total;
      return { ...prev, quizScores: { totalTaken: total, averageScore: Math.round(avg) } };
    });
  };

  const toggleHardFlashcard = (cardId: string) => {
    setProgress(prev => {
      const isHard = prev.hardFlashcards.includes(cardId);
      return {
        ...prev,
        hardFlashcards: isHard ? prev.hardFlashcards.filter(id => id !== cardId) : [...prev.hardFlashcards, cardId],
      };
    });
  };

  const recordGameScore = (gameId: string, score: number) => {
    setProgress(prev => {
      const existing = prev.gameStats[gameId] || { highScore: 0, played: 0, lastScore: 0 };
      return {
        ...prev,
        gameStats: {
          ...prev.gameStats,
          [gameId]: { highScore: Math.max(existing.highScore, score), played: existing.played + 1, lastScore: score },
        },
      };
    });
  };

  const recordVoiceCoach = (score: number) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const existing = prev.voiceCoachStats ?? defaultVoiceCoachStats;
      const isNewDay = existing.lastDate !== today;
      return {
        ...prev,
        voiceCoachStats: {
          totalAttempts: existing.totalAttempts + 1,
          bestScore: Math.max(existing.bestScore, score),
          totalScoreSum: existing.totalScoreSum + score,
          dailyAttempts: isNewDay ? 1 : existing.dailyAttempts + 1,
          lastDate: today,
        },
      };
    });
  };

  const completeOnboarding = (data: { userName: string; primaryGoal: PrimaryGoal; struggleAreas: string[] }) => {
    setProgress(prev => ({
      ...prev,
      onboardingComplete: true,
      userName: data.userName,
      primaryGoal: data.primaryGoal,
      struggleAreas: data.struggleAreas,
    }));
  };

  const retakeOnboarding = () => {
    setProgress(prev => ({ ...prev, onboardingComplete: false }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  return (
    <UserProgressContext.Provider value={{
      progress,
      markLessonComplete,
      unlockPremium,
      recordQuizScore,
      toggleHardFlashcard,
      recordGameScore,
      recordVoiceCoach,
      resetProgress,
      completeOnboarding,
      retakeOnboarding,
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
}
