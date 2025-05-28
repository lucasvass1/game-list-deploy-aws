import { GameRepository } from '../../../domain/repositories/game-repository';

interface ListGamesRequest {
  search?: string;
}

export class ListGamesUseCase {
  constructor(private gameRepository: GameRepository) {}

  async execute({ search }: ListGamesRequest) {
    const games = await this.gameRepository.findMany({ search });
    return { games };
  }
}
