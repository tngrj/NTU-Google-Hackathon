import { tokenStore, fetchToken } from '$lib/store/token';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	let { accessToken, expirationTime } = get(tokenStore);

	// If the token is not set or expired, fetch a new one
	if (!accessToken || (expirationTime && Date.now() > expirationTime)) {
		await fetchToken();
		({ accessToken, expirationTime } = get(tokenStore));
	}

	const response = await fetch(
		`https://public-api.ssg-wsg.sg/courses/directory?pageSize=10&page=1&keyword=${params.slug}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);

	if (response.ok) {
		const data = await response.json();
		return { data };
	} else {
		return { status: response.status, error: new Error('Failed to call API') };
	}
};
