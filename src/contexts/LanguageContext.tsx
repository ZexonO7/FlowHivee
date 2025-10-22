import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'app_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'FlowHivee',
    'app.tagline': 'Learn Anywhere ✨',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    
    // Navigation
    'nav.home': 'Home',
    'nav.grades': 'Grades',
    'nav.lessons': 'Lessons',
    'nav.notes': 'Notes',
    'nav.quizzes': 'Quizzes',
    'nav.progress': 'Progress',
    'nav.teacher': 'Teacher',
    'nav.analytics': 'Analytics',
    'nav.community': 'Community',
    'nav.settings': 'Settings',
    'nav.more': 'More',
    'nav.menu': 'Menu',
    
    // Home
    'home.welcome': 'Welcome back',
    'home.selectGrade': 'Select Your Grade',
    'home.exploreGrades': 'Explore curriculum for each grade level',
    'home.quickStats': 'Quick Stats',
    'home.totalLessons': 'Total Lessons',
    'home.completedQuizzes': 'Completed Quizzes',
    'home.savedNotes': 'Saved Notes',
    'home.recentActivity': 'Recent Activity',
    'home.continueLearning': 'Continue Learning',
    
    // Grades
    'grades.title': 'Select Your Grade',
    'grades.subtitle': 'Choose your grade to access curriculum',
    'grades.mont': 'Montessori',
    'grades.grade': 'Grade',
    
    // Settings
    'settings.title': '⚙️ Settings',
    'settings.subtitle': 'Customize your FlowHivee experience',
    'settings.profile': 'Profile Settings',
    'settings.profileDesc': 'Manage your personal information',
    'settings.fullName': 'Full Name',
    'settings.studentId': 'Student ID',
    'settings.email': 'Email (Optional)',
    'settings.saveProfile': 'Save Profile',
    'settings.notifications': 'Notifications',
    'settings.notificationsDesc': 'Control what updates you receive',
    'settings.newLessons': 'New Lessons',
    'settings.newLessonsDesc': 'Get notified when new lessons are available',
    'settings.quizReminders': 'Quiz Reminders',
    'settings.quizRemindersDesc': 'Receive reminders for upcoming quizzes',
    'settings.achievementBadges': 'Achievement Badges',
    'settings.achievementBadgesDesc': 'Celebrate when you earn new badges',
    'settings.communityUpdates': 'Community Updates',
    'settings.communityUpdatesDesc': 'Stay updated on community discussions',
    'settings.language': 'Language',
    'settings.languageDesc': 'Change app language',
    'settings.english': 'English',
    'settings.hindi': 'हिंदी (Hindi)',
    'settings.server': 'Server Information',
    'settings.serverDesc': 'FlowHivee local server details',
    'settings.privacy': 'Privacy & Security',
    'settings.privacyDesc': 'Control your data and privacy',
    'settings.showProgress': 'Show Progress to Others',
    'settings.showProgressDesc': 'Let other students see your achievements',
    'settings.anonymousCommunity': 'Anonymous in Community',
    'settings.anonymousCommunityDesc': 'Hide your real name in discussions',
    'settings.clearData': 'Clear All Data',
    'settings.clearDataDesc': 'Remove all your personal data from this device',
  },
  hi: {
    // Common
    'app.name': 'फ्लोहाइवी',
    'app.tagline': 'कहीं भी सीखें ✨',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'delete': 'हटाएं',
    'edit': 'संपादित करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.grades': 'कक्षाएं',
    'nav.lessons': 'पाठ',
    'nav.notes': 'नोट्स',
    'nav.quizzes': 'क्विज़',
    'nav.progress': 'प्रगति',
    'nav.teacher': 'शिक्षक',
    'nav.analytics': 'विश्लेषण',
    'nav.community': 'समुदाय',
    'nav.settings': 'सेटिंग्स',
    'nav.more': 'और',
    'nav.menu': 'मेनू',
    
    // Home
    'home.welcome': 'वापसी पर स्वागत है',
    'home.selectGrade': 'अपनी कक्षा चुनें',
    'home.exploreGrades': 'प्रत्येक कक्षा स्तर के लिए पाठ्यक्रम देखें',
    'home.quickStats': 'त्वरित आंकड़े',
    'home.totalLessons': 'कुल पाठ',
    'home.completedQuizzes': 'पूर्ण क्विज़',
    'home.savedNotes': 'सहेजे गए नोट्स',
    'home.recentActivity': 'हाल की गतिविधि',
    'home.continueLearning': 'सीखना जारी रखें',
    
    // Grades
    'grades.title': 'अपनी कक्षा चुनें',
    'grades.subtitle': 'पाठ्यक्रम तक पहुंचने के लिए अपनी कक्षा चुनें',
    'grades.mont': 'मोंटेसरी',
    'grades.grade': 'कक्षा',
    
    // Settings
    'settings.title': '⚙️ सेटिंग्स',
    'settings.subtitle': 'अपने फ्लोहाइवी अनुभव को अनुकूलित करें',
    'settings.profile': 'प्रोफाइल सेटिंग्स',
    'settings.profileDesc': 'अपनी व्यक्तिगत जानकारी प्रबंधित करें',
    'settings.fullName': 'पूरा नाम',
    'settings.studentId': 'छात्र आईडी',
    'settings.email': 'ईमेल (वैकल्पिक)',
    'settings.saveProfile': 'प्रोफाइल सहेजें',
    'settings.notifications': 'सूचनाएं',
    'settings.notificationsDesc': 'आप कौन से अपडेट प्राप्त करते हैं, नियंत्रित करें',
    'settings.newLessons': 'नए पाठ',
    'settings.newLessonsDesc': 'जब नए पाठ उपलब्ध हों तो सूचित हों',
    'settings.quizReminders': 'क्विज़ रिमाइंडर',
    'settings.quizRemindersDesc': 'आगामी क्विज़ के लिए रिमाइंडर प्राप्त करें',
    'settings.achievementBadges': 'उपलब्धि बैज',
    'settings.achievementBadgesDesc': 'जब आप नए बैज अर्जित करें तो जश्न मनाएं',
    'settings.communityUpdates': 'समुदाय अपडेट',
    'settings.communityUpdatesDesc': 'समुदाय चर्चाओं पर अपडेट रहें',
    'settings.language': 'भाषा',
    'settings.languageDesc': 'ऐप की भाषा बदलें',
    'settings.english': 'English (अंग्रेज़ी)',
    'settings.hindi': 'हिंदी',
    'settings.server': 'सर्वर जानकारी',
    'settings.serverDesc': 'फ्लोहाइवी स्थानीय सर्वर विवरण',
    'settings.privacy': 'गोपनीयता और सुरक्षा',
    'settings.privacyDesc': 'अपने डेटा और गोपनीयता को नियंत्रित करें',
    'settings.showProgress': 'दूसरों को प्रगति दिखाएं',
    'settings.showProgressDesc': 'अन्य छात्रों को अपनी उपलब्धियां देखने दें',
    'settings.anonymousCommunity': 'समुदाय में गुमनाम',
    'settings.anonymousCommunityDesc': 'चर्चाओं में अपना असली नाम छुपाएं',
    'settings.clearData': 'सभी डेटा साफ़ करें',
    'settings.clearDataDesc': 'इस डिवाइस से अपना सभी व्यक्तिगत डेटा हटाएं',
  }
};
