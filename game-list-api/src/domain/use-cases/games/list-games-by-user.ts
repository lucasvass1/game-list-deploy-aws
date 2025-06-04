import { PrismaGameRepository } from '@/infra/database/prisma/repositories/prisma-games-repository';

export interface ListGamesRequest {
  search?: string;
  userId: string;
  page?: string;
  limit?: string;
  sortBy?: 'title' | 'description' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  category?: string;
  favorite?: boolean;
}

export class ListGamesByUserUseCase {
  constructor(private gameRepository: PrismaGameRepository) {}

  async execute({
    search,
    userId,
    page,
    limit,
    sortBy,
    order,
    category,
    favorite,
  }: ListGamesRequest) {
    const games = await this.gameRepository.findByUser({
      userId,
      search,
      page,
      limit,
      sortBy,
      order,
      category,
      favorite,
    });
    return { games };
  }
}
