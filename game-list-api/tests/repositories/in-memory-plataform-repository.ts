import {
  ListPlataformParams,
  PlataformRepository,
} from '@/domain/repositories/plataform-repository';
import { Plataform, PlataformProps } from '@/domain/entities/plataform';
import { randomUUID } from 'crypto';

export class InMemoryPlataformRepository implements PlataformRepository {
  public items: Plataform[] = [];

  async create(userId: string, data: PlataformProps): Promise<void> {
    const plataform = new Plataform({
      ...data,
      id: randomUUID(),
      userId,
    });
    this.items.push(plataform);
  }

  async findById(id: string): Promise<Plataform | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async findByTitle(title: string, userId: string): Promise<Plataform | null> {
    return (
      this.items.find(
        (item) =>
          item.title.toLowerCase() === title.toLowerCase() &&
          item.userId === userId,
      ) || null
    );
  }

  async listAll({
    userId,
    limit,
    page,
    sortBy,
    order,
  }: {
    userId: string;
    limit: number;
    page: number;
    sortBy: keyof PlataformProps;
    order: 'asc' | 'desc';
  }): Promise<Plataform[]> {
    let results = this.items.filter((item) => item.userId === userId);

    results = results.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue instanceof Date && bValue instanceof Date) {
        return order === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

    const start = (page - 1) * limit;
    return results.slice(start, start + limit);
  }

  async update(data: Plataform): Promise<void> {
    const index = this.items.findIndex((item) => item.id === data.id);
    if (index === -1) throw new Error('Plataform not found');

    const updated = new Plataform(data);
    this.items[index] = updated;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async findMany(
    params: ListPlataformParams & { search: string },
    userId: string,
  ): Promise<{
    plataforms: PlataformProps[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search } = params;

    const filtered = this.items.filter((platform) => {
      const belongsToUser = platform.userId === userId;
      const matchesSearch = search
        ? platform.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return belongsToUser && matchesSearch;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return Promise.resolve({
      plataforms: paginated.map((plataform) => ({
        id: plataform.id,
        title: plataform.title,
        createdAt: plataform.createdAt,
        updatedAt: plataform.updatedAt,
        userId: plataform.userId,
        acquisitionYear: plataform.acquisitionYear,
        company: plataform.company,
        imageUrl: plataform.imageUrl,
      })),
      total,
      page,
      limit,
    });
  }

  hasRelatedGames(id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
