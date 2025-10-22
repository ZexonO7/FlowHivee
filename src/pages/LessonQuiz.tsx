import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Trophy, ArrowRight, ArrowLeft, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveQuizResult } from "@/lib/progress-storage";

// Lesson quizzes with diagrams
const lessonQuizzes: Record<number, any> = {
  // Montessori Lessons
  1: {
    title: "Letter Recognition Quiz",
    subject: "Language Arts",
    questions: [
      {
        id: 1,
        question: "What sound does the letter A make?",
        diagram: "🅰️ Letter A\n\nListen: /aaa/\nlike in Apple 🍎",
        options: ["/bee/", "/aaa/", "/see/", "/dee/"],
        correctAnswer: 1,
        explanation: "The letter A makes the /aaa/ sound like you hear at the beginning of 'apple'!",
      },
      {
        id: 2,
        question: "Which word starts with the letter B?",
        diagram: "🐻 Bear   🎈 Balloon\n🏀 Ball    📝 Book\n\nAll start with B!",
        options: ["Cat", "Ball", "Dog", "Sun"],
        correctAnswer: 1,
        explanation: "Ball starts with the letter B! B makes the /buh/ sound.",
      },
      {
        id: 3,
        question: "How many letters are in the alphabet?",
        diagram: "🔤 A-B-C-D-E...\n...X-Y-Z\n\nCount them all!",
        options: ["20", "26", "30", "25"],
        correctAnswer: 1,
        explanation: "There are 26 letters in the English alphabet, from A to Z!",
      },
    ],
  },
  2: {
    title: "Counting 1-10 Quiz",
    subject: "Mathematics",
    questions: [
      {
        id: 1,
        question: "How many apples? 🍎🍎🍎",
        diagram: "🍎 🍎 🍎\n\nCount them!",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "There are 3 apples! Count: 1, 2, 3!",
      },
      {
        id: 2,
        question: "What number comes after 5?",
        diagram: "1, 2, 3, 4, 5, ?\n\nWhat's next?",
        options: ["4", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "6 comes after 5! The pattern is 1, 2, 3, 4, 5, 6!",
      },
      {
        id: 3,
        question: "How many stars? ⭐⭐⭐⭐⭐⭐⭐",
        diagram: "⭐⭐⭐⭐⭐⭐⭐\n\nCount carefully!",
        options: ["6", "7", "8", "9"],
        correctAnswer: 1,
        explanation: "There are 7 stars! Great counting!",
      },
    ],
  },
  4: {
    title: "Color Matching Quiz",
    subject: "Sensorial",
    questions: [
      {
        id: 1,
        question: "What are the three primary colors?",
        diagram: "🔴 Red\n🔵 Blue\n🟡 Yellow\n\nThese are PRIMARY!",
        options: ["Red, Blue, Yellow", "Red, Green, Yellow", "Blue, Green, Orange", "Red, Purple, Blue"],
        correctAnswer: 0,
        explanation: "Red, Blue, and Yellow are the three primary colors! All other colors are made by mixing these!",
      },
      {
        id: 2,
        question: "What color do you get when you mix Red + Yellow?",
        diagram: "🔴 Red + 🟡 Yellow\n     ↓\n     ?",
        options: ["Purple", "Orange", "Green", "Brown"],
        correctAnswer: 1,
        explanation: "Red + Yellow = Orange! 🟠 Try mixing paint or playdough to see!",
      },
      {
        id: 3,
        question: "Which color is the sky on a sunny day?",
        diagram: "☀️ Sunny Day\n\nLook up!",
        options: ["Green", "Blue", "Yellow", "Red"],
        correctAnswer: 1,
        explanation: "The sky is blue on a sunny day! ☀️🔵",
      },
    ],
  },
  // 1st Grade Lessons
  11: {
    title: "Phonics Basics Quiz",
    subject: "Reading",
    questions: [
      {
        id: 1,
        question: "Which letter makes the /mmm/ sound?",
        diagram: "/mmm/ sound\n\nLike in 'Mom' 👩",
        options: ["B", "M", "N", "D"],
        correctAnswer: 1,
        explanation: "The letter M makes the /mmm/ sound, like at the beginning of 'mom' and 'moon'!",
      },
      {
        id: 2,
        question: "What word do these sounds make: C-A-T?",
        diagram: "/k/ + /a/ + /t/\n\nBlend them together!",
        options: ["Dog", "Cat", "Bat", "Hat"],
        correctAnswer: 1,
        explanation: "C-A-T makes 'cat'! You blended the sounds together perfectly!",
      },
      {
        id: 3,
        question: "Which are the vowel letters?",
        diagram: "Special Letters:\nA E I O U\n\nEvery word needs one!",
        options: ["A, E, I, O, U", "B, C, D, F, G", "X, Y, Z", "L, M, N"],
        correctAnswer: 0,
        explanation: "A, E, I, O, U are the vowels! Every word needs at least one vowel.",
      },
    ],
  },
  // 7th Grade Lessons  
  71: {
    title: "Algebra Basics Quiz",
    subject: "Pre-Algebra",
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

  // Save quiz result when completed
  useEffect(() => {
    if (showResults && score >= 0) {
      saveQuizResult({
        quizId: lessonId,
        lessonId: lessonId,
        title: quiz.title,
        subject: quiz.subject,
        score: score,
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
        completedAt: new Date().toISOString(),
      });
    }
  }, [showResults]);

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
