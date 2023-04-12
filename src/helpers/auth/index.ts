import pkg from "jsonwebtoken";
import { TOKENS } from "../../config/config";
const { sign } = pkg;

export const createAccessToken = (userId: number, name: string, email: string) => {
  return sign({ userId, name, email }, TOKENS.ACCESS_TOKEN_SECRET!, {
    noTimestamp: true,
    expiresIn: "60m"
  });
};

export const createRefreshToken = (userId: number, name: string, email: string) => {
  return sign({ userId, name, email }, TOKENS.REFRESH_TOKEN_SECRET!, {
    noTimestamp: true,
    expiresIn: "1d"
  });
};
