export interface CategoryProps {
  id?: string;
  title: string;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  constructor(private props: CategoryProps) {}

  updateCategory(data: Partial<Pick<Category, 'title' | 'description'>>) {
    if (data.title) this.props.title = data.title;
    if (data.description) this.props.description = data.description;
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
