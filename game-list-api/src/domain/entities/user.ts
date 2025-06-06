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
      id: props.id ?? crypto.randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      games: props.games ?? [],
      categories: props.categories ?? [],
      plataforms: props.plataforms ?? [],
      favorites: props.favorites ?? [],
    };
  }
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  get password() {
    return this.props.password;
  }
  addGame(gameId: string) {
    this.props.games?.push(gameId);
  }

  addCategory(categoryId: string) {
    this.props.categories?.push(categoryId);
  }

  addPlataform(plataformId: string) {
    this.props.plataforms?.push(plataformId);
  }

  addFavorite(gameId: string) {
    if (!this.props.favorites?.includes(gameId)) {
      this.props.favorites?.push(gameId);
    }
  }

  removeFavorite(gameId: string) {
    this.props.favorites = this.props.favorites?.filter((id) => id !== gameId);
  }
}
