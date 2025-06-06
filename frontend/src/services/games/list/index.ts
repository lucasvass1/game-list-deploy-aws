import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';
import { PropsSortBy } from '../../../context/GamesContext';
import { PropsOrder } from '../../../context/PlataformsContext';

interface CategoryProps {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface GameProps {
  id?: string;
  title?: string;
  status: 'PLAYING' | 'DONE' | 'ABANDONED';
  category: CategoryProps;
  categoryId: string;
  plataformId?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  isFavorite?: boolean | null;
  userId?: string;
}

export type GamesListObjectResponse = {
  games: GameProps[];
  limit: number;
  page: number;
  total: number;
};

export type GamesListResponse = {
  games: GamesListObjectResponse;
};

interface IPropsRequest {
  enabled?: boolean;
  search?: string;
  category?: string;
  favorite?: boolean;
  page?: number;
  limit?: number;
  sortBy?: PropsSortBy;
  order?: PropsOrder;
}

export async function fetchGamesList({
  search,
  category,
  favorite,
  page = 1,
  limit = 10,
  sortBy,
  order,
}: IPropsRequest) {
  const { data } = await api.get<GamesListResponse>(
    `/games/me?limit=${limit}${search?.length ? `&search=${search}` : ''}${
      category?.length ? `&category=${category}` : ''
    }${favorite ? `&favorite=${favorite}` : ''}${
      sortBy?.length ? `&sortBy=${sortBy}` : ''
    }${order?.length ? `&order=${order}` : ''}&page=${page}`,
  );

  return data?.games || [];
}

export function useGetGamesList({
  enabled,
  search,
  category,
  favorite,
  page = 1,
  limit = 10,
}: IPropsRequest) {
  return useQuery({
    queryKey: [
      REACT_QUERY_KEYS.screens.games.List,
      search,
      category,
      favorite,
      page,
      limit,
    ],
    queryFn: () => fetchGamesList({ search, category, favorite, page, limit }),
    staleTime: MINUTE * 3,
  });
}
