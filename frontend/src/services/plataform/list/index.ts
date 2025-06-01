import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { MINUTE, REACT_QUERY_KEYS } from '../../../const';

interface PlataformProps {
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
  plataform: PlataformProps[];
};

async function fetchPlataformList(): Promise<PlataformListResponse> {
  const { data } = await api.get<PlataformListResponse>('/plataform');
  return data;
}

export function useGetPlataformList(enabled: boolean) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.plataform.List],
    queryFn: fetchPlataformList,
    staleTime: MINUTE * 3,
    enabled,
  });
}
