import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';
import { PropsOrder, PropsSortBy } from '../../../context/PlataformsContext';

export interface PlataformProps {
  id?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  company?: string | null;
  imageUrl?: string | null;
  acquisitionYear?: string | null;
  userId?: string;
}

export type PlataformListResponse = {
  plataforms: PlataformProps[];
  limit: number;
  page: number;
  total: number;
};

interface IPropsRequest {
  page?: number;
  limit?: number;
  sortBy?: PropsSortBy;
  order?: PropsOrder;
}

export async function fetchPlataformList({
  page = 1,
  limit = 10,
  sortBy,
  order,
}: IPropsRequest): Promise<PlataformListResponse> {
  const { data } = await api.get<PlataformListResponse>(
    `/plataform?limit=${limit}&page=${page}${
      sortBy?.length ? `&sortBy=${sortBy}` : ''
    }${order?.length ? `&order=${order}` : ''}`,
  );
  return data;
}

export function useGetPlataformList(
  enabled: boolean,
  page?: number,
  limit?: number,
) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.plataform.List, page, limit],
    queryFn: () => fetchPlataformList({ page, limit }),
    staleTime: MINUTE * 3,
    enabled,
  });
}
