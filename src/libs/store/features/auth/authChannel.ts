import type { User } from '@interfaces/user';
export interface AuthChannelState {
  isUserLoggedIn: boolean;
  currentUserData: User | null;
}

export const authChannel = new BroadcastChannel('auth-channel');
