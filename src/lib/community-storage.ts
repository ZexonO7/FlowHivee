export interface CommunityMessage {
  id: string;
  author: string;
  initials: string;
  time: string;
  timestamp: number;
  message: string;
  likes: number;
  likedBy: string[];
  replies: number;
}

const STORAGE_KEY = 'community_messages';
const USER_KEY = 'community_user';

export const getCurrentUser = () => {
  const userSettings = localStorage.getItem('user_settings');
  if (userSettings) {
    const settings = JSON.parse(userSettings);
    return {
      name: settings.name,
      initials: settings.initials,
    };
  }
  
  const stored = localStorage.getItem(USER_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultUser = { name: 'Student', initials: 'ST' };
  localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  return defaultUser;
};

export const getAllMessages = (): CommunityMessage[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const defaultMessages: CommunityMessage[] = [
      {
        id: '1',
        author: 'Sarah K.',
        initials: 'SK',
        time: '5 min ago',
        timestamp: Date.now() - 5 * 60000,
        message: 'Just finished the Algebra quiz! Who else found question 7 tricky? 🤔',
        likes: 12,
        likedBy: [],
        replies: 3,
      },
      {
        id: '2',
        author: 'Mike R.',
        initials: 'MR',
        time: '23 min ago',
        timestamp: Date.now() - 23 * 60000,
        message: 'The Water Cycle lesson was so interesting! I learned so much about evaporation and precipitation ✨',
        likes: 8,
        likedBy: [],
        replies: 5,
      },
      {
        id: '3',
        author: 'Emma T.',
        initials: 'ET',
        time: '1 hour ago',
        timestamp: Date.now() - 60 * 60000,
        message: 'Can someone explain the Pythagorean theorem in simple terms? Need help with my homework 📐',
        likes: 15,
        likedBy: [],
        replies: 7,
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMessages));
    return defaultMessages;
  }
  return JSON.parse(stored);
};

export const postMessage = (message: string): CommunityMessage => {
  const messages = getAllMessages();
  const user = getCurrentUser();
  
  const newMessage: CommunityMessage = {
    id: Date.now().toString(),
    author: user.name,
    initials: user.initials,
    time: 'Just now',
    timestamp: Date.now(),
    message,
    likes: 0,
    likedBy: [],
    replies: 0,
  };
  
  messages.unshift(newMessage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMessage;
};

export const toggleLike = (messageId: string): CommunityMessage | null => {
  const messages = getAllMessages();
  const user = getCurrentUser();
  const userId = user.name;
  
  const message = messages.find(m => m.id === messageId);
  if (!message) return null;
  
  if (message.likedBy.includes(userId)) {
    message.likedBy = message.likedBy.filter(id => id !== userId);
    message.likes--;
  } else {
    message.likedBy.push(userId);
    message.likes++;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return message;
};

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
