import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Calendar } from "lucide-react";

const notes = [
  {
    id: 1,
    title: "Algebra Formulas Sheet",
    subject: "Mathematics",
    date: "2024-10-05",
    size: "2.4 MB",
    downloads: 45,
  },
  {
    id: 2,
    title: "Water Cycle Diagram",
    subject: "Science",
    date: "2024-10-04",
    size: "1.8 MB",
    downloads: 38,
  },
  {
    id: 3,
    title: "Essay Writing Guide",
    subject: "English",
    date: "2024-10-03",
    size: "3.2 MB",
    downloads: 52,
  },
  {
    id: 4,
    title: "Ancient Rome Timeline",
    subject: "History",
    date: "2024-10-02",
    size: "2.1 MB",
    downloads: 29,
  },
  {
    id: 5,
    title: "Python Syntax Cheat Sheet",
    subject: "Computer Science",
    date: "2024-10-01",
    size: "1.5 MB",
    downloads: 67,
  },
  {
    id: 6,
    title: "Geometry Theorems",
    subject: "Mathematics",
    date: "2024-09-30",
    size: "2.8 MB",
    downloads: 41,
  },
];

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary/10 text-primary",
  Science: "bg-secondary/10 text-secondary",
  English: "bg-accent/10 text-accent",
  History: "bg-success/10 text-success",
  "Computer Science": "bg-destructive/10 text-destructive",
};

export default function Notes() {
  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">📝 Study Notes</h1>
          <p className="text-muted-foreground">
            Download offline study materials and reference guides
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Banner */}
      <Card className="bg-gradient-cool shadow-soft border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                All Materials Available Offline ✨
              </h3>
              <p className="text-white/90">
                {notes.length} study guides ready to download
              </p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="shadow-soft hover:shadow-medium transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className={subjectColors[note.subject]}
                  variant="secondary"
                >
                  {note.subject}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>{note.downloads}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(note.date).toLocaleDateString()}
                </span>
                <span>{note.size}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button variant="warm" className="w-full">
                <Download className="w-4 h-4" />
                Download Notes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
