const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();

const { Pool } = pg;

let pool;

function buildPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DB_POOL_SIZE || 5),
    idleTimeoutMillis: 30000,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });
}

function getPool() {
  if (!pool) {
    pool = buildPool();
  }

  return pool;
}

async function checkDatabase() {
  const result = await getPool().query("SELECT 1 AS ok");
  return result.rows[0].ok === 1;
}

module.exports = {
  checkDatabase,
  getPool,
};
