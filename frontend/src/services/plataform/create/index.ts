import { api } from '../../api';

export type StatusGames = 'PLAYING' | 'DONE' | 'ABANDONED';

export type PlataformCreateRequest = {
  title: string;
  company?: string;
  imageUrl?: string;
  acquisitionYear?: string | Date;
};

export type PlataformListResponse = PlataformCreateRequest;

export async function fetchPlataformCreate({
  title,
  company,
  imageUrl,
  acquisitionYear,
}: PlataformCreateRequest): Promise<PlataformListResponse> {
  const body: PlataformCreateRequest = {
    title,
  };

  if (company) body.company = company;
  if (imageUrl) body.imageUrl = imageUrl;
  if (acquisitionYear) body.acquisitionYear = new Date(acquisitionYear);

  const { data } = await api.post<PlataformListResponse>('/plataform', {
    ...body,
  });
  return data;
}
