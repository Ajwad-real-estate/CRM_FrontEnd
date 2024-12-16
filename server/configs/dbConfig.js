import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT, 10),
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
  max: process.env.PGPOOLMAX, // Max connections in the pool
  min: process.env.PGPOOLMIN, // Min connections in the pool
  idleTimeoutMillis: process.env.PGIDLEOUT,
};

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function getPool() {
  return pool;
}

process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("Database connection pool closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});
