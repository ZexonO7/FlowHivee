// Admin utilities for system-wide analytics and monitoring
import { getAllStudentsData, getTeacherStats } from './teacher-storage';

export interface TeacherData {
  name: string;
  authenticatedAt: string;
  trainingProgress: number;
  totalXP: number;
  level: number;
  completedModules: number;
  lastActive: string;
}

export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  totalLessons: number;
  totalQuizzes: number;
  avgStudentScore: number;
  avgStudentLevel: number;
  activeToday: number;
  activeThisWeek: number;
  totalXPEarned: number;
  completionRate: number;
}

// Get all teachers who have logged in
export const getAllTeachers = (): TeacherData[] => {
  const teachers: TeacherData[] = [];
  
  // Scan for teacher training data
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('teacher_') && key.endsWith('_profile')) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const teacher = JSON.parse(data);
          teachers.push(teacher);
        }
      } catch (e) {
        console.error('Error parsing teacher data:', e);
      }
    }
  }
  
  // Also check for teacher training progress
  const trainingProgress = localStorage.getItem('teacher_training_progress');
  const trainingXP = localStorage.getItem('teacher_training_xp');
  
  if (trainingProgress || trainingXP) {
    const progress = trainingProgress ? JSON.parse(trainingProgress) : {};
    const xp = trainingXP ? parseInt(trainingXP) : 0;
    const completedModules = Object.keys(progress).filter(id => progress[id]?.completed).length;
    const level = Math.floor(xp / 500) + 1;
    
    // Add current teacher if not already in list
    if (!teachers.find(t => t.name === sessionStorage.getItem('teacher_name'))) {
      teachers.push({
        name: sessionStorage.getItem('teacher_name') || 'Current Teacher',
        authenticatedAt: new Date().toISOString(),
        trainingProgress: Math.round((completedModules / 10) * 100),
        totalXP: xp,
        level,
        completedModules,
        lastActive: new Date().toISOString(),
      });
    }
  }
  
  return teachers;
};

// Get comprehensive system statistics
export const getSystemStats = (): SystemStats => {
  const students = getAllStudentsData();
  const teachers = getAllTeachers();
  
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  
  const totalLessons = students.reduce((sum, s) => sum + s.lessons.length, 0);
  const completedLessons = students.reduce((sum, s) => 
    sum + s.lessons.filter(l => l.completed).length, 0
  );
  const totalQuizzes = students.reduce((sum, s) => sum + s.quizzes.length, 0);
  
  const allScores = students.flatMap(s => s.quizzes.map(q => q.score));
  const avgStudentScore = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;
  
  const avgStudentLevel = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.stats.level, 0) / students.length)
    : 0;
  
  const totalXPEarned = students.reduce((sum, s) => sum + s.stats.totalXP, 0);
  
  const completionRate = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  
  // Calculate active users
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const activeToday = students.filter(s => 
    new Date(s.lastActive) > oneDayAgo
  ).length;
  
  const activeThisWeek = students.filter(s => 
    new Date(s.lastActive) > oneWeekAgo
  ).length;
  
  return {
    totalStudents,
    totalTeachers,
    totalLessons,
    totalQuizzes,
    avgStudentScore,
    avgStudentLevel,
    activeToday,
    activeThisWeek,
    totalXPEarned,
    completionRate,
  };
};

// Get engagement data for charts (last 7 days)
export const getEngagementData = () => {
  const students = getAllStudentsData();
  const data = [];
  const now = new Date();
  
  // Get last 7 days of activity
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const dayActivity = students.reduce((sum, student) => {
      const lessonsOnDay = student.lessons.filter(l => {
        const lessonDate = new Date(l.lastAccessed);
        return lessonDate >= date && lessonDate < nextDay;
      }).length;
      
      const quizzesOnDay = student.quizzes.filter(q => {
        const quizDate = new Date(q.completedAt);
        return quizDate >= date && quizDate < nextDay;
      }).length;
      
      return sum + lessonsOnDay + quizzesOnDay;
    }, 0);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    data.push({
      day: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : dayNames[date.getDay()],
      activities: dayActivity,
    });
  }
  
  return data;
};

// Get subject performance data
export const getSubjectPerformance = () => {
  const students = getAllStudentsData();
  const subjects: Record<string, { total: number; completed: number; avgScore: number; scores: number[] }> = {};
  
  students.forEach(student => {
    student.lessons.forEach(lesson => {
      if (!subjects[lesson.subject]) {
        subjects[lesson.subject] = { total: 0, completed: 0, avgScore: 0, scores: [] };
      }
      subjects[lesson.subject].total++;
      if (lesson.completed) subjects[lesson.subject].completed++;
    });
    
    student.quizzes.forEach(quiz => {
      // Match quiz to subject based on title keywords
      const title = quiz.title.toLowerCase();
      const subject = title.includes('algebra') || title.includes('variable') || title.includes('math') || title.includes('geometry') 
        ? 'Mathematics' 
        : title.includes('history') || title.includes('rome') || title.includes('timeline')
        ? 'History'
        : title.includes('science') || title.includes('water') || title.includes('cycle')
        ? 'Science'
        : title.includes('essay') || title.includes('writing')
        ? 'English'
        : 'Other';
      
      if (!subjects[subject]) {
        subjects[subject] = { total: 0, completed: 0, avgScore: 0, scores: [] };
      }
      subjects[subject].scores.push(quiz.score);
    });
  });
  
  return Object.entries(subjects).map(([name, data]) => {
    const avgScore = data.scores.length > 0
      ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
      : 0;
    
    return {
      subject: name,
      completion: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
      avgScore,
      totalLessons: data.total,
    };
  });
};

// Get top performers
export const getTopPerformers = (limit = 5) => {
  const students = getAllStudentsData();
  
  return students
    .sort((a, b) => b.stats.totalXP - a.stats.totalXP)
    .slice(0, limit)
    .map((student, index) => ({
      rank: index + 1,
      name: student.name,
      xp: student.stats.totalXP,
      level: student.stats.level,
      streak: student.stats.dayStreak,
      avgScore: student.quizzes.length > 0
        ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
        : 0,
    }));
};

// Get at-risk students
export const getAtRiskStudents = () => {
  const students = getAllStudentsData();
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  
  return students
    .filter(student => {
      const inactive = new Date(student.lastActive) < threeDaysAgo;
      const lowScore = student.quizzes.length > 0 &&
        student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length < 70;
      const noProgress = student.lessons.filter(l => l.completed).length < 2;
      
      return inactive || lowScore || noProgress;
    })
    .map(student => ({
      name: student.name,
      reason: new Date(student.lastActive) < threeDaysAgo
        ? 'Inactive for 3+ days'
        : student.quizzes.length > 0 && 
          student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length < 70
        ? 'Low quiz scores'
        : 'Minimal progress',
      lastActive: student.lastActive,
      avgScore: student.quizzes.length > 0
        ? Math.round(student.quizzes.reduce((sum, q) => sum + q.score, 0) / student.quizzes.length)
        : 0,
    }));
};

// Export system data
export const exportSystemData = () => {
  const students = getAllStudentsData();
  const teachers = getAllTeachers();
  const stats = getSystemStats();
  
  return {
    exportDate: new Date().toISOString(),
    systemStats: stats,
    students: students.map(s => ({
      id: s.studentId,
      name: s.name,
      level: s.stats.level,
      xp: s.stats.totalXP,
      streak: s.stats.dayStreak,
      lessonsCompleted: s.lessons.filter(l => l.completed).length,
      quizzesTaken: s.quizzes.length,
      avgScore: s.quizzes.length > 0
        ? Math.round(s.quizzes.reduce((sum, q) => sum + q.score, 0) / s.quizzes.length)
        : 0,
    })),
    teachers,
  };
};
