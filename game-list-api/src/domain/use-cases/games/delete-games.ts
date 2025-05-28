import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { GameRepository } from '../../../domain/repositories/game-repository';

export class DeleteGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute(id: string) {
    const game = await this.gameRepository.findById(id);
    if (!game) {
      throw new GameNotFoundError();
    }

    await this.gameRepository.delete(id);
  }
}
