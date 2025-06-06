import { describe, it, beforeEach, expect } from 'vitest';
import { UsersAlreadyExistsError } from '@/domain/errors/users-already-exists-error';
import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository';
import { RegisterUserUseCase } from '@/domain/use-cases/users/register-user';

let usersRepository: InMemoryUsersRepository;
let registerUserUseCase: RegisterUserUseCase;

describe('RegisterUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  it('should register a new user', async () => {
    const user = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(user?.user).toHaveProperty('id');
    expect(user.user?.email).toBe('john@example.com');
  });

  it('should not register user with existing email', async () => {
    await registerUserUseCase.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
    });

    await expect(() =>
      registerUserUseCase.execute({
        name: 'Another',
        email: 'jane@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError);
  });
});
