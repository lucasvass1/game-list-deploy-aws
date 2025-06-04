import { api } from '../../api';

export type StatusGames = 'PLAYING' | 'DONE' | 'ABANDONED';

export type GameCreateRequest = {
  title: string;
  description: string;
  categoryId?: string;
  plataformId?: string;
  imageUrl?: string;
  endDate?: string | Date;
  status: StatusGames;
  isFavorite?: boolean;
};

export type GamesListResponse = GameCreateRequest;

export async function fetchGameCreate({
  title,
  description,
  categoryId,
  plataformId,
  imageUrl,
  endDate,
  status,
  isFavorite,
}: GameCreateRequest): Promise<GamesListResponse> {
  const body: GameCreateRequest = {
    title,
    description,
    status,
  };

  if (categoryId) body.categoryId = categoryId;
  if (plataformId) body.plataformId = plataformId;
  if (imageUrl?.length) body.imageUrl = imageUrl;
  if (endDate) body.endDate = new Date(endDate);
  if (isFavorite !== undefined && isFavorite !== null)
    body.isFavorite = isFavorite;

  const { data } = await api.post<GamesListResponse>('/games', {
    ...body,
  });
  return data;
}
