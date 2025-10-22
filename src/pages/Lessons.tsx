import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Clock, CheckCircle, Lock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getLessonProgress, getAllLessons } from "@/lib/progress-storage";
import { useState, useEffect } from "react";
import { curriculumData } from "@/lib/curriculum";

const allLessons = Object.values(curriculumData).flatMap((c: any) => c.lessons);


const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary/10 text-primary",
  "Pre-Algebra": "bg-primary/10 text-primary",
  "Algebra I": "bg-primary/10 text-primary",
  "Algebra II": "bg-primary/10 text-primary",
  Geometry: "bg-primary/10 text-primary",
  "Pre-Calculus": "bg-primary/10 text-primary",
  Calculus: "bg-primary/10 text-primary",
  Science: "bg-secondary/10 text-secondary",
  "Life Science": "bg-secondary/10 text-secondary",
  "Physical Science": "bg-secondary/10 text-secondary",
  Biology: "bg-secondary/10 text-secondary",
  Chemistry: "bg-secondary/10 text-secondary",
  Physics: "bg-secondary/10 text-secondary",
  "Advanced Sciences": "bg-secondary/10 text-secondary",
  English: "bg-accent/10 text-accent",
  "English I": "bg-accent/10 text-accent",
  "English II": "bg-accent/10 text-accent",
  "English III": "bg-accent/10 text-accent",
  "English IV": "bg-accent/10 text-accent",
  Reading: "bg-accent/10 text-accent",
  Writing: "bg-accent/10 text-accent",
  "Language Arts": "bg-accent/10 text-accent",
  History: "bg-success/10 text-success",
  "Social Studies": "bg-success/10 text-success",
  "World History": "bg-success/10 text-success",
  "US History": "bg-success/10 text-success",
  "World Geography": "bg-success/10 text-success",
  Economics: "bg-success/10 text-success",
  "Computer Science": "bg-destructive/10 text-destructive",
  "Practical Life": "bg-pink-500/10 text-pink-600",
  Sensorial: "bg-purple-500/10 text-purple-600",
};

export default function Lessons() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [lessonsWithProgress, setLessonsWithProgress] = useState(
    allLessons.map(lesson => ({ ...lesson, status: 'available' as string, progress: 0 }))
  );

  useEffect(() => {
    // Load progress from storage
    const allProgress = getAllLessons();
    
    const updated = allLessons.map(lesson => {
      const saved = allProgress.find(p => p.lessonId === lesson.id);
      
      if (!saved) {
        return { ...lesson, status: 'available' as string, progress: 0 };
      }
      
      if (saved.completed) {
        return { ...lesson, status: 'completed' as string, progress: 100 };
      }
      
      const progress = Math.round((saved.currentSection / saved.totalSections) * 100);
      return {
        ...lesson,
        status: (progress > 0 ? 'in-progress' : 'available') as string,
        progress,
      };
    });
    
    setLessonsWithProgress(updated);
  }, []);

  const handleLessonClick = (lesson: any) => {
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

  // Filter lessons based on search query
  const filteredLessons = lessonsWithProgress.filter(lesson => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      lesson.subject.toLowerCase().includes(query) ||
      lesson.description.toLowerCase().includes(query)
    );
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No lessons found matching "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term</p>
          </div>
        ) : (
          filteredLessons.map((lesson) => (
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
        )))}
      </div>
    </div>
  );
}
