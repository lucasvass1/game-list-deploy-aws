import { api } from '../../api';

export type GameDeleteRequest = {
  id: string;
};

export async function fetchGameDelete({
  id,
}: GameDeleteRequest): Promise<void> {
  const { data } = await api.delete(`/games/${id}`);
  return data;
}
