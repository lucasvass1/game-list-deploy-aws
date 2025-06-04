import { Game } from '../entities/game';

export interface GameRepository {
  create(userId: string, game: Game): Promise<void>;
  update(game: Game): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Game | null>;
  findMany(params: { search?: string }): Promise<Game[]>;
  findByUser(params: {
    userId: string;
    search?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Game[]>;
  toggleFavorite(gameId: string, userId: string): Promise<void>;
  findAllFavoritesByUser(userId: string): Promise<Game[]>;
}
