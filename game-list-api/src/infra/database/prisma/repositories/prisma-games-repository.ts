import { Game } from '@/domain/entities/game';
import { prisma } from '../client';

export class PrismaGameRepository {
  async create(game: Game) {
    await prisma.game.create({
      data: {
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

  async findById(id: string) {
    const game = await prisma.game.findUnique({
      where: { id },
    });

    console.log('game', game);

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
        }),
    );
  }
}
