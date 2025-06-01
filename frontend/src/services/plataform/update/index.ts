import { api } from '../../api';

export type StatusGames = 'PLAYING' | 'DONE' | 'ABANDONED';

export type PlataformUpdateRequest = {
  id?: string;
  title?: string;
  company?: string | null;
  imageUrl?: string | null;
  acquisitionYear?: string | null;
};

export type PlataformListResponse = PlataformUpdateRequest;

export async function fetchGameUpdate({
  id,
  title,
  company,
  imageUrl,
  acquisitionYear,
}: PlataformUpdateRequest): Promise<PlataformListResponse> {
  const body: Omit<PlataformUpdateRequest, 'id'> = {};

  if (title) body.title = title;
  if (company) body.company = company;
  if (acquisitionYear) body.acquisitionYear = acquisitionYear;
  if (imageUrl) body.imageUrl = imageUrl;

  const { data } = await api.put<PlataformListResponse>(`/plataform/${id}`, {
    ...body,
  });
  return data;
}
