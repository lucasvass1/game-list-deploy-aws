import { PlataformAlreadyExistsError } from '@/domain/errors/plataform-already-exists-error';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';

type PlataformRequest = {
  id: string;
};

export class DeletePlataformUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({ id }: PlataformRequest): Promise<void> {
    const categoryExists = await this.plataformRepository.findById(id);

    if (!categoryExists) throw new PlataformAlreadyExistsError();

    await this.plataformRepository.delete(id);
  }
}
