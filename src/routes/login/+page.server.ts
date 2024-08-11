import { lucia } from '$lib/auth';
import { db, users } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { message, setError } from 'sveltekit-superforms/server';
import * as v from 'valibot';
import type { Actions, PageServerLoad } from './$types';

const schema = v.object({
	email: v.pipe(v.string(), v.email('Invalid email')),
	password: v.string()
});

export const load = (async ({ locals }) => {
	if (locals.session !== null) {
		redirect(301, '/admin');
	}

	const form = await superValidate(valibot(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const loginForm = await superValidate(request, valibot(schema));

		if (loginForm.valid === false) {
			return message(loginForm, {
				alertType: 'error',
				alertText: 'There was a problem with your submission.'
			});
		}

		const [existingUser] = await db
			.select({
				id: users.id,
				password: users.password
			})
			.from(users)
			.where(eq(users.email, loginForm.data.email));

		if (existingUser === undefined) {
			return setError(loginForm, 'email', 'Email not registered');
		}

		const isPasswordValid = await new Argon2id().verify(
			existingUser.password,
			loginForm.data.password
		);

		if (!isPasswordValid) {
			return setError(loginForm, 'password', 'Incorrect password');
		}

		// Add session cookie
		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(303, '/admin');
	}
};
