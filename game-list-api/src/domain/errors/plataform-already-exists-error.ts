export class PlataformAlreadyExistsError extends Error {
  constructor() {
    super('Plataform already exists');
  }
}
