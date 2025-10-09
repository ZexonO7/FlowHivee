import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Users, FileText, BookOpen, Activity } from "lucide-react";

const recentUploads = [
  { title: "Algebra Formulas", date: "2024-10-08", views: 45 },
  { title: "Science Quiz 3", date: "2024-10-07", views: 38 },
  { title: "History Lesson 5", date: "2024-10-06", views: 52 },
];

export default function Teacher() {
  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">👩‍🏫 Teacher Panel</h1>
        <p className="text-muted-foreground">
          Manage content and track student activity
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
                <p className="text-2xl font-bold">48</p>
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
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Lessons</p>
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
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Quizzes</p>
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
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Content */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Upload New Content
          </CardTitle>
          <CardDescription>
            Add lessons, quizzes, or study materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="Enter content title..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the content..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="e.g., Mathematics" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Input placeholder="Lesson, Quiz, or Notes" />
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-border rounded-lg text-center space-y-4">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <p className="font-medium mb-1">
                Drag and drop files here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse (PDF, Video, Images)
              </p>
            </div>
            <Button variant="outline">Browse Files</Button>
          </div>

          <div className="flex gap-3">
            <Button variant="warm" className="flex-1">
              <Upload className="w-4 h-4" />
              Upload Content
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Your latest content additions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{upload.title}</p>
                  <p className="text-sm text-muted-foreground">{upload.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{upload.views}</p>
                  <p className="text-sm text-muted-foreground">views</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
