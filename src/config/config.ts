import dotenv from "dotenv";

dotenv.config();

interface Server {
  hostname: string;
  port: string;
}

interface Database {
  HOST: string;
  USER: string;
  PASSWORD: string | undefined;
  PORT: string | undefined;
}

interface Tokens {
  ACCESS_TOKEN_SECRET: string | undefined;
  REFRESH_TOKEN_SECRET: string | undefined;
}

const SERVER: Server = {
  hostname: process.env.SERVER_HOSTNAME || "localhost",
  port: process.env.SERVER_PORT || "7878",
};

const DB: Database = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
};

export const TOKENS: Tokens = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export const SALT: string | undefined = process.env.SALT;

const config = {
  server: SERVER,
  db: DB,
};

export default config;
