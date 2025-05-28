import { EndDateGameRequiredError } from '@/domain/errors/end-date-game-required';
import { Game } from '../../../domain/entities/game';
import { GameRepository } from '../../../domain/repositories/game-repository';
import { InvalidStatusGameError } from '@/domain/errors/invalid-status-game';

interface CreateGameRequest {
  id?: string;
  title: string;
  status: 'PLAYING' | 'DONE' | 'ABANDONED';
  categoryId: string;
  plataformId?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  endDate?: Date | null;
}

export class CreateGameUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute(request: CreateGameRequest) {
    const {
      title,
      status,
      categoryId,
      plataformId,
      imageUrl,
      description,
      endDate,
    } = request;

    if (!title) throw new Error('Title is required');
    if (!status) throw new Error('Status is required');
    if (!categoryId) throw new Error('Category ID is required');

    const validStatus = ['PLAYING', 'DONE', 'ABANDONED'];
    if (!validStatus.includes(status)) {
      throw new InvalidStatusGameError();
    }

    if ((status === 'DONE' || status === 'ABANDONED') && !endDate) {
      throw new EndDateGameRequiredError();
    }

    const game = new Game({
      title,
      status,
      categoryId,
      plataformId,
      imageUrl,
      description,
      endDate,
    });

    await this.gameRepository.create(game);

    return { game };
  }
}
