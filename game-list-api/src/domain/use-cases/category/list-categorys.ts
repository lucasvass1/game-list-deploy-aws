import { CategoryProps } from '@/domain/entities/category';
import {
  CategoryRepository,
  ListCategoriesParams,
} from '@/domain/repositories/category-repository';

type ListCategorysResponse = {
  categorys: CategoryProps[];
  total: number;
  page: number;
  limit: number;
  sortBy?: 'name' | 'description' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
};

export class ListCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(params: ListCategoriesParams): Promise<ListCategorysResponse> {
    const categorys = await this.categoryRepository.findMany(params);

    return {
      categorys: categorys.categories,
      total: categorys.total,
      page: categorys.page,
      limit: categorys.limit,
    };
  }
}
