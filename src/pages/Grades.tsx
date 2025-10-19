import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Baby, School, BookOpen } from "lucide-react";

const grades = [
  { id: "montessori", name: "Montessori", icon: Baby, color: "bg-pink-500/10 text-pink-600", age: "Ages 3-6" },
  { id: "1st", name: "1st Grade", icon: School, color: "bg-primary/10 text-primary", age: "Ages 6-7" },
  { id: "2nd", name: "2nd Grade", icon: School, color: "bg-primary/10 text-primary", age: "Ages 7-8" },
  { id: "3rd", name: "3rd Grade", icon: School, color: "bg-primary/10 text-primary", age: "Ages 8-9" },
  { id: "4th", name: "4th Grade", icon: School, color: "bg-secondary/10 text-secondary", age: "Ages 9-10" },
  { id: "5th", name: "5th Grade", icon: School, color: "bg-secondary/10 text-secondary", age: "Ages 10-11" },
  { id: "6th", name: "6th Grade", icon: BookOpen, color: "bg-accent/10 text-accent", age: "Ages 11-12" },
  { id: "7th", name: "7th Grade", icon: BookOpen, color: "bg-accent/10 text-accent", age: "Ages 12-13" },
  { id: "8th", name: "8th Grade", icon: BookOpen, color: "bg-accent/10 text-accent", age: "Ages 13-14" },
  { id: "9th", name: "9th Grade", icon: GraduationCap, color: "bg-success/10 text-success", age: "Ages 14-15" },
  { id: "10th", name: "10th Grade", icon: GraduationCap, color: "bg-success/10 text-success", age: "Ages 15-16" },
  { id: "11th", name: "11th Grade", icon: GraduationCap, color: "bg-success/10 text-success", age: "Ages 16-17" },
  { id: "12th", name: "12th Grade", icon: GraduationCap, color: "bg-success/10 text-success", age: "Ages 17-18" },
];

export default function Grades() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-slide-up pb-20 md:pb-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">🎓 Select Your Grade Level</h1>
        <p className="text-lg text-muted-foreground">
          Choose your grade to access curriculum-specific lessons, quizzes, and resources
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {grades.map((grade) => {
          const Icon = grade.icon;
          return (
            <Card
              key={grade.id}
              className="shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/grade/${grade.id}`)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${grade.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{grade.name}</CardTitle>
                <CardDescription>{grade.age}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Curriculum
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}