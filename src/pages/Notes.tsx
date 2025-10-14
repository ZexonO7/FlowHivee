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
    file: "/notes/essay-writing-guide.pdf",
    content: `# Essay Writing Guide

Essay writing is one of the most important skills in language learning. It helps students express their thoughts, analyze ideas, and present information clearly.

## Types of Essays

1. **Narrative Essay** – tells a story or describes an event
2. **Descriptive Essay** – paints a vivid picture using words
3. **Expository Essay** – explains a topic with facts and evidence
4. **Persuasive Essay** – convinces readers to agree with your opinion
5. **Reflective Essay** – expresses personal thoughts or experiences

## Essay Structure

Every good essay follows a simple three-part structure:

1. **Introduction** – introduces the topic, gives background, and presents your main idea (thesis statement)
2. **Body Paragraphs** – each paragraph discusses one main point supported by examples or evidence
3. **Conclusion** – summarizes the essay and leaves a final impression

Flow of paragraphs should be logical and connected with linking words like 'furthermore', 'however', 'therefore'.

## Writing Tips

- Keep your sentences clear and concise
- Use appropriate vocabulary and grammar
- Avoid repetition of ideas
- Organize your essay before writing
- Read your essay aloud to catch errors
- Always revise and proofread before submission`
  },
  {
    id: 4,
    title: "Ancient Rome Timeline",
    subject: "History",
    date: "2024-10-02",
    size: "2.1 MB",
    downloads: 29,
    file: "/notes/ancient-rome-timeline.pdf",
    content: `# Ancient Rome Timeline: From Founding to Fall

## The Early Days of Rome

**753 BCE - The Founding of Rome:**
According to legend, Rome was founded by Romulus and Remus, twin brothers raised by a she-wolf. Romulus later became the first king of Rome.

**509 BCE - The Roman Republic:**
The Romans overthrew their last king, Tarquin the Proud, and established the Roman Republic. Power was shared between two elected consuls, advised by the Senate, representing the early form of democracy.

**Etruscan Influence:**
The Romans adopted many ideas from the Etruscans, such as architecture, engineering, and religious rituals.

## The Republic's Expansion

**264-146 BCE - The Punic Wars:**
Rome fought three major wars against Carthage, a powerful city-state in North Africa. The most famous was led by Hannibal, who crossed the Alps with his war elephants. Rome eventually destroyed Carthage, gaining control over the western Mediterranean.

**Expansion and Consequences:**
Rome's victories brought immense wealth and slaves but also increased inequality and corruption. The Senate grew more powerful, and generals like Julius Caesar gained huge influence.

## From Republic to Empire

**44 BCE - Assassination of Julius Caesar:**
Caesar's growing power alarmed the Senate, leading to his assassination on the Ides of March. This marked the end of the Republic and the start of a power struggle.

**27 BCE - The Roman Empire Begins:**
Octavian, later known as Augustus, became the first Roman Emperor. Under his rule, Rome entered the Pax Romana - 200 years of relative peace and prosperity.

**Achievements of the Empire:**
Romans built roads, aqueducts, amphitheaters, and cities across their empire, connecting millions of people under Roman law and culture.

## Decline and Legacy

**64 CE - The Great Fire of Rome:**
A massive fire destroyed much of the city during Emperor Nero's reign, leading to political chaos.

**313 CE - The Edict of Milan:**
Emperor Constantine legalized Christianity, which spread rapidly throughout the empire.

**476 CE - Fall of the Western Roman Empire:**
Germanic tribes captured Rome, marking the official end of ancient Rome. However, the Eastern Roman Empire (Byzantium) continued for nearly a thousand more years.

**Legacy of Rome:**
Rome's influence remains visible today in architecture, law, language, and government systems. Its ideals of citizenship, engineering brilliance, and cultural diversity shaped Western civilization.`
  },
  {
    id: 5,
    title: "Python Syntax Cheat Sheet",
    subject: "Computer Science",
    date: "2024-10-01",
    size: "1.5 MB",
    downloads: 67,
    file: "/notes/python-syntax-cheat-sheet.pdf",
    content: `# Python Syntax Cheat Sheet

## Basics & Data Types

**Print and Comments:**
\`\`\`python
print("Hello, FlowHivee!")
# This is a comment
\`\`\`

**Variables:**
\`\`\`python
x = 10
name = "FlowHivee"
is_online = True
\`\`\`

**Data Types:**
int, float, str, bool, list, tuple, dict, set

**Example:**
\`\`\`python
data = [1, 2, 3]
info = {"name": "FlowHivee", "mode": "Offline"}
\`\`\`

## Operators & Conditionals

**Operators:**
+ - * / // % **

**Conditionals:**
\`\`\`python
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")
\`\`\`

## Loops & Functions

**For Loop:**
\`\`\`python
for i in range(5):
    print(i)
\`\`\`

**While Loop:**
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

**Functions:**
\`\`\`python
def greet(name):
    return f"Hello, {name}"

print(greet("FlowHivee"))
\`\`\`

## Lists, Tuples & Dictionaries

**Lists:**
\`\`\`python
numbers = [1, 2, 3]
numbers.append(4)
numbers.remove(2)
\`\`\`

**Tuples (Immutable):**
\`\`\`python
coords = (10, 20)
\`\`\`

**Dictionaries:**
\`\`\`python
student = {"name": "Advithya", "score": 98}
print(student["name"])
\`\`\`

**Looping Through Collections:**
\`\`\`python
for key, value in student.items():
    print(key, value)
\`\`\`

## File Handling & Exceptions

**File Handling:**
\`\`\`python
with open("data.txt", "w") as f:
    f.write("FlowHivee Rocks!")

with open("data.txt", "r") as f:
    print(f.read())
\`\`\`

**Error Handling:**
\`\`\`python
try:
    x = 5 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("Execution complete.")
\`\`\`

## Built-in Functions & Best Practices

**Built-in Functions:**
- len(), type(), range(), input(), str(), int()

**Pythonic Practices:**
- Use clear variable names
- Indent with 4 spaces
- Comment when necessary
- Write reusable functions`
  },
  {
    id: 6,
    title: "Geometry Theorems",
    subject: "Mathematics",
    date: "2024-09-30",
    size: "2.8 MB",
    downloads: 41,
    file: "/notes/geometry-theorems.pdf",
    content: `# Geometry Theorems Simplified

## Basic Line & Angle Theorems

1. **Vertically Opposite Angles Theorem:**
   When two lines intersect, opposite (vertical) angles are equal.

2. **Linear Pair Theorem:**
   Adjacent angles on a straight line add up to 180°.

3. **Alternate Interior Angles Theorem:**
   If two parallel lines are cut by a transversal, alternate interior angles are equal.

4. **Corresponding Angles Theorem:**
   When two parallel lines are cut by a transversal, corresponding angles are equal.

## Triangle Theorems

1. **Angle Sum Theorem:**
   The sum of the three angles of a triangle is 180°.

2. **Exterior Angle Theorem:**
   The measure of an exterior angle of a triangle is equal to the sum of its two opposite interior angles.

3. **Isosceles Triangle Theorem:**
   If two sides of a triangle are equal, then the angles opposite those sides are also equal.

4. **Pythagoras Theorem:**
   In a right-angled triangle, (Hypotenuse)² = (Base)² + (Perpendicular)².

## Circle Theorems

1. **Central Angle Theorem:**
   The angle subtended by an arc at the center is twice the angle subtended at the circumference.

2. **Angles in the Same Segment Theorem:**
   Angles in the same segment of a circle are equal.

3. **Tangent-Radius Theorem:**
   The tangent to a circle is perpendicular to the radius drawn at the point of contact.

4. **Equal Chords Theorem:**
   Equal chords of a circle subtend equal angles at the center.

## Quadrilaterals & Parallelograms

1. **Opposite Sides Theorem:**
   In a parallelogram, opposite sides are equal and parallel.

2. **Opposite Angles Theorem:**
   In a parallelogram, opposite angles are equal.

3. **Diagonals Bisect Each Other:**
   In a parallelogram, the diagonals bisect each other.

4. **Rhombus & Rectangle Properties:**
   - Rhombus: Diagonals are perpendicular.
   - Rectangle: All angles are 90° and diagonals are equal.

## Similarity & Congruence

**Similarity Criteria:**
- AA: Two angles of one triangle equal to two angles of another
- SAS: One angle equal and sides proportional
- SSS: Corresponding sides proportional

**Congruence Criteria:**
- SSS: All sides equal
- SAS: Two sides and included angle equal
- ASA: Two angles and included side equal
- RHS: Right angle, hypotenuse, and one side equal

**Areas of Similar Triangles:**
Ratio of their areas = (Ratio of corresponding sides)²`
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
