// test-pg.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "benja",
  port: 5432,
});

try {
  const res = await pool.query("SELECT NOW()");
  console.log("Connected:", res.rows[0]);
} catch (err) {
  console.error("❌ Connection failed:", err);
} finally {
  await pool.end();
}
