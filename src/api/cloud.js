import { PROJECT_ID, LOCATION, FUNCTION_NAME } from '$env/static/private';

import https from 'https';

export async function callCloudFunction(job_title, industry) {
	const postData = JSON.stringify({
		job_title: job_title,
		input_industry: industry
	});

	const options = {
		hostname: `${LOCATION}-${PROJECT_ID}.cloudfunctions.net`,
		path: `/${FUNCTION_NAME}`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postData)
		}
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				// console.log('Response from Cloud Function where data is:', data);
				resolve(data);
			});
		});

		req.on('error', (error) => {
			console.error('Error calling Cloud Function:', error.message);
			reject(error);
		});

		req.write(postData);
		req.end();
	});
}
