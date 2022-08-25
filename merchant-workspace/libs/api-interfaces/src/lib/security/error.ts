export class NotFoundError extends Error {
  public readonly status = 404;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class AuthenticationError extends Error {
  public readonly status = 401;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ConflictError extends Error {
  public readonly status = 409;
  constructor(message: string) {
    super();
    this.message = message;
  }
}
