import {ValidationError} from "joi";
import {AuthenticationError, ConflictError, NotFoundError} from "@merchant-workspace/api-interfaces";

export const handleError = (error: unknown): string => {
  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof NotFoundError) {
    return error.message
  }

  if (error instanceof AuthenticationError) {
    return error.message
  }

  if (error instanceof ConflictError) {
    return error.message
  }

  return (error as any).toString() // TODO find better way
}
