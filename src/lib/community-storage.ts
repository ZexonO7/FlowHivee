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

// API endpoint for local LAN server
const API_BASE = window.location.origin;
const USER_KEY = 'community_user';

export const getCurrentUser = () => {
  // First check if user settings exist (from settings page)
  const userSettings = localStorage.getItem('user_settings');
  if (userSettings) {
    const settings = JSON.parse(userSettings);
    return {
      name: settings.name,
      initials: settings.initials,
    };
  }
  
  // Fall back to community_user key
  const stored = localStorage.getItem(USER_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate default user
  const defaultUser = { name: 'Student', initials: 'ST' };
  localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  return defaultUser;
};

export const getAllMessages = async (): Promise<CommunityMessage[]> => {
  try {
    const response = await fetch(`${API_BASE}/api/community/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    // Return empty array on error
    return [];
  }
};

export const postMessage = async (message: string): Promise<CommunityMessage | null> => {
  try {
    const user = getCurrentUser();
    const response = await fetch(`${API_BASE}/api/community/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: user.name,
        initials: user.initials,
        message,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to post message');
    return await response.json();
  } catch (error) {
    console.error('Error posting message:', error);
    return null;
  }
};

export const toggleLike = async (messageId: string): Promise<CommunityMessage | null> => {
  try {
    const user = getCurrentUser();
    const response = await fetch(`${API_BASE}/api/community/messages/${messageId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.name }),
    });
    
    if (!response.ok) throw new Error('Failed to toggle like');
    return await response.json();
  } catch (error) {
    console.error('Error toggling like:', error);
    return null;
  }
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
