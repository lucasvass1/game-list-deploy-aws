import { GameProps } from '@/domain/entities/game';
import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { CreateGameUseCase } from '@/domain/use-cases/games/create-games';
import { DeleteGameUseCase } from '@/domain/use-cases/games/delete-games';
import { ListFavoriteGamesUseCase } from '@/domain/use-cases/games/list-favorite-games';
import { ListGamesUseCase } from '@/domain/use-cases/games/list-games';
import { ToggleFavoriteGameUseCase } from '@/domain/use-cases/games/toggle-favorite-game';
import { UpdateGameUseCase } from '@/domain/use-cases/games/update-game';
import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

export class GamesController {
  constructor(private readonly repository: PrismaGameRepository) {}
  async create(userId: string, data: GameProps) {
    const useCase = new CreateGameUseCase(this.repository);
    const { game } = await useCase.execute({ userId, ...data });
    return {
      title: game.title,
      id: game.id,
      status: game.status,
      createdAt: game.createdAt ?? new Date(),
      updatedAt: game.updatedAt ?? null,
      categoryId: game.categoryId,
      plataformId: game.plataformId,
      imageUrl: game.imageUrl,
      description: game.description,
      endDate: game.endDate,
      isFavorite: game.isFavorite,
    };
  }

  async update(data: GameProps) {
    const useCase = new UpdateGameUseCase(this.repository);
    const gameExists = await this.repository.findById(data.id as string);
    if (!gameExists) throw new GameNotFoundError();

    const { game } = await useCase.execute({
      id: data.id as string,
      title: data.title,
      status: data.status,
      categoryId: data.categoryId,
      plataformId: data.plataformId ?? undefined,
      imageUrl: data.imageUrl ?? undefined,
      description: data.description ?? undefined,
      endDate: data.endDate ?? undefined,
    });
    return {
      title: game.title,
      id: game.id,
      status: game.status,
      createdAt: game.createdAt ?? new Date(),
      updatedAt: game.updatedAt ?? null,
      categoryId: game.categoryId,
      plataformId: game.plataformId,
      imageUrl: game.imageUrl,
      description: game.description,
      endDate: game.endDate,
    };
  }

  async list(search: string) {
    const useCase = new ListGamesUseCase(this.repository);
    const result = await useCase.execute({ search: search as string });
    return result;
  }

  async delete(id: string) {
    const useCase = new DeleteGameUseCase(this.repository);
    await useCase.execute(id);
  }

  async toggleFavorite(gameId: string, userId: string) {
    const gamesRepository = new PrismaGameRepository();
    const useCase = new ToggleFavoriteGameUseCase(gamesRepository);

    await useCase.execute({ gameId, userId });
  }

  async listFavoriteGamesController(userId: string) {
    const gamesRepository = new PrismaGameRepository();
    const useCase = new ListFavoriteGamesUseCase(gamesRepository);

    const { games } = await useCase.execute({ userId });
    return games;
  }
}
