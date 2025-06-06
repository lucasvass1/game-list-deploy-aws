import { Plataform, PlataformProps } from '@/domain/entities/plataform';
import { PlataformAlreadyExistsError } from '@/domain/errors/plataform-already-exists-error';
import { PlataformRepository } from '@/domain/repositories/plataform-repository';

type PlataformRequest = {
  title: string;
  createdAt?: Date;
  company: string | null;
  imageUrl: string | null;
  acquisitionYear: Date | null;
  userId: string;
};

type CreatePlataformResponse = {
  plataform: PlataformProps;
};

export class CreatePlataformUseCase {
  constructor(private plataformRepository: PlataformRepository) {}

  async execute({
    title,
    acquisitionYear,
    company,
    imageUrl,
    createdAt,
    userId,
  }: PlataformRequest): Promise<CreatePlataformResponse> {
    const data: PlataformProps = {
      userId,
      title,
      id: crypto.randomUUID(),
      acquisitionYear,
      company,
      imageUrl,
      createdAt,
    };

    const plataformExists = await this.plataformRepository.findByTitle(
      title,
      userId,
    );
    if (plataformExists) throw new PlataformAlreadyExistsError();

    const plataform = new Plataform(data);
    await this.plataformRepository.create(userId, plataform);

    return { plataform };
  }
}
