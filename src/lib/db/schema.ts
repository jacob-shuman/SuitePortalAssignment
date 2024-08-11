import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey().notNull(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});

export const requests = sqliteTable('requests', {
	id: text('id').primaryKey().notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	unitNumber: text('unit_number').notNull(),
	serviceType: text('service_type').notNull(),
	summary: text('summary').notNull(),
	details: text('details'),
	isOpen: integer('isOpen', { mode: 'boolean' }).notNull()
});
