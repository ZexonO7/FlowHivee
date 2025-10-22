import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Brain, ChevronLeft, Clock, Play } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { curriculumData } from "@/lib/curriculum";

const subjectColors: Record<string, string> = {
  "Language Arts": "bg-accent/10 text-accent",
  "Reading": "bg-accent/10 text-accent",
  "Writing": "bg-accent/10 text-accent",
  "English I": "bg-accent/10 text-accent",
  "English II": "bg-accent/10 text-accent",
  "English III": "bg-accent/10 text-accent",
  "English IV": "bg-accent/10 text-accent",
  "Mathematics": "bg-primary/10 text-primary",
  "Pre-Algebra": "bg-primary/10 text-primary",
  "Algebra I": "bg-primary/10 text-primary",
  "Algebra II": "bg-primary/10 text-primary",
  "Geometry": "bg-primary/10 text-primary",
  "Pre-Calculus": "bg-primary/10 text-primary",
  "Calculus": "bg-primary/10 text-primary",
  "Science": "bg-secondary/10 text-secondary",
  "Life Science": "bg-secondary/10 text-secondary",
  "Physical Science": "bg-secondary/10 text-secondary",
  "Biology": "bg-secondary/10 text-secondary",
  "Chemistry": "bg-secondary/10 text-secondary",
  "Physics": "bg-secondary/10 text-secondary",
  "Advanced Sciences": "bg-secondary/10 text-secondary",
  "Social Studies": "bg-success/10 text-success",
  "World History": "bg-success/10 text-success",
  "US History": "bg-success/10 text-success",
  "World Geography": "bg-success/10 text-success",
  "Government": "bg-success/10 text-success",
  "Economics": "bg-success/10 text-success",
  "Practical Life": "bg-pink-500/10 text-pink-600",
  "Sensorial": "bg-purple-500/10 text-purple-600",
  "Cultural Studies": "bg-orange-500/10 text-orange-600",
};

export default function GradeView() {
  const navigate = useNavigate();
  const { gradeId } = useParams();
  const curriculum = gradeId ? curriculumData[gradeId] : null;

  if (!curriculum) {
    return (
      <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
        <Button variant="outline" onClick={() => navigate('/grades')}>
          <ChevronLeft className="w-4 h-4" />
          Back to Grades
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Grade not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/grades')}>
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{curriculum.name} Curriculum</h1>
          <p className="text-muted-foreground">Complete curriculum for {curriculum.name}</p>
        </div>
      </div>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">
            <BookOpen className="w-4 h-4 mr-2" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            <Brain className="w-4 h-4 mr-2" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="subjects">
            <FileText className="w-4 h-4 mr-2" />
            Subjects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {curriculum.lessons.map((lesson: any) => (
              <Card key={lesson.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={subjectColors[lesson.subject]} variant="secondary">
                      {lesson.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <Button variant="warm" className="w-full" onClick={() => navigate('/lesson-content', { state: { lessonId: lesson.id } })}>
                    <Play className="w-4 h-4" />
                    Start Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {curriculum.quizzes.map((quiz: any) => (
              <Card key={quiz.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={subjectColors[quiz.subject]} variant="secondary">
                      {quiz.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.questions} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="cool" className="w-full" onClick={() => navigate('/quiz-taking', { state: { quizId: quiz.id } })}>
                    <Brain className="w-4 h-4" />
                    Take Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {curriculum.subjects.map((subject: string, index: number) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${subjectColors[subject]} flex items-center justify-center mb-3`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{subject}</CardTitle>
                  <CardDescription>
                    {curriculum.lessons.filter((l: any) => l.subject === subject).length} lessons
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}