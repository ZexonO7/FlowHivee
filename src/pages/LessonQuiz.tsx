import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Trophy, ArrowRight, ArrowLeft, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Lesson quizzes with diagrams
const lessonQuizzes: Record<number, any> = {
  1: {
    title: "Algebra Basics Quiz",
    subject: "Mathematics",
    questions: [
      {
        id: 1,
        question: "Solve for x: x + 7 = 15",
        diagram: "🔢 x + 7 = 15\n\nHint: Subtract the same\nnumber from both sides",
        options: ["x = 6", "x = 8", "x = 22", "x = 10"],
        correctAnswer: 1,
        explanation: "Subtract 7 from both sides: x = 15 - 7 = 8",
      },
      {
        id: 2,
        question: "What is 3(x + 2) when x = 4?",
        diagram: "3(x + 2) when x = 4\n\nHint: Replace x with 4,\nthen solve inside ( ) first",
        options: ["14", "18", "20", "12"],
        correctAnswer: 1,
        explanation: "First solve inside parentheses: 4 + 2 = 6, then multiply: 3 × 6 = 18",
      },
      {
        id: 3,
        question: "If 2x = 10, what is x?",
        diagram: "2x = 10\n\nHint: Divide both sides\nby the same number",
        options: ["2", "5", "8", "20"],
        correctAnswer: 1,
        explanation: "Divide both sides by 2: x = 10 ÷ 2 = 5",
      },
    ],
  },
  2: {
    title: "Water Cycle Quiz",
    subject: "Science",
    questions: [
      {
        id: 1,
        question: "What happens during evaporation?",
        diagram: "☀️ Sun heats water\n🌊 Liquid Water → 💨 Water Vapor",
        options: [
          "Water falls from clouds",
          "Water turns into vapor",
          "Clouds form",
          "Water freezes",
        ],
        correctAnswer: 1,
        explanation: "Evaporation is when liquid water turns into water vapor (gas) due to heat from the sun.",
      },
      {
        id: 2,
        question: "What is condensation?",
        diagram: "💨 Water Vapor (gas)\n     ↓ (cools down)\n💧 Water Droplets → ☁️ Clouds",
        options: [
          "Water evaporating",
          "Water vapor turning to liquid",
          "Rain falling",
          "Ice melting",
        ],
        correctAnswer: 1,
        explanation: "Condensation occurs when water vapor cools and turns back into liquid droplets, forming clouds.",
      },
      {
        id: 3,
        question: "Put the water cycle steps in order:",
        diagram: "🔄 The Water Cycle:\n1️⃣ → 2️⃣ → 3️⃣ → 4️⃣",
        options: [
          "Evaporation → Condensation → Precipitation → Collection",
          "Collection → Precipitation → Evaporation → Condensation",
          "Condensation → Evaporation → Collection → Precipitation",
          "Precipitation → Collection → Condensation → Evaporation",
        ],
        correctAnswer: 0,
        explanation: "The water cycle: Water evaporates → vapor condenses into clouds → precipitation falls → water collects → cycle repeats!",
      },
    ],
  },
  3: {
    title: "Creative Writing Quiz",
    subject: "English",
    questions: [
      {
        id: 1,
        question: "Which is an example of 'showing' instead of 'telling'?",
        diagram: "✗ TELLING: She was sad\n✓ SHOWING: Tears rolled down her face",
        options: [
          "He was angry",
          "His fists clenched and his face turned red",
          "She felt happy",
          "The day was boring",
        ],
        correctAnswer: 1,
        explanation: "'His fists clenched and his face turned red' shows anger through actions, not just stating it.",
      },
      {
        id: 2,
        question: "What are the main elements of a story?",
        diagram: "📚 Story Elements:\n👥 Characters\n📍 Setting\n📖 Plot\n⚡ Conflict\n✅ Resolution",
        options: [
          "Words, sentences, paragraphs",
          "Characters, setting, plot, conflict, resolution",
          "Beginning, middle, end",
          "Title, author, pages",
        ],
        correctAnswer: 1,
        explanation: "A complete story needs characters, setting, plot, conflict, and resolution.",
      },
      {
        id: 3,
        question: "Which sentence uses sensory details best?",
        diagram: "👁️ Sight  👂 Sound  👃 Smell\n👅 Taste  ✋ Touch",
        options: [
          "The food was good",
          "The warm, buttery bread smelled like fresh-baked heaven",
          "I ate dinner",
          "The meal was nice",
        ],
        correctAnswer: 1,
        explanation: "This sentence appeals to touch (warm), taste (buttery), and smell (fresh-baked heaven).",
      },
    ],
  },
  4: {
    title: "Ancient Civilizations Quiz",
    subject: "History",
    questions: [
      {
        id: 1,
        question: "Which ancient civilization built the pyramids?",
        diagram: "🏜️ Ancient Egypt\n🔺 Pyramids of Giza\n👑 Pharaohs ruled",
        options: ["Ancient Greece", "Ancient Rome", "Ancient Egypt", "Ancient China"],
        correctAnswer: 2,
        explanation: "Ancient Egyptians built the pyramids as tombs for their pharaohs along the Nile River.",
      },
      {
        id: 2,
        question: "What did Ancient Greece give us?",
        diagram: "🏛️ Ancient Greece\n⚖️ Democracy\n🏃 Olympics\n📚 Philosophy",
        options: [
          "The Great Wall",
          "Democracy and Olympics",
          "Pyramids",
          "Gladiator fights",
        ],
        correctAnswer: 1,
        explanation: "Ancient Greece created democracy (government by the people) and started the Olympic Games.",
      },
      {
        id: 3,
        question: "What was Ancient Rome famous for?",
        diagram: "🏛️ Ancient Rome\n🛣️ Roads & Aqueducts\n⚔️ Strong Military\n⚖️ Roman Law",
        options: [
          "Building pyramids",
          "Inventing writing",
          "Engineering and law",
          "Discovering America",
        ],
        correctAnswer: 2,
        explanation: "Rome was famous for advanced engineering (roads, aqueducts) and their system of laws.",
      },
    ],
  },
  5: {
    title: "Python Basics Quiz",
    subject: "Computer Science",
    questions: [
      {
        id: 1,
        question: "What does this code print? print('Hello')",
        diagram: "print('Hello')\n\nHint: print() shows text\nwithout the quotes",
        options: ["'Hello'", "Hello", "print", "Error"],
        correctAnswer: 1,
        explanation: "The print() function displays text without the quotes, so it outputs: Hello",
      },
      {
        id: 2,
        question: "What is a variable in Python?",
        diagram: "name = 'Alex'\n\n📦 A box that can\nhold information",
        options: [
          "A number",
          "A container that stores data",
          "A function",
          "An error",
        ],
        correctAnswer: 1,
        explanation: "A variable is like a labeled box that stores data (numbers, text, etc.) you can use later.",
      },
      {
        id: 3,
        question: "What is the output? age = 10; print(age + 5)",
        diagram: "age = 10\nprint(age + 5)\n\nHint: Python will do\nthe math for you",
        options: ["10", "5", "15", "105"],
        correctAnswer: 2,
        explanation: "Python adds the numbers: 10 + 5 = 15",
      },
    ],
  },
};

export default function LessonQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const lessonId = location.state?.lessonId || 1;
  
  const quiz = lessonQuizzes[lessonId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Quiz not available</p>
        <Button onClick={() => navigate('/lessons')} className="mt-4">
          Back to Lessons
        </Button>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        description: "Choose one option before continuing",
        variant: "destructive",
      });
      return;
    }

    setAnswers({ ...answers, [currentQuestion]: selectedOption });
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const score = calculateScore();
  const correctAnswers = quiz.questions.filter(
    (q: any, index: number) => answers[index] === q.correctAnswer
  ).length;

  if (showResults) {
    return (
      <div className="space-y-6 animate-fade-in pb-20 md:pb-8">
        <Card className="shadow-glow border-0 bg-gradient-warm">
          <CardContent className="pt-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-6 bg-white/20 rounded-full">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {score >= 70 ? "Great Job! 🎉" : "Keep Learning! 💪"}
            </h2>
            <p className="text-white/90 text-lg mb-6">{quiz.title}</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-4xl font-bold text-white">{score}%</p>
                <p className="text-white/90 text-sm">Your Score</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-4xl font-bold text-white">
                  {correctAnswers}/{totalQuestions}
                </p>
                <p className="text-white/90 text-sm">Correct</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.questions.map((q: any, index: number) => {
              const isCorrect = answers[index] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect
                      ? "border-success/20 bg-success/5"
                      : "border-destructive/20 bg-destructive/5"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-lg mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      {q.diagram && (
                        <pre className="bg-muted/50 p-3 rounded text-sm mb-3 font-mono overflow-x-auto">
                          {q.diagram}
                        </pre>
                      )}
                      <p className="text-sm text-muted-foreground mb-1">
                        Your answer: <span className={isCorrect ? "text-success font-medium" : "text-destructive font-medium"}>{q.options[answers[index]]}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mb-2">
                          Correct answer: <span className="font-medium">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                      <p className="text-sm mt-2 bg-primary/5 p-3 rounded border-l-4 border-primary">
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="warm" className="flex-1" onClick={() => navigate("/lessons")}>
            <BookOpen className="w-4 h-4" />
            Back to Lessons
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResults(false);
              setSelectedOption(null);
            }}
          >
            <Brain className="w-4 h-4" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => navigate("/lessons")} className="mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Lessons
        </Button>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <Badge variant="secondary">{quiz.subject}</Badge>
        </div>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
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

      {/* Question Card with Diagram */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl mb-4">{currentQ.question}</CardTitle>
          {currentQ.diagram && (
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border-2 border-primary/10">
              <pre className="text-center font-mono text-lg leading-relaxed whitespace-pre-wrap">
                {currentQ.diagram}
              </pre>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(value) => setSelectedOption(parseInt(value))}
            className="space-y-3"
          >
            {currentQ.options.map((option: string, index: number) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                  selectedOption === index
                    ? "border-primary bg-primary/5"
                    : "border-muted"
                }`}
                onClick={() => setSelectedOption(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button variant="warm" onClick={handleNext} className="flex-1">
          {currentQuestion === totalQuestions - 1 ? (
            <>
              Finish Quiz
              <Trophy className="w-4 h-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
