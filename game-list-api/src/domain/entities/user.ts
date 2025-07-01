// No topo do arquivo, importe do módulo 'crypto'
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

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      // Substitua crypto.randomUUID() por randomUUID()
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      games: props.games ?? [],
      categories: props.categories ?? [],
      plataforms: props.plataforms ?? [],
      favorites: props.favorites ?? [],
    };
  }
  // ... demais getters e métodos
}
