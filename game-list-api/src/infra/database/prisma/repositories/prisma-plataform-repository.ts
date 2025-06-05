import { prisma } from '../client';
import { Plataform, PlataformProps } from '@/domain/entities/plataform';
import { ListPlataformParams } from '@/domain/repositories/plataform-repository';

export class PrismaPlataformRepository {
  async create(userId: string, plataform: Plataform): Promise<void> {
    await prisma.plataform.create({
      data: {
        userId,
        id: plataform.id,
        title: plataform.title,
        acquisitionYear: plataform.acquisitionYear,
        company: plataform.company,
        imageUrl: plataform.imageUrl,
      },
    });
  }

  async findByTitle(title: string): Promise<Plataform | null> {
    const plataform = await prisma.plataform.findUnique({
      where: { title },
    });
    if (!plataform) return null;
    return new Plataform({
      userId: plataform.userId,
      id: plataform.id,
      title: plataform.title,
      acquisitionYear: plataform.acquisitionYear ?? null,
      company: plataform.company ?? null,
      imageUrl: plataform.imageUrl ?? null,
    });
  }

  async findMany(
    params: ListPlataformParams,
    userId: string,
  ): Promise<{
    plataforms: PlataformProps[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, sortBy = 'title', order = 'asc' } = params;

    const skip = (page - 1) * limit;

    const [plataforms, total] = await Promise.all([
      prisma.plataform.findMany({
        where: {
          userId,
        },
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),
      prisma.plataform.count(),
    ]);

    return {
      plataforms: plataforms.map((plataform) => ({
        id: plataform?.id,
        userId: plataform?.userId,
        acquisitionYear: plataform?.acquisitionYear,
        company: plataform.company,
        createdAt: plataform.createdAt,
        imageUrl: plataform?.imageUrl,
        title: plataform.title,
        updatedAt: plataform.updatedAt,
      })),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<Plataform | null> {
    const plataform = await prisma.plataform.findUnique({ where: { id } });
    if (!plataform) return null;
    return new Plataform(plataform);
  }

  async update(plataform: Plataform): Promise<void> {
    await prisma.plataform.update({
      where: { id: plataform.id },
      data: {
        title: plataform.title,
        acquisitionYear: plataform.acquisitionYear,
        company: plataform.company,
        imageUrl: plataform.imageUrl,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.plataform.delete({ where: { id } });
  }

  async hasRelatedGames(plataformId: string): Promise<boolean> {
    const count = await prisma.game.count({
      where: { plataformId },
    });

    return count > 0;
  }
}
