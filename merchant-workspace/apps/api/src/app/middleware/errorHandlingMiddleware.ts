import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { AuthenticationError, ConflictError, NotFoundError } from "@merchant-workspace/api-interfaces";
import { logger } from "../services/logger";

export const errorHandlingMiddleware = () => {
  return function (error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ValidationError) {
      logger.error(error.message);
      res.status(401).send(error.message);
    }

    if (error instanceof NotFoundError) {
      logger.error(error.message);
      res.status(error.status).send(error.message);
    }

    if (error instanceof AuthenticationError) {
      logger.error(error.message);
      res.status(error.status).send(error.message);
    }

    if (error instanceof ConflictError) {
      logger.error(error.message);
      res.status(error.status).send(error.message);
    }

    if (error) {
      logger.fatal(error);
    }

    next();
  };
};
