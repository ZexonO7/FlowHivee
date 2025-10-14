import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Trophy, TrendingUp, Award, Target, Calendar, Star } from "lucide-react";

const badges = [
  { id: 1, name: "Fast Learner", icon: "⚡", earned: true },
  { id: 2, name: "Quiz Master", icon: "🧠", earned: true },
  { id: 3, name: "Perfect Score", icon: "💯", earned: true },
  { id: 4, name: "Week Streak", icon: "🔥", earned: false },
  { id: 5, name: "Helpful Friend", icon: "🤝", earned: false },
  { id: 6, name: "Early Bird", icon: "🌅", earned: false },
];

// Calculate earned badges count
const earnedBadgesCount = badges.filter(b => b.earned).length;

const subjectProgress = [
  { subject: "Mathematics", lessons: 18, quizzes: 12, completed: 14 },
  { subject: "Science", lessons: 15, quizzes: 10, completed: 7 },
  { subject: "English", lessons: 20, quizzes: 14, completed: 16 },
  { subject: "History", lessons: 10, quizzes: 6, completed: 5 },
  { subject: "Computer Science", lessons: 8, quizzes: 5, completed: 2 },
].map(s => ({
  ...s,
  progress: Math.round((s.completed / s.lessons) * 100)
}));

// Calculate totals
const totalLessonsCompleted = subjectProgress.reduce((sum, s) => sum + s.completed, 0);
const totalLessonsAvailable = subjectProgress.reduce((sum, s) => sum + s.lessons, 0);
const totalQuizzesTaken = subjectProgress.reduce((sum, s) => sum + s.quizzes, 0);

const recentActivity = [
  { date: "Today", activity: "Completed 'Algebra Challenge' quiz", xp: 150 },
  { date: "Yesterday", activity: "Finished 'Water Cycle' lesson", xp: 100 },
  { date: "2 days ago", activity: "Earned 'Quiz Master' badge", xp: 200 },
  { date: "3 days ago", activity: "Completed 'Essay Writing' lesson", xp: 120 },
];

export default function Progress() {
  const totalXP = 1250;
  const nextLevel = 1500;
  const levelProgress = (totalXP / nextLevel) * 100;

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">🎓 Your Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Level Card */}
      <Card className="bg-gradient-creative shadow-glow border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Level 8</h3>
              <p className="text-white/90">Keep learning to reach Level 9!</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/90">
              <span>{totalXP} XP</span>
              <span>{nextLevel} XP</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{totalLessonsCompleted}/{totalLessonsAvailable}</span>
              </div>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Target className="w-5 h-5 text-secondary" />
                <span className="text-2xl font-bold">{totalQuizzesTaken}</span>
              </div>
              <p className="text-sm text-muted-foreground">Quizzes Taken</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-2xl font-bold">{earnedBadgesCount}</span>
              </div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Calendar className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Your progress across all subjects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjectProgress.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{subject.subject}</h4>
                <span className="text-sm font-medium">{subject.progress}%</span>
              </div>
              <ProgressBar value={subject.progress} className="h-2" />
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{subject.completed}/{subject.lessons} lessons</span>
                <span>{subject.quizzes} quizzes</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Your Badges
          </CardTitle>
          <CardDescription>Achievements unlocked through learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  +{item.xp} XP
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
