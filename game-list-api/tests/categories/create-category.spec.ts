import { describe, it, beforeEach, expect } from 'vitest';
import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error';
import { InMemoryCategoryRepository } from 'tests/repositories/in-memory-category-repository';
import { CreateCategoryUseCase } from '@/domain/use-cases/category/create-category';

let categoryRepository: InMemoryCategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it('should create a new category', async () => {
    const { category } = await createCategoryUseCase.execute({
      title: 'Work',
      description: 'Work related tasks',
      userId: 'user-1',
    });

    expect(category).toHaveProperty('id');
    expect(category.title).toBe('Work');
  });

  it('should not allow duplicate category titles for the same user', async () => {
    await createCategoryUseCase.execute({
      title: 'Work',
      description: 'Work related tasks',
      userId: 'user-1',
    });

    await expect(() =>
      createCategoryUseCase.execute({
        title: 'Work',
        description: 'Duplicate category',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError);
  });
});
