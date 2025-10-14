import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Target, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    id: 1,
    title: "Algebra Challenge",
    subject: "Mathematics",
    questions: 15,
    xp: 150,
    difficulty: "Medium",
    completed: true,
    score: 87,
  },
  {
    id: 2,
    title: "Water Cycle Quiz",
    subject: "Science",
    questions: 10,
    xp: 100,
    difficulty: "Easy",
    completed: false,
  },
  {
    id: 3,
    title: "Grammar Master",
    subject: "English",
    questions: 20,
    xp: 200,
    difficulty: "Hard",
    completed: false,
  },
  {
    id: 4,
    title: "World War II Facts",
    subject: "History",
    questions: 12,
    xp: 120,
    difficulty: "Medium",
    completed: true,
    score: 92,
  },
  {
    id: 5,
    title: "Python Basics",
    subject: "Computer Science",
    questions: 18,
    xp: 180,
    difficulty: "Medium",
    completed: false,
  },
  {
    id: 6,
    title: "Quick Math",
    subject: "Mathematics",
    questions: 8,
    xp: 80,
    difficulty: "Easy",
    completed: true,
    score: 100,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-primary/10 text-primary",
  Hard: "bg-destructive/10 text-destructive",
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary/10 text-primary",
  Science: "bg-secondary/10 text-secondary",
  English: "bg-accent/10 text-accent",
  History: "bg-success/10 text-success",
  "Computer Science": "bg-destructive/10 text-destructive",
};

export default function Quizzes() {
  const navigate = useNavigate();
  const totalXP = quizzes
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + (q.score ? (q.xp * q.score) / 100 : 0), 0);

  const completedQuizzes = quizzes.filter((q) => q.completed);
  const averageScore = completedQuizzes.length > 0
    ? Math.round(completedQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / completedQuizzes.length)
    : 0;

  const handleStartQuiz = (quizId: number) => {
    navigate('/quiz-taking', { state: { quizId } });
  };

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">🧩 Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge and earn XP points!
        </p>
      </div>

      {/* XP Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-soft bg-gradient-warm border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <p className="text-2xl font-bold">{Math.round(totalXP)}</p>
                <p className="text-sm text-white/90">Total XP Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Trophy className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {quizzes.filter((q) => q.completed).length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="shadow-soft hover:shadow-medium transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className={subjectColors[quiz.subject]}
                  variant="secondary"
                >
                  {quiz.subject}
                </Badge>
                <Badge
                  className={difficultyColors[quiz.difficulty]}
                  variant="secondary"
                >
                  {quiz.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <CardDescription>
                {quiz.questions} questions • {quiz.xp} XP
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {quiz.completed && quiz.score && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-success" />
                      <span className="font-medium text-success">
                        Score: {quiz.score}%
                      </span>
                    </div>
                    <span className="text-sm text-success">
                      +{Math.round((quiz.xp * quiz.score) / 100)} XP
                    </span>
                  </div>
                </div>
              )}

              <Button
                variant={quiz.completed ? "outline" : "warm"}
                className="w-full"
                onClick={() => handleStartQuiz(quiz.id)}
              >
                <Brain className="w-4 h-4" />
                {quiz.completed ? "Retake Quiz" : "Start Quiz"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
