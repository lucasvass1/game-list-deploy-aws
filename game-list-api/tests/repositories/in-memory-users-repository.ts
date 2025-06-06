import { User } from '@/domain/entities/user';
import { StatsUserResponse } from '@/domain/repositories/users-repository';

export class InMemoryUsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex((item) => item.id === user.id);
    if (index >= 0) this.users[index] = user;
  }

  async stats(id: string): Promise<StatsUserResponse> {
    // simular estatísticas
    console.log('id', id);
    return {
      games: 10,
      categories: 30,
      plataforms: 4,
      favorites: 2,
    };
  }
}
