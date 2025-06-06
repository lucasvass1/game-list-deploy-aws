import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

interface ListFavoriteGamesUseCaseRequest {
  userId: string;
}

export class ListFavoriteGamesUseCase {
  constructor(private gamesRepository: PrismaGameRepository) {}

  async execute({ userId }: ListFavoriteGamesUseCaseRequest) {
    const games = await this.gamesRepository.findAllFavoritesByUser(userId);
    return { games };
  }
}
