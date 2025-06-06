import { Category } from '@/domain/entities/category';
import { randomUUID } from 'crypto';

export function makeCategory(overrides: Partial<Category> = {}): Category {
  return new Category({
    id: overrides.id ?? randomUUID(),
    title: overrides.title ?? 'Default Title',
    description: overrides.description ?? 'Default Description',
    userId: overrides.userId ?? 'user-1',
    createdAt: overrides.createdAt ?? new Date(),
    updatedAt: overrides.updatedAt ?? new Date(),
  });
}
