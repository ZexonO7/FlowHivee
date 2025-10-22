export const curriculumData: Record<string, any> = {
  montessori: {
    name: "Montessori",
    subjects: ["Language Arts", "Mathematics", "Practical Life", "Sensorial", "Cultural Studies"],
    lessons: [
      { id: 1, title: "Letter Recognition", subject: "Language Arts", duration: "20 min", description: "Learn the alphabet through multi-sensory activities" },
      { id: 2, title: "Counting 1-10", subject: "Mathematics", duration: "15 min", description: "Hands-on counting with manipulatives" },
      { id: 3, title: "Pouring Activities", subject: "Practical Life", duration: "25 min", description: "Develop fine motor skills and concentration" },
      { id: 4, title: "Color Matching", subject: "Sensorial", duration: "20 min", description: "Explore colors and visual discrimination" },
    ],
    quizzes: [
      { id: 1, title: "Letter Sounds Quiz", subject: "Language Arts", questions: 10 },
      { id: 2, title: "Number Recognition", subject: "Mathematics", questions: 8 },
    ],
  },
  "1st": {
    name: "1st Grade",
    subjects: ["Reading", "Writing", "Mathematics", "Science", "Social Studies"],
    lessons: [
      { id: 11, title: "Phonics Basics", subject: "Reading", duration: "30 min", description: "Master consonants and vowel sounds" },
      { id: 12, title: "Addition & Subtraction", subject: "Mathematics", duration: "35 min", description: "Learn basic arithmetic operations" },
      { id: 13, title: "My Family & Community", subject: "Social Studies", duration: "25 min", description: "Understanding families and communities" },
      { id: 14, title: "Plants & Animals", subject: "Science", duration: "30 min", description: "Explore living things" },
    ],
    quizzes: [
      { id: 11, title: "Reading Comprehension", subject: "Reading", questions: 10 },
      { id: 12, title: "Basic Math Facts", subject: "Mathematics", questions: 15 },
    ],
  },
  "2nd": {
    name: "2nd Grade",
    subjects: ["Reading", "Writing", "Mathematics", "Science", "Social Studies"],
    lessons: [
      { id: 21, title: "Reading Fluency", subject: "Reading", duration: "35 min", description: "Build speed and comprehension" },
      { id: 22, title: "Place Value", subject: "Mathematics", duration: "40 min", description: "Understand ones, tens, and hundreds" },
      { id: 23, title: "Weather Patterns", subject: "Science", duration: "30 min", description: "Learn about climate and seasons" },
      { id: 24, title: "Community Helpers", subject: "Social Studies", duration: "25 min", description: "Explore different careers" },
    ],
    quizzes: [
      { id: 21, title: "Story Elements Quiz", subject: "Reading", questions: 12 },
      { id: 22, title: "Two-Digit Addition", subject: "Mathematics", questions: 15 },
    ],
  },
  "3rd": {
    name: "3rd Grade",
    subjects: ["Reading", "Writing", "Mathematics", "Science", "Social Studies"],
    lessons: [
      { id: 31, title: "Multiplication Tables", subject: "Mathematics", duration: "40 min", description: "Master times tables 1-12" },
      { id: 32, title: "Paragraph Writing", subject: "Writing", duration: "35 min", description: "Learn to structure paragraphs" },
      { id: 33, title: "States of Matter", subject: "Science", duration: "30 min", description: "Solids, liquids, and gases" },
      { id: 34, title: "Map Skills", subject: "Social Studies", duration: "30 min", description: "Reading and using maps" },
    ],
    quizzes: [
      { id: 31, title: "Multiplication Facts", subject: "Mathematics", questions: 20 },
      { id: 32, title: "Reading Inference", subject: "Reading", questions: 12 },
    ],
  },
  "4th": {
    name: "4th Grade",
    subjects: ["Reading", "Writing", "Mathematics", "Science", "Social Studies"],
    lessons: [
      { id: 41, title: "Fractions & Decimals", subject: "Mathematics", duration: "45 min", description: "Understanding parts of a whole" },
      { id: 42, title: "Essay Writing", subject: "Writing", duration: "40 min", description: "Structure and develop essays" },
      { id: 43, title: "Ecosystems", subject: "Science", duration: "35 min", description: "Food chains and habitats" },
      { id: 44, title: "US Geography", subject: "Social Studies", duration: "35 min", description: "Learn states and capitals" },
    ],
    quizzes: [
      { id: 41, title: "Fraction Operations", subject: "Mathematics", questions: 15 },
      { id: 42, title: "Literary Analysis", subject: "Reading", questions: 10 },
    ],
  },
  "5th": {
    name: "5th Grade",
    subjects: ["Language Arts", "Mathematics", "Science", "Social Studies"],
    lessons: [
      { id: 51, title: "Volume & Area", subject: "Mathematics", duration: "45 min", description: "Calculate 3D shapes" },
      { id: 52, title: "The Water Cycle", subject: "Science", duration: "40 min", description: "Earth's water systems" },
      { id: 53, title: "American Revolution", subject: "Social Studies", duration: "45 min", description: "Birth of a nation" },
      { id: 54, title: "Persuasive Writing", subject: "Language Arts", duration: "40 min", description: "Convince your audience" },
    ],
    quizzes: [
      { id: 51, title: "Geometry Challenge", subject: "Mathematics", questions: 18 },
      { id: 52, title: "Science Concepts", subject: "Science", questions: 15 },
    ],
  },
  "6th": {
    name: "6th Grade",
    subjects: ["Mathematics", "Science", "Language Arts", "Social Studies"],
    lessons: [
      { id: 61, title: "Ratios & Proportions", subject: "Mathematics", duration: "50 min", description: "Understand relationships between quantities" },
      { id: 62, title: "Cell Biology", subject: "Science", duration: "45 min", description: "Building blocks of life" },
      { id: 63, title: "Ancient Civilizations", subject: "Social Studies", duration: "50 min", description: "Rome, Greece, Egypt" },
      { id: 64, title: "Literary Analysis", subject: "Language Arts", duration: "45 min", description: "Themes and symbolism" },
    ],
    quizzes: [
      { id: 61, title: "Pre-Algebra Basics", subject: "Mathematics", questions: 20 },
      { id: 62, title: "Life Science", subject: "Science", questions: 15 },
    ],
  },
  "7th": {
    name: "7th Grade",
    subjects: ["Pre-Algebra", "Life Science", "Language Arts", "World History"],
    lessons: [
      { id: 71, title: "Introduction to Algebra", subject: "Pre-Algebra", duration: "50 min", description: "Variables and expressions" },
      { id: 72, title: "Human Body Systems", subject: "Life Science", duration: "45 min", description: "How our bodies work" },
      { id: 73, title: "Medieval History", subject: "World History", duration: "50 min", description: "The Middle Ages" },
      { id: 74, title: "Argumentative Writing", subject: "Language Arts", duration: "45 min", description: "Build strong arguments" },
    ],
    quizzes: [
      { id: 71, title: "Solving Equations", subject: "Pre-Algebra", questions: 20 },
      { id: 72, title: "Body Systems", subject: "Life Science", questions: 18 },
    ],
  },
  "8th": {
    name: "8th Grade",
    subjects: ["Algebra I", "Physical Science", "Language Arts", "US History"],
    lessons: [
      { id: 81, title: "Linear Equations", subject: "Algebra I", duration: "55 min", description: "Graphing and solving" },
      { id: 82, title: "Physics Basics", subject: "Physical Science", duration: "50 min", description: "Forces and motion" },
      { id: 83, title: "US Constitution", subject: "US History", duration: "50 min", description: "Foundation of American government" },
      { id: 84, title: "Research Papers", subject: "Language Arts", duration: "55 min", description: "Academic writing skills" },
    ],
    quizzes: [
      { id: 81, title: "Algebra Equations", subject: "Algebra I", questions: 25 },
      { id: 82, title: "Physics Concepts", subject: "Physical Science", questions: 20 },
    ],
  },
  "9th": {
    name: "9th Grade",
    subjects: ["Algebra I/Geometry", "Biology", "English I", "World Geography"],
    lessons: [
      { id: 91, title: "Quadratic Equations", subject: "Algebra I", duration: "55 min", description: "Parabolas and factoring" },
      { id: 92, title: "Genetics & DNA", subject: "Biology", duration: "55 min", description: "Inheritance and traits" },
      { id: 93, title: "Shakespeare Introduction", subject: "English I", duration: "50 min", description: "Romeo and Juliet" },
      { id: 94, title: "World Regions", subject: "World Geography", duration: "50 min", description: "Global cultures and climates" },
    ],
    quizzes: [
      { id: 91, title: "Advanced Algebra", subject: "Algebra I", questions: 25 },
      { id: 92, title: "Biology Fundamentals", subject: "Biology", questions: 20 },
    ],
  },
  "10th": {
    name: "10th Grade",
    subjects: ["Geometry/Algebra II", "Chemistry", "English II", "World History"],
    lessons: [
      { id: 101, title: "Geometry Proofs", subject: "Geometry", duration: "60 min", description: "Logical reasoning in math" },
      { id: 102, title: "Chemical Reactions", subject: "Chemistry", duration: "55 min", description: "Equations and stoichiometry" },
      { id: 103, title: "World Literature", subject: "English II", duration: "50 min", description: "Global literary perspectives" },
      { id: 104, title: "World Wars", subject: "World History", duration: "55 min", description: "20th century conflicts" },
    ],
    quizzes: [
      { id: 101, title: "Geometry Theorems", subject: "Geometry", questions: 20 },
      { id: 102, title: "Chemistry Basics", subject: "Chemistry", questions: 25 },
    ],
  },
  "11th": {
    name: "11th Grade",
    subjects: ["Algebra II/Pre-Calculus", "Physics", "English III", "US History"],
    lessons: [
      { id: 111, title: "Trigonometry", subject: "Pre-Calculus", duration: "60 min", description: "Sine, cosine, and tangent" },
      { id: 112, title: "Electricity & Magnetism", subject: "Physics", duration: "60 min", description: "Electromagnetic forces" },
      { id: 113, title: "American Literature", subject: "English III", duration: "55 min", description: "Great American novels" },
      { id: 114, title: "Civil Rights Movement", subject: "US History", duration: "55 min", description: "Fighting for equality" },
    ],
    quizzes: [
      { id: 111, title: "Advanced Functions", subject: "Pre-Calculus", questions: 25 },
      { id: 112, title: "Physics Problems", subject: "Physics", questions: 20 },
    ],
  },
  "12th": {
    name: "12th Grade",
    subjects: ["Calculus", "Advanced Sciences", "English IV", "Government/Economics"],
    lessons: [
      { id: 121, title: "Derivatives", subject: "Calculus", duration: "65 min", description: "Rate of change" },
      { id: 122, title: "Organic Chemistry", subject: "Advanced Sciences", duration: "60 min", description: "Carbon compounds" },
      { id: 123, title: "College Essay Writing", subject: "English IV", duration: "55 min", description: "Personal statements" },
      { id: 124, title: "Economic Systems", subject: "Economics", duration: "55 min", description: "Capitalism vs socialism" },
    ],
    quizzes: [
      { id: 121, title: "Calculus Concepts", subject: "Calculus", questions: 30 },
      { id: 122, title: "AP Prep Test", subject: "Advanced Sciences", questions: 40 },
    ],
  },
  // Additional Courses (All Levels)
  additional: {
    name: "Additional Courses",
    subjects: ["Computer Science", "Mathematics", "English", "History"],
    lessons: [
      { id: 200, title: "Introduction to Algebra", subject: "Mathematics", duration: "45 min", description: "Learn the fundamentals of algebraic expressions and equations" },
      { id: 201, title: "Creative Writing Basics", subject: "English", duration: "40 min", description: "Explore narrative structures and storytelling techniques" },
      { id: 202, title: "Variables and Constants", subject: "Mathematics", duration: "40 min", description: "Master the building blocks of algebra" },
      { id: 203, title: "Advanced Calculus", subject: "Mathematics", duration: "55 min", description: "Master integration and differentiation techniques" },
      { id: 204, title: "Python Programming", subject: "Computer Science", duration: "60 min", description: "Start your coding journey with Python basics" },
      { id: 205, title: "The Water Cycle", subject: "Science", duration: "30 min", description: "Understand how water moves through Earth's ecosystems" },
      { id: 206, title: "Ancient Civilizations", subject: "History", duration: "50 min", description: "Journey through the great civilizations of the past" },
    ],
    quizzes: [],
  },
};
