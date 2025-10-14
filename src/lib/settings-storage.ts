export interface UserSettings {
  name: string;
  initials: string;
  email: string;
  studentId: string;
  notifications: {
    newLessons: boolean;
    quizReminders: boolean;
    achievementBadges: boolean;
    communityUpdates: boolean;
  };
  privacy: {
    showProgress: boolean;
    anonymousInCommunity: boolean;
  };
}

const SETTINGS_KEY = 'user_settings';

const DEFAULT_SETTINGS: UserSettings = {
  name: 'Student',
  initials: 'ST',
  email: '',
  studentId: `STU-2024-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
  notifications: {
    newLessons: true,
    quizReminders: true,
    achievementBadges: true,
    communityUpdates: false,
  },
  privacy: {
    showProgress: true,
    anonymousInCommunity: false,
  },
};

export const getUserSettings = (): UserSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  return JSON.parse(stored);
};

export const saveUserSettings = (settings: UserSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  
  // Update community user when name changes
  const communityUser = {
    name: settings.name,
    initials: settings.initials,
  };
  localStorage.setItem('community_user', JSON.stringify(communityUser));
};

export const updateUserName = (name: string) => {
  const settings = getUserSettings();
  const nameParts = name.trim().split(' ');
  const initials = nameParts
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  settings.name = name;
  settings.initials = initials || 'ST';
  saveUserSettings(settings);
};

export const updateUserEmail = (email: string) => {
  const settings = getUserSettings();
  settings.email = email;
  saveUserSettings(settings);
};

export const updateNotificationSettings = (key: keyof UserSettings['notifications'], value: boolean) => {
  const settings = getUserSettings();
  settings.notifications[key] = value;
  saveUserSettings(settings);
};

export const updatePrivacySettings = (key: keyof UserSettings['privacy'], value: boolean) => {
  const settings = getUserSettings();
  settings.privacy[key] = value;
  saveUserSettings(settings);
};

export const clearAllData = () => {
  if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
    localStorage.clear();
    window.location.reload();
  }
};
