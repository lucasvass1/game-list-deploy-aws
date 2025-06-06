import { describe, it, beforeEach, expect } from 'vitest';

import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository';
import { AuthenticateUserUseCase } from '@/domain/use-cases/users/authenticate-user';
import { makeUser } from './factories/user-factory';

let usersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should authenticate with valid credentials', async () => {
    const passwordHash = await hash('correct-password', 6);
    const user = makeUser({
      email: 'john@example.com',
      password: passwordHash,
    });
    await usersRepository.create(user);

    const result = await authenticateUserUseCase.execute({
      email: 'john@example.com',
      password: 'correct-password',
    });

    expect(result.user).toEqual(
      expect.objectContaining({
        id: user.id,
        email: 'john@example.com',
        name: user.name,
      }),
    );
  });

  it('should not authenticate with non-existing email', async () => {
    await expect(() =>
      authenticateUserUseCase.execute({
        email: 'nonexistent@example.com',
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not authenticate with wrong password', async () => {
    const passwordHash = await hash('correct-password', 6);
    const user = makeUser({
      email: 'john@example.com',
      password: passwordHash,
    });
    await usersRepository.create(user);

    await expect(() =>
      authenticateUserUseCase.execute({
        email: 'john@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
