import { Category } from '../entities/category';

export interface ListCategoriesParams {
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'description' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

export interface CategoryRepository {
  create(userId: string, category: Category): Promise<void>;
  findByName(name: string): Promise<Category | null>;
  findMany(params: ListCategoriesParams): Promise<{
    categories: Category[];
    total: number;
    page: number;
    limit: number;
  }>;
  update(category: Category): Promise<void>;
  findById(id: string): Promise<Category | null>;
  delete(id: string): Promise<void>;
}
