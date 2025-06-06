import { api } from '../../api';

export type StatusGames = 'PLAYING' | 'DONE' | 'ABANDONED';

export type GameUpdateRequest = {
  id: string;
  title?: string;
  description?: string;
  categoryId?: string;
  plataformId?: string;
  imageUrl?: string;
  endDate?: string;
  status?: StatusGames;
  isFavorite?: boolean;
};

export type GamesListResponse = GameUpdateRequest;

export async function fetchGameUpdate({
  id,
  title,
  description,
  categoryId,
  plataformId,
  imageUrl,
  endDate,
  status,
  isFavorite,
}: GameUpdateRequest): Promise<GamesListResponse> {
  const body: Omit<GameUpdateRequest, 'id'> = {};

  if (title) body.title = title;
  if (description) body.description = description;
  if (status) body.status = status;
  if (categoryId) body.categoryId = categoryId;
  if (plataformId) body.plataformId = plataformId;
  if (imageUrl) body.imageUrl = imageUrl;
  if (endDate) body.endDate = endDate;
  if (isFavorite !== undefined && isFavorite !== null)
    body.isFavorite = isFavorite;

  const { data } = await api.put<GamesListResponse>(`/games/${id}`, {
    ...body,
  });
  return data;
}
