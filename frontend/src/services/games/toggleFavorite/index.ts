import { api } from '../../api';

export type GameToggleFavoriteRequest = {
  id: string;
};

export async function fetchGameToggleFavorite({
  id,
}: GameToggleFavoriteRequest): Promise<void> {
  const { data } = await api.patch(`/games/${id}/favorite`);
  return data;
}
