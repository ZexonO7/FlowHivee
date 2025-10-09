import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, TrendingUp, Users, Star, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export default function Home() {
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
              Welcome to{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                FlowHivee
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect, learn, and grow together. All powered by your local server, 
              accessible anywhere in the community 🌐
            </p>
            <div className="flex gap-3">
              <Button variant="warm" size="lg">
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Button>
              <Button variant="outline" size="lg">
                <Brain className="w-5 h-5" />
                Take a Quiz
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
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Quizzes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,250</p>
                <p className="text-sm text-muted-foreground">XP Points</p>
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
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Mathematics - Chapter 5</p>
                <p className="text-sm text-muted-foreground">Algebra Basics</p>
              </div>
              <Button size="sm" variant="warm">Resume</Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Science - Unit 3</p>
                <p className="text-sm text-muted-foreground">The Water Cycle</p>
              </div>
              <Button size="sm" variant="cool">Resume</Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary transition-all duration-300" style={{ width: "40%" }} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">English - Lesson 8</p>
                <p className="text-sm text-muted-foreground">Creative Writing</p>
              </div>
              <Button size="sm" variant="creative">Resume</Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: "85%" }} />
            </div>
          </div>
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
                Great Progress This Week! 🎉
              </h3>
              <p className="text-white/90">
                You've completed 5 lessons and earned 3 new badges. Keep it up!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
