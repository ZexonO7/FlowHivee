import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, TrendingUp, Users, Star, Zap, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllLessons, getUserStats } from "@/lib/progress-storage";
import { curriculumData } from "@/lib/curriculum";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Get all lessons from curriculum
  const allLessons = Object.values(curriculumData).flatMap((c: any) => c.lessons);
  
  // Get actual lesson progress
  const lessonProgress = getAllLessons();
  const stats = getUserStats();
  
  // Get in-progress lessons (not completed, but accessed)
  const inProgressLessons = lessonProgress
    .filter(l => !l.completed && l.currentSection > 0)
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 3);
  
  // If no in-progress lessons, show recently accessed or completed ones
  const displayLessons = inProgressLessons.length > 0 
    ? inProgressLessons 
    : lessonProgress
        .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
        .slice(0, 3);
  
  const subjectColors: Record<string, string> = {
    'Mathematics': 'warm',
    'Science': 'cool',
    'English': 'creative',
    'History': 'success',
    'Computer Science': 'warm',
  };
  return (
    <div className="space-y-8 animate-slide-up pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-medium">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              ✨ Learning Without Limits
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {t('home.welcome')} {" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                {t('app.name')}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect, learn, and grow together. All powered by your local server, 
              accessible anywhere in the community 🌐
            </p>
            <div className="flex gap-3">
              <Button variant="warm" size="lg" onClick={() => navigate('/grades')}>
                <GraduationCap className="w-5 h-5" />
                {t('home.selectGrade')}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/lessons')}>
                <BookOpen className="w-5 h-5" />
                {t('home.continueLearning')}
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={heroImage} 
              alt="Students learning together" 
              className="rounded-xl shadow-glow w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">13</p>
                <p className="text-sm text-muted-foreground">Grade Levels</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">75+</p>
                <p className="text-sm text-muted-foreground">Quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Continue Learning
          </CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayLessons.length > 0 ? (
            displayLessons.map((lesson) => {
              const progress = (lesson.currentSection / lesson.totalSections) * 100;
              const variant = subjectColors[lesson.subject] || 'warm';
              const lessonInfo = allLessons.find(l => l.id === lesson.lessonId);
              
              return (
                <div key={lesson.lessonId} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{lesson.subject}</p>
                      <p className="text-sm text-muted-foreground">{lesson.title}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={variant as any}
                      onClick={() => navigate('/lesson-content', { state: { lessonId: lesson.lessonId } })}
                    >
                      {lesson.completed ? 'Review' : 'Resume'}
                    </Button>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        variant === 'warm' ? 'bg-primary' :
                        variant === 'cool' ? 'bg-secondary' :
                        variant === 'creative' ? 'bg-accent' :
                        'bg-success'
                      }`}
                      style={{ width: `${Math.round(progress)}%` }} 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {Math.round(progress)}% complete
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-3">No lessons in progress yet</p>
              <Button variant="warm" onClick={() => navigate('/lessons')}>
                Start Learning
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievement Banner */}
      <Card className="bg-gradient-warm shadow-glow border-0">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-full">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                {stats.dayStreak > 0 ? `${stats.dayStreak} Day Streak! 🔥` : 'Start Your Learning Journey! 🎉'}
              </h3>
              <p className="text-white/90">
                {stats.totalXP > 0 
                  ? `Level ${stats.level} • ${stats.totalXP} XP earned • ${stats.badges.length} badges unlocked!`
                  : 'Complete lessons and quizzes to earn XP and unlock badges!'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
