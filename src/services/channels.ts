import type { User } from '@entities/user.entity';
export interface AuthChannelState {
  isLoggedIn: boolean;
  userData: User | null;
  isReady: boolean;
}

export const authChannel = new BroadcastChannel('auth-channel');
