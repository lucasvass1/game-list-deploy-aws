import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';
import { PropsSortBy } from '../../../context/CategoriesContext';
import { PropsOrder } from '../../../context/PlataformsContext';

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
  sortBy?: PropsSortBy;
  order?: PropsOrder;
}

export async function fetchCategoryList({
  page = 1,
  limit = 10,
  order,
  sortBy,
}: IPropsRequest): Promise<CategoryListResponse> {
  const { data } = await api.get<CategoryListResponse>(
    `/category?limit=${limit}&page=${page}${
      sortBy?.length ? `&sortBy=${sortBy}` : ''
    }${order?.length ? `&order=${order}` : ''}`,
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
