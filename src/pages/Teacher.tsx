import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, FileText, Activity, Trophy, Flame, TrendingUp } from "lucide-react";
import { getAllStudentsData, getTeacherStats, formatRelativeTime, type StudentData } from "@/lib/teacher-storage";
import { Progress } from "@/components/ui/progress";

export default function Teacher() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessonsCompleted: 0,
    totalQuizzesTaken: 0,
    avgScore: 0,
  });

  useEffect(() => {
    const loadData = () => {
      const studentsData = getAllStudentsData();
      setStudents(studentsData.sort((a, b) => 
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      ));
      setStats(getTeacherStats());
    };
    
    loadData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">👩‍🏫 Teacher Admin Panel</h1>
        <p className="text-muted-foreground">
          Monitor student progress and performance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalLessonsCompleted}</p>
                <p className="text-sm text-muted-foreground">Lessons Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalQuizzesTaken}</p>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Activity className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgScore}%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Track individual student performance</CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No student data available yet</p>
              <p className="text-sm mt-1">Students will appear here when they start using the app</p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => {
                const completedLessons = student.lessons.filter(l => l.completed).length;
                const avgQuizScore = student.quizzes.length > 0
                  ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
                  : 0;
                
                return (
                  <div
                    key={student.studentId}
                    className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{student.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            Level {student.stats.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID: {student.studentId} • Last active: {formatRelativeTime(student.lastActive)}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{student.stats.totalXP}</p>
                          <p className="text-xs text-muted-foreground">Total XP</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">{student.stats.dayStreak}</p>
                          <p className="text-xs text-muted-foreground">Day Streak</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="text-sm font-medium">{completedLessons}</p>
                          <p className="text-xs text-muted-foreground">Lessons</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-sm font-medium">{student.quizzes.length}</p>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <div>
                          <p className="text-sm font-medium">{avgQuizScore}%</p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                      </div>
                    </div>

                    {student.quizzes.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Performance</span>
                          <span className="font-medium">{avgQuizScore}%</span>
                        </div>
                        <Progress value={avgQuizScore} className="h-2" />
                      </div>
                    )}

                    {student.stats.badges.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {student.stats.badges.map((badge, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
