import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { StartScreen } from "./components/StartScreen";
import Home from "./pages/Home";
import Grades from "./pages/Grades";
import GradeView from "./pages/GradeView";
import Lessons from "./pages/Lessons";
import LessonContent from "./pages/LessonContent";
import LessonQuiz from "./pages/LessonQuiz";
import Notes from "./pages/Notes";
import Quizzes from "./pages/Quizzes";
import QuizTaking from "./pages/QuizTaking";
import Progress from "./pages/Progress";
import Teacher from "./pages/Teacher";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);

  if (showStartScreen) {
    return <StartScreen onComplete={() => setShowStartScreen(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/grade/:gradeId" element={<GradeView />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lesson-content" element={<LessonContent />} />
              <Route path="/lesson-quiz" element={<LessonQuiz />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quiz-taking" element={<QuizTaking />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/community" element={<Community />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
