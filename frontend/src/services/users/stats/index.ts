import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';

export type StatsUserResponse = {
  games: number;
  categories: number;
  plataforms: number;
  favorites: number;
};

async function fetchUserStats(): Promise<StatsUserResponse> {
  const { data } = await api.get<StatsUserResponse>('/users/stats');
  return data;
}

export function useGetUserStats(enabled: boolean) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.users.Stats],
    queryFn: fetchUserStats,
    staleTime: MINUTE * 3,
    enabled,
  });
}
