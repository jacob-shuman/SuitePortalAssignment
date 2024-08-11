import { ServiceType } from '$lib';
import { db, requests } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';
import type { PageServerLoad } from './$types';

const schema = v.object({
	name: v.string(),
	email: v.pipe(v.string(), v.email('Invalid email')),
	unitNumber: v.string(),
	serviceType: v.enum(ServiceType),
	summary: v.string(),
	details: v.nullable(v.string())
});

export const load = (async ({ locals }) => {
	if (locals.session !== null) {
		redirect(301, '/admin');
	}

	const form = await superValidate(valibot(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const requestForm = await superValidate(request, valibot(schema));

		if (requestForm.valid === false) {
			return message(requestForm, {
				alertType: 'error',
				alertText: 'There was a problem with your submission.'
			});
		}

		await db.insert(requests).values({
			id: generateId(15),
			...requestForm.data,
			isOpen: true
		});
	}
};
