// Teacher utilities for viewing all students' progress
import { getUserSettings } from './settings-storage';
import type { LessonProgress, QuizResult, UserStats } from './progress-storage';

export interface StudentData {
  studentId: string;
  name: string;
  stats: UserStats;
  lessons: LessonProgress[];
  quizzes: QuizResult[];
  lastActive: string;
}

// Get all student IDs from localStorage
export const getAllStudentIds = (): string[] => {
  const studentIds = new Set<string>();
  
  // Scan localStorage for student-specific keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      // Extract student ID from keys like "student1_flowhivee_lessons"
      const match = key.match(/^(.+?)_flowhivee_(lessons|quizzes|stats)$/);
      if (match) {
        studentIds.add(match[1]);
      }
      
      // Also check for settings keys
      const settingsMatch = key.match(/^(.+?)_user_settings$/);
      if (settingsMatch) {
        studentIds.add(settingsMatch[1]);
      }
    }
  }
  
  return Array.from(studentIds);
};

// Get student name from their settings
const getStudentName = (studentId: string): string => {
  const settingsKey = `${studentId}_user_settings`;
  const data = localStorage.getItem(settingsKey);
  if (data) {
    try {
      const settings = JSON.parse(data);
      return settings.name || studentId;
    } catch {
      return studentId;
    }
  }
  return studentId;
};

// Load specific student's data
export const getStudentData = (studentId: string): StudentData => {
  const lessonsKey = `${studentId}_flowhivee_lessons`;
  const quizzesKey = `${studentId}_flowhivee_quizzes`;
  const statsKey = `${studentId}_flowhivee_stats`;
  
  const lessonsData = localStorage.getItem(lessonsKey);
  const quizzesData = localStorage.getItem(quizzesKey);
  const statsData = localStorage.getItem(statsKey);
  
  const lessons: LessonProgress[] = lessonsData ? JSON.parse(lessonsData) : [];
  const quizzes: QuizResult[] = quizzesData ? JSON.parse(quizzesData) : [];
  const stats: UserStats = statsData ? JSON.parse(statsData) : {
    totalXP: 0,
    level: 1,
    dayStreak: 0,
    lastActiveDate: new Date().toISOString(),
    badges: [],
  };
  
  // Find most recent activity
  const allDates = [
    ...lessons.map(l => l.lastAccessed),
    ...quizzes.map(q => q.completedAt),
    stats.lastActiveDate
  ].filter(Boolean).map(d => new Date(d).getTime());
  
  const lastActive = allDates.length > 0 
    ? new Date(Math.max(...allDates)).toISOString()
    : new Date().toISOString();
  
  return {
    studentId,
    name: getStudentName(studentId),
    stats,
    lessons,
    quizzes,
    lastActive,
  };
};

// Get all students data
export const getAllStudentsData = (): StudentData[] => {
  const studentIds = getAllStudentIds();
  return studentIds.map(id => getStudentData(id));
};

// Calculate aggregated stats
export const getTeacherStats = () => {
  const students = getAllStudentsData();
  
  const totalStudents = students.length;
  const totalLessonsCompleted = students.reduce((sum, s) => 
    sum + s.lessons.filter(l => l.completed).length, 0
  );
  const totalQuizzesTaken = students.reduce((sum, s) => sum + s.quizzes.length, 0);
  
  // Calculate average quiz score
  const allScores = students.flatMap(s => s.quizzes.map(q => q.score));
  const avgScore = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;
  
  return {
    totalStudents,
    totalLessonsCompleted,
    totalQuizzesTaken,
    avgScore,
  };
};

// Format relative time
export const formatRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};
