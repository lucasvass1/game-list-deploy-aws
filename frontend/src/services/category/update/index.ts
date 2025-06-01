import { api } from '../../api';

export type CategoryUpdateRequest = {
  id?: string;
  title?: string;
  description?: string;
};

export type CategoryListResponse = CategoryUpdateRequest;

export async function fetchGameUpdate({
  id,
  title,
  description,
}: CategoryUpdateRequest): Promise<CategoryListResponse> {
  const body: Omit<CategoryUpdateRequest, 'id'> = {};

  if (title) body.title = title;
  if (description) body.description = description;

  const { data } = await api.put<CategoryListResponse>(`/category/${id}`, {
    ...body,
  });
  return data;
}
