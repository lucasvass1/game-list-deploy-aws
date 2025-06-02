import { Game } from '@/domain/entities/game';
import { prisma } from '../client';
import { GameNotFoundError } from '@/domain/errors/game-not-found';

export class PrismaGameRepository {
  async create(userId: string, game: Game) {
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

  async update(game: Game) {
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

  async delete(id: string) {
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

  async findById(id: string) {
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
    });
  }

  async findMany({ search }: { search?: string }) {
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

    return games.map(
      (game) =>
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
        }),
    );
  }
  async findByUser({ userId, search }: { userId: string; search?: string }) {
    const games = await prisma.game.findMany({
      where: {
        userId,
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
      include: {
        category: true,
        plataform: true,
      },
    });

    console.log('games', games);
    return games.map((game) => ({
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

      // adicionando os dados relacionados
      category: {
        id: game.category.id,
        name: game.category.title,
      },
      // plataform: {
      //   id: game.plataform.id,
      //   name: game.plataform.title,
      // },
    }));
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
  async findAllFavoritesByUser(userId: string) {
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

    return games;
  }
}
