import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import {AuthenticationError, ConflictError, NotFoundError} from "@merchant-workspace/api-interfaces";

export const handleError = () => {
  return function (err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    // TODO add other error handling

    if (err instanceof ValidationError) {
      console.log(err.message);
      res.status(401).send(err.message);
    }

    if (err instanceof NotFoundError) {
      console.log(err.message);
      res.status(err.status).send(err.message);
    }

    if (err instanceof AuthenticationError) {
      console.log(err.message);
      res.status(err.status).send(err.message);
    }

    if (err instanceof ConflictError) {
      console.log(err.message);
      res.status(err.status).send(err.message);
    }

    next();
  };
};


