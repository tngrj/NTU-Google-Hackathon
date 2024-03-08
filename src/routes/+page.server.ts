import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { generateContent } from '../api/gemini';
import { jobStore } from '$lib/store/job';
import { callCloudFunction } from '../api/cloud';

export const load: PageServerLoad = async (event) => {
	// if (!event.locals.user) {
	// 	throw redirect(302, '/login');
	// }
	// return {
	// 	user: event.locals.user
	// };
};

export const actions: Actions = {
	searchJobs: async ({ request }) => {
		const data = await request.formData();
		const jobTitle = data.get('jobTitle');
		const industry = data.get('category');
		const file = data.get('files');

		// console.log('jobTitle:', jobTitle);
		// console.log('file:', file);

		const response = await generateContent(jobTitle, file);
		let relevantJob = response.split(',');

		let promises = relevantJob.map(async (_job) => {
			const response = await callCloudFunction(_job, industry);
			const parsedResponse = JSON.parse(response);
			// console.log('raw:', parsedResponse);
			// Check if the data object has a value greater than 0
			const dataValues = Object.values(parsedResponse.data);
			if (dataValues.some((value) => value > 0)) {
				// console.log('greater:', parsedResponse);
				return parsedResponse;
			} else {
				return null;
			}
		});

		// Wait for all the cloud function calls to complete
		let allJobs = (await Promise.all(promises)).flat().filter((job) => job !== null);

		// Sort allJobs by the value in the 'data' object in descending order
		allJobs.sort((a, b) => {
			const aValue = Object.values(a.data)[0];
			const bValue = Object.values(b.data)[0];
			return bValue - aValue;
		});

		// Update the jobStore with the sorted jobs
		jobStore.set(allJobs);
		// console.log('allJobs:', allJobs);
		throw redirect(302, '/job');
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
