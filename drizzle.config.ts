import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });


export default {
  schema: "./lib/schema.ts",
  out: "./db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
  strict: true,
  verbose: true,
} satisfies Config;
