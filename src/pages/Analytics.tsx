import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Zap, Clock, Target } from "lucide-react";

const weeklyActivity = [
  { day: "Mon", students: 42, lessons: 156, quizzes: 89 },
  { day: "Tue", students: 45, lessons: 168, quizzes: 92 },
  { day: "Wed", students: 48, lessons: 182, quizzes: 104 },
  { day: "Thu", students: 46, lessons: 174, quizzes: 98 },
  { day: "Fri", students: 44, lessons: 165, quizzes: 87 },
  { day: "Sat", students: 38, lessons: 142, quizzes: 76 },
  { day: "Sun", students: 35, lessons: 128, quizzes: 68 },
];

const topLessons = [
  { title: "Algebra Basics", views: 156, subject: "Mathematics" },
  { title: "Water Cycle", views: 142, subject: "Science" },
  { title: "Essay Writing", views: 138, subject: "English" },
  { title: "Ancient Rome", views: 124, subject: "History" },
  { title: "Python Intro", views: 118, subject: "Computer Science" },
];

export default function Analytics() {
  const maxStudents = Math.max(...weeklyActivity.map((d) => d.students));

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
                <Users className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                +12%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">48</p>
            <p className="text-sm text-muted-foreground">Active Students</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                +8%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">1,115</p>
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
                +5%
              </Badge>
            </div>
            <p className="text-3xl font-bold mb-1">87%</p>
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
                    <span>{day.students} students</span>
                    <span>{day.lessons} lessons</span>
                    <span>{day.quizzes} quizzes</span>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-warm flex items-center justify-end pr-2 transition-all duration-300"
                    style={{ width: `${(day.students / maxStudents) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {day.students}
                    </span>
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
            {topLessons.map((lesson, index) => (
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Stats */}
      <Card className="bg-gradient-cool shadow-soft border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">FlowHivee Server Status</h3>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Uptime: 127 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Peak Concurrent Users: 38</span>
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
