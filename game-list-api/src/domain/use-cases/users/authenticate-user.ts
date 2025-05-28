import { compare } from 'bcryptjs';
import { User } from '@/domain/entities/user';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      console.log('InvalidCredentialsError');
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
