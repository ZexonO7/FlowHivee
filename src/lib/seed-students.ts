// Seed sample student data for testing
export const seedSampleStudents = () => {
  const students = [
    {
      id: "emma_wilson",
      name: "Emma Wilson",
      stats: {
        totalXP: 850,
        level: 5,
        dayStreak: 7,
        lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        badges: ["first_lesson", "quiz_master"],
      },
      lessons: [
        {
          lessonId: 1,
          title: "Introduction to Algebra",
          subject: "Mathematics",
          currentSection: 5,
          totalSections: 5,
          completed: true,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          xpEarned: 50,
        },
        {
          lessonId: 2,
          title: "Variables and Constants",
          subject: "Mathematics",
          currentSection: 3,
          totalSections: 5,
          completed: false,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          xpEarned: 30,
        },
      ],
      quizzes: [
        {
          quizId: 1,
          title: "Algebra Basics Quiz",
          score: 85,
          totalQuestions: 10,
          correctAnswers: 9,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          xpEarned: 100,
        },
        {
          quizId: 2,
          title: "Variables Quiz",
          score: 92,
          totalQuestions: 10,
          correctAnswers: 9,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          xpEarned: 100,
        },
      ],
    },
    {
      id: "liam_chen",
      name: "Liam Chen",
      stats: {
        totalXP: 1250,
        level: 7,
        dayStreak: 12,
        lastActiveDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        badges: ["first_lesson", "quiz_master", "week_streak"],
      },
      lessons: [
        {
          lessonId: 1,
          title: "Introduction to Algebra",
          subject: "Mathematics",
          currentSection: 5,
          totalSections: 5,
          completed: true,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
          xpEarned: 50,
        },
        {
          lessonId: 2,
          title: "Variables and Constants",
          subject: "Mathematics",
          currentSection: 5,
          totalSections: 5,
          completed: true,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          xpEarned: 50,
        },
        {
          lessonId: 3,
          title: "Ancient Rome Overview",
          subject: "History",
          currentSection: 4,
          totalSections: 5,
          completed: false,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
          xpEarned: 40,
        },
      ],
      quizzes: [
        {
          quizId: 1,
          title: "Algebra Basics Quiz",
          score: 95,
          totalQuestions: 10,
          correctAnswers: 10,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          xpEarned: 100,
        },
        {
          quizId: 2,
          title: "Variables Quiz",
          score: 88,
          totalQuestions: 10,
          correctAnswers: 9,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          xpEarned: 100,
        },
        {
          quizId: 3,
          title: "History Quiz",
          score: 78,
          totalQuestions: 10,
          correctAnswers: 8,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          xpEarned: 100,
        },
      ],
    },
    {
      id: "sophia_patel",
      name: "Sophia Patel",
      stats: {
        totalXP: 420,
        level: 3,
        dayStreak: 3,
        lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        badges: ["first_lesson"],
      },
      lessons: [
        {
          lessonId: 1,
          title: "Introduction to Algebra",
          subject: "Mathematics",
          currentSection: 2,
          totalSections: 5,
          completed: false,
          lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
          xpEarned: 20,
        },
      ],
      quizzes: [
        {
          quizId: 1,
          title: "Algebra Basics Quiz",
          score: 65,
          totalQuestions: 10,
          correctAnswers: 7,
          completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          xpEarned: 100,
        },
      ],
    },
  ];

  students.forEach((student) => {
    // Store lessons
    localStorage.setItem(
      `${student.id}_flowhivee_lessons`,
      JSON.stringify(student.lessons)
    );

    // Store quizzes
    localStorage.setItem(
      `${student.id}_flowhivee_quizzes`,
      JSON.stringify(student.quizzes)
    );

    // Store stats
    localStorage.setItem(
      `${student.id}_flowhivee_stats`,
      JSON.stringify(student.stats)
    );

    // Store settings
    localStorage.setItem(
      `${student.id}_user_settings`,
      JSON.stringify({
        name: student.name,
        email: `${student.id}@school.edu`,
        initials: student.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
        notifications: {
          email: true,
          push: true,
          weeklyReport: true,
        },
        privacy: {
          showProfile: true,
          shareProgress: true,
        },
        language: "en",
        completedStartScreen: true,
      })
    );
  });

  console.log("✅ Sample student data seeded successfully!");
  return students.length;
};
