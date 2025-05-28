import { EndDateGameRequiredError } from '@/domain/errors/end-date-game-required';
import { Game } from '../../../domain/entities/game';
import { InvalidStatusGameError } from '@/domain/errors/invalid-status-game';
import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

interface CreateGameRequest {
  id?: string;
  title: string;
  status: 'PLAYING' | 'DONE' | 'ABANDONED';
  categoryId: string;
  plataformId?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  endDate?: Date | null;
  isFavorite?: boolean | null;
  userId: string;
}

export class CreateGameUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute(request: CreateGameRequest) {
    const {
      title,
      status,
      categoryId,
      plataformId,
      imageUrl,
      description,
      endDate,
      isFavorite,
      userId,
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
      isFavorite,
    });

    await this.gameRepository.create(userId, game);

    return { game };
  }
}
