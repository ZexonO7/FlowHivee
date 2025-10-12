import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Search, Calendar, Eye } from "lucide-react";
import { useState } from "react";

const notes = [
  {
    id: 1,
    title: "Algebra Formulas Sheet",
    subject: "Mathematics",
    date: "2024-10-05",
    size: "2.4 MB",
    downloads: 45,
    file: "/notes/algebra-formulas.pdf",
    content: `# Basic Algebra Formulas

1. (a + b)² = a² + 2ab + b²
2. (a - b)² = a² - 2ab + b²
3. (a + b)(a - b) = a² - b²
4. (x + a)(x + b) = x² + (a + b)x + ab
5. (x - a)(x - b) = x² - (a + b)x + ab
6. (a + b + c)² = a² + b² + c² + 2(ab + bc + ca)
7. (a - b - c)² = a² + b² + c² - 2(ab - bc + ca)
8. (a + b)³ = a³ + 3a²b + 3ab² + b³
9. (a - b)³ = a³ - 3a²b + 3ab² - b³
10. (a + b + c)³ = a³ + b³ + c³ + 3(a + b)(b + c)(c + a)`
  },
  {
    id: 2,
    title: "Water Cycle Diagram",
    subject: "Science",
    date: "2024-10-04",
    size: "1.8 MB",
    downloads: 38,
    file: "/notes/water-cycle.pdf",
    content: `# The Water Cycle

The water cycle, also known as the hydrological cycle, describes the continuous movement of water on, above, and below the surface of the Earth.

## Main Stages:

1. **Evaporation**: Water from oceans, lakes, and rivers turns into water vapor due to heat from the sun
2. **Transpiration**: Plants release water vapor through their leaves
3. **Condensation**: Water vapor cools and forms clouds
4. **Precipitation**: Water falls back to Earth as rain, snow, sleet, or hail
5. **Collection**: Water gathers in bodies of water and the cycle continues

## Key Facts:
- 97% of Earth's water is in the oceans
- The water cycle is powered by the sun's energy
- Water can exist in three states: solid (ice), liquid (water), and gas (vapor)
- The same water has been recycling through the cycle for billions of years`
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
  const [viewingNote, setViewingNote] = useState<typeof notes[0] | null>(null);

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
              <div className="flex gap-2">
                {note.content && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setViewingNote(note)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                )}
                <Button 
                  variant="warm" 
                  className="flex-1"
                  onClick={() => note.file && window.open(note.file, '_blank')}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewingNote} onOpenChange={() => setViewingNote(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingNote?.title}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap font-mono text-sm">
            {viewingNote?.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
