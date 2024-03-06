import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { generateContent } from '../api/gemini';

export const load: PageServerLoad = async (event) => {
	// if (!event.locals.user) {
	// 	throw redirect(302, '/login');
	// }
	// return {
	// 	user: event.locals.user
	// };
};

export const actions: Actions = {
	searchJobs: async ({ request, params }) => {
		const data = await request.formData();
		const jobTitle = data.get('jobTitle');
		const file = data.get('files');

		console.log('jobTitle:', jobTitle);
		console.log('file:', file);

		generateContent(jobTitle, file);
	},
	signOut: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		console.log('Successfuly Signed Out!');
		throw redirect(302, '/login');
	}
};
