import { User } from '@/domain/entities/user';

export type PartialUser = Partial<User>;

export interface StatsUserResponse {
  games: number;
  categories: number;
  plataforms: number;
  favorites: number;
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<PartialUser | null>;
  stats(userId: string): Promise<StatsUserResponse>;
}
