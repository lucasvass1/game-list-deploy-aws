import { User } from '@/domain/entities/user';

export function makeUser(overrides?: Partial<User>): User {
  return new User({
    id: 'user-id-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    ...overrides,
  });
}
