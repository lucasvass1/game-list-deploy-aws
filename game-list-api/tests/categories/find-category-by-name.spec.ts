import { describe, it, beforeEach, expect } from 'vitest';
import { makeCategory } from './factories/category-factory';
import { InMemoryCategoryRepository } from 'tests/repositories/in-memory-category-repository';
import { FindCategoryByNameUseCase } from '@/domain/use-cases/category/find-category-by-name';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';

let categoryRepository: InMemoryCategoryRepository;
let findCategoryByNameUseCase: FindCategoryByNameUseCase;

describe('FindCategoryByNameUseCase', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    findCategoryByNameUseCase = new FindCategoryByNameUseCase(
      categoryRepository,
    );
  });

  it('should find a category by name', async () => {
    const category = makeCategory({ title: 'Personal', userId: 'user-1' });
    await categoryRepository.create('user-1', category);

    const found = await findCategoryByNameUseCase.execute({ name: 'Personal' });

    expect(found?.category).toEqual(category);
  });

  it('should throw CategoryNotFoundError if category does not exist', async () => {
    await expect(() =>
      findCategoryByNameUseCase.execute({ name: 'NonExistent' }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});
