import { Plataform } from '@/domain/entities/plataform';
import { PlataformNotFoundError } from '@/domain/errors/plataform-not-found';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';
import { ensureOwnership } from '@/utils/ensure-ownership';

interface UpdatePlataformUseCaseRequest {
  plataformId: string;
  title?: string;
  updatedAt?: Date;
  company: string | null;
  imageUrl: string | null;
  acquisitionYear: Date | null;
  userId: string;
}

interface UpdatePlataformUseCaseResponse {
  plataform: Plataform;
}

export class UpdatePlataformUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({
    plataformId,
    title,
    acquisitionYear,
    company,
    imageUrl,
    updatedAt,
    userId,
  }: UpdatePlataformUseCaseRequest): Promise<UpdatePlataformUseCaseResponse> {
    const plataform = await this.plataformRepository.findById(plataformId);

    if (!plataform) throw new PlataformNotFoundError();

    ensureOwnership(plataform.userId, userId);

    plataform.updatePlataform({
      title,
      acquisitionYear,
      company,
      imageUrl,
      updatedAt: updatedAt,
    });

    await this.plataformRepository.update(plataform);

    return { plataform };
  }
}
