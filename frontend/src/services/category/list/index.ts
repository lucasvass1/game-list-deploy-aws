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
  plataform: CategoryProps[];
};

async function fetchCategoryList(): Promise<CategoryListResponse> {
  const { data } = await api.get<CategoryListResponse>('/category');
  return data;
}

export function useGetPlataformList(enabled: boolean) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.category.List],
    queryFn: fetchCategoryList,
    staleTime: MINUTE * 3,
    enabled,
  });
}
