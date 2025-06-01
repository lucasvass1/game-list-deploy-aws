import { api } from '../../api';

export type PlataformDeleteRequest = {
  id: string;
};

export async function fetchPlataformDelete({
  id,
}: PlataformDeleteRequest): Promise<void> {
  const { data } = await api.delete(`/plataform/${id}`);
  return data;
}
