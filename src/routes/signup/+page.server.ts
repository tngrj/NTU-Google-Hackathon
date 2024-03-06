import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { prisma } from '$lib/server/prisma';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	createUser: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			typeof email !== 'string' ||
			email.length < 3 ||
			email.length > 31
			// || !/^[a-z0-9_-]+$/.test(email)
		) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const hashedPassword = await new Argon2id().hash(password);

		const existingUser = await prisma.user.findUnique({
			where: { email: email }
		});

		if (existingUser) {
			return fail(400, {
				message: 'Email is already used'
			});
		} else {
			const newUser = await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: hashedPassword
				}
			});
			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			throw redirect(302, '/');
		}
	}
};
