import { Request, Response, NextFunction } from "express";
import pkg, { JwtPayload } from "jsonwebtoken";
import { TOKENS } from "../../config/config";

const { verify } = pkg;

interface TokenPayload {
  userId: number;
  name: string;
  email: string;
  exp: number;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers["authorization"];

  try {
    if (!authorization) {
      throw new Error("You dont have authorization header");
    }

    const token: string = authorization.split(" ")[1];
    const verifiedToken: string | JwtPayload | undefined = verify(token, TOKENS.ACCESS_TOKEN_SECRET!);
    const { userId, email, name } = verifiedToken as TokenPayload;

    if (!req.currentUser) {
      req.currentUser = { userId, email, name };
    }
  } catch (error) {
    throw new Error("You are not authenticated");
  }

  return next();
};
