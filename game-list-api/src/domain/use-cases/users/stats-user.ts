import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';

interface StatsUserUseCaseRequest {
  userId: string;
}

interface StatsUserUseCaseResponse {
  games: number;
  categories: number;
  plataforms: number;
  favorites: number;
}

export class StatsUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    userId,
  }: StatsUserUseCaseRequest): Promise<StatsUserUseCaseResponse> {
    return await this.usersRepository.stats(userId);
  }
}
