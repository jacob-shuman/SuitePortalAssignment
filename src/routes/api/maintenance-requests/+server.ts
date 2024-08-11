import { db, requests } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
	// Only continue if logged in
	if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

	const openRequests = await db.select().from(requests).where(eq(requests.isOpen, true));

	return new Response(JSON.stringify(openRequests), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
