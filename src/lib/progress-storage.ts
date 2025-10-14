// Local storage utilities for tracking user progress

export interface LessonProgress {
  lessonId: number;
  title: string;
  subject: string;
  completed: boolean;
  currentSection: number;
  totalSections: number;
  lastAccessed: string;
}

export interface QuizResult {
  quizId: number;
  lessonId: number;
  title: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
}

export interface UserStats {
  totalXP: number;
  level: number;
  dayStreak: number;
  lastActiveDate: string;
  badges: string[];
}

const STORAGE_KEYS = {
  LESSONS: 'flowhivee_lessons',
  QUIZZES: 'flowhivee_quizzes',
  STATS: 'flowhivee_stats',
};

// Lesson Progress Functions
export const getLessonProgress = (lessonId: number): LessonProgress | null => {
  const lessons = getAllLessons();
  return lessons.find(l => l.lessonId === lessonId) || null;
};

export const getAllLessons = (): LessonProgress[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LESSONS);
  return data ? JSON.parse(data) : [];
};

export const saveLessonProgress = (progress: LessonProgress): void => {
  const lessons = getAllLessons();
  const index = lessons.findIndex(l => l.lessonId === progress.lessonId);
  
  if (index >= 0) {
    lessons[index] = { ...progress, lastAccessed: new Date().toISOString() };
  } else {
    lessons.push({ ...progress, lastAccessed: new Date().toISOString() });
  }
  
  localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  updateDayStreak();
};

export const markLessonComplete = (lessonId: number, title: string, subject: string, totalSections: number): void => {
  const progress: LessonProgress = {
    lessonId,
    title,
    subject,
    completed: true,
    currentSection: totalSections,
    totalSections,
    lastAccessed: new Date().toISOString(),
  };
  saveLessonProgress(progress);
  
  // Award XP for completion
  const stats = getUserStats();
  addXP(100);
};

// Quiz Functions
export const getAllQuizResults = (): QuizResult[] => {
  const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  return data ? JSON.parse(data) : [];
};

export const getQuizResults = (lessonId: number): QuizResult[] => {
  const quizzes = getAllQuizResults();
  return quizzes.filter(q => q.lessonId === lessonId);
};

export const saveQuizResult = (result: QuizResult): void => {
  const quizzes = getAllQuizResults();
  quizzes.push({ ...result, completedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  
  // Award XP based on score
  const xpEarned = Math.round((result.score / 100) * 150);
  addXP(xpEarned);
  updateDayStreak();
};

// User Stats Functions
export const getUserStats = (): UserStats => {
  const data = localStorage.getItem(STORAGE_KEYS.STATS);
  return data ? JSON.parse(data) : {
    totalXP: 0,
    level: 1,
    dayStreak: 0,
    lastActiveDate: new Date().toISOString(),
    badges: [],
  };
};

export const addXP = (amount: number): void => {
  const stats = getUserStats();
  stats.totalXP += amount;
  
  // Calculate level (500 XP per level)
  stats.level = Math.floor(stats.totalXP / 500) + 1;
  
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};

export const updateDayStreak = (): void => {
  const stats = getUserStats();
  const today = new Date().toDateString();
  const lastActive = new Date(stats.lastActiveDate).toDateString();
  
  if (today !== lastActive) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActive === yesterdayStr) {
      // Consecutive day
      stats.dayStreak += 1;
    } else if (lastActive !== today) {
      // Streak broken
      stats.dayStreak = 1;
    }
    
    stats.lastActiveDate = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }
};

export const addBadge = (badgeId: string): void => {
  const stats = getUserStats();
  if (!stats.badges.includes(badgeId)) {
    stats.badges.push(badgeId);
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }
};

// Analytics Functions
export const getSubjectProgress = () => {
  const lessons = getAllLessons();
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
  
  return subjects.map(subject => {
    const subjectLessons = lessons.filter(l => l.subject === subject);
    const completed = subjectLessons.filter(l => l.completed).length;
    const total = subjectLessons.length || 1; // Prevent division by zero
    
    return {
      subject,
      completed,
      total,
      progress: Math.round((completed / total) * 100),
    };
  });
};

export const getRecentActivity = () => {
  const lessons = getAllLessons();
  const quizzes = getAllQuizResults();
  
  const activities = [
    ...lessons.map(l => ({
      date: new Date(l.lastAccessed),
      activity: `${l.completed ? 'Completed' : 'Accessed'} "${l.title}" lesson`,
      xp: l.completed ? 100 : 0,
    })),
    ...quizzes.map(q => ({
      date: new Date(q.completedAt),
      activity: `Completed "${q.title}" quiz - ${q.score}%`,
      xp: Math.round((q.score / 100) * 150),
    })),
  ];
  
  return activities
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)
    .map(a => ({
      ...a,
      date: formatRelativeDate(a.date),
    }));
};

const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};
