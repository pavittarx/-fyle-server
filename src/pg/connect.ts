import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
});

/* Listens to each new client connection being established. */
pool.on("connect", (client) => {
  console.log("[pg Pool]: A new client connection has been established.");
});

/* Handles any idle client errors */
pool.on("error", (err, client) => {
  console.error("[pg Pool]: Unexpected error on idle client", err);
  process.exit(-1);
});


/**
 * @param query
 * It gets a client from the pool, executes the provided query and releases the client. 
 */
export const execQuery = async (query: string) => {
  const client = await pool.connect();
  
  const res = await client.query(query).catch((err) => {
    console.error(`[pg execQuery]: Error while executing Query`);
    console.error(`\n \"${query}\"`);
    console.log(err);
  });

  client.release();
  return res;
};

/* Clear pool on Exit */
process.on("exit", () => pool.end());

export default pool;
