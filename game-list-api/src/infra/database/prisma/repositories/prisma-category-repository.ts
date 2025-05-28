import { Category } from '@/domain/entities/category';
import { prisma } from '../client';
import { ListCategoriesParams } from '@/domain/repositories/category-repository';

export class PrismaCategoryRepository {
  async create(category: Category): Promise<void> {
    await prisma.category.create({
      data: {
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
    categories: Category[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, sortBy = 'title', order = 'asc' } = params;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),
      prisma.category.count(),
    ]);

    // return categorys.map((category) => new Category(category));

    return {
      categories: categories.map((category) => new Category(category)),
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
