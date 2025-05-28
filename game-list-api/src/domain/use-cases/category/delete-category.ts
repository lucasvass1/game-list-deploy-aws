import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';
import { CategoryRepository } from '@/domain/repositories/category-repository';

type CategoryRequest = {
  id: string;
};

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ id }: CategoryRequest): Promise<void> {
    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) throw new CategoryNotFoundError();

    await this.categoryRepository.delete(id);
  }
}
