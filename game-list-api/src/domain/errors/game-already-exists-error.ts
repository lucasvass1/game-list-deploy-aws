export class GameAlreadyExistsError extends Error {
  constructor() {
    super('Game already exists');
  }
}
