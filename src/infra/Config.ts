import parseDbUrl from "parse-database-url";
import dotenv from "dotenv";

dotenv.config();

export namespace Database {
  export const schema = "api";
  export const url =
    process.env.DATABASE_URL ||
    "postgres://api-user@localhost:5432/api-example";
  export const config = parseDbUrl(url);
  export const {
    database,
    user,
    name,
    username,
    password,
    hostname,
    host,
    port,
  } = config;
  export const poolMin = Number(process.env.DATABASE_POOL_MIN || "0");
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || "10");
  export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || "10000");
}

export namespace Knex {
  export const config = {
    client: "sqlite3",
    connection: {
      filename: `./${process.env.NODE_ENV || "dev"}.sqlite`,
    },
  };
}


export default {Database, Knex}