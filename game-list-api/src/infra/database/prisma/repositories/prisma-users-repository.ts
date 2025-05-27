import { User } from '@/domain/entities/user';
import { UsersRepository } from '@/domain/repositories/users-repository';
import { prisma } from '../client';
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: { email },
    });

    if (!userData) return null;

    return new User(userData);
  }
}
