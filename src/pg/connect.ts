import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT? parseInt(process.env.PG_PORT) : 5432,
});

export default pool;