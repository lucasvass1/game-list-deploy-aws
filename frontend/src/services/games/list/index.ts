import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';

interface GameProps {
  id?: string;
  title?: string;
  status: 'PLAYING' | 'DONE' | 'ABANDONED';
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

export type GamesListResponse = {
  games: GameProps[];
};

async function fetchGamesList(): Promise<GamesListResponse> {
  const { data } = await api.get<GamesListResponse>('/games');
  return data;
}

export function useGetGamesList(enabled: boolean) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.games.List],
    queryFn: fetchGamesList,
    staleTime: MINUTE * 3,
    enabled,
  });
}
