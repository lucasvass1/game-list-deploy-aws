import { api } from '../../api';

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

export async function fetchGamesListFavorite(): Promise<GamesListResponse> {
  const { data } = await api.get<GamesListResponse>('/games/favorite');
  return data;
}

