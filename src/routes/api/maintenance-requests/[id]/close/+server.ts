import { db, requests } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, params }) => {
	// Only continue if logged in
	if (!locals.session) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const request = db
			.select()
			.from(requests)
			.where(eq(requests.id, params.id ?? ''))
			.get();

		if (!request?.isOpen) {
			return new Response('Request already closed', { status: 409 });
		}

		await db
			.update(requests)
			.set({ isOpen: false })
			.where(eq(requests.id, params.id ?? ''));

		return new Response(JSON.stringify(request), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (e) {
		return new Response('Request not found', { status: 404 });
	}
};
