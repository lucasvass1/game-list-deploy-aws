import { User } from '@/domain/entities/user';

export type PartialUser = Partial<User>;

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
}
