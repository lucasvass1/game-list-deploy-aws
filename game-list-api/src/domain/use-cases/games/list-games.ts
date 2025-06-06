import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

interface ListGamesRequest {
  search?: string;
}

export class ListGamesUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute({ search }: ListGamesRequest) {
    const games = await this.gameRepository.findMany({ search });
    return { games };
  }
}
