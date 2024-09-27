import { pgTable, serial, text, integer, jsonb, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const causes = pgTable('causes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const userCauses = pgTable('user_causes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  causeId: integer('cause_id').references(() => causes.id),
  type: varchar('type', { length: 20 }).notNull().default('regular'),
});

export const contributions = pgTable('contributions', {
  id: serial('id').primaryKey(),
  causeId: integer('cause_id').references(() => causes.id),
  userName: text('user_name').notNull(),
  amount: integer('amount').notNull(),
  paymentType: text('payment_type').notNull(),
  paymentData: jsonb('payment_data').notNull(),
});
