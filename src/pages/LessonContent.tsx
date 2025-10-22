import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle, Video, FileText, Headphones, Download, Play, Brain, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Whiteboard } from "@/components/Whiteboard";
import { VideoTranscript } from "@/components/VideoTranscript";
import { saveLessonProgress, markLessonComplete, getLessonProgress } from "@/lib/progress-storage";

// Helper function to create default lesson content
const createDefaultLesson = (id: number, title: string, subject: string, duration: string, description: string) => ({
  title,
  subject,
  duration,
  videoUrl: "",
  hasQuiz: true,
  documents: [
    { 
      name: `${title} - Study Guide.pdf`, 
      size: "1.5 MB",
      content: `# ${title}\n\n## Overview\n\n${description}\n\n## Key Concepts\n\n• Understand the fundamental concepts\n• Apply knowledge through practice\n• Master the skills step by step\n\n## Learning Objectives\n\nBy the end of this lesson, you will be able to:\n1. Identify key concepts\n2. Apply what you've learned\n3. Demonstrate understanding through examples\n\n## Study Tips\n\n✓ Review material regularly\n✓ Practice with examples\n✓ Ask questions when needed\n✓ Stay focused and engaged`
    },
  ],
  sections: [
    {
      type: "intro",
      title: `Welcome to ${title}`,
      content: description,
    },
    {
      type: "text",
      title: "Core Concepts",
      content: `In this lesson, we'll explore the key ideas behind ${title}. These concepts are fundamental to understanding ${subject}.`,
    },
    {
      type: "example",
      title: "Practice Example",
      content: "Let's work through an example together to see how these concepts apply in practice.",
    },
    {
      type: "summary",
      title: "Review",
      content: `✓ You've learned the basics of ${title}\n✓ Practice regularly to master these skills\n✓ Ready to test your knowledge? Take the quiz!`,
    },
  ],
});

// Lesson content database
const lessonContent: Record<number, any> = {
  // Montessori Lessons
  1: {
    title: "Letter Recognition",
    subject: "Language Arts",
    duration: "20 min",
    videoUrl: "",
    hasQuiz: true,
    documents: [
      { 
        name: "Alphabet Activity Cards.pdf", 
        size: "1.2 MB",
        content: "# Letter Recognition Activities\n\n## Learning the Alphabet\n\nLearning letters is the first step to reading! Let's explore each letter through fun activities.\n\n### Letter A\n🍎 Apple\n✈️ Airplane\n🐜 Ant\n\n### Letter B\n🐻 Bear\n🎈 Balloon\n🏀 Ball\n\n### Letter C\n🐱 Cat\n🚗 Car\n🍪 Cookie\n\n## Practice Activities\n\n1. **Letter Tracing**: Use your finger to trace letters in sand or on paper\n2. **Sound Games**: Say the letter sound and find objects that start with that sound\n3. **Letter Hunt**: Find letters in books and magazines\n4. **Sensory Letters**: Make letters with playdough or clay\n\n## Tips for Parents\n✓ Make it multi-sensory (touch, see, hear)\n✓ Keep sessions short (10-15 minutes)\n✓ Celebrate every success!\n✓ Practice letter sounds, not just names"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Welcome to Letters!",
        content: "Letters are the building blocks of words! Every letter has a name and a sound. Let's learn them together through fun activities and games.",
      },
      {
        type: "text",
        title: "The Alphabet Song",
        content: "Let's sing the alphabet song together:\n\nA-B-C-D-E-F-G,\nH-I-J-K-L-M-N-O-P,\nQ-R-S, T-U-V,\nW-X, Y and Z,\nNow I know my ABCs,\nNext time won't you sing with me!\n\nSinging helps us remember the order of letters.",
      },
      {
        type: "example",
        title: "Letter A Activities",
        content: "🅰️ Letter A says 'aaa' like in Apple!\n\nLet's practice:\n• Look at the letter A\n• Trace it with your finger\n• Say 'aaa' like an apple\n• Find things that start with A: Apple, Ant, Airplane",
      },
      {
        type: "practice",
        title: "Letter Hunt Game",
        content: "👀 Find these letters around you:\n\n1. Find something that starts with 'A'\n2. Find something that starts with 'B'\n3. Find something that starts with 'C'\n\nPoint to the letter and say its sound!",
        hasWhiteboard: true,
      },
      {
        type: "summary",
        title: "Great Job!",
        content: "✓ You learned letter names and sounds\n✓ You practiced finding letters\n✓ You traced letters\n✓ Keep practicing every day!",
      },
    ],
  },
  
  2: {
    title: "Counting 1-10",
    subject: "Mathematics",
    duration: "15 min",
    videoUrl: "",
    hasQuiz: true,
    documents: [
      { 
        name: "Counting Practice.pdf", 
        size: "900 KB",
        content: "# Counting 1-10\n\n## Numbers with Pictures\n\n**1** - One 🌟\n**2** - Two 👟👟\n**3** - Three 🌸🌸🌸\n**4** - Four 🦋🦋🦋🦋\n**5** - Five ✋\n**6** - Six 🎈🎈🎈🎈🎈🎈\n**7** - Seven 🌈 (colors)\n**8** - Eight 🕷️ (spider legs)\n**9** - Nine ⚾⚾⚾⚾⚾⚾⚾⚾⚾\n**10** - Ten 👆 (fingers)\n\n## Counting Activities\n\n1. **Count Your Toys**: Count your favorite toys\n2. **Count Snacks**: Count crackers or fruit pieces\n3. **Jump and Count**: Jump while counting to 10\n4. **Clap and Count**: Clap your hands while counting\n\n## Practice Problems\n\nCount the objects:\n🍎🍎🍎 = ?\n⭐⭐⭐⭐⭐ = ?\n🚗🚗 = ?"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Let's Count Together!",
        content: "Numbers help us count things! We use numbers every day to count toys, snacks, and so much more. Let's learn to count from 1 to 10!",
      },
      {
        type: "text",
        title: "The Counting Song",
        content: "Let's count together:\n\n1️⃣ One little, 2️⃣ two little, 3️⃣ three little numbers,\n4️⃣ Four little, 5️⃣ five little, 6️⃣ six little numbers,\n7️⃣ Seven little, 8️⃣ eight little, 9️⃣ nine little numbers,\n🔟 Ten little numbers!\n\nCounting is fun when we sing!",
      },
      {
        type: "example",
        title: "Counting with Objects",
        content: "Let's count apples:\n\n🍎 = 1 (one apple)\n🍎🍎 = 2 (two apples)\n🍎🍎🍎 = 3 (three apples)\n\nEach time we add one more, the number gets bigger!",
      },
      {
        type: "practice",
        title: "Count These!",
        content: "How many do you see?\n\n⭐⭐⭐ = ?\n🎈🎈🎈🎈🎈 = ?\n🌸🌸 = ?\n\nPoint and count each one!",
      },
      {
        type: "summary",
        title: "You Can Count!",
        content: "✓ You learned numbers 1-10\n✓ You counted objects\n✓ You sang the counting song\n✓ Practice counting everything you see!",
      },
    ],
  },
  
  3: {
    title: "Pouring Activities",
    subject: "Practical Life",
    duration: "25 min",
    videoUrl: "",
    hasQuiz: false,
    documents: [
      { 
        name: "Practical Life Guide.pdf", 
        size: "1.1 MB",
        content: "# Pouring Activities\n\n## Why Pouring is Important\n\nPouring helps develop:\n• Fine motor skills\n• Hand-eye coordination\n• Concentration\n• Independence\n• Confidence\n\n## Pouring Exercises\n\n### Level 1: Dry Pouring\nStart with easy materials:\n• Rice\n• Beans\n• Small pasta\n• Sand\n\n### Level 2: Water Pouring\nProgress to liquids:\n• Water between two cups\n• Water from pitcher to glass\n• Filling containers\n\n## Step-by-Step Guide\n\n1. Choose your materials\n2. Set up on a tray\n3. Pour slowly and carefully\n4. Watch the material move\n5. Stop when full\n6. Clean up any spills\n\n## Tips for Success\n✓ Start with larger containers\n✓ Use a sponge for spills\n✓ Practice makes perfect\n✓ Go slowly and focus"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Learning to Pour",
        content: "Pouring is an important skill! When we pour carefully, we practice using our hands with control and concentration. Let's learn how to pour like a pro!",
      },
      {
        type: "text",
        title: "Getting Ready",
        content: "Before we start pouring:\n\n1. 🎯 Choose your materials (rice, water, or beans)\n2. 📦 Get two containers (cups, bowls, or pitchers)\n3. 🧽 Have a sponge or towel nearby for spills\n4. 🪑 Sit comfortably at a table\n\nRemember: It's okay if you spill! That's how we learn.",
      },
      {
        type: "example",
        title: "How to Pour",
        content: "Follow these steps:\n\n1. Hold the container with both hands\n2. Lift it slowly and steadily\n3. Tip it gently over the other container\n4. Watch the material pour\n5. Stop when the container is full\n6. Set it down carefully\n\nGo slow and focus on what you're doing!",
      },
      {
        type: "practice",
        title: "Your Turn to Practice!",
        content: "Now it's your turn!\n\nTry pouring:\n• Rice from one cup to another\n• Water from a small pitcher to a glass\n• Beans from a bowl to a container\n\nRemember to go slowly and concentrate. If you spill, just clean it up and try again!",
      },
      {
        type: "summary",
        title: "You're Learning!",
        content: "✓ You learned how to pour carefully\n✓ You practiced concentration\n✓ You developed hand control\n✓ Keep practicing every day!",
      },
    ],
  },
  
  4: {
    title: "Color Matching",
    subject: "Sensorial",
    duration: "20 min",
    videoUrl: "",
    hasQuiz: true,
    documents: [
      { 
        name: "Color Activities.pdf", 
        size: "1.3 MB",
        content: "# Color Matching Activities\n\n## Primary Colors\n\n🔴 **Red** - Like an apple or fire truck\n🔵 **Blue** - Like the sky or ocean\n🟡 **Yellow** - Like the sun or banana\n\n## Secondary Colors\n\n🟠 **Orange** - Red + Yellow\n🟢 **Green** - Blue + Yellow\n🟣 **Purple** - Red + Blue\n\n## Color Activities\n\n### Activity 1: Color Hunt\nFind objects of each color in your home:\n• 3 red things\n• 3 blue things\n• 3 yellow things\n\n### Activity 2: Color Sorting\nSort objects by color:\n• Put all red toys together\n• Put all blue toys together\n• Put all yellow toys together\n\n### Activity 3: Color Mixing\nMix colors with paint or playdough:\n• Red + Yellow = Orange\n• Blue + Yellow = Green\n• Red + Blue = Purple\n\n## Color Words\nPractice saying:\n• \"This is red\"\n• \"I found something blue\"\n• \"That's yellow like the sun\""
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Welcome to Colors!",
        content: "Colors are all around us! They make our world beautiful and help us describe things. Let's explore different colors and learn to match them together!",
      },
      {
        type: "text",
        title: "Primary Colors",
        content: "The three most important colors are called primary colors:\n\n🔴 Red - Like a fire truck or strawberry\n🔵 Blue - Like the ocean or sky\n🟡 Yellow - Like the sun or a banana\n\nAll other colors are made by mixing these three colors!",
      },
      {
        type: "example",
        title: "Finding Colors",
        content: "Let's practice finding colors:\n\n👀 Look around you right now.\n\nCan you find:\n• Something RED? (Maybe a toy or clothing)\n• Something BLUE? (Maybe a book or cup)\n• Something YELLOW? (Maybe a pencil or ball)\n\nPoint to each color and say its name!",
      },
      {
        type: "practice",
        title: "Color Matching Game",
        content: "Let's play a matching game!\n\nMatch these colors:\n\n1. Find something RED in your room\n2. Find something BLUE in your room\n3. Find something YELLOW in your room\n4. Find something GREEN in your room\n\nCan you group things by their color?",
        hasWhiteboard: true,
      },
      {
        type: "summary",
        title: "Color Champion!",
        content: "✓ You learned the primary colors\n✓ You found colors around you\n✓ You practiced matching colors\n✓ Keep looking for colors everywhere!",
      },
    ],
  },
  
  // 1st Grade Lessons
  11: {
    title: "Phonics Basics",
    subject: "Reading",
    duration: "30 min",
    videoUrl: "",
    hasQuiz: true,
    documents: [
      { 
        name: "Phonics Workbook.pdf", 
        size: "1.8 MB",
        content: "# Phonics Basics\n\n## Consonant Sounds\n\n**B** - /b/ as in Ball, Bat, Book\n**C** - /k/ as in Cat, Cup, Car\n**D** - /d/ as in Dog, Door, Duck\n**F** - /f/ as in Fish, Fun, Fox\n**G** - /g/ as in Goat, Game, Girl\n**H** - /h/ as in Hat, House, Hand\n**J** - /j/ as in Jump, Jam, Jet\n**K** - /k/ as in Kite, Key, King\n**L** - /l/ as in Lion, Leaf, Lamp\n**M** - /m/ as in Moon, Mouse, Man\n\n## Vowel Sounds\n\n**A** - /a/ as in Apple, Ant\n**E** - /e/ as in Egg, Elephant\n**I** - /i/ as in Igloo, Itch\n**O** - /o/ as in Octopus, Ox\n**U** - /u/ as in Umbrella, Up\n\n## Blending Sounds\n\nPractice blending letters to make words:\n• C + A + T = CAT\n• D + O + G = DOG\n• S + U + N = SUN\n• P + I + G = PIG\n\n## Practice Words\n\nRead these simple words:\n1. bat\n2. cat\n3. rat\n4. mat\n5. hat\n6. dog\n7. log\n8. fog\n9. sun\n10. run"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "Welcome to Phonics!",
        content: "Phonics helps us read! When we know the sounds that letters make, we can blend them together to read words. Let's learn letter sounds together!",
      },
      {
        type: "text",
        title: "Consonant Sounds",
        content: "Consonants are letters that are not vowels. Each consonant makes a special sound:\n\n• B says /b/ like in 'ball'\n• C says /k/ like in 'cat'\n• D says /d/ like in 'dog'\n• F says /f/ like in 'fish'\n• M says /m/ like in 'mom'\n\nLet's practice each sound!",
      },
      {
        type: "text",
        title: "Vowel Sounds",
        content: "Vowels are special letters: A, E, I, O, U\n\n• A says /a/ like in 'apple'\n• E says /e/ like in 'egg'\n• I says /i/ like in 'igloo'\n• O says /o/ like in 'octopus'\n• U says /u/ like in 'umbrella'\n\nEvery word needs at least one vowel!",
      },
      {
        type: "example",
        title: "Blending Sounds",
        content: "Let's blend sounds to make words!\n\nThe word CAT:\n• C says /k/\n• A says /a/\n• T says /t/\n• Blend: /k/ + /a/ + /t/ = CAT!\n\nNow you try with DOG:\n• D says /d/\n• O says /o/\n• G says /g/\n• Blend them together!",
      },
      {
        type: "practice",
        title: "Read These Words",
        content: "Practice reading these words by sounding them out:\n\n1. bat\n2. cat\n3. sun\n4. pig\n5. dog\n6. red\n7. big\n8. run\n\nSound out each letter, then blend them together!",
      },
      {
        type: "summary",
        title: "You're Reading!",
        content: "✓ You learned consonant sounds\n✓ You learned vowel sounds\n✓ You practiced blending\n✓ You read real words!\n\nKeep practicing every day!",
      },
    ],
  },
  
  12: createDefaultLesson(12, "Addition & Subtraction", "Mathematics", "35 min", "Learn basic arithmetic operations"),
  13: createDefaultLesson(13, "My Family & Community", "Social Studies", "25 min", "Understanding families and communities"),
  14: createDefaultLesson(14, "Plants & Animals", "Science", "30 min", "Explore living things"),
  
  // 2nd Grade Lessons
  21: createDefaultLesson(21, "Reading Fluency", "Reading", "35 min", "Build speed and comprehension"),
  22: createDefaultLesson(22, "Place Value", "Mathematics", "40 min", "Understand ones, tens, and hundreds"),
  23: createDefaultLesson(23, "Weather Patterns", "Science", "30 min", "Learn about climate and seasons"),
  24: createDefaultLesson(24, "Community Helpers", "Social Studies", "25 min", "Explore different careers"),
  
  // 3rd Grade Lessons
  31: createDefaultLesson(31, "Multiplication Tables", "Mathematics", "40 min", "Master times tables 1-12"),
  32: createDefaultLesson(32, "Paragraph Writing", "Writing", "35 min", "Learn to structure paragraphs"),
  33: createDefaultLesson(33, "States of Matter", "Science", "30 min", "Solids, liquids, and gases"),
  34: createDefaultLesson(34, "Map Skills", "Social Studies", "30 min", "Reading and using maps"),
  
  // 4th Grade Lessons
  41: createDefaultLesson(41, "Fractions & Decimals", "Mathematics", "45 min", "Understanding parts of a whole"),
  42: createDefaultLesson(42, "Essay Writing", "Writing", "40 min", "Structure and develop essays"),
  43: createDefaultLesson(43, "Ecosystems", "Science", "35 min", "Food chains and habitats"),
  44: createDefaultLesson(44, "US Geography", "Social Studies", "35 min", "Learn states and capitals"),
  
  // 5th Grade Lessons
  51: createDefaultLesson(51, "Volume & Area", "Mathematics", "45 min", "Calculate 3D shapes"),
  52: createDefaultLesson(52, "The Water Cycle", "Science", "40 min", "Earth's water systems"),
  53: createDefaultLesson(53, "American Revolution", "Social Studies", "45 min", "Birth of a nation"),
  54: createDefaultLesson(54, "Persuasive Writing", "Language Arts", "40 min", "Convince your audience"),
  
  // 6th Grade Lessons
  61: createDefaultLesson(61, "Ratios & Proportions", "Mathematics", "50 min", "Understand relationships between quantities"),
  62: createDefaultLesson(62, "Cell Biology", "Science", "45 min", "Building blocks of life"),
  63: createDefaultLesson(63, "Ancient Civilizations", "Social Studies", "50 min", "Rome, Greece, Egypt"),
  64: createDefaultLesson(64, "Literary Analysis", "Language Arts", "45 min", "Themes and symbolism"),
  
  // 7th Grade Lessons
  71: {
    title: "Introduction to Algebra",
    subject: "Pre-Algebra",
    duration: "50 min",
    videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
    hasQuiz: true,
    documents: [
      { 
        name: "Algebra Basics Workbook.pdf", 
        size: "2.4 MB",
        content: "# Algebra Basics Workbook\n\n## Chapter 1: Variables and Expressions\n\nVariables are letters that represent unknown numbers. We use them to solve problems!\n\n### Key Concepts:\n- Variables (x, y, z) represent unknown values\n- Constants are fixed numbers (1, 2, 3, etc.)\n- Expressions combine variables and constants (2x + 5)\n\n### Practice Problems:\n\n1. If x = 3, what is 2x + 4?\n   Answer: 2(3) + 4 = 6 + 4 = 10\n\n2. Solve: x + 7 = 12\n   Answer: x = 12 - 7 = 5\n\n3. What is 3(x - 2) when x = 5?\n   Answer: 3(5 - 2) = 3(3) = 9\n\n## Tips for Success:\n✓ Always isolate the variable\n✓ Do the same operation to both sides\n✓ Check your answer by substituting back\n✓ Practice daily for best results!"
      },
      { 
        name: "Practice Problems.pdf", 
        size: "1.8 MB",
        content: "# Algebra Practice Problems\n\n## Easy Level\n1. x + 5 = 10 → x = ?\n2. 2x = 8 → x = ?\n3. x - 3 = 7 → x = ?\n\n## Medium Level\n4. 3x + 2 = 11 → x = ?\n5. 2(x + 1) = 10 → x = ?\n6. 4x - 3 = 13 → x = ?\n\n## Challenge Level\n7. 5x + 3 = 2x + 12 → x = ?\n8. 3(2x - 1) = 15 → x = ?\n9. x/2 + 4 = 7 → x = ?\n\n## Answer Key\n1. x = 5\n2. x = 4\n3. x = 10\n4. x = 3\n5. x = 4\n6. x = 4\n7. x = 3\n8. x = 3\n9. x = 6"
      },
      { 
        name: "Formula Sheet.pdf", 
        size: "890 KB",
        file: "/lessons/algebra-formula-sheet.pdf",
        content: `# Basic Algebra Formulas\n\n## Essential Algebraic Identities\n\n1. (a + b)² = a² + 2ab + b²\n2. (a - b)² = a² - 2ab + b²\n3. (a + b)(a - b) = a² - b²\n4. (x + a)(x + b) = x² + (a + b)x + ab\n5. (x - a)(x - b) = x² - (a + b)x + ab\n\nThese formulas are essential for solving algebraic equations and simplifying expressions.`
      },
    ],
    sections: [
      {
        type: "intro",
        title: "What is Algebra?",
        content: "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It's like a puzzle where we need to find the missing pieces!",
        videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
      },
      {
        type: "text",
        title: "Variables and Constants",
        content: "In algebra, we use variables (like x, y, z) to represent unknown values. Constants are fixed numbers that don't change. For example, in the equation 2x + 5 = 11, 'x' is the variable, while 2, 5, and 11 are constants.",
        videoUrl: "/video lessons/Variables and Constents.mp4",
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
        hasWhiteboard: true,
      },
      {
        type: "summary",
        title: "Key Takeaways",
        content: "✓ Variables represent unknown values\n✓ We can solve equations by isolating the variable\n✓ What we do to one side, we must do to the other\n✓ Practice makes perfect!",
      },
    ],
  },
  72: createDefaultLesson(72, "Human Body Systems", "Life Science", "45 min", "How our bodies work"),
  73: createDefaultLesson(73, "Medieval History", "World History", "50 min", "The Middle Ages"),
  74: createDefaultLesson(74, "Argumentative Writing", "Language Arts", "45 min", "Build strong arguments"),
  
  // 8th Grade Lessons
  81: createDefaultLesson(81, "Linear Equations", "Algebra I", "55 min", "Graphing and solving"),
  82: createDefaultLesson(82, "Physics Basics", "Physical Science", "50 min", "Forces and motion"),
  83: createDefaultLesson(83, "US Constitution", "US History", "50 min", "Foundation of American government"),
  84: createDefaultLesson(84, "Research Papers", "Language Arts", "55 min", "Academic writing skills"),
  
  // 9th Grade Lessons
  91: createDefaultLesson(91, "Quadratic Equations", "Algebra I", "55 min", "Parabolas and factoring"),
  92: createDefaultLesson(92, "Genetics & DNA", "Biology", "55 min", "Inheritance and traits"),
  93: createDefaultLesson(93, "Shakespeare Introduction", "English I", "50 min", "Romeo and Juliet"),
  94: createDefaultLesson(94, "World Regions", "World Geography", "50 min", "Global cultures and climates"),
  
  // 10th Grade Lessons
  101: createDefaultLesson(101, "Geometry Proofs", "Geometry", "60 min", "Logical reasoning in math"),
  102: createDefaultLesson(102, "Chemical Reactions", "Chemistry", "55 min", "Equations and stoichiometry"),
  103: createDefaultLesson(103, "World Literature", "English II", "50 min", "Global literary perspectives"),
  104: createDefaultLesson(104, "World Wars", "World History", "55 min", "20th century conflicts"),
  
  // 11th Grade Lessons
  111: createDefaultLesson(111, "Trigonometry", "Pre-Calculus", "60 min", "Sine, cosine, and tangent"),
  112: createDefaultLesson(112, "Electricity & Magnetism", "Physics", "60 min", "Electromagnetic forces"),
  113: createDefaultLesson(113, "American Literature", "English III", "55 min", "Great American novels"),
  114: createDefaultLesson(114, "Civil Rights Movement", "US History", "55 min", "Fighting for equality"),
  
  // 12th Grade Lessons
  121: createDefaultLesson(121, "Derivatives", "Calculus", "65 min", "Rate of change"),
  122: createDefaultLesson(122, "Organic Chemistry", "Advanced Sciences", "60 min", "Carbon compounds"),
  123: createDefaultLesson(123, "College Essay Writing", "English IV", "55 min", "Personal statements"),
  124: createDefaultLesson(124, "Economic Systems", "Economics", "55 min", "Capitalism vs socialism"),
  
  // Additional Courses (Original lessons with new IDs)
  200: {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "45 min",
    videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
    hasQuiz: true,
    documents: [
      { 
        name: "Algebra Basics Workbook.pdf", 
        size: "2.4 MB",
        content: "# Algebra Basics Workbook\n\n## Chapter 1: Variables and Expressions\n\nVariables are letters that represent unknown numbers. We use them to solve problems!\n\n### Key Concepts:\n- Variables (x, y, z) represent unknown values\n- Constants are fixed numbers (1, 2, 3, etc.)\n- Expressions combine variables and constants (2x + 5)\n\n### Practice Problems:\n\n1. If x = 3, what is 2x + 4?\n   Answer: 2(3) + 4 = 6 + 4 = 10\n\n2. Solve: x + 7 = 12\n   Answer: x = 12 - 7 = 5\n\n3. What is 3(x - 2) when x = 5?\n   Answer: 3(5 - 2) = 3(3) = 9\n\n## Tips for Success:\n✓ Always isolate the variable\n✓ Do the same operation to both sides\n✓ Check your answer by substituting back\n✓ Practice daily for best results!"
      },
    ],
    sections: [
      {
        type: "intro",
        title: "What is Algebra?",
        content: "Algebra is a branch of mathematics that uses letters and symbols to represent numbers and quantities in formulas and equations. It's like a puzzle where we need to find the missing pieces!",
        videoUrl: "/video lessons/Introduction to Algebra (1 of 2_ What Happens when you don t know a number which you need to find ).mp4",
      },
      {
        type: "text",
        title: "Variables and Constants",
        content: "In algebra, we use variables (like x, y, z) to represent unknown values. Constants are fixed numbers that don't change. For example, in the equation 2x + 5 = 11, 'x' is the variable, while 2, 5, and 11 are constants.",
        videoUrl: "/video lessons/Variables and Constents.mp4",
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
        hasWhiteboard: true,
      },
      {
        type: "summary",
        title: "Key Takeaways",
        content: "✓ Variables represent unknown values\n✓ We can solve equations by isolating the variable\n✓ What we do to one side, we must do to the other\n✓ Practice makes perfect!",
      },
    ],
  },
  201: createDefaultLesson(201, "Creative Writing Basics", "English", "40 min", "Explore narrative structures and storytelling techniques"),
  202: createDefaultLesson(202, "Variables and Constants", "Mathematics", "40 min", "Master the building blocks of algebra"),
  203: createDefaultLesson(203, "Advanced Calculus", "Mathematics", "55 min", "Master integration and differentiation techniques"),
  204: createDefaultLesson(204, "Python Programming", "Computer Science", "60 min", "Start your coding journey with Python basics"),
  205: createDefaultLesson(205, "The Water Cycle", "Science", "30 min", "Understand how water moves through Earth's ecosystems"),
  206: createDefaultLesson(206, "Ancient Civilizations", "History", "50 min", "Journey through the great civilizations of the past"),
};

export default function LessonContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const lessonId = location.state?.lessonId || 1;
  
  console.log('🔍 Requested Lesson ID:', lessonId);
  console.log('📚 Available lesson IDs:', Object.keys(lessonContent));
  console.log('✅ Lesson found?', !!lessonContent[lessonId]);
  
  const lesson = lessonContent[lessonId];
  
  if (!lesson) {
    console.error('❌ Lesson not found! Defaulting to lesson 1');
    toast({
      title: "Lesson Not Available",
      description: `Lesson #${lessonId} is not yet available. Loading Introduction to Algebra instead.`,
      variant: "destructive",
    });
  }
  
  const finalLesson = lesson || lessonContent[1];
  const [currentSection, setCurrentSection] = useState(0);
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const totalSections = finalLesson.sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  // Load saved progress
  useEffect(() => {
    const saved = getLessonProgress(lessonId);
    if (saved && !saved.completed) {
      setCurrentSection(saved.currentSection);
    } else {
      setCurrentSection(0);
    }
  }, [lessonId]);

  // Save progress on section change
  useEffect(() => {
    saveLessonProgress({
      lessonId,
      title: finalLesson.title,
      subject: finalLesson.subject,
      completed: currentSection === totalSections - 1,
      currentSection,
      totalSections,
      lastAccessed: new Date().toISOString(),
    });
  }, [currentSection, lessonId, finalLesson.title, finalLesson.subject, totalSections]);

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete - mark as complete
      markLessonComplete(lessonId, finalLesson.title, finalLesson.subject, totalSections);
      
      if (finalLesson.hasQuiz) {
        toast({
          title: "Lesson Complete! 🎉",
          description: "Ready to test your knowledge? +100 XP earned!",
        });
        setTimeout(() => navigate('/lesson-quiz', { state: { lessonId } }), 1500);
      } else {
        toast({
          title: "Lesson Complete! 🎉",
          description: `You've finished ${finalLesson.title}. +100 XP earned!`,
        });
        setTimeout(() => navigate('/lessons'), 1500);
      }
    }
  };

  const handleDownload = (docName: string) => {
    const doc = finalLesson.documents.find((d: any) => d.name === docName);
    
    if (doc?.file) {
      // Download actual PDF file
      const link = document.createElement('a');
      link.href = doc.file;
      link.download = docName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `${docName} is being downloaded`,
      });
    } else if (doc?.content) {
      // Create text file from content
      const blob = new Blob([doc.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = docName.replace('.pdf', '.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `${docName} is being downloaded as text`,
      });
    }
  };

  const handleViewDocument = (doc: any) => {
    setViewingDocument(doc);
  };

  const handlePlayVideo = () => {
    if (!finalLesson.videoUrl) {
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

  const section = finalLesson.sections[currentSection];
  
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
    <>
      <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              {viewingDocument?.name}
            </DialogTitle>
            <DialogDescription>{viewingDocument?.size}</DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none mt-4">
            <pre className="whitespace-pre-wrap text-foreground bg-muted/30 p-6 rounded-lg leading-relaxed">
              {viewingDocument?.content}
            </pre>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDownload(viewingDocument?.name)}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="warm"
              className="flex-1"
              onClick={() => setViewingDocument(null)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
        {/* Header */}
      <div>
        <Button variant="ghost" onClick={() => navigate("/lessons")} className="mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Lessons
        </Button>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{finalLesson.title}</h1>
          <Badge variant="secondary">{finalLesson.subject}</Badge>
        </div>
        <p className="text-muted-foreground">
          Section {currentSection + 1} of {totalSections} • {finalLesson.duration}
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
      {((section as any).videoUrl || (currentSection === 0 && finalLesson.videoUrl)) && (
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
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video key={`${lessonId}-${currentSection}`} controls className="w-full h-full">
                <source src={(section as any).videoUrl || finalLesson.videoUrl} type="video/mp4" />
              </video>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Transcript */}
      {((section as any).videoUrl || (currentSection === 0 && finalLesson.videoUrl)) && (
        <VideoTranscript videoUrl={(section as any).videoUrl || finalLesson.videoUrl} />
      )}

      {/* Downloadable Documents */}
      {finalLesson.documents && finalLesson.documents.length > 0 && (
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
              {finalLesson.documents.map((doc: any, index: number) => (
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
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

      {/* Whiteboard for Practice Sections */}
      {(section as any).hasWhiteboard && (
        <Whiteboard height={400} />
      )}

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
            {finalLesson.sections.map((sec: any, index: number) => (
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
    </>
  );
}
