import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Database = PostgresJsDatabase<Record<string, any>>;

export { Database };
