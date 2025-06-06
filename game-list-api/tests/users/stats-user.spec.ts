import { StatsUserUseCase } from '@/domain/use-cases/users/stats-user';
import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository';
import { describe, it, beforeEach, expect } from 'vitest';
import { makeUser } from './factories/user-factory';
import { UserNotFoundError } from '@/domain/errors/user-not-foud-error';

let statsUserUseCase: StatsUserUseCase;
let usersRepository: InMemoryUsersRepository;

describe('StatsUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    statsUserUseCase = new StatsUserUseCase(usersRepository);
  });

  it('should return stats for a valid user', async () => {
    const user = makeUser({
      id: 'user-id-123',
    });

    user.addGame('gamesId');

    await usersRepository.create(user);

    const stats = await statsUserUseCase.execute({ userId: 'user-id-123' });

    expect(stats).toEqual({
      games: 10,
      categories: 30,
      plataforms: 4,
      favorites: 2,
    });
  });

  it('should return 0 games and points if undefined in user', async () => {
    const user = makeUser({ id: 'user-id-abc' });
    await usersRepository.create(user);

    const stats = await statsUserUseCase.execute({ userId: 'user-id-abc' });

    expect(stats).toEqual({
      games: 10,
      categories: 30,
      plataforms: 4,
      favorites: 2,
    });
  });

  it('should throw error if user does not exist', async () => {
    await expect(() =>
      statsUserUseCase.execute({ userId: 'nonexistent-id' }),
    ).rejects.toThrowError(UserNotFoundError);
  });
});
