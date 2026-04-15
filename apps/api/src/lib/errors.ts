import type { ContentfulStatusCode } from "hono/utils/http-status"

export class AppError extends Error {
  public readonly statusCode: ContentfulStatusCode
  public readonly code: string

  constructor(message: string, statusCode: ContentfulStatusCode, code: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid request") {
    super(message, 400, "VALIDATION_ERROR")
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND")
  }
}
