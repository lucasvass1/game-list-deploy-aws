import { describe, it, beforeEach, expect } from 'vitest';
import { makeCategory } from './factories/category-factory';
import { InMemoryCategoryRepository } from 'tests/repositories/in-memory-category-repository';
import { ListCategoryUseCase } from '@/domain/use-cases/category/list-categorys';

let categoryRepository: InMemoryCategoryRepository;
let listCategoryUseCase: ListCategoryUseCase;

describe('ListCategoryUseCase', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository();
    listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
  });

  it('should list categories for a user', async () => {
    const category1 = makeCategory({ title: 'Work', userId: 'user-1' });
    const category2 = makeCategory({ title: 'Personal', userId: 'user-1' });
    await categoryRepository.create('user-1', category1);
    await categoryRepository.create('user-1', category2);

    const categories = await listCategoryUseCase.execute({
      userId: 'user-1',
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      order: 'asc',
    });

    expect(categories.categorys).toHaveLength(2);
  });
});
