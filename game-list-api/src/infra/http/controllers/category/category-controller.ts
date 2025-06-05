import { CategoryProps } from '@/domain/entities/category';
import { ListCategoriesParams } from '@/domain/repositories/category-repository';
import { CreateCategoryUseCase } from '@/domain/use-cases/category/create-category';
import { DeleteCategoryUseCase } from '@/domain/use-cases/category/delete-category';
import { FindCategoryByNameUseCase } from '@/domain/use-cases/category/find-category-by-name';
import { ListCategoryUseCase } from '@/domain/use-cases/category/list-categorys';
import { UpdateCategoryUseCase } from '@/domain/use-cases/category/update-category';
import { PrismaCategoryRepository } from '@/infra/database/prisma/repositories/prisma-category-repository';

export class CategorysController {
  constructor(private readonly repository: PrismaCategoryRepository) {}

  async create(data: CategoryProps) {
    const useCase = new CreateCategoryUseCase(this.repository);
    const { category } = await useCase.execute(data);
    return {
      title: category.title,
      id: category.id,
      description: category.description,
      createdAt: category.createdAt ?? new Date(),
    };
  }

  async findByName(name: string) {
    const useCase = new FindCategoryByNameUseCase(this.repository);
    const category = await useCase.execute({ name });
    return category;
  }

  async list({
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
    userId,
  }: {
    page?: number;
    limit?: number;
    sortBy?: 'title' | 'description' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
    userId: string;
  }) {
    const params = { page, limit, sortBy, order, userId };

    const useCase = new ListCategoryUseCase(this.repository);
    const result = await useCase.execute(params as ListCategoriesParams);
    return {
      categories: result.categorys,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  async findById(id: string) {
    const category = await this.repository.findById(id);
    return category;
  }

  async update(data: CategoryProps, userId: string) {
    const useCase = new UpdateCategoryUseCase(this.repository);

    const { category } = await useCase.execute({
      categoryId: data.id as string,
      title: data.title,
      description: data.description,
      userId,
    });
    return {
      title: category.title,
      id: category.id,
      description: category.description,
      createdAt: category.createdAt ?? new Date(),
      updatedAt: category.updatedAt ?? new Date(),
    };
  }

  async delete(id: string, userId: string) {
    //Implementar validação se a categoria tem jogo vinculado

    const useCase = new DeleteCategoryUseCase(this.repository);

    await useCase.execute({ id, userId });
  }
}
