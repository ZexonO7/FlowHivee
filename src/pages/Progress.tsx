import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Trophy, TrendingUp, Award, Target, Calendar, Star } from "lucide-react";
import { getUserStats, getSubjectProgress, getRecentActivity, getAllLessons, getAllQuizResults } from "@/lib/progress-storage";

const badges = [
  { id: "fast_learner", name: "Fast Learner", icon: "⚡", earned: true },
  { id: "quiz_master", name: "Quiz Master", icon: "🧠", earned: true },
  { id: "perfect_score", name: "Perfect Score", icon: "💯", earned: true },
  { id: "week_streak", name: "Week Streak", icon: "🔥", earned: false },
  { id: "helpful_friend", name: "Helpful Friend", icon: "🤝", earned: false },
  { id: "early_bird", name: "Early Bird", icon: "🌅", earned: false },
];

export default function Progress() {
  const stats = getUserStats();
  const subjectProgress = getSubjectProgress();
  const recentActivity = getRecentActivity();
  const allLessons = getAllLessons();
  const allQuizzes = getAllQuizResults();

  // Calculate real stats
  const earnedBadges = badges.filter(b => stats.badges.includes(b.id));
  const totalLessonsCompleted = allLessons.filter(l => l.completed).length;
  const totalQuizzesTaken = allQuizzes.length;
  
  // Calculate level progress
  const currentLevelXP = stats.totalXP % 500;
  const nextLevelXP = 500;
  const levelProgress = (currentLevelXP / nextLevelXP) * 100;

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
              <h3 className="text-2xl font-bold">Level {stats.level}</h3>
              <p className="text-white/90">Keep learning to reach Level {stats.level + 1}!</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/90">
              <span>{currentLevelXP} XP</span>
              <span>{nextLevelXP} XP</span>
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
                <span className="text-2xl font-bold">{totalLessonsCompleted}</span>
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
                <span className="text-2xl font-bold">{earnedBadges.length}</span>
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
                <span className="text-2xl font-bold">{stats.dayStreak}</span>
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
                <span>{subject.completed} lessons completed</span>
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
                  earnedBadges.some(b => b.id === badge.id)
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
