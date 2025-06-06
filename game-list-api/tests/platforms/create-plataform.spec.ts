import { CreatePlataformUseCase } from '@/domain/use-cases/plataform/create-plataform';
import { InMemoryPlataformRepository } from 'tests/repositories/in-memory-plataform-repository';

let platformRepository: InMemoryPlataformRepository;
let createPlatformUseCase: CreatePlataformUseCase;

describe('Create Plataform', () => {
  beforeEach(() => {
    platformRepository = new InMemoryPlataformRepository();
    createPlatformUseCase = new CreatePlataformUseCase(platformRepository);
  });
  it('should create a plataform', async () => {
    const plataform = await createPlatformUseCase.execute({
      userId: 'user-1',
      title: 'PlayStation 5',
      company: 'Sony',
      imageUrl: 'http://image.com/ps5.png',
      acquisitionYear: new Date(),
      createdAt: new Date(),
    });

    expect(plataform?.plataform).toHaveProperty('id');
    expect(plataform.plataform?.title).toBe('PlayStation 5');
  });
});
