import { EndDateGameRequiredError } from '@/domain/errors/end-date-game-required';
import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { InvalidStatusGameError } from '@/domain/errors/invalid-status-game';
import { GameRepository } from '@/domain/repositories/game-repository';

interface UpdateGameRequest {
  id: string;
  title?: string;
  status?: 'PLAYING' | 'DONE' | 'ABANDONED';
  categoryId?: string;
  plataformId?: string;
  imageUrl?: string;
  description?: string;
  endDate?: Date;
}

export class UpdateGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute(request: UpdateGameRequest) {
    const { id, ...data } = request;

    const game = await this.gameRepository.findById(id);
    if (!game) {
      throw new GameNotFoundError();
    }

    if (data.status) {
      const validStatus = ['PLAYING', 'DONE', 'ABANDONED'];
      if (!validStatus.includes(data.status)) {
        throw new InvalidStatusGameError();
      }

      if (
        (data.status === 'DONE' || data.status === 'ABANDONED') &&
        !data.endDate
      ) {
        throw new EndDateGameRequiredError();
      }

      game.updateGame({ status: data.status });
    }

    game.updateGame({
      title: data.title ?? game.title,
      status: data.status ?? game.status,
      categoryId: data.categoryId ?? game.categoryId,
      plataformId: data.plataformId ?? game.plataformId,
      imageUrl: data.imageUrl ?? game.imageUrl,
      description: data.description ?? game.description,
      endDate: data.endDate ?? game.endDate,
      updatedAt: new Date(),
    });

    await this.gameRepository.update(game);

    return { game };
  }
}
