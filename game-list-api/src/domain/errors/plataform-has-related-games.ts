export class PlataformHasRelatedGamesError extends Error {
  constructor() {
    super('Cannot delete plataform with related games');
  }
}
