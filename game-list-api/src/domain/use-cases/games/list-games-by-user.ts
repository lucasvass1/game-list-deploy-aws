import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

interface ListGamesRequest {
  search?: string;
  userId: string;
}

export class ListGamesByUserUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute({ search, userId }: ListGamesRequest) {
    const games = await this.gameRepository.findByUser({ userId, search });
    return { games };
  }
}
