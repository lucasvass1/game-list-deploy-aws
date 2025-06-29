import { Game } from '@/domain/entities/game';
import { prisma } from '../client';
import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { ListGamesRequest } from '@/domain/use-cases/games/list-games-by-user';

export class PrismaGameRepository {
  async create(userId: string, game: Game): Promise<void> {
    await prisma.game.create({
      data: {
        userId,
        id: game.id,
        title: game.title,
        status: game.status,
        categoryId: game.categoryId,
        plataformId: game.plataformId,
        imageUrl: game.imageUrl,
        description: game.description,
        endDate: game.endDate,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        isFavorite: game.isFavorite ?? false,
      },
    });
  }

  async update(game: Game): Promise<void> {
    await prisma.game.update({
      where: { id: game.id },
      data: {
        title: game.title,
        status: game.status,
        categoryId: game.categoryId,
        plataformId: game.plataformId,
        imageUrl: game.imageUrl,
        description: game.description,
        endDate: game.endDate,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.game.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Game | null> {
    const game = await prisma.game.findUnique({
      where: { title: name },
    });
    if (!game) return null;
    return new Game(game);
  }

  async findById(id: string): Promise<Game | null> {
    const game = await prisma.game.findUnique({
      where: { id },
    });

    if (!game) return null;

    return new Game({
      title: game.title,
      status: game.status as 'PLAYING' | 'DONE' | 'ABANDONED',
      categoryId: game.categoryId,
      plataformId: game.plataformId,
      imageUrl: game.imageUrl,
      description: game.description,
      endDate: game.endDate,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      id: game.id,
      isFavorite: game.isFavorite,
      userId: game.userId,
    });
  }

  async findMany(params: { search?: string }): Promise<Game[]> {
    const { search } = params;

    const games = await prisma.game.findMany({
      where: {
        OR: search
          ? [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return games.map((game: any) =>
      new Game({
        title: game.title,
        status: game.status as 'PLAYING' | 'DONE' | 'ABANDONED',
        categoryId: game.categoryId,
        plataformId: game.plataformId,
        imageUrl: game.imageUrl,
        description: game.description,
        endDate: game.endDate,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        id: game.id,
        isFavorite: game.isFavorite,
      })
    );
  }

  async findByUser({
    userId,
    search,
    page,
    limit,
    sortBy,
    order,
    category,
    favorite,
  }: ListGamesRequest) {
    const skip = (Number(page) - 1) * Number(limit);

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where: {
          userId,
          isFavorite: favorite,
          OR: search
            ? [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ]
            : undefined,
          categoryId: category?.length ? category : undefined,
        },
        skip,
        take: Number(limit),
        orderBy: {
          [sortBy as string]: order,
        },
        include: {
          category: true,
          plataform: true,
        },
      }),
      prisma.game.count({
        where: {
          userId,
          OR: search
            ? [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ]
            : undefined,
          categoryId: category?.length ? category : undefined,
        },
      }),
    ]);

    return {
      games: games.map((game: any) => ({
        id: game.id,
        title: game.title,
        status: game.status,
        categoryId: game.categoryId,
        plataformId: game.plataformId,
        imageUrl: game.imageUrl,
        description: game.description,
        endDate: game.endDate,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        isFavorite: game.isFavorite,
        category: {
          id: game.category.id,
          name: game.category.title,
        },
        plataform: game.plataform
          ? {
              id: game.plataform.id,
              name: game.plataform.title,
            }
          : null,
      })),
      total,
      limit: Number(limit),
      page: Number(page),
    };
  }

  async toggleFavorite(gameId: string, userId: string): Promise<void> {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
        userId,
      },
    });

    if (!game) throw new GameNotFoundError();

    await prisma.game.update({
      where: { id: gameId },
      data: {
        isFavorite: !game.isFavorite,
      },
    });
  }

  async findAllFavoritesByUser(userId: string): Promise<Game[]> {
    const games = await prisma.game.findMany({
      where: {
        userId,
        isFavorite: true,
      },
      include: {
        category: true,
        plataform: true,
      },
    });

    return games.map((game: any) => new Game(game));
  }
}
