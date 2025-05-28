import { PlataformProps } from '@/domain/entities/plataform';
import { PlataformNotFoundError } from '@/domain/errors/plataform-not-found';
import { ListPlataformParams } from '@/domain/repositories/plataform-repository';
import { CreatePlataformUseCase } from '@/domain/use-cases/plataform/create-plataform';
import { FindPlataformByTitleUseCase } from '@/domain/use-cases/plataform/find-plataform-by-title';
import { ListPlataformUseCase } from '@/domain/use-cases/plataform/list-plataform';
import { UpdatePlataformUseCase } from '@/domain/use-cases/plataform/update-plataform';
import { PrismaPlataformRepository } from '@/infra/database/prisma/repositories/prisma-plataform-repository';

export class PlataformsController {
  constructor(private readonly repository: PrismaPlataformRepository) {}

  async create(data: PlataformProps) {
    const useCase = new CreatePlataformUseCase(this.repository);
    const { plataform } = await useCase.execute(data);
    return {
      title: plataform.title,
      id: plataform.id,
      createdAt: plataform.createdAt ?? new Date(),
      updatedAt: plataform.updatedAt ?? null,
      company: plataform.company ?? null,
      imageUrl: plataform.imageUrl ?? null,
      acquisitionYear: plataform.acquisitionYear ?? null,
    };
  }

  async findByTitle(title: string) {
    const useCase = new FindPlataformByTitleUseCase(this.repository);
    const plataform = await useCase.execute({ title });
    return plataform;
  }

  async list({ page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' }) {
    const params = { page, limit, sortBy, order };

    const useCase = new ListPlataformUseCase(this.repository);
    const result = await useCase.execute(params as ListPlataformParams);
    return {
      plataforms: result.plataforms,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  async findById(id: string) {
    const plataform = await this.repository.findById(id);
    return plataform;
  }

  async update(data: PlataformProps) {
    const useCase = new UpdatePlataformUseCase(this.repository);

    const plataformExists = await this.repository.findById(data.id as string);
    if (!plataformExists) throw new PlataformNotFoundError();

    const { plataform } = await useCase.execute({
      plataformId: data.id as string,
      title: data.title,
      acquisitionYear: data.acquisitionYear,
      company: data.company,
      imageUrl: data.imageUrl,
      updatedAt: data.updatedAt ?? new Date(),
    });
    return {
      title: plataform.title,
      id: plataform.id,
      createdAt: plataform.createdAt ?? new Date(),
      updatedAt: plataform.updatedAt ?? null,
      company: plataform.company ?? null,
      imageUrl: plataform.imageUrl ?? null,
      acquisitionYear: plataform.acquisitionYear ?? null,
    };
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
