import type { User } from '@entities/user.entity';
export interface AuthChannelState {
  isUserLoggedIn: boolean;
  currentUserData: User | null;
}

export const authChannel = new BroadcastChannel('auth-channel');
