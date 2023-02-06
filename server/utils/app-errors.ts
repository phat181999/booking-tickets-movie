const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 401,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  name: string;
  statusCode: number;
  description: string;
  constructor(name: string, statusCode: number, description: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error"
  ) {
    super(name, statusCode, description);
  }
}
module.exports = {
  STATUS_CODES,
  AppError,
  APIError,
};
