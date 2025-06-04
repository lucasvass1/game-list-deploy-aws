import { Category } from '@/domain/entities/category';
import { prisma } from '../client';
import { ListCategoriesParams } from '@/domain/repositories/category-repository';

export class PrismaCategoryRepository {
  async create(userId: string, category: Category): Promise<void> {
    await prisma.category.create({
      data: {
        userId,
        id: category.id,
        title: category.title,
        description: category.description,
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { title: name },
    });
    if (!category) return null;
    return new Category(category);
  }

  async findMany(params: ListCategoriesParams): Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: any[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'title',
      order = 'asc',
      userId,
    } = params;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        skip,
        take: limit,
        where: { userId },
        orderBy: {
          [sortBy]: order,
        },
      }),
      prisma.category.count(),
    ]);

    // return categorys.map((category) => new Category(category));

    return {
      categories: categories.map((category) => ({
        id: category.id,
        title: category.title,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        userId: category.userId,
      })),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return null;
    return new Category(category);
  }

  async update(category: Category): Promise<void> {
    await prisma.category.update({
      where: { id: category.id },
      data: {
        title: category.title,
        description: category.description,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}
