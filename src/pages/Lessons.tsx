import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Clock, CheckCircle, Lock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const lessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "45 min",
    status: "completed",
    description: "Learn the fundamentals of algebraic expressions and equations",
    progress: 100,
  },
  {
    id: 2,
    title: "The Water Cycle",
    subject: "Science",
    duration: "30 min",
    status: "in-progress",
    description: "Understand how water moves through Earth's ecosystems",
    progress: 60,
  },
  {
    id: 3,
    title: "Creative Writing Basics",
    subject: "English",
    duration: "40 min",
    status: "in-progress",
    description: "Explore narrative structures and storytelling techniques",
    progress: 35,
  },
  {
    id: 4,
    title: "Ancient Civilizations",
    subject: "History",
    duration: "50 min",
    status: "available",
    description: "Journey through the great civilizations of the past",
    progress: 0,
  },
  {
    id: 5,
    title: "Python Programming",
    subject: "Computer Science",
    duration: "60 min",
    status: "available",
    description: "Start your coding journey with Python basics",
    progress: 0,
  },
  {
    id: 6,
    title: "Advanced Calculus",
    subject: "Mathematics",
    duration: "55 min",
    status: "locked",
    description: "Master integration and differentiation techniques",
    progress: 0,
  },
];

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary/10 text-primary",
  Science: "bg-secondary/10 text-secondary",
  English: "bg-accent/10 text-accent",
  History: "bg-success/10 text-success",
  "Computer Science": "bg-destructive/10 text-destructive",
};

export default function Lessons() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLessonClick = (lesson: typeof lessons[0]) => {
    if (lesson.status === "locked") {
      toast({
        title: "Lesson Locked 🔒",
        description: "Complete previous lessons to unlock this content",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/lesson-content', { state: { lessonId: lesson.id } });
  };

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">📚 Lessons</h1>
          <p className="text-muted-foreground">
            Explore interactive lessons across all subjects
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`shadow-soft hover:shadow-medium transition-all duration-300 ${
              lesson.status === "locked" ? "opacity-60" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className={subjectColors[lesson.subject]}
                  variant="secondary"
                >
                  {lesson.subject}
                </Badge>
                {lesson.status === "completed" && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
                {lesson.status === "locked" && (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration}</span>
              </div>

              {lesson.status === "in-progress" && lesson.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{lesson.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                variant={
                  lesson.status === "completed"
                    ? "outline"
                    : lesson.status === "locked"
                    ? "ghost"
                    : "warm"
                }
                className="w-full"
                disabled={lesson.status === "locked"}
                onClick={() => handleLessonClick(lesson)}
              >
                {lesson.status === "locked" && <Lock className="w-4 h-4" />}
                {lesson.status === "completed" && <BookOpen className="w-4 h-4" />}
                {lesson.status === "in-progress" && <Play className="w-4 h-4" />}
                {lesson.status === "available" && <BookOpen className="w-4 h-4" />}
                {lesson.status === "locked"
                  ? "Locked"
                  : lesson.status === "completed"
                  ? "Review"
                  : lesson.status === "in-progress"
                  ? "Continue"
                  : "Start Lesson"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
