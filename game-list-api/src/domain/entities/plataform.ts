export interface PlataformProps {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  company: string | null;
  imageUrl: string | null;
  acquisitionYear: Date | null;
  userId: string;
}

export class Plataform {
  private props: PlataformProps;

  constructor(props: PlataformProps) {
    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  updatePlataform(
    data: Partial<
      Pick<
        Plataform,
        'title' | 'acquisitionYear' | 'company' | 'imageUrl' | 'updatedAt'
      >
    >,
  ) {
    if (data.title) this.props.title = data.title;
    if (data.acquisitionYear) this.props.acquisitionYear = data.acquisitionYear;
    if (data.company) this.props.company = data.company;
    if (data.imageUrl) this.props.imageUrl = data.imageUrl;
    if (data.updatedAt) this.props.updatedAt = data.updatedAt;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get company() {
    return this.props.company;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get acquisitionYear() {
    return this.props.acquisitionYear;
  }

  get userId() {
    return this.props.userId;
  }
}
