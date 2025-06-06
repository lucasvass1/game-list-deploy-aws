import { describe, it, beforeEach, expect } from 'vitest';
import { makeCategory } from './factories/category-factory';
import { UnauthorizedError } from '@/domain/errors/unauthorized-error';
import { InMemoryCategoryRepository } from 'tests/repositories/in-memory-category-repository';
import { UpdateCategoryUseCase } from '@/domain/use-cases/category/update-category';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';

let categoryRepository: InMemoryCategoryRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('UpdateCategoryUseCase', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
  });

  it('should update a category', async () => {
    const category = makeCategory({ title: 'Old Title', userId: 'user-1' });
    await categoryRepository.create('user-1', category);

    const updated = await updateCategoryUseCase.execute({
      categoryId: category.id as string,
      title: 'New Title',
      description: 'Updated description',
      userId: 'user-1',
    });

    expect(updated.category.title).toBe('New Title');
    expect(updated.category.description).toBe('Updated description');
  });

  it('should throw CategoryNotFoundError if category does not exist', async () => {
    await expect(() =>
      updateCategoryUseCase.execute({
        categoryId: 'non-existent-id',
        title: 'Title',
        description: 'Description',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('should throw UnauthorizedError if user is not the owner', async () => {
    const category = makeCategory({ userId: 'user-1' });
    await categoryRepository.create('user-1', category);

    await expect(() =>
      updateCategoryUseCase.execute({
        categoryId: category.id as string,
        title: 'Title',
        description: 'Description',
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
