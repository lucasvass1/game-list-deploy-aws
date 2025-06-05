import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';

interface CategoryProps {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export type CategoryListResponse = {
  categories: CategoryProps[];
};

interface IPropsRequest {
  page?: number;
  limit?: number;
}

export async function fetchCategoryList({
  page = 1,
  limit = 10,
}: IPropsRequest): Promise<CategoryListResponse> {
  const { data } = await api.get<CategoryListResponse>(
    `/category?limit=${limit}&page=${page}`,
  );
  return data;
}

export function useGetCategoryList(
  enabled: boolean,
  page?: number,
  limit?: number,
) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.category.List],
    queryFn: () => fetchCategoryList({ page, limit }),
    staleTime: MINUTE * 3,
    enabled,
  });
}
