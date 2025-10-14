import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Zap, Clock, Target, Trophy } from "lucide-react";
import { getAllLessons, getAllQuizResults, getUserStats } from "@/lib/progress-storage";

export default function Analytics() {
  const lessons = getAllLessons();
  const quizzes = getAllQuizResults();
  const stats = getUserStats();

  // Calculate real metrics
  const totalInteractions = lessons.length + quizzes.length;
  const completedLessons = lessons.filter(l => l.completed).length;
  const completionRate = lessons.length > 0 
    ? Math.round((completedLessons / lessons.length) * 100)
    : 0;

  // Get lesson view counts by subject
  const lessonsBySubject = lessons.reduce((acc: any, lesson) => {
    if (!acc[lesson.subject]) {
      acc[lesson.subject] = { subject: lesson.subject, count: 0, titles: [] };
    }
    acc[lesson.subject].count++;
    if (!acc[lesson.subject].titles.includes(lesson.title)) {
      acc[lesson.subject].titles.push(lesson.title);
    }
    return acc;
  }, {});

  const topLessons = Object.values(lessonsBySubject)
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5)
    .map((item: any) => ({
      title: item.titles[0] || item.subject,
      views: item.count,
      subject: item.subject,
    }));

  // Calculate weekly activity (last 7 days) with proper activity counting
  const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Count unique lessons accessed on this day
    const dayLessons = lessons.filter(l => {
      const accessDate = new Date(l.lastAccessed);
      return accessDate >= startOfDay && accessDate <= endOfDay;
    });
    
    // Count all quiz attempts on this day
    const dayQuizzes = quizzes.filter(q => {
      const completedDate = new Date(q.completedAt);
      return completedDate >= startOfDay && completedDate <= endOfDay;
    });
    
    // Total activities is sum of unique lessons accessed + all quiz attempts
    const totalActivities = dayLessons.length + dayQuizzes.length;
    
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      students: totalActivities,
      lessons: dayLessons.length,
      quizzes: dayQuizzes.length,
    };
  });

  const maxStudents = Math.max(...weeklyActivity.map((d) => d.students), 1);

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">📊 Analytics</h1>
        <p className="text-muted-foreground">
          Real-time insights into learning engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                {totalInteractions > 0 ? '+' : ''}0%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{completedLessons}</p>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                {totalInteractions > 0 ? '+' : ''}0%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{totalInteractions}</p>
            <p className="text-sm text-muted-foreground">Total Interactions</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                {completionRate > 0 ? '+' : ''}0%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">{completionRate}%</p>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Weekly Activity
          </CardTitle>
          <CardDescription>Student engagement over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium w-12">{day.day}</span>
                  <div className="flex gap-6 text-muted-foreground">
                    <span>{day.lessons} lessons</span>
                    <span>{day.quizzes} quizzes</span>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-warm flex items-center justify-end pr-2 transition-all duration-300"
                    style={{ width: `${day.students > 0 ? (day.students / maxStudents) * 100 : 0}%` }}
                  >
                    {day.students > 0 && (
                      <span className="text-xs font-medium text-white">
                        {day.students}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Lessons */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Most Popular Lessons
          </CardTitle>
          <CardDescription>Top 5 lessons by engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLessons.length > 0 ? (
              topLessons.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{lesson.views}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Start learning to see your top lessons here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* App Stats */}
      <Card className="bg-gradient-cool shadow-soft border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">FlowHivee Stats</h3>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Level: {stats.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Total XP: {stats.totalXP}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <Zap className="w-8 h-8 text-white animate-pulse-glow" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
