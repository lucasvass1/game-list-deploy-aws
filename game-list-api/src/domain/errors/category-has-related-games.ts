export class CategoryHasRelatedGamesError extends Error {
  constructor() {
    super('Cannot delete category with related games');
  }
}
