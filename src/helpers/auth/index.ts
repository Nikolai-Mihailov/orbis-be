import pkg from "jsonwebtoken";
import { TOKENS } from "../../config/config";
const { sign } = pkg;

export const createAccessToken = (name: string, email: string) => {
  return sign({ name, email }, TOKENS.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (name: string, email: string) => {
  return sign({ name, email }, TOKENS.REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
};
