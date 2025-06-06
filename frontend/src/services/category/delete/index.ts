import { api } from '../../api';

export type CategoryDeleteRequest = {
  id: string;
};

export async function fetchCategoryDelete({
  id,
}: CategoryDeleteRequest): Promise<void> {
  const { data } = await api.delete(`/category/${id}`);
  return data;
}
