import { Game } from '../entities/game';

export interface GameRepository {
  create(game: Game): Promise<void>;
  update(game: Game): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Game | null>;
  findMany(params: { search?: string }): Promise<Game[]>;
}
