import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {AuthenticationError} from "@merchant-workspace/api-interfaces";

type Decoded = {
  userId: number,
  email: string,
  iat: number,
  exp: number

}

export const authMiddleware = () => {
  // TODO ignore some endpoints (like account list)
  return function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization')
    const token = authHeader.split(' ')[1]

    try {
      // TODO add secret
      const decoded = jwt.verify(token, "secret");
      req.user = {
        id: (decoded as Decoded).userId,
        email: (decoded as Decoded).email,
      };
    } catch (err) {
      throw new AuthenticationError("Invalid Token");
    }

    next();
  };
};
