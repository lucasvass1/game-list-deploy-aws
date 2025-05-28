import { Category } from '@/domain/entities/category';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';
import { CategoryRepository } from '@/domain/repositories/category-repository';

interface UpdateCategoryUseCaseRequest {
  categoryId: string;
  title: string;
  description: string | null;
}

interface UpdateCategoryUseCaseResponse {
  category: Category;
}

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    categoryId,
    title,
    description,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) throw new CategoryNotFoundError();

    category.updateCategory({ title, description });

    await this.categoryRepository.update(category);

    return { category };
  }
}
