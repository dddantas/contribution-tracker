import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/features/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
} satisfies Config;
