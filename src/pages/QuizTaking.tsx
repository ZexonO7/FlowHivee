import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Trophy, Star, ArrowRight, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample quiz questions
const quizData: Record<number, any> = {
  1: {
    title: "Algebra Challenge",
    subject: "Mathematics",
    questions: [
      {
        id: 1,
        question: "What is the value of x in the equation: 2x + 5 = 15?",
        options: ["x = 3", "x = 5", "x = 7", "x = 10"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Simplify: 3(x + 2) - 2x",
        options: ["x + 6", "x + 2", "5x + 6", "x - 6"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "What is the slope of the line y = 3x + 2?",
        options: ["2", "3", "5", "1"],
        correctAnswer: 1,
      },
    ],
  },
  2: {
    title: "Water Cycle Quiz",
    subject: "Science",
    questions: [
      {
        id: 1,
        question: "What is the process of water turning into vapor called?",
        options: ["Condensation", "Evaporation", "Precipitation", "Collection"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What happens during condensation?",
        options: [
          "Water falls from clouds",
          "Water vapor turns into liquid",
          "Water is absorbed by plants",
          "Water evaporates from oceans",
        ],
        correctAnswer: 1,
      },
    ],
  },
  3: {
    title: "Grammar Master",
    subject: "English",
    questions: [
      {
        id: 1,
        question: "Identify the verb in: 'The cat sleeps on the couch.'",
        options: ["cat", "sleeps", "couch", "the"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which sentence is grammatically correct?",
        options: [
          "She don't like apples",
          "She doesn't likes apples",
          "She doesn't like apples",
          "She don't likes apples",
        ],
        correctAnswer: 2,
      },
    ],
  },
};

export default function QuizTaking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const quizId = location.state?.quizId || 1;
  
  const quiz = quizData[quizId] || quizData[1];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

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
            <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
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
          <CardContent className="space-y-4">
            {quiz.questions.map((q: any, index: number) => {
              const isCorrect = answers[index] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? "border-success/20 bg-success/5"
                      : "border-destructive/20 bg-destructive/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        {index + 1}. {q.question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: {q.options[answers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mt-1">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="warm" className="flex-1" onClick={() => navigate("/quizzes")}>
            <Brain className="w-4 h-4" />
            Back to Quizzes
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
        <Button variant="ghost" onClick={() => navigate("/quizzes")} className="mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
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

      {/* Question Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQ.question}
          </CardTitle>
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
              <Trophy className="w-4 h-4" />
              Finish Quiz
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Question Navigator */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-3">Jump to question:</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_: any, index: number) => (
              <Button
                key={index}
                variant={
                  index === currentQuestion
                    ? "warm"
                    : answers[index] !== undefined
                    ? "success"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedOption(answers[index] ?? null);
                }}
                className="w-12 h-12"
              >
                {index + 1}
                {answers[index] !== undefined && index !== currentQuestion && (
                  <CheckCircle className="w-3 h-3 absolute top-1 right-1" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
