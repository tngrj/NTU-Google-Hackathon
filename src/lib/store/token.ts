import { writable } from 'svelte/store';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { Buffer } from 'buffer';

export const tokenStore = writable<{ accessToken: string | null; expirationTime: number | null }>({
	accessToken: null,
	expirationTime: null
});

export async function fetchToken() {
	const clientId = CLIENT_ID;
	const clientSecret = CLIENT_SECRET;

	// Encode client ID and secret
	const credentials = `${clientId}:${clientSecret}`;
	const encodedCredentials = Buffer.from(credentials).toString('base64');

	// Set the URL for token retrieval
	const tokenUrl = 'https://public-api.ssg-wsg.sg/dp-oauth/oauth/token';

	// Set the headers
	const headers = {
		Authorization: `Basic ${encodedCredentials}`,
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	// Set the form data for grant_type
	const data = new URLSearchParams({
		grant_type: 'client_credentials'
	});

	// Make a POST request to retrieve the token
	const response = await fetch(tokenUrl, {
		method: 'POST',
		headers: headers,
		body: data
	});

	// Check if the request was successful
	if (response.ok) {
		// Extract the access token from the response
		const responseData = await response.json();
		const { access_token, expires_in } = responseData;

		const expirationTime = Date.now() + expires_in * 1000;

		// Store the token and expiration time
		tokenStore.set({ accessToken: access_token, expirationTime });
	} else {
		console.log('Failed to retrieve access token:', response.statusText);
	}
}
