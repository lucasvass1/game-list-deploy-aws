import { CategoryHasRelatedGamesError } from '@/domain/errors/category-has-related-games';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';
import { CategoryRepository } from '@/domain/repositories/category-repository';
import { ensureOwnership } from '@/utils/ensure-ownership';

type CategoryRequest = {
  id: string;
  userId: string;
};

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ id, userId }: CategoryRequest): Promise<void> {
    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) throw new CategoryNotFoundError();

    ensureOwnership(categoryExists.userId, userId);

    const hasGames = await this.categoryRepository.hasRelatedGames(id);

    if (hasGames) {
      throw new CategoryHasRelatedGamesError();
    }

    await this.categoryRepository.delete(id);
  }
}
