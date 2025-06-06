export class EndDateGameRequiredError extends Error {
  constructor() {
    super('End date is required when status is DONE or ABANDONED');
  }
}
