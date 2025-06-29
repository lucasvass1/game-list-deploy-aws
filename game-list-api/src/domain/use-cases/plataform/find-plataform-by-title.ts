import { Plataform } from '@/domain/entities/plataform';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';

type FindPlataformByTitleRequest = {
  title: string;
  userId: string;  // Adicionei userId aqui
};

type FindPlataformByTitleResponse = { plataform: Plataform } | null;

export class FindPlataformByTitleUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({
    title,
    userId,
  }: FindPlataformByTitleRequest): Promise<FindPlataformByTitleResponse> {
    const plataform = await this.plataformRepository.findByTitle(title, userId); // Passa os dois argumentos
    if (!plataform) {
      return null;
    }

    return { plataform };
  }
}
