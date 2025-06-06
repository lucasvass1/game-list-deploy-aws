import { UserProps } from '@/domain/entities/user';
import { AuthenticateUserUseCase } from '@/domain/use-cases/users/authenticate-user';
import { RegisterUserUseCase } from '@/domain/use-cases/users/register-user';
import { StatsUserUseCase } from '@/domain/use-cases/users/stats-user';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';
import { generateToken } from '@/utils/jwt';

export class UsersController {
  constructor(private readonly repository: PrismaUsersRepository) {}

  async login(email: string, password: string) {
    const authenticateUseCase = new AuthenticateUserUseCase(this.repository);

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = generateToken({ sub: user.id });

    const response = {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
      },
      token,
    };

    return response;
  }

  async register(data: UserProps) {
    const { name, email, password } = data;

    const registerUseCase = new RegisterUserUseCase(this.repository);
    const { user } = await registerUseCase.execute({ name, email, password });
    return {
      name: user.name,
      email: user.email,
      id: user.id,
      createdAt: user.createdAt,
    };
  }

  async stats(userId: string) {
    const statsUseCase = new StatsUserUseCase(this.repository);
    const stats = await statsUseCase.execute({ userId });
    return stats;
  }
}
