import { db, requests } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.session) {
		redirect(303, '/login');
	}

	const openRequests = await db.select().from(requests).where(eq(requests.isOpen, true));

	return {
		user: locals.user,
		openRequests
	};
}) satisfies PageServerLoad;
