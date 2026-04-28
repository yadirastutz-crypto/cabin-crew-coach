import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProgressProvider, useUserProgress } from "@/context/UserProgressContext";
import { BottomNav } from "@/components/BottomNav";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Academy from "@/pages/Academy";
import AcademyPhase from "@/pages/AcademyPhase";
import Quiz from "@/pages/Quiz";
import QuizSession from "@/pages/QuizSession";
import FinalExam from "@/pages/FinalExam";
import Speak from "@/pages/Speak";
import Calm from "@/pages/Calm";
import Profile from "@/pages/Profile";
import Upgrade from "@/pages/Upgrade";
import Reference from "@/pages/Reference";
import Flashcards from "@/pages/Flashcards";
import Airports from "@/pages/Airports";
import Interview from "@/pages/Interview";
import Games from "@/pages/Games";
import WrittenInBlood from "@/pages/WrittenInBlood";
import WrittenInBloodCase from "@/pages/WrittenInBloodCase";
import FastRecall from "@/pages/games/FastRecall";
import MatchMode from "@/pages/games/MatchMode";
import PressureDrill from "@/pages/games/PressureDrill";
import SequenceChallenge from "@/pages/games/SequenceChallenge";
import SpotMistake from "@/pages/games/SpotMistake";
import InterviewSpin from "@/pages/games/InterviewSpin";
import Practice from "@/pages/Practice";
import PresentSecure from "@/pages/PresentSecure";
import ScenarioMode from "@/pages/ScenarioMode";
import InterviewVault from "@/pages/InterviewVault";
import AnnouncementCoach from "@/pages/AnnouncementCoach";
import Onboarding from "@/pages/Onboarding";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Disclaimer from "@/pages/Disclaimer";
import TrainingPath from "@/pages/TrainingPath";
import CityCodeBlitz from "@/pages/games/CityCodeBlitz";
import About from "@/pages/About";
import BuildItLikeTraining from "@/pages/BuildItLikeTraining";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/academy" component={Academy} />
      <Route path="/academy/:phaseId" component={AcademyPhase} />
      <Route path="/practice" component={Practice} />
      <Route path="/practice/present-secure" component={PresentSecure} />
      <Route path="/practice/scenarios" component={ScenarioMode} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/quiz/session" component={QuizSession} />
      <Route path="/quiz/final-exam" component={FinalExam} />
      <Route path="/speak" component={Speak} />
      <Route path="/announcements" component={AnnouncementCoach} />
      <Route path="/interview-vault" component={InterviewVault} />
      <Route path="/calm" component={Calm} />
      <Route path="/profile" component={Profile} />
      <Route path="/upgrade" component={Upgrade} />
      <Route path="/reference" component={Reference} />
      <Route path="/flashcards" component={Flashcards} />
      <Route path="/airports" component={Airports} />
      <Route path="/interview" component={Interview} />
      <Route path="/written-in-blood" component={WrittenInBlood} />
      <Route path="/written-in-blood/:caseId" component={WrittenInBloodCase} />
      <Route path="/games" component={Games} />
      <Route path="/games/fast-recall" component={FastRecall} />
      <Route path="/games/match" component={MatchMode} />
      <Route path="/games/pressure-drill" component={PressureDrill} />
      <Route path="/games/sequence" component={SequenceChallenge} />
      <Route path="/games/spot-mistake" component={SpotMistake} />
      <Route path="/games/interview-spin" component={InterviewSpin} />
      <Route path="/start-here" component={TrainingPath} />
      <Route path="/games/city-code-blitz" component={CityCodeBlitz} />
      <Route path="/about" component={About} />
      <Route path="/build-it" component={BuildItLikeTraining} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const { progress } = useUserProgress();

  if (!progress.onboardingComplete) {
    return (
      <div className="max-w-[430px] mx-auto bg-background min-h-screen relative shadow-2xl overflow-x-hidden">
        <Onboarding />
      </div>
    );
  }

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div className="max-w-[430px] mx-auto bg-background min-h-screen relative shadow-2xl overflow-x-hidden">
        <Router />
        <BottomNav />
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProgressProvider>
          <AppShell />
          <Toaster />
        </UserProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
