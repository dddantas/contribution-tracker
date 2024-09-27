import 'dotenv/config';
import postgres from 'postgres';

import { Database } from './types';
import { drizzle } from 'drizzle-orm/postgres-js';

export const queryClient = postgres({
  user: process.env.PG_USER,
  pass: process.env.PG_PASSWORD,
  db: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
});

export const db: Database = drizzle(queryClient);
