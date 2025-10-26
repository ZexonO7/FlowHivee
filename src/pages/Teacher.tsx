import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, FileText, Activity, Trophy, Flame, TrendingUp, Lock, Search, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react";
import { getAllStudentsData, getTeacherStats, formatRelativeTime, type StudentData } from "@/lib/teacher-storage";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const ADMIN_PASSWORD = "FlowHive@123";
const AUTH_KEY = "teacher_authenticated";

export default function Teacher() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [students, setStudents] = useState<StudentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessonsCompleted: 0,
    totalQuizzesTaken: 0,
    avgScore: 0,
  });

  useEffect(() => {
    // Check if already authenticated
    const authenticated = sessionStorage.getItem(AUTH_KEY);
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
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
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      toast.success("Welcome to Teacher Portal");
    } else {
      toast.error("Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-8">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Teacher Portal</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="text-center"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">👩‍🏫 Teacher Admin Panel</h1>
          <p className="text-muted-foreground">
            Monitor student progress and performance
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Students</CardTitle>
              <CardDescription>Track individual student performance</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{searchQuery ? "No students found" : "No student data available yet"}</p>
              <p className="text-sm mt-1">
                {searchQuery ? "Try a different search term" : "Students will appear here when they start using the app"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => {
                const completedLessons = student.lessons.filter(l => l.completed).length;
                const totalLessons = student.lessons.length;
                const avgQuizScore = student.quizzes.length > 0
                  ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
                  : 0;
                const isExpanded = expandedStudent === student.studentId;
                
                return (
                  <Collapsible
                    key={student.studentId}
                    open={isExpanded}
                    onOpenChange={() => setExpandedStudent(isExpanded ? null : student.studentId)}
                  >
                    <div className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow"
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
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
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
                            <p className="text-sm font-medium">{completedLessons}/{totalLessons}</p>
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
                        <div className="mt-3 flex flex-wrap gap-2">
                          {student.stats.badges.map((badge, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Expandable Details */}
                      <CollapsibleContent className="mt-4 pt-4 border-t space-y-4">
                        {/* Lesson Details */}
                        {student.lessons.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Lesson Progress ({completedLessons}/{totalLessons})
                            </h4>
                            <div className="grid gap-2 max-h-48 overflow-y-auto">
                              {student.lessons.slice(0, 10).map((lesson, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                      <Clock className="w-3 h-3" />
                                      {formatRelativeTime(lesson.lastAccessed)}
                                    </p>
                                  </div>
                                  <Badge variant={lesson.completed ? "default" : "outline"} className="text-xs">
                                    {lesson.completed ? "✓ Done" : "In Progress"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quiz History */}
                        {student.quizzes.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Recent Quizzes
                            </h4>
                            <div className="grid gap-2 max-h-48 overflow-y-auto">
                              {student.quizzes.slice(0, 10).map((quiz, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{quiz.title}</p>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                      <Calendar className="w-3 h-3" />
                                      {formatRelativeTime(quiz.completedAt)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <Badge 
                                      variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "outline"}
                                      className="text-xs"
                                    >
                                      {quiz.score}%
                                    </Badge>
                                    <p className="text-muted-foreground mt-1">
                                      {quiz.correctAnswers}/{quiz.totalQuestions}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activity Summary */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Activity Summary
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Total Lessons Accessed</p>
                              <p className="font-semibold mt-1">
                                {student.lessons.length}
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Completion Rate</p>
                              <p className="font-semibold mt-1">
                                {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Best Quiz Score</p>
                              <p className="font-semibold mt-1">
                                {student.quizzes.length > 0 ? Math.max(...student.quizzes.map(q => q.score)) : 0}%
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Member Since</p>
                              <p className="font-semibold mt-1">
                                {new Date(student.stats.lastActiveDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
