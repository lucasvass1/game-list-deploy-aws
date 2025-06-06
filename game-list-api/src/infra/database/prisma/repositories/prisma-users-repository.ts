import { User } from '@/domain/entities/user';
import {
  PartialUser,
  StatsUserResponse,
  UsersRepository,
} from '@/domain/repositories/users-repository';
import { prisma } from '../client';
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { email },
    });

    if (!userData) return null;

    return new User(userData);
  }

  async create(user: User): Promise<PartialUser | null> {
    const userData = await prisma.user.create({
      data: {
        id: user.id ?? crypto.randomUUID(),
        password: user.password,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt ?? new Date(),
      },
    });

    return userData as PartialUser;
  }

  async stats(userId: string): Promise<StatsUserResponse> {
    const [games, categories, plataforms, favorites] = await Promise.all([
      prisma.game.count({ where: { userId } }),
      prisma.category.count({ where: { userId } }),
      prisma.plataform.count({ where: { userId } }),
      prisma.game.count({ where: { userId, isFavorite: true } }),
    ]);

    return {
      games,
      categories,
      plataforms,
      favorites,
    };
  }

  async findById(id: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { id },
    });

    if (!userData) return null;

    return new User(userData);
  }
}
