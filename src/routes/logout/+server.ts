import { lucia } from '$lib/auth';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	if (locals.session) {
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	return new Response('Logged out successfully', {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
