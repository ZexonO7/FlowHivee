import type { CommunityMessage } from "./community-storage";

const getApiBase = () => {
  const fromEnv = import.meta.env.VITE_COMMUNITY_API_BASE as string | undefined;
  const fromStorage = typeof window !== 'undefined' ? localStorage.getItem('community_api_base') || undefined : undefined;
  return fromEnv || fromStorage || '';
};

export const API_BASE = getApiBase();
export const remoteEnabled = !!API_BASE;

export async function fetchRemoteMessages(): Promise<CommunityMessage[]> {
  const res = await fetch(`${API_BASE}/api/community/messages`);
  if (!res.ok) throw new Error('Failed to load messages');
  return res.json();
}

export async function postRemoteMessage(message: string, user: { name: string; initials: string; }): Promise<CommunityMessage> {
  const res = await fetch(`${API_BASE}/api/community/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author: user.name, initials: user.initials, message }),
  });
  if (!res.ok) throw new Error('Failed to post message');
  return res.json();
}

export async function toggleRemoteLike(messageId: string, userId: string): Promise<CommunityMessage> {
  const res = await fetch(`${API_BASE}/api/community/messages/${messageId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error('Failed to toggle like');
  return res.json();
}
