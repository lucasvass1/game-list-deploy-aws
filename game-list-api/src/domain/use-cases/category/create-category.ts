import { Category, CategoryProps } from '@/domain/entities/category';
import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';
import { CategoryRepository } from '@/domain/repositories/category-repository';

type CategoryRequest = {
  title: string;
  description: string | null;
  userId: string;
};

type CreateCategoryResponse = {
  category: CategoryProps;
};

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    title,
    description,
    userId,
  }: CategoryRequest): Promise<CreateCategoryResponse> {
    const data: CategoryProps = {
      userId,
      title,
      description: description ?? null,
      id: crypto.randomUUID(),
    };

    const categoryExists = await this.categoryRepository.findByName(title);
    if (categoryExists) throw new CategoryAlreadyExistsError();

    const category = new Category(data);
    await this.categoryRepository.create(userId, category);

    return { category };
  }
}
