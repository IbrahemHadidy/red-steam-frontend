import { User } from 'types/user.types';

export interface Review {
  id: number;
  user: User;
  positive: boolean;
  date: Date;
  content: string;
}
