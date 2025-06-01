import { api } from '../../api';

export type StatusGames = 'PLAYING' | 'DONE' | 'ABANDONED';

export type CategoryCreateRequest = {
  title: string;
  description?: string;
};

export type CategoryListResponse = CategoryCreateRequest;

export async function fetchCategoryCreate({
  title,
  description,
}: CategoryCreateRequest): Promise<CategoryListResponse> {
  const body: CategoryCreateRequest = {
    title,
  };

  if (description) body.description = description;

  const { data } = await api.post<CategoryListResponse>('/category', {
    ...body,
  });
  return data;
}
