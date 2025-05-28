import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

interface ToggleFavoriteGameUseCaseRequest {
  gameId: string;
  userId: string;
}

export class ToggleFavoriteGameUseCase {
  constructor(private gamesRepository: PrismaGameRepository) {}

  async execute({
    gameId,
    userId,
  }: ToggleFavoriteGameUseCaseRequest): Promise<void> {
    await this.gamesRepository.toggleFavorite(gameId, userId);
  }
}
