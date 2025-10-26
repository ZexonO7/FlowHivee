import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, FileText, Activity, Trophy, Flame, TrendingUp, Lock, Search, ChevronDown, ChevronUp, Calendar, Clock, GraduationCap, Video, CheckCircle2, PlayCircle, Award, Star, Download, Brain, Target, Zap, Shield, Lightbulb, TrendingDown, ArrowRight, ArrowLeft } from "lucide-react";
import { getAllStudentsData, getTeacherStats, formatRelativeTime, type StudentData } from "@/lib/teacher-storage";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TrainingModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: "video" | "article" | "interactive";
  level: "beginner" | "intermediate" | "advanced";
  xp: number;
  resources: string[];
  assessment: {
    questions: number;
    passingScore: number;
  };
}

interface ModuleProgress {
  completed: boolean;
  completedAt?: string;
  assessmentScore?: number;
  timeSpent?: number;
  certificateIssued?: boolean;
}

const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 1,
    title: "Getting Started with FlowHive",
    description: "Master the basics of the FlowHive platform, teacher dashboard navigation, and core features for student monitoring",
    duration: "15 min",
    type: "video",
    level: "beginner",
    xp: 100,
    resources: ["Quick Start Guide.pdf", "Dashboard Overview.pdf"],
    assessment: { questions: 5, passingScore: 80 },
  },
  {
    id: 2,
    title: "Understanding Student Analytics",
    description: "Deep dive into interpreting student progress data, quiz scores, engagement metrics, and behavioral patterns",
    duration: "20 min",
    type: "video",
    level: "beginner",
    xp: 150,
    resources: ["Analytics Guide.pdf", "Data Interpretation Cheat Sheet.pdf"],
    assessment: { questions: 8, passingScore: 75 },
  },
  {
    id: 3,
    title: "Identifying At-Risk Students",
    description: "Learn to recognize early warning signs and patterns that indicate students need additional support",
    duration: "18 min",
    type: "interactive",
    level: "intermediate",
    xp: 200,
    resources: ["Warning Signs Checklist.pdf", "Intervention Framework.pdf"],
    assessment: { questions: 10, passingScore: 80 },
  },
  {
    id: 4,
    title: "Data-Driven Instruction Strategies",
    description: "Advanced techniques for using student performance data to inform and personalize your teaching approach",
    duration: "30 min",
    type: "video",
    level: "intermediate",
    xp: 250,
    resources: ["Data Strategy Workbook.pdf", "Case Studies.pdf"],
    assessment: { questions: 12, passingScore: 85 },
  },
  {
    id: 5,
    title: "Gamification & Student Motivation",
    description: "Understand the psychology behind XP, levels, streaks, and badges to maximize student engagement",
    duration: "25 min",
    type: "article",
    level: "intermediate",
    xp: 200,
    resources: ["Gamification Research.pdf", "Motivation Techniques.pdf"],
    assessment: { questions: 8, passingScore: 75 },
  },
  {
    id: 6,
    title: "Personalized Learning Paths",
    description: "Design customized learning experiences based on individual student needs, pace, and learning styles",
    duration: "28 min",
    type: "video",
    level: "advanced",
    xp: 300,
    resources: ["Differentiation Strategies.pdf", "Learning Styles Guide.pdf"],
    assessment: { questions: 10, passingScore: 85 },
  },
  {
    id: 7,
    title: "Effective Parent Communication",
    description: "Best practices for sharing student progress with parents and building supportive home-school partnerships",
    duration: "22 min",
    type: "article",
    level: "intermediate",
    xp: 150,
    resources: ["Communication Templates.pdf", "Parent Meeting Guide.pdf"],
    assessment: { questions: 7, passingScore: 80 },
  },
  {
    id: 8,
    title: "Crisis & Intervention Management",
    description: "Develop strategies for students experiencing significant struggles, learning gaps, or motivational issues",
    duration: "35 min",
    type: "interactive",
    level: "advanced",
    xp: 350,
    resources: ["Intervention Protocols.pdf", "Success Stories.pdf"],
    assessment: { questions: 15, passingScore: 85 },
  },
  {
    id: 9,
    title: "Advanced Analytics & Predictive Insights",
    description: "Master complex analytics features, trend analysis, and predictive modeling for proactive teaching",
    duration: "40 min",
    type: "video",
    level: "advanced",
    xp: 400,
    resources: ["Advanced Analytics Manual.pdf", "Prediction Models.pdf"],
    assessment: { questions: 12, passingScore: 90 },
  },
  {
    id: 10,
    title: "Building a Growth Mindset Culture",
    description: "Create a classroom environment that celebrates effort, embraces challenges, and promotes resilience",
    duration: "30 min",
    type: "article",
    level: "intermediate",
    xp: 250,
    resources: ["Growth Mindset Toolkit.pdf", "Classroom Activities.pdf"],
    assessment: { questions: 8, passingScore: 80 },
  },
];

// Assessment questions for each module
const MODULE_QUESTIONS: Record<number, Question[]> = {
  1: [
    {
      question: "What is the primary purpose of the FlowHive teacher dashboard?",
      options: ["To create lesson plans", "To monitor student progress and engagement", "To grade papers", "To send emails to parents"],
      correctAnswer: 1
    },
    {
      question: "Which metric is NOT tracked on the FlowHive dashboard?",
      options: ["Quiz scores", "Lesson completion", "Student location data", "XP and levels"],
      correctAnswer: 2
    },
    {
      question: "How often does the dashboard refresh student data?",
      options: ["Every minute", "Every 5 minutes", "Every 30 seconds", "Only when manually refreshed"],
      correctAnswer: 2
    },
    {
      question: "What does the streak indicator show?",
      options: ["Number of lessons completed", "Consecutive days of activity", "Total XP earned", "Quiz passing rate"],
      correctAnswer: 1
    },
    {
      question: "Which view provides the most detailed student information?",
      options: ["Overview", "Analytics", "Individual student card", "Progress tab"],
      correctAnswer: 2
    }
  ],
  2: [
    {
      question: "What does a declining quiz score trend typically indicate?",
      options: ["Student is bored", "Content difficulty is increasing", "Student needs intervention", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "Which engagement metric is most important for early intervention?",
      options: ["Total XP", "Days since last active", "Number of badges", "Profile completeness"],
      correctAnswer: 1
    },
    {
      question: "A student with high completion but low quiz scores likely needs help with:",
      options: ["Motivation", "Time management", "Content comprehension", "Technical issues"],
      correctAnswer: 2
    },
    {
      question: "What percentage drop in activity should trigger a check-in?",
      options: ["10%", "25%", "50%", "75%"],
      correctAnswer: 1
    },
    {
      question: "Which data point best predicts long-term success?",
      options: ["Current level", "Streak consistency", "Total lessons completed", "Badge count"],
      correctAnswer: 1
    },
    {
      question: "How should you interpret a student with high XP but few completed lessons?",
      options: ["Gaming the system", "Taking quizzes multiple times", "Completing difficult content", "Data error"],
      correctAnswer: 2
    },
    {
      question: "What does the 'flame' icon represent?",
      options: ["High score", "Current streak", "Overdue lessons", "Teacher comment"],
      correctAnswer: 1
    },
    {
      question: "A sudden spike in activity after weeks of inactivity suggests:",
      options: ["Renewed interest", "Deadline approaching", "Parent intervention", "Could be any of these"],
      correctAnswer: 3
    }
  ],
  3: [
    {
      question: "Which is the earliest warning sign of a struggling student?",
      options: ["Failed quiz", "Broken streak", "Decreased login frequency", "Low XP"],
      correctAnswer: 2
    },
    {
      question: "A student who logs in but doesn't complete activities may be experiencing:",
      options: ["Technical issues", "Lack of confidence", "Content too difficult", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "What pattern indicates a student is avoiding challenging content?",
      options: ["Completing only easy lessons", "Low quiz attempts", "Irregular login times", "Incomplete profile"],
      correctAnswer: 0
    },
    {
      question: "How many consecutive days of inactivity warrants intervention?",
      options: ["1-2 days", "3-5 days", "7+ days", "14+ days"],
      correctAnswer: 1
    },
    {
      question: "Which metric combination is most concerning?",
      options: ["High XP + Low completion", "Low XP + High completion", "Low streak + High scores", "Low streak + Low scores"],
      correctAnswer: 3
    },
    {
      question: "A student with declining engagement but stable scores might need:",
      options: ["Academic support", "Motivational support", "Technical support", "No intervention"],
      correctAnswer: 1
    },
    {
      question: "What time-of-day pattern might indicate a scheduling issue?",
      options: ["Morning only", "Late night only", "Inconsistent times", "Weekend only"],
      correctAnswer: 1
    },
    {
      question: "Rapid completion with poor quiz scores suggests:",
      options: ["Rushing through content", "Cheating", "Technical glitch", "Advanced learner"],
      correctAnswer: 0
    },
    {
      question: "Which student needs immediate attention?",
      options: ["5 days inactive, 85% avg score", "Active daily, 65% avg score", "10 days inactive, 70% avg score", "Active weekly, 90% avg score"],
      correctAnswer: 2
    },
    {
      question: "A student who only does quizzes without lessons is likely:",
      options: ["Very advanced", "Testing out", "Gaming the system", "All possible"],
      correctAnswer: 3
    }
  ],
  4: [
    {
      question: "Data-driven instruction primarily focuses on:",
      options: ["Teaching to the test", "Using evidence to guide teaching decisions", "Collecting more data", "Standardizing curriculum"],
      correctAnswer: 1
    },
    {
      question: "Which data type is most useful for immediate instructional changes?",
      options: ["Standardized test scores", "Daily engagement metrics", "End-of-year assessments", "Attendance records"],
      correctAnswer: 1
    },
    {
      question: "How often should you review student analytics?",
      options: ["Daily", "Weekly", "Monthly", "Quarterly"],
      correctAnswer: 1
    },
    {
      question: "When multiple students struggle with the same content, you should:",
      options: ["Reteach the entire class", "Provide individual tutoring", "Skip the content", "Create targeted group interventions"],
      correctAnswer: 3
    },
    {
      question: "What does 'differentiated instruction' mean in FlowHive?",
      options: ["Different lessons for each student", "Tailoring pace and support based on data", "Giving harder work to advanced students", "Separating students by ability"],
      correctAnswer: 1
    },
    {
      question: "A student consistently scores 95%+ on all quizzes. You should:",
      options: ["Do nothing, they're fine", "Provide enrichment challenges", "Reduce their workload", "Move them to next grade"],
      correctAnswer: 1
    },
    {
      question: "Which metric helps identify if content is too difficult?",
      options: ["Class average below 70%", "High quiz retake rate", "Long time-on-task", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "How can you use FlowHive data for parent conferences?",
      options: ["Show raw scores only", "Display trends and patterns with context", "Compare to other students", "Focus only on weaknesses"],
      correctAnswer: 1
    },
    {
      question: "What action should follow data analysis?",
      options: ["More data collection", "Targeted instructional adjustments", "Student punishment", "Grade changes"],
      correctAnswer: 1
    },
    {
      question: "Which indicates your teaching strategy is working?",
      options: ["All students at same level", "Improving trend lines", "Perfect attendance", "No quiz failures"],
      correctAnswer: 1
    },
    {
      question: "Student data should inform decisions about:",
      options: ["Pacing", "Grouping", "Content difficulty", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "What's the risk of over-relying on data?",
      options: ["Missing qualitative factors", "Data overload", "Teaching becomes robotic", "All of the above"],
      correctAnswer: 3
    }
  ],
  5: [
    {
      question: "What psychological principle underlies gamification?",
      options: ["Fear of failure", "Intrinsic motivation", "Competition", "Behavioral reinforcement"],
      correctAnswer: 3
    },
    {
      question: "Which game element is most effective for sustained engagement?",
      options: ["Points (XP)", "Badges", "Leaderboards", "Progress bars"],
      correctAnswer: 3
    },
    {
      question: "Streaks primarily motivate through:",
      options: ["Competition", "Loss aversion", "Social proof", "Rewards"],
      correctAnswer: 1
    },
    {
      question: "What's a potential downside of leaderboards?",
      options: ["Discourages low performers", "Creates unhealthy competition", "Reduces collaboration", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "How should badges be designed for maximum impact?",
      options: ["Easy to earn", "Rare and challenging", "Mix of easy and hard", "Based on time spent"],
      correctAnswer: 2
    },
    {
      question: "What happens when extrinsic rewards replace intrinsic motivation?",
      options: ["Students learn better", "Nothing changes", "Engagement may decrease when rewards stop", "Creativity increases"],
      correctAnswer: 2
    },
    {
      question: "Which students benefit most from gamification?",
      options: ["High achievers only", "Struggling students only", "All students, but differently", "Only younger students"],
      correctAnswer: 2
    },
    {
      question: "How can teachers enhance FlowHive's gamification?",
      options: ["Add more points", "Recognize achievements publicly", "Remove difficult badges", "Focus only on grades"],
      correctAnswer: 1
    }
  ],
  6: [
    {
      question: "Personalized learning paths are based on:",
      options: ["Student age", "Individual needs and pace", "Teacher preference", "Standardized curriculum"],
      correctAnswer: 1
    },
    {
      question: "What's the first step in creating a personalized path?",
      options: ["Assess current knowledge", "Set grade-level goals", "Choose random lessons", "Ask parent preferences"],
      correctAnswer: 0
    },
    {
      question: "How does FlowHive support different learning styles?",
      options: ["Video, text, and interactive content", "One-size-fits-all approach", "Teacher lectures only", "Textbook reading"],
      correctAnswer: 0
    },
    {
      question: "A student who learns best through practice should receive:",
      options: ["More videos", "More interactive exercises", "More reading", "Longer lectures"],
      correctAnswer: 1
    },
    {
      question: "What role does student choice play in personalization?",
      options: ["No role", "Complete freedom", "Guided choices within structure", "Teacher decides everything"],
      correctAnswer: 2
    },
    {
      question: "How often should personalized paths be adjusted?",
      options: ["Never", "Continuously based on data", "Once per year", "Only when student fails"],
      correctAnswer: 1
    },
    {
      question: "Which indicates a personalized path is working?",
      options: ["Student completes more content", "Improved scores and engagement", "Faster completion", "Higher XP"],
      correctAnswer: 1
    },
    {
      question: "What's a challenge of personalized learning?",
      options: ["Too much teacher time required", "Students fall behind", "Reduced collaboration", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "FlowHive's adaptive features can:",
      options: ["Adjust difficulty automatically", "Skip mastered content", "Provide extra practice", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "Personalization works best when combined with:",
      options: ["Individual work only", "Regular teacher check-ins", "Standardized testing", "Competitive rankings"],
      correctAnswer: 1
    }
  ],
  7: [
    {
      question: "What's the primary goal of parent communication?",
      options: ["Report problems", "Build partnership for student success", "Assign homework supervision", "Defend teaching methods"],
      correctAnswer: 1
    },
    {
      question: "How often should teachers proactively contact parents?",
      options: ["Only when problems arise", "At least once per term with positive news", "Weekly", "Never, let them check the portal"],
      correctAnswer: 1
    },
    {
      question: "When sharing FlowHive data with parents, focus on:",
      options: ["Raw numbers only", "Trends and context", "Comparison to other students", "Just the weaknesses"],
      correctAnswer: 1
    },
    {
      question: "What should you do if a parent disagrees with the data?",
      options: ["Insist you're right", "Ignore their concerns", "Listen and investigate together", "Remove the student from system"],
      correctAnswer: 2
    },
    {
      question: "Which communication method is best for urgent concerns?",
      options: ["Email", "Phone call", "Portal message", "Wait for parent-teacher conference"],
      correctAnswer: 1
    },
    {
      question: "How can parents support learning at home using FlowHive?",
      options: ["Do the work for students", "Monitor progress and encourage consistency", "Restrict access as punishment", "Compare to siblings"],
      correctAnswer: 1
    },
    {
      question: "What information should NOT be shared with parents?",
      options: ["Their child's progress", "Other students' data", "Teacher observations", "Areas for improvement"],
      correctAnswer: 1
    }
  ],
  8: [
    {
      question: "What defines a 'crisis' in student learning?",
      options: ["One failed quiz", "Significant, persistent struggle impacting progress", "Forgotten password", "Missing one assignment"],
      correctAnswer: 1
    },
    {
      question: "The first step in crisis intervention is:",
      options: ["Assign more work", "Identify root cause", "Contact parents", "Lower expectations"],
      correctAnswer: 1
    },
    {
      question: "If a student hasn't logged in for 2 weeks, you should:",
      options: ["Remove from class", "Wait another week", "Reach out immediately", "Mark as failed"],
      correctAnswer: 2
    },
    {
      question: "Which intervention is most appropriate for math anxiety?",
      options: ["More difficult problems", "Timed tests", "Scaffolded practice with encouragement", "Skip math lessons"],
      correctAnswer: 2
    },
    {
      question: "A student who suddenly stops participating may be experiencing:",
      options: ["Personal issues", "Bullying", "Learning difficulties", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "What's the role of the teacher in severe cases?",
      options: ["Solve all problems", "Recognize when to involve specialists", "Ignore and focus on curriculum", "Blame the student"],
      correctAnswer: 1
    },
    {
      question: "Which is an effective intervention for chronic absence?",
      options: ["Punishment", "Flexible scheduling", "Public shaming", "Extra homework"],
      correctAnswer: 1
    },
    {
      question: "How do you help a student who's fallen far behind?",
      options: ["Make them catch up to grade level immediately", "Create manageable goals and celebrate small wins", "Retain them", "Give up"],
      correctAnswer: 1
    },
    {
      question: "Documentation of interventions is important for:",
      options: ["Legal protection", "Tracking effectiveness", "Communication with support staff", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "When should you escalate to administration?",
      options: ["First sign of trouble", "After multiple failed interventions", "Never", "Only for behavior issues"],
      correctAnswer: 1
    },
    {
      question: "What's a sign your intervention is working?",
      options: ["Student is happier", "Small measurable improvements", "Parent satisfaction", "Faster completion"],
      correctAnswer: 1
    },
    {
      question: "Crisis intervention should be:",
      options: ["Temporary and targeted", "Permanent solution", "Punitive", "Optional"],
      correctAnswer: 0
    },
    {
      question: "Which resource is most helpful for learning disabilities?",
      options: ["More practice", "Specialized support staff", "Longer assignments", "Peer tutoring"],
      correctAnswer: 1
    },
    {
      question: "How do you balance intervention with autonomy?",
      options: ["Total control", "No oversight", "Supportive structure with student input", "Parent decides"],
      correctAnswer: 2
    },
    {
      question: "What should follow successful intervention?",
      options: ["Return to normal immediately", "Gradual release with monitoring", "Increased workload", "Public recognition"],
      correctAnswer: 1
    }
  ],
  9: [
    {
      question: "What is predictive analytics in education?",
      options: ["Guessing student grades", "Using historical data to forecast outcomes", "Random predictions", "Teacher intuition"],
      correctAnswer: 1
    },
    {
      question: "Which metric is most predictive of course completion?",
      options: ["First week engagement", "Total XP", "Number of friends", "Profile picture"],
      correctAnswer: 0
    },
    {
      question: "What does correlation NOT imply?",
      options: ["Relationship", "Causation", "Pattern", "Association"],
      correctAnswer: 1
    },
    {
      question: "How can trend analysis help teachers?",
      options: ["Predicts lottery numbers", "Identifies patterns before they become problems", "Replaces teaching", "Grades students"],
      correctAnswer: 1
    },
    {
      question: "What's a cohort analysis?",
      options: ["Comparing individuals", "Comparing groups with shared characteristics", "Averaging all students", "Random sampling"],
      correctAnswer: 1
    },
    {
      question: "Which advanced metric shows learning efficiency?",
      options: ["XP per hour", "Total lessons", "Login count", "Badge total"],
      correctAnswer: 0
    },
    {
      question: "What is A/B testing in education?",
      options: ["Grading scale", "Comparing two teaching approaches", "Student rankings", "Quiz format"],
      correctAnswer: 1
    },
    {
      question: "Why is longitudinal data valuable?",
      options: ["Shows changes over time", "Current snapshot", "One-time assessment", "Year-end summary"],
      correctAnswer: 0
    },
    {
      question: "What's the danger of false positives in predictive models?",
      options: ["No danger", "Intervening when not needed", "Missing actual problems", "Data overload"],
      correctAnswer: 1
    },
    {
      question: "How should teachers use predictive insights?",
      options: ["As absolute truth", "To inform, not replace, professional judgment", "Ignore them", "For grading only"],
      correctAnswer: 1
    },
    {
      question: "Which requires the most advanced analytics skill?",
      options: ["Reading a report", "Creating custom dashboards", "Building predictive models", "Checking attendance"],
      correctAnswer: 2
    },
    {
      question: "What's the benefit of real-time analytics?",
      options: ["Historical record", "Immediate intervention opportunity", "Year-end reporting", "Comparison only"],
      correctAnswer: 1
    }
  ],
  10: [
    {
      question: "What is a growth mindset?",
      options: ["Being positive", "Believing abilities can be developed", "Being competitive", "Natural talent"],
      correctAnswer: 1
    },
    {
      question: "Which phrase promotes growth mindset?",
      options: ["You're so smart!", "You worked hard on this!", "You're a natural!", "You're the best!"],
      correctAnswer: 1
    },
    {
      question: "How should teachers frame mistakes?",
      options: ["As failures", "As learning opportunities", "As punishable", "As embarrassing"],
      correctAnswer: 1
    },
    {
      question: "What does 'yet' do in 'I can't do this yet'?",
      options: ["Nothing", "Implies future possibility", "Admits defeat", "Shows frustration"],
      correctAnswer: 1
    },
    {
      question: "Which student likely has growth mindset?",
      options: ["Avoids challenges", "Embraces difficult tasks", "Gives up quickly", "Blames others"],
      correctAnswer: 1
    },
    {
      question: "How does FlowHive support growth mindset?",
      options: ["Shows only successes", "Displays progress and effort", "Hides struggles", "Compares students"],
      correctAnswer: 1
    },
    {
      question: "What should you celebrate in students?",
      options: ["Only correct answers", "Effort and strategies", "Speed", "Natural ability"],
      correctAnswer: 1
    },
    {
      question: "Fixed mindset students believe:",
      options: ["Effort matters", "Talent is everything", "Practice helps", "Growth is possible"],
      correctAnswer: 1
    }
  ]
};

const ACHIEVEMENTS = [
  { id: "first_module", title: "First Steps", description: "Complete your first module", icon: Star, xp: 50 },
  { id: "half_complete", title: "Halfway There", description: "Complete 5 modules", icon: Target, xp: 100 },
  { id: "all_complete", title: "Master Educator", description: "Complete all modules", icon: Trophy, xp: 500 },
  { id: "perfect_score", title: "Perfect Score", description: "Get 100% on any assessment", icon: Zap, xp: 150 },
  { id: "speed_learner", title: "Speed Learner", description: "Complete 3 modules in one day", icon: Flame, xp: 200 },
  { id: "advanced_scholar", title: "Advanced Scholar", description: "Complete all advanced modules", icon: Brain, xp: 300 },
];

const ADMIN_PASSWORD = "FlowHive@123";
const AUTH_KEY = "teacher_authenticated";
const TRAINING_PROGRESS_KEY = "teacher_training_progress";
const TRAINING_XP_KEY = "teacher_training_xp";
const TRAINING_ACHIEVEMENTS_KEY = "teacher_achievements";
const ASSESSMENT_SCORES_KEY = "teacher_assessment_scores";

export default function Teacher() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [students, setStudents] = useState<StudentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [moduleProgress, setModuleProgress] = useState<Record<number, ModuleProgress>>({});
  const [totalXP, setTotalXP] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [assessmentScores, setAssessmentScores] = useState<Record<number, number>>({});
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessonsCompleted: 0,
    totalQuizzesTaken: 0,
    avgScore: 0,
  });

  useEffect(() => {
    // Check if already authenticated
    const authenticated = sessionStorage.getItem(AUTH_KEY);
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }

    // Load training progress
    const savedProgress = localStorage.getItem(TRAINING_PROGRESS_KEY);
    if (savedProgress) {
      try {
        setModuleProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to load training progress");
      }
    }

    // Load XP
    const savedXP = localStorage.getItem(TRAINING_XP_KEY);
    if (savedXP) {
      setTotalXP(parseInt(savedXP));
    }

    // Load achievements
    const savedAchievements = localStorage.getItem(TRAINING_ACHIEVEMENTS_KEY);
    if (savedAchievements) {
      try {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      } catch (e) {
        console.error("Failed to load achievements");
      }
    }

    // Load assessment scores
    const savedScores = localStorage.getItem(ASSESSMENT_SCORES_KEY);
    if (savedScores) {
      try {
        setAssessmentScores(JSON.parse(savedScores));
      } catch (e) {
        console.error("Failed to load assessment scores");
      }
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = () => {
      const studentsData = getAllStudentsData();
      setStudents(studentsData.sort((a, b) => 
        new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      ));
      setStats(getTeacherStats());
    };
    
    loadData();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      toast.success("Welcome to Teacher Portal");
    } else {
      toast.error("Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const startModule = (moduleId: number) => {
    setActiveModuleId(moduleId);
    setShowAssessment(false);
  };

  const startAssessment = (moduleId: number) => {
    setActiveModuleId(moduleId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowAssessment(true);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (activeModuleId && currentQuestionIndex < MODULE_QUESTIONS[activeModuleId].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!activeModuleId) return;

    const questions = MODULE_QUESTIONS[activeModuleId];
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q, idx) => 
      selectedAnswers[idx] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    setQuizSubmitted(true);
    
    // Wait a moment to show results, then complete assessment
    setTimeout(() => {
      completeAssessment(activeModuleId, score);
    }, 2000);
  };

  const completeAssessment = (moduleId: number, score: number) => {
    const module = TRAINING_MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const passed = score >= module.assessment.passingScore;
    
    if (passed) {
      // Update module progress
      const newProgress = {
        ...moduleProgress,
        [moduleId]: {
          completed: true,
          completedAt: new Date().toISOString(),
          assessmentScore: score,
          certificateIssued: true,
        }
      };
      setModuleProgress(newProgress);
      localStorage.setItem(TRAINING_PROGRESS_KEY, JSON.stringify(newProgress));

      // Award XP
      const newXP = totalXP + module.xp + (score === 100 ? 50 : 0);
      setTotalXP(newXP);
      localStorage.setItem(TRAINING_XP_KEY, newXP.toString());

      // Save assessment score
      const newScores = { ...assessmentScores, [moduleId]: score };
      setAssessmentScores(newScores);
      localStorage.setItem(ASSESSMENT_SCORES_KEY, JSON.stringify(newScores));

      // Check achievements
      checkAndUnlockAchievements(newProgress, score);

      toast.success(
        score === 100 
          ? `Perfect score! +${module.xp + 50} XP (Bonus +50)` 
          : `Module completed! +${module.xp} XP`
      );
    } else {
      toast.error(`Score ${score}% - Need ${module.assessment.passingScore}% to pass. Try again!`);
    }

    setShowAssessment(false);
    setActiveModuleId(null);
  };

  const checkAndUnlockAchievements = (progress: Record<number, ModuleProgress>, lastScore: number) => {
    const completedCount = Object.keys(progress).length;
    const newAchievements = [...unlockedAchievements];

    // First module
    if (completedCount === 1 && !newAchievements.includes("first_module")) {
      newAchievements.push("first_module");
      toast.success("🏆 Achievement Unlocked: First Steps! +50 XP");
    }

    // Halfway
    if (completedCount === 5 && !newAchievements.includes("half_complete")) {
      newAchievements.push("half_complete");
      toast.success("🏆 Achievement Unlocked: Halfway There! +100 XP");
    }

    // All complete
    if (completedCount === TRAINING_MODULES.length && !newAchievements.includes("all_complete")) {
      newAchievements.push("all_complete");
      toast.success("🏆 Achievement Unlocked: Master Educator! +500 XP");
    }

    // Perfect score
    if (lastScore === 100 && !newAchievements.includes("perfect_score")) {
      newAchievements.push("perfect_score");
      toast.success("🏆 Achievement Unlocked: Perfect Score! +150 XP");
    }

    // Advanced scholar
    const advancedModules = TRAINING_MODULES.filter(m => m.level === "advanced");
    const completedAdvanced = advancedModules.filter(m => progress[m.id]?.completed);
    if (completedAdvanced.length === advancedModules.length && !newAchievements.includes("advanced_scholar")) {
      newAchievements.push("advanced_scholar");
      toast.success("🏆 Achievement Unlocked: Advanced Scholar! +300 XP");
    }

    if (newAchievements.length > unlockedAchievements.length) {
      setUnlockedAchievements(newAchievements);
      localStorage.setItem(TRAINING_ACHIEVEMENTS_KEY, JSON.stringify(newAchievements));
      
      // Add achievement XP
      const achievementXP = ACHIEVEMENTS
        .filter(a => newAchievements.includes(a.id) && !unlockedAchievements.includes(a.id))
        .reduce((sum, a) => sum + a.xp, 0);
      if (achievementXP > 0) {
        const newTotalXP = totalXP + achievementXP;
        setTotalXP(newTotalXP);
        localStorage.setItem(TRAINING_XP_KEY, newTotalXP.toString());
      }
    }
  };

  const downloadCertificate = (moduleId: number) => {
    const module = TRAINING_MODULES.find(m => m.id === moduleId);
    const progress = moduleProgress[moduleId];
    if (!module || !progress?.completed) return;

    toast.success(`Certificate for "${module.title}" downloaded!`);
  };

  const downloadResource = (resource: string) => {
    toast.success(`Downloaded: ${resource}`);
  };

  const isModuleUnlocked = (moduleId: number): boolean => {
    if (moduleId === 1) return true;
    const previousModule = TRAINING_MODULES.find(m => m.id === moduleId - 1);
    return previousModule ? moduleProgress[previousModule.id]?.completed === true : false;
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pb-20 md:pb-8">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Teacher Portal</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="text-center"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedTraining = Object.keys(moduleProgress).filter(id => moduleProgress[parseInt(id)]?.completed).length;
  const trainingProgress = Math.round((completedTraining / TRAINING_MODULES.length) * 100);
  const teacherLevel = Math.floor(totalXP / 500) + 1;

  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">👩‍🏫 Teacher Admin Panel</h1>
          <p className="text-muted-foreground">
            Monitor student progress and performance
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Training Program
            {completedTraining < TRAINING_MODULES.length && (
              <Badge variant="secondary" className="ml-2">
                {completedTraining}/{TRAINING_MODULES.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6 mt-6">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
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
                <p className="text-2xl font-bold">{stats.totalLessonsCompleted}</p>
                <p className="text-sm text-muted-foreground">Lessons Done</p>
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
                <p className="text-2xl font-bold">{stats.totalQuizzesTaken}</p>
                <p className="text-sm text-muted-foreground">Quizzes Taken</p>
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
                <p className="text-2xl font-bold">{stats.avgScore}%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>

          {/* Students List */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Students</CardTitle>
              <CardDescription>Track individual student performance</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{searchQuery ? "No students found" : "No student data available yet"}</p>
              <p className="text-sm mt-1">
                {searchQuery ? "Try a different search term" : "Students will appear here when they start using the app"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => {
                const completedLessons = student.lessons.filter(l => l.completed).length;
                const totalLessons = student.lessons.length;
                const avgQuizScore = student.quizzes.length > 0
                  ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
                  : 0;
                const isExpanded = expandedStudent === student.studentId;
                
                return (
                  <Collapsible
                    key={student.studentId}
                    open={isExpanded}
                    onOpenChange={() => setExpandedStudent(isExpanded ? null : student.studentId)}
                  >
                    <div className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{student.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              Level {student.stats.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ID: {student.studentId} • Last active: {formatRelativeTime(student.lastActive)}
                          </p>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <div className="grid md:grid-cols-5 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{student.stats.totalXP}</p>
                            <p className="text-xs text-muted-foreground">Total XP</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">{student.stats.dayStreak}</p>
                            <p className="text-xs text-muted-foreground">Day Streak</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="text-sm font-medium">{completedLessons}/{totalLessons}</p>
                            <p className="text-xs text-muted-foreground">Lessons</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-accent" />
                          <div>
                            <p className="text-sm font-medium">{student.quizzes.length}</p>
                            <p className="text-xs text-muted-foreground">Quizzes</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <div>
                            <p className="text-sm font-medium">{avgQuizScore}%</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                          </div>
                        </div>
                      </div>

                      {student.quizzes.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Performance</span>
                            <span className="font-medium">{avgQuizScore}%</span>
                          </div>
                          <Progress value={avgQuizScore} className="h-2" />
                        </div>
                      )}

                      {student.stats.badges.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {student.stats.badges.map((badge, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Expandable Details */}
                      <CollapsibleContent className="mt-4 pt-4 border-t space-y-4">
                        {/* Lesson Details */}
                        {student.lessons.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Lesson Progress ({completedLessons}/{totalLessons})
                            </h4>
                            <div className="grid gap-2 max-h-48 overflow-y-auto">
                              {student.lessons.slice(0, 10).map((lesson, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{lesson.title}</p>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                      <Clock className="w-3 h-3" />
                                      {formatRelativeTime(lesson.lastAccessed)}
                                    </p>
                                  </div>
                                  <Badge variant={lesson.completed ? "default" : "outline"} className="text-xs">
                                    {lesson.completed ? "✓ Done" : "In Progress"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quiz History */}
                        {student.quizzes.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Recent Quizzes
                            </h4>
                            <div className="grid gap-2 max-h-48 overflow-y-auto">
                              {student.quizzes.slice(0, 10).map((quiz, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{quiz.title}</p>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                      <Calendar className="w-3 h-3" />
                                      {formatRelativeTime(quiz.completedAt)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <Badge 
                                      variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "outline"}
                                      className="text-xs"
                                    >
                                      {quiz.score}%
                                    </Badge>
                                    <p className="text-muted-foreground mt-1">
                                      {quiz.correctAnswers}/{quiz.totalQuestions}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activity Summary */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Activity Summary
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Total Lessons Accessed</p>
                              <p className="font-semibold mt-1">
                                {student.lessons.length}
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Completion Rate</p>
                              <p className="font-semibold mt-1">
                                {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Best Quiz Score</p>
                              <p className="font-semibold mt-1">
                                {student.quizzes.length > 0 ? Math.max(...student.quizzes.map(q => q.score)) : 0}%
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <p className="text-muted-foreground">Member Since</p>
                              <p className="font-semibold mt-1">
                                {new Date(student.stats.lastActiveDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6 mt-6">
          {/* Training Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Teacher Training Program
                  </CardTitle>
                  <CardDescription>
                    Complete training modules to enhance your teaching effectiveness
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{trainingProgress}%</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={trainingProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {completedTraining} of {TRAINING_MODULES.length} modules completed
              </p>
            </CardContent>
          </Card>

          {/* XP & Level Card */}
          <Card className="shadow-soft bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Your Progress
                  </CardTitle>
                  <CardDescription>
                    Complete modules to earn XP and unlock achievements
                  </CardDescription>
                </div>
                <Badge variant="default" className="text-lg px-4 py-2">
                  Level {teacherLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Total XP</span>
                  <span className="text-2xl font-bold text-primary">{totalXP}</span>
                </div>
                <Progress value={(totalXP % 500) / 5} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {500 - (totalXP % 500)} XP to Level {teacherLevel + 1}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold">{completedTraining}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{unlockedAchievements.length}</p>
                  <p className="text-xs text-muted-foreground">Achievements</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{trainingProgress}%</p>
                  <p className="text-xs text-muted-foreground">Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          {unlockedAchievements.length > 0 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements Unlocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {ACHIEVEMENTS.filter(a => unlockedAchievements.includes(a.id)).map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-3 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            +{achievement.xp} XP
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Training Modules */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Training Modules</CardTitle>
              <CardDescription>
                Complete modules sequentially. Pass assessments to unlock certificates and earn XP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TRAINING_MODULES.map((module) => {
                  const progress = moduleProgress[module.id];
                  const isCompleted = progress?.completed;
                  const isUnlocked = isModuleUnlocked(module.id);
                  const assessmentScore = assessmentScores[module.id];

                  const getLevelColor = (level: string) => {
                    switch(level) {
                      case "beginner": return "bg-green-500/10 text-green-600";
                      case "intermediate": return "bg-yellow-500/10 text-yellow-600";
                      case "advanced": return "bg-red-500/10 text-red-600";
                      default: return "bg-gray-500/10 text-gray-600";
                    }
                  };

                  const getTypeIcon = () => {
                    switch(module.type) {
                      case "video": return <Video className="w-5 h-5 text-purple-500" />;
                      case "article": return <FileText className="w-5 h-5 text-blue-500" />;
                      case "interactive": return <Brain className="w-5 h-5 text-green-500" />;
                    }
                  };

                  return (
                    <div
                      key={module.id}
                      className={`p-5 border rounded-lg transition-all ${
                        isCompleted
                          ? "bg-primary/5 border-primary/30 shadow-sm"
                          : isUnlocked
                          ? "bg-card border-border hover:border-primary/40 hover:shadow-md"
                          : "bg-muted/30 border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`mt-1 p-3 rounded-lg ${
                          module.type === "video" ? "bg-purple-500/10" :
                          module.type === "article" ? "bg-blue-500/10" :
                          "bg-green-500/10"
                        }`}>
                          {getTypeIcon()}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {!isUnlocked && <Lock className="w-4 h-4 inline mr-2" />}
                                  {module.title}
                                </h3>
                                {isCompleted && (
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {module.description}
                              </p>
                              
                              {/* Meta info */}
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className={`text-xs ${getLevelColor(module.level)}`}>
                                  <Shield className="w-3 h-3 mr-1" />
                                  {module.level.charAt(0).toUpperCase() + module.level.slice(1)}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {module.duration}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  {module.xp} XP
                                </Badge>
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {module.type}
                                </Badge>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              {isCompleted ? (
                                <>
                                  <Badge className="whitespace-nowrap">
                                    Score: {assessmentScore}%
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => downloadCertificate(module.id)}
                                    className="whitespace-nowrap"
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Certificate
                                  </Button>
                                </>
                              ) : isUnlocked ? (
                                <Button
                                  size="sm"
                                  onClick={() => startAssessment(module.id)}
                                >
                                  <PlayCircle className="w-4 h-4 mr-1" />
                                  Take Assessment
                                </Button>
                              ) : (
                                <Button size="sm" disabled>
                                  <Lock className="w-4 h-4 mr-1" />
                                  Locked
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Resources */}
                          {isUnlocked && module.resources.length > 0 && (
                            <div className="pt-3 border-t space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Resources
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {module.resources.map((resource, idx) => (
                                  <Button
                                    key={idx}
                                    size="sm"
                                    variant="ghost"
                                    className="text-xs h-7"
                                    onClick={() => downloadResource(resource)}
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    {resource}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Assessment info */}
                          {isUnlocked && !isCompleted && (
                            <div className="pt-3 border-t">
                              <p className="text-xs text-muted-foreground">
                                <Lightbulb className="w-3 h-3 inline mr-1" />
                                Assessment: {module.assessment.questions} questions • 
                                Pass with {module.assessment.passingScore}% or higher
                              </p>
                            </div>
                          )}

                          {/* Completion info */}
                          {isCompleted && progress.completedAt && (
                            <div className="pt-3 border-t">
                              <p className="text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Completed on {new Date(progress.completedAt).toLocaleDateString()} at{" "}
                                {new Date(progress.completedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Dialog */}
          <Dialog open={showAssessment} onOpenChange={(open) => {
            setShowAssessment(open);
            if (!open) {
              setActiveModuleId(null);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setQuizSubmitted(false);
            }
          }}>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Module Assessment
                </DialogTitle>
                <DialogDescription>
                  {activeModuleId && TRAINING_MODULES.find(m => m.id === activeModuleId)?.title}
                </DialogDescription>
              </DialogHeader>

              {activeModuleId && !quizSubmitted && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Question {currentQuestionIndex + 1} of {MODULE_QUESTIONS[activeModuleId].length}</span>
                      <span>{Object.keys(selectedAnswers).length} answered</span>
                    </div>
                    <Progress 
                      value={((currentQuestionIndex + 1) / MODULE_QUESTIONS[activeModuleId].length) * 100} 
                    />
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {MODULE_QUESTIONS[activeModuleId][currentQuestionIndex].question}
                    </h3>

                    <RadioGroup
                      value={selectedAnswers[currentQuestionIndex]?.toString()}
                      onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, parseInt(value))}
                    >
                      {MODULE_QUESTIONS[activeModuleId][currentQuestionIndex].options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                          <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentQuestionIndex < MODULE_QUESTIONS[activeModuleId].length - 1 ? (
                      <Button onClick={handleNextQuestion}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < MODULE_QUESTIONS[activeModuleId].length}
                        className="bg-primary"
                      >
                        Submit Assessment
                      </Button>
                    )}
                  </div>

                  {Object.keys(selectedAnswers).length < MODULE_QUESTIONS[activeModuleId].length && 
                   currentQuestionIndex === MODULE_QUESTIONS[activeModuleId].length - 1 && (
                    <p className="text-sm text-amber-600 text-center">
                      Please answer all questions before submitting
                    </p>
                  )}
                </div>
              )}

              {quizSubmitted && activeModuleId && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Assessment Submitted!</h3>
                  <p className="text-muted-foreground">Calculating your results...</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Certification */}
          {trainingProgress === 100 && (
            <Card className="shadow-elegant bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      🎉 Congratulations! Training Complete!
                    </h3>
                    <p className="text-muted-foreground">
                      You've completed all training modules and are now a certified
                      FlowHive educator!
                    </p>
                  </div>
                  <Badge className="text-sm px-4 py-2">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Certified FlowHive Educator
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
