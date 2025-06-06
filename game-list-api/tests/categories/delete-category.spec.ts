import { describe, it, beforeEach, expect } from 'vitest';
import { makeCategory } from './factories/category-factory';
import { UnauthorizedError } from '@/domain/errors/unauthorized-error';
import { InMemoryCategoryRepository } from 'tests/repositories/in-memory-category-repository';
import { DeleteCategoryUseCase } from '@/domain/use-cases/category/delete-category';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';

let categoryRepository: InMemoryCategoryRepository;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('DeleteCategoryUseCase', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  });

  it('should delete a category', async () => {
    const category = makeCategory({ userId: 'user-1' });
    await categoryRepository.create('user-1', category);

    await deleteCategoryUseCase.execute({
      id: category.id as string,
      userId: 'user-1',
    });

    const found = await categoryRepository.findById(category.id as string);
    expect(found).toBeNull();
  });

  it('should throw CategoryNotFoundError if category does not exist', async () => {
    await expect(() =>
      deleteCategoryUseCase.execute({
        id: 'non-existent-id',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('should throw UnauthorizedError if user is not the owner', async () => {
    const category = makeCategory({ userId: 'user-1' });
    await categoryRepository.create('user-1', category);

    await expect(() =>
      deleteCategoryUseCase.execute({
        id: category.id as string,
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
