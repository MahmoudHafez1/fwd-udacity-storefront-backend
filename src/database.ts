import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT as unknown as number,
  database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
