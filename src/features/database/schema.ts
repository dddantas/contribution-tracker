import { pgTable, serial, text, integer, jsonb, varchar, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  uuid: uuid('uuid').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const causes = pgTable('causes', {
  uuid: uuid('uuid').primaryKey(),
  name: text('name').notNull(),
});

export const userCauses = pgTable('user_causes', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.uuid),
  causeId: uuid('cause_id').references(() => causes.uuid),
  type: varchar('type', { length: 20 }).notNull().default('regular'),
});

export const contributions = pgTable('contributions', {
  uuid: uuid('uuid').primaryKey(),
  causeId: uuid('cause_id').references(() => causes.uuid),
  userName: text('user_name').notNull(),
  amount: integer('amount').notNull(),
  paymentType: text('payment_type').notNull(),
  paymentData: jsonb('payment_data').notNull(),
});
