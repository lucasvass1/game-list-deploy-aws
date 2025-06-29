import { PlataformProps } from '@/domain/entities/plataform';
import { ListPlataformParams } from '@/domain/repositories/plataform-repository';
import { CreatePlataformUseCase } from '@/domain/use-cases/plataform/create-plataform';
import { DeletePlataformUseCase } from '@/domain/use-cases/plataform/delete-plataform';
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

 async findByTitle(title: string, userId: string) {
  const useCase = new FindPlataformByTitleUseCase(this.repository);
  const plataform = await useCase.execute({ title, userId }); // ✅ Passando os dois argumentos
  return plataform;
}

  async list({
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
    userId = '',
  }) {
    const params = { page, limit, sortBy, order };

    const useCase = new ListPlataformUseCase(this.repository);
    const result = await useCase.execute(params as ListPlataformParams, userId);
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

  async update(data: PlataformProps, userId: string) {
    const useCase = new UpdatePlataformUseCase(this.repository);

    const { plataform } = await useCase.execute({
      plataformId: data.id as string,
      title: data.title,
      acquisitionYear: data.acquisitionYear,
      company: data.company,
      imageUrl: data.imageUrl,
      updatedAt: data.updatedAt ?? new Date(),
      userId,
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

  async delete(id: string, userId: string) {
    const useCase = new DeletePlataformUseCase(this.repository);

    await useCase.execute({ id, userId });
  }
}
