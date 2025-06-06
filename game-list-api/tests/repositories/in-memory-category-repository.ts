import { Category, CategoryProps } from '@/domain/entities/category';
import {
  CategoryRepository,
  ListCategoriesParams,
} from '@/domain/repositories/category-repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  async create(userId: string, category: Category): Promise<void> {
    this.categories.push(category);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categories.find((category) => category.id === id) ?? null;
  }

  async findByTitle(title: string, userId: string): Promise<Category | null> {
    return (
      this.categories.find(
        (category) => category.title === title && category.userId === userId,
      ) ?? null
    );
  }

  async findByName(name: string): Promise<Category | null> {
    return this.categories.find((category) => category.title === name) ?? null;
  }

  async findMany(params: ListCategoriesParams & { search: string }): Promise<{
    categories: CategoryProps[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { userId, page = 1, limit = 10, search } = params;

    const filtered = this.categories.filter((category) => {
      const belongsToUser = category.userId === userId;
      const matchesSearch = search
        ? category.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return belongsToUser && matchesSearch;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      categories: paginated.map((category) => ({
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

  async update(category: Category): Promise<void> {
    const index = this.categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
    }
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((c) => c.id !== id);
  }

  async hasRelatedGames(id: string): Promise<boolean> {
    console.log(id);
    // Simulação: nenhuma categoria possui jogos relacionados
    return false;
  }
}
