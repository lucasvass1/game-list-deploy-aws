import { Plataform, PlataformProps } from '../entities/plataform';

export interface ListPlataformParams {
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'acquisitionYear' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

export interface PlataformRepository {
  create(userId: string, plataform: Plataform): Promise<void>;
  findByTitle(title: string): Promise<Plataform | null>;
  findMany(params: ListPlataformParams): Promise<{
    plataforms: PlataformProps[];
    total: number;
    page: number;
    limit: number;
  }>;
  update(plataform: Plataform): Promise<void>;
  findById(id: string): Promise<Plataform | null>;
  delete(id: string): Promise<void>;
}
