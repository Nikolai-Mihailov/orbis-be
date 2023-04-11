import pkg, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKENS } from "../../config/config";
import { User } from "../interfaces/user.interface";

const { verify } = pkg;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers["authorization"];

  try {
    if (!authorization) {
      throw new Error("You dont have authorization header");
    }

    const token: string = authorization.split(" ")[1];
    const verifiedUser: string | JwtPayload | undefined = verify(token, TOKENS.ACCESS_TOKEN_SECRET!, { algorithms: ["HS256"] });
    // To extend Request and to add user in it not in req.body...
    req.body.user = verifiedUser;
 
  } catch (error) {
    throw new Error("You are not authenticated");
  }

  return next();
};
