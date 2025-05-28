import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

export class DeleteGameUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute(id: string) {
    const game = await this.gameRepository.findById(id);
    if (!game) {
      throw new GameNotFoundError();
    }

    await this.gameRepository.delete(id);
  }
}
