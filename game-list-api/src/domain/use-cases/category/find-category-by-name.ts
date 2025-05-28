import { Category } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category-repository";

type FindCategoryByNameRequest = { name: string };

type FindCategoryByNameResponse = { category: Category } | null;

export class FindCategoryByNameUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    name,
  }: FindCategoryByNameRequest): Promise<FindCategoryByNameResponse> {
    const category = await this.categoryRepository.findByName(name);
    if (!category) {
      return null;
    }

    return { category };
  }
}
