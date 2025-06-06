import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';
import { ensureOwnership } from '@/utils/ensure-ownership';

export class DeleteGameUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute(id: string, userId: string) {
    const game = await this.gameRepository.findById(id);
    if (!game) {
      throw new GameNotFoundError();
    }

    ensureOwnership(game.userId ?? '', userId);

    await this.gameRepository.delete(id);
  }
}
