import type { Game } from '@interfaces/game';
import type { User } from '@interfaces/user';

export const isInLibrary = (game: Game, userData: User | null): boolean => {
  return !!userData?.library?.some((item) => item.id === game?.id);
};
