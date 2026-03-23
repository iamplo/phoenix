import { Kysely, PostgresDialect } from "kysely";
import { Pool, types as pgTypes } from "pg";
import type { DB } from "./schema";
import { config } from 'dotenv';
import { resolve } from "path";

const result = config({ path: resolve(__dirname, '../.env') })

if (result.error) {
  throw result.error
}

console.log('Loaded environment variables:', result.parsed)

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const numericDecimalTypeId = 1700;
// Register a custom type parser for the PostgreSQL numeric type so
// that pg driver intercepts and returns a JavaScript number instead of
// Numeric string
pgTypes.setTypeParser(numericDecimalTypeId, (val) => {
  return parseFloat(val)
})

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// db instance should infer correct types; Kysely uses the DB interface
// to type queries and results, example: Numeric -> number, Generated<boolean>
// -> boolean, etc. Might need custom parser for geometry types in the future

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({ 
    pool,
   }),
});
