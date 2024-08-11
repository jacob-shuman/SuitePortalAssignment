import type { Config } from 'drizzle-kit';

export default {
	schema: 'src/lib/db/schema.ts',
	out: './drizzleMigrations',
	driver: 'turso',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:./local.db'
	}
} satisfies Config;
