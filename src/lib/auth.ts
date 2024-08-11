import { dev } from '$app/environment';
import { sessions, users } from '$lib/db/schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { Lucia } from 'lucia';

export const lucia = new Lucia(
	new DrizzleSQLiteAdapter(drizzle(new Database('local.db')), sessions, users),
	{
		sessionCookie: {
			attributes: {
				secure: !dev
			}
		},
		getUserAttributes: (attributes) => {
			return {
				name: attributes.name,
				email: attributes.email
			};
		}
	}
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			name: string;
			email: string;
		};
	}
}
