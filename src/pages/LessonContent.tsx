import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle, Video, FileText, Headphones, Download, Play, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Lesson content database
const lessonContent: Record<number, any> = {
  1: {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "45 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { name: "Algebra Basics Workbook.pdf", size: "2.4 MB" },
      { name: "Practice Problems.pdf", size: "1.8 MB" },
      { name: "Formula Sheet.pdf", size: "890 KB" },
    ],
    sections: [
      {
        type: "intro",
        title: "What is Algebra?",
        content: "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It's like a puzzle where we need to find the missing pieces!",
      },
      {
        type: "text",
        title: "Variables and Constants",
        content: "In algebra, we use variables (like x, y, z) to represent unknown values. Constants are fixed numbers that don't change. For example, in the equation 2x + 5 = 11, 'x' is the variable, while 2, 5, and 11 are constants.",
      },
      {
        type: "example",
        title: "Example: Solving for x",
        content: "Let's solve: x + 7 = 15\n\nStep 1: We want to get x alone\nStep 2: Subtract 7 from both sides\nx + 7 - 7 = 15 - 7\nx = 8\n\nThat's it! x equals 8.",
      },
      {
        type: "practice",
        title: "Try it yourself!",
        content: "Practice problems:\n1. x + 5 = 12 (Answer: x = 7)\n2. 2x = 10 (Answer: x = 5)\n3. x - 3 = 9 (Answer: x = 12)",
      },
      {
        type: "summary",
        title: "Key Takeaways",
        content: "✓ Variables represent unknown values\n✓ We can solve equations by isolating the variable\n✓ What we do to one side, we must do to the other\n✓ Practice makes perfect!",
      },
    ],
  },
  2: {
    title: "The Water Cycle",
    subject: "Science",
    duration: "30 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { name: "Water Cycle Diagram.pdf", size: "1.2 MB" },
      { name: "Study Notes.pdf", size: "950 KB" },
      { name: "Experiment Guide.pdf", size: "1.5 MB" },
    ],
    sections: [
      {
        type: "intro",
        title: "Understanding the Water Cycle",
        content: "The water cycle is Earth's natural recycling system! Water moves continuously between the ocean, atmosphere, and land through four main processes.",
      },
      {
        type: "text",
        title: "1. Evaporation",
        content: "When the sun heats water in rivers, lakes, or oceans, it turns into water vapor (a gas) and rises into the air. This is called evaporation. Think of it like water 'disappearing' into the air!",
      },
      {
        type: "text",
        title: "2. Condensation",
        content: "As water vapor rises and cools down, it turns back into tiny water droplets. These droplets come together to form clouds. This process is called condensation - it's why you see water droplets on a cold glass!",
      },
      {
        type: "text",
        title: "3. Precipitation",
        content: "When clouds get heavy with water droplets, they fall back to Earth as rain, snow, sleet, or hail. This is precipitation - nature's way of returning water to the ground.",
      },
      {
        type: "text",
        title: "4. Collection",
        content: "When precipitation reaches the ground, it collects in oceans, rivers, lakes, and underground. From here, the cycle starts all over again with evaporation!",
      },
      {
        type: "summary",
        title: "The Cycle Continues",
        content: "🌊 Evaporation → ☁️ Condensation → 🌧️ Precipitation → 🏞️ Collection → repeat!\n\nThis cycle has been happening for billions of years and is essential for all life on Earth.",
      },
    ],
  },
  3: {
    title: "Creative Writing Basics",
    subject: "English",
    duration: "40 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { name: "Writing Prompts Collection.pdf", size: "2.1 MB" },
      { name: "Grammar Guide.pdf", size: "1.7 MB" },
      { name: "Story Templates.pdf", size: "1.3 MB" },
    ],
    sections: [
      {
        type: "intro",
        title: "The Art of Storytelling",
        content: "Every great story has certain elements that make it engaging and memorable. Let's explore the building blocks of creative writing!",
      },
      {
        type: "text",
        title: "Story Elements",
        content: "Every story needs:\n\n• Characters - Who is in your story?\n• Setting - Where and when does it take place?\n• Plot - What happens? (Beginning, Middle, End)\n• Conflict - What problem do the characters face?\n• Resolution - How is the problem solved?",
      },
      {
        type: "text",
        title: "Show, Don't Tell",
        content: "Instead of: 'She was sad.'\nTry: 'Tears rolled down her cheeks as she stared at the empty chair.'\n\nShowing emotions through actions and descriptions makes your writing come alive!",
      },
      {
        type: "example",
        title: "Descriptive Writing",
        content: "Compare these:\n\nTelling: 'The room was messy.'\n\nShowing: 'Clothes spilled from the overflowing hamper, books lay scattered across the floor, and yesterday's dishes created a small mountain on the desk.'",
      },
      {
        type: "practice",
        title: "Your Turn to Write!",
        content: "Writing prompt: Write a short paragraph about your favorite place. Use descriptive words that appeal to all five senses (sight, sound, smell, taste, touch).",
      },
      {
        type: "summary",
        title: "Remember",
        content: "✍️ Every story needs characters, setting, and plot\n✍️ Show emotions through actions and descriptions\n✍️ Use sensory details to bring your writing to life\n✍️ Practice regularly - every writer started somewhere!",
      },
    ],
  },
  4: {
    title: "Ancient Civilizations",
    subject: "History",
    duration: "50 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { name: "Ancient Civilizations Timeline.pdf", size: "3.2 MB" },
      { name: "Map of Ancient World.pdf", size: "2.8 MB" },
      { name: "Cultural Comparisons.pdf", size: "1.9 MB" },
    ],
    sections: [
      {
        type: "intro",
        title: "Journey to the Past",
        content: "Ancient civilizations built incredible societies thousands of years ago. Let's explore three of the greatest: Egypt, Greece, and Rome!",
      },
      {
        type: "text",
        title: "Ancient Egypt (3100 BCE - 30 BCE)",
        content: "The Egyptian civilization flourished along the Nile River. They are famous for:\n\n🏛️ Pyramids and Sphinx\n📜 Hieroglyphic writing\n👑 Powerful Pharaohs\n⚰️ Mummification practices\n\nThe Nile River was crucial - its annual floods provided rich soil for farming!",
      },
      {
        type: "text",
        title: "Ancient Greece (800 BCE - 146 BCE)",
        content: "Greek civilization gave us:\n\n🏛️ Democracy (rule by the people)\n🎭 Theater and drama\n🏃 Olympic Games\n📚 Philosophy (Socrates, Plato, Aristotle)\n⚡ Mythology (Zeus, Athena, Apollo)\n\nGreek ideas about government and thinking still influence us today!",
      },
      {
        type: "text",
        title: "Ancient Rome (753 BCE - 476 CE)",
        content: "The Roman Empire was massive and powerful:\n\n🏛️ Advanced architecture (Colosseum, aqueducts)\n⚔️ Powerful military and conquered lands\n📜 Roman law system\n🛣️ Roads connecting the empire\n🗣️ Latin language (root of many modern languages)\n\nRome's influence on law, language, and government is still felt worldwide!",
      },
      {
        type: "example",
        title: "Comparing the Three",
        content: "Egypt: Known for monuments and preservation of the dead\nGreece: Known for ideas, philosophy, and democracy\nRome: Known for engineering, law, and military might\n\nEach civilization contributed unique achievements to human history!",
      },
      {
        type: "summary",
        title: "Legacy of Ancient Civilizations",
        content: "🌍 These civilizations shaped our modern world\n📚 Their inventions and ideas still influence us\n🏛️ They built lasting monuments we can still visit\n💡 They solved problems creatively with limited technology",
      },
    ],
  },
  5: {
    title: "Python Programming",
    subject: "Computer Science",
    duration: "60 min",
    videoUrl: "", // User will provide later
    hasQuiz: true,
    documents: [
      { name: "Python Cheat Sheet.pdf", size: "1.1 MB" },
      { name: "Code Examples.pdf", size: "2.3 MB" },
      { name: "Projects Guide.pdf", size: "3.5 MB" },
    ],
    sections: [
      {
        type: "intro",
        title: "Welcome to Python!",
        content: "Python is one of the most popular programming languages in the world. It's easy to read, powerful, and fun to learn. Let's start coding!",
      },
      {
        type: "text",
        title: "Your First Python Program",
        content: "Every programmer starts here:\n\nprint('Hello, World!')\n\nThis simple line tells Python to display text on the screen. Try it yourself!",
      },
      {
        type: "text",
        title: "Variables: Storing Information",
        content: "Variables are like labeled boxes that hold information:\n\nname = 'Alex'\nage = 14\nheight = 5.5\n\nNow Python remembers these values and you can use them anytime!",
      },
      {
        type: "example",
        title: "Using Variables",
        content: "name = 'Sam'\nage = 13\n\nprint('Hello, my name is ' + name)\nprint('I am ' + str(age) + ' years old')\n\nOutput:\nHello, my name is Sam\nI am 13 years old",
      },
      {
        type: "text",
        title: "Data Types",
        content: "Python has different types of data:\n\n• String: text ('hello', 'Python')\n• Integer: whole numbers (1, 42, 100)\n• Float: decimal numbers (3.14, 5.5)\n• Boolean: True or False\n\nPython automatically figures out which type you're using!",
      },
      {
        type: "practice",
        title: "Try These Exercises",
        content: "1. Create a variable with your favorite color\n2. Create a variable with your age\n3. Print both variables\n4. Create a variable that adds two numbers together",
      },
      {
        type: "summary",
        title: "What You Learned",
        content: "💻 How to print output with print()\n📦 How to store data in variables\n🔤 Different data types (strings, numbers, booleans)\n✨ Python is easy to read and write\n\nKeep practicing - coding gets easier with time!",
      },
    ],
  },
  6: {
    title: "Advanced Calculus",
    subject: "Mathematics",
    duration: "55 min",
    videoUrl: "",
    hasQuiz: false,
    documents: [],
    sections: [
      {
        type: "intro",
        title: "🔒 Locked Content",
        content: "This lesson requires you to complete previous mathematics lessons first. Keep learning to unlock advanced content!",
      },
      {
        type: "text",
        title: "Coming Soon",
        content: "Advanced Calculus covers:\n\n• Integration techniques\n• Differentiation rules\n• Limits and continuity\n• Applications in real-world problems\n\nComplete 'Introduction to Algebra' and other basic math lessons to access this content.",
      },
    ],
  },
};

export default function LessonContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const lessonId = location.state?.lessonId || 1;
  
  const lesson = lessonContent[lessonId] || lessonContent[1];
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = lesson.sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete - show quiz option
      if (lesson.hasQuiz) {
        toast({
          title: "Lesson Complete! 🎉",
          description: "Ready to test your knowledge?",
        });
        setTimeout(() => navigate('/lesson-quiz', { state: { lessonId } }), 1500);
      } else {
        toast({
          title: "Lesson Complete! 🎉",
          description: `You've finished ${lesson.title}`,
        });
        setTimeout(() => navigate('/lessons'), 1500);
      }
    }
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Downloading...",
      description: `${docName} will be available offline`,
    });
  };

  const handlePlayVideo = () => {
    if (!lesson.videoUrl) {
      toast({
        title: "Video Coming Soon!",
        description: "Video content will be added shortly",
      });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const section = lesson.sections[currentSection];
  
  const getSectionIcon = (type: string) => {
    switch (type) {
      case "intro":
        return <BookOpen className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Headphones className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case "intro":
        return "bg-primary/10 text-primary";
      case "example":
        return "bg-secondary/10 text-secondary";
      case "practice":
        return "bg-accent/10 text-accent";
      case "summary":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => navigate("/lessons")} className="mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Lessons
        </Button>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <Badge variant="secondary">{lesson.subject}</Badge>
        </div>
        <p className="text-muted-foreground">
          Section {currentSection + 1} of {totalSections} • {lesson.duration}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Video Section */}
      {lesson.videoUrl !== undefined && (
        <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Video Lesson</CardTitle>
                <CardDescription>Watch the full video explanation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {lesson.videoUrl ? (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video controls className="w-full h-full">
                  <source src={lesson.videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button variant="warm" size="lg" onClick={handlePlayVideo}>
                  <Play className="w-6 h-6" />
                  Video Coming Soon
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Downloadable Documents */}
      {lesson.documents && lesson.documents.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>Download offline resources</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lesson.documents.map((doc: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(doc.name)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${getSectionColor(section.type)}`}>
              {getSectionIcon(section.type)}
            </div>
            <Badge variant="outline" className="capitalize">
              {section.type}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{section.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-foreground leading-relaxed">
              {section.content}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button variant="warm" onClick={handleNext} className="flex-1">
          {currentSection === totalSections - 1 ? (
            lesson.hasQuiz ? (
              <>
                Take Quiz
                <Brain className="w-4 h-4" />
              </>
            ) : (
              <>
                Complete Lesson
                <CheckCircle className="w-4 h-4" />
              </>
            )
          ) : (
            <>
              Next Section
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Section Navigator */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-3">Lesson Sections:</p>
          <div className="space-y-2">
            {lesson.sections.map((sec: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  index === currentSection
                    ? "border-primary bg-primary/5"
                    : index < currentSection
                    ? "border-success/20 bg-success/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${getSectionColor(sec.type)}`}>
                      {getSectionIcon(sec.type)}
                    </div>
                    <div>
                      <p className="font-medium">{sec.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {sec.type}
                      </p>
                    </div>
                  </div>
                  {index < currentSection && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
