// game-list-api/src/domain/entities/user.ts

import { randomUUID } from 'crypto';

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;

  games?: string[];
  categories?: string[];
  plataforms?: string[];
  favorites?: string[];
}

export class User implements UserProps {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      games: props.games ?? [],
      categories: props.categories ?? [],
      plataforms: props.plataforms ?? [],
      favorites: props.favorites ?? [],
    };
  }

  get id(): string {
    return this.props.id!;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get games(): string[] {
    return this.props.games || [];
  }

  get categories(): string[] {
    return this.props.categories || [];
  }

  get plataforms(): string[] {
    return this.props.plataforms || [];
  }

  get favorites(): string[] {
    return this.props.favorites || [];
  }

  addGame(gameId: string) {
    this.props.games!.push(gameId);
  }

  addCategory(categoryId: string) {
    this.props.categories!.push(categoryId);
  }

  addPlataform(plataformId: string) {
    this.props.plataforms!.push(plataformId);
  }

  addFavorite(gameId: string) {
    if (!this.props.favorites!.includes(gameId)) {
      this.props.favorites!.push(gameId);
    }
  }

  removeFavorite(gameId: string) {
    this.props.favorites = this.props.favorites!.filter(id => id !== gameId);
  }
}
