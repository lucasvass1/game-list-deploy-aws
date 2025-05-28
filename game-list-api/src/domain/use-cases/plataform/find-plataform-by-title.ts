import { Plataform } from '@/domain/entities/plataform';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';

type FindPlataformByTitleRequest = { title: string };

type FindPlataformByTitleResponse = { plataform: Plataform } | null;

export class FindPlataformByTitleUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({
    title,
  }: FindPlataformByTitleRequest): Promise<FindPlataformByTitleResponse> {
    const plataform = await this.plataformRepository.findByTitle(title);
    if (!plataform) {
      return null;
    }

    return { plataform };
  }
}
