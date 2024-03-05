import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// if (!event.locals.user) {
	// 	throw redirect(302, '/login');
	// }
	// return {
	// 	user: event.locals.user
	// };
};

export const actions: Actions = {
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
