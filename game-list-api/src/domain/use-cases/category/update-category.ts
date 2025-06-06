import { Category } from '@/domain/entities/category';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';
import { CategoryRepository } from '@/domain/repositories/category-repository';
import { ensureOwnership } from '@/utils/ensure-ownership';

interface UpdateCategoryUseCaseRequest {
  categoryId: string;
  title: string;
  description: string | null;
  userId: string;
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
    userId,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) throw new CategoryNotFoundError();

    ensureOwnership(category.userId, userId);

    category.updateCategory({ title, description });

    await this.categoryRepository.update(category);

    return { category };
  }
}
