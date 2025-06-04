import { PlataformProps } from '@/domain/entities/plataform';
import {
  ListPlataformParams,
  PlataformRepository,
} from '@/domain/repositories/plataform-repository';

type ListPlataformsResponse = {
  plataforms: PlataformProps[];
  total: number;
  page: number;
  limit: number;
  sortBy?: 'name' | 'acquisitionYear' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
};

export class ListPlataformUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute(params: ListPlataformParams): Promise<ListPlataformsResponse> {
    const plataforms = await this.plataformRepository.findMany(params);

    return {
      plataforms: plataforms.plataforms,
      total: plataforms.total,
      page: plataforms.page,
      limit: plataforms.limit,
    };
  }
}
