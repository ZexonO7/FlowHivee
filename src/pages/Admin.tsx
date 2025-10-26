import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Users, BookOpen, Trophy, TrendingUp, Activity, 
  Download, Lock, AlertTriangle, Star, Zap, Target,
  GraduationCap, BarChart3, LineChart, PieChart, Clock,
  CheckCircle, XCircle, Flame, Award, Brain, Eye
} from "lucide-react";
import { 
  getSystemStats, 
  getAllTeachers, 
  getEngagementData, 
  getSubjectPerformance,
  getTopPerformers,
  getAtRiskStudents,
  exportSystemData,
  type TeacherData
} from "@/lib/admin-storage";
import { getAllStudentsData, formatRelativeTime, type StudentData } from "@/lib/teacher-storage";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const ADMIN_PASSWORD = "FlowHivee@123";
const ADMIN_AUTH_KEY = "admin_authenticated";

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [stats, setStats] = useState(getSystemStats());
  const [students, setStudents] = useState<StudentData[]>([]);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [engagementData, setEngagementData] = useState(getEngagementData());
  const [subjectData, setSubjectData] = useState(getSubjectPerformance());
  const [topPerformers, setTopPerformers] = useState(getTopPerformers());
  const [atRiskStudents, setAtRiskStudents] = useState(getAtRiskStudents());

  useEffect(() => {
    // Check if already authenticated
    const authenticated = sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (authenticated === "true") {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setStats(getSystemStats());
    setStudents(getAllStudentsData());
    setTeachers(getAllTeachers());
    setEngagementData(getEngagementData());
    setSubjectData(getSubjectPerformance());
    setTopPerformers(getTopPerformers());
    setAtRiskStudents(getAtRiskStudents());
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      setIsAuthenticated(true);
      loadData();
      toast.success("Welcome to Admin Dashboard 🛡️");
    } else {
      toast.error("Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    navigate("/");
  };

  const handleExportData = () => {
    const data = exportSystemData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowhive-system-data-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("System data exported successfully");
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Authorized Personnel Only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Password</label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Admin Command Center</h1>
            </div>
            <p className="text-muted-foreground">System-wide analytics and monitoring</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="shadow-lg border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalTeachers}</p>
                  <p className="text-xs text-muted-foreground">Teachers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalLessons}</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.avgStudentScore}%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Activity className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeToday}</p>
                  <p className="text-xs text-muted-foreground">Active Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalXPEarned.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students">
              <Users className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers">
              <GraduationCap className="w-4 h-4 mr-2" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <LineChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Brain className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Engagement Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Weekly Engagement
                  </CardTitle>
                  <CardDescription>Activity distribution across the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activities" fill="#8b5cf6" name="Activities" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Performance */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Subject Performance
                  </CardTitle>
                  <CardDescription>Completion rates by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={subjectData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.subject}: ${entry.completion}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="completion"
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  System Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Completion Rate</span>
                    <span className="text-sm font-bold">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Average Student Level</span>
                    <span className="text-sm font-bold">Level {stats.avgStudentLevel}</span>
                  </div>
                  <Progress value={(stats.avgStudentLevel / 10) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Weekly Active Users</span>
                    <span className="text-sm font-bold">{stats.activeThisWeek} / {stats.totalStudents}</span>
                  </div>
                  <Progress 
                    value={(stats.activeThisWeek / Math.max(stats.totalStudents, 1)) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>All Students ({students.length})</CardTitle>
                <CardDescription>Complete student roster and performance</CardDescription>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No students registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {students.map((student) => {
                      const avgScore = student.quizzes.length > 0
                        ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
                        : 0;
                      const completedLessons = student.lessons.filter(l => l.completed).length;
                      
                      return (
                        <div 
                          key={student.studentId}
                          className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">{student.name}</h3>
                                <Badge variant="outline">Level {student.stats.level}</Badge>
                                {student.stats.dayStreak > 0 && (
                                  <Badge variant="secondary" className="flex items-center gap-1">
                                    <Flame className="w-3 h-3" />
                                    {student.stats.dayStreak} day streak
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">XP</p>
                                  <p className="font-bold">{student.stats.totalXP}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Lessons</p>
                                  <p className="font-bold">{completedLessons}/{student.lessons.length}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Quizzes</p>
                                  <p className="font-bold">{student.quizzes.length}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Avg Score</p>
                                  <p className="font-bold">{avgScore}%</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {formatRelativeTime(student.lastActive)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>All Teachers ({teachers.length})</CardTitle>
                <CardDescription>Teacher training progress and activity</CardDescription>
              </CardHeader>
              <CardContent>
                {teachers.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No teachers registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teachers.map((teacher, index) => (
                      <div 
                        key={index}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{teacher.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Level {teacher.level} • {teacher.completedModules}/10 modules
                              </p>
                            </div>
                          </div>
                          <Badge variant={teacher.trainingProgress === 100 ? "default" : "secondary"}>
                            {teacher.trainingProgress}% Complete
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={teacher.trainingProgress} className="h-2" />
                          <div className="grid grid-cols-3 gap-4 text-sm pt-2">
                            <div>
                              <p className="text-muted-foreground">XP Earned</p>
                              <p className="font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {teacher.totalXP}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Status</p>
                              <p className="font-bold">
                                {teacher.trainingProgress === 100 ? (
                                  <span className="text-success flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Certified
                                  </span>
                                ) : (
                                  <span className="text-warning">In Progress</span>
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Active</p>
                              <p className="font-bold">{formatRelativeTime(teacher.lastActive)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-warning" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Leaderboard rankings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((student) => (
                      <div key={student.rank} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">#{student.rank}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Level {student.level} • {student.xp} XP
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{student.avgScore}% avg</Badge>
                          {student.streak > 0 && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {student.streak} days
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Subject Performance Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Subject Analytics
                  </CardTitle>
                  <CardDescription>Detailed subject performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.map((subject, index) => (
                      <div key={subject.subject}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{subject.subject}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline">{subject.totalLessons} lessons</Badge>
                            <Badge variant="secondary">{subject.avgScore}% avg</Badge>
                          </div>
                        </div>
                        <Progress 
                          value={subject.completion} 
                          className="h-2"
                          style={{ 
                            backgroundColor: `${COLORS[index % COLORS.length]}20`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6 mt-6">
            {/* At-Risk Students */}
            <Card className="shadow-lg border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  At-Risk Students ({atRiskStudents.length})
                </CardTitle>
                <CardDescription>Students requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                {atRiskStudents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success opacity-50" />
                    <p>All students are on track! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {atRiskStudents.map((student, index) => (
                      <div 
                        key={index}
                        className="p-4 border-l-4 border-destructive bg-destructive/5 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{student.reason}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Last active: {formatRelativeTime(student.lastActive)}
                            </p>
                          </div>
                          <Badge variant="destructive">
                            {student.avgScore}% avg
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <h3 className="font-semibold">Engagement Trend</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">
                    {Math.round((stats.activeThisWeek / Math.max(stats.totalStudents, 1)) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Weekly active rate</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-warning" />
                    <h3 className="font-semibold">Completion Rate</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Overall progress</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Quality Score</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stats.avgStudentScore}%</p>
                  <p className="text-sm text-muted-foreground">Average performance</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
