export interface GameProps {
  id?: string;
  title: string;
  status: 'PLAYING' | 'DONE' | 'ABANDONED';
  categoryId: string;
  plataformId?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Game {
  private props: GameProps;

  constructor(props: GameProps) {
    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  updateGame(data: Partial<GameProps>) {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get plataformId() {
    return this.props.plataformId;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get description() {
    return this.props.description;
  }

  get endDate() {
    return this.props.endDate;
  }
}
