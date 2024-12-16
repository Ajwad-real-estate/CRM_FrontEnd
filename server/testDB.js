import { getPool } from "./configs/dbConfig.js";

(async () => {
  try {
    const pool = await getPool();
    const result = await pool.query("SELECT NOW()");
    console.log("Current Timestamp:", result.rows[0]);
  } catch (error) {
    console.error("Database test error:", error);
  }
})();
