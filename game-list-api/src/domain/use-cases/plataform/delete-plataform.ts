import { PlataformAlreadyExistsError } from '@/domain/errors/plataform-already-exists-error';
import { PlataformHasRelatedGamesError } from '@/domain/errors/plataform-has-related-games';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';
import { ensureOwnership } from '@/utils/ensure-ownership';

type PlataformRequest = {
  id: string;
  userId: string;
};

export class DeletePlataformUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({ id, userId }: PlataformRequest): Promise<void> {
    const platformExists = await this.plataformRepository.findById(id);

    if (!platformExists) throw new PlataformAlreadyExistsError();

    const hasGames = await this.plataformRepository.hasRelatedGames(id);

    if (hasGames) {
      throw new PlataformHasRelatedGamesError();
    }

    ensureOwnership(platformExists.userId, userId);

    await this.plataformRepository.delete(id);
  }
}
