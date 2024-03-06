import { VertexAI } from '@google-cloud/vertexai';
import { PROJECT_ID, LOCATION, MODEL } from '$env/static/private';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = MODEL;

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
	model: model,
	generation_config: {
		max_output_tokens: 2048,
		temperature: 0.4,
		top_p: 1,
		top_k: 32
	},
	safety_settings: [
		{
			category: 'HARM_CATEGORY_HATE_SPEECH',
			threshold: 'BLOCK_MEDIUM_AND_ABOVE'
		},
		{
			category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
			threshold: 'BLOCK_MEDIUM_AND_ABOVE'
		},
		{
			category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
			threshold: 'BLOCK_MEDIUM_AND_ABOVE'
		},
		{
			category: 'HARM_CATEGORY_HARASSMENT',
			threshold: 'BLOCK_MEDIUM_AND_ABOVE'
		}
	]
});

export async function generateContent(jobTitle, file) {
	const pdfBytes = await file.arrayBuffer();

	// Load the PDF document
	const pdfDoc = await pdfjsLib.getDocument(pdfBytes).promise;

	// Get the number of pages
	const numPages = pdfDoc.numPages;

	// Initialize an empty string to store the combined text
	let combinedText = '';

	// Loop through all pages and extract text
	for (let pageNum = 1; pageNum <= numPages; pageNum++) {
		const page = await pdfDoc.getPage(pageNum);
		const textContent = await page.getTextContent();
		const pageText = textContent.items.map((item) => item.str).join('');
		combinedText += pageText;
	}

	const req = {
		contents: [
			{
				role: 'user',
				parts: [
					{
						text: `Given my resume ${combinedText} and my current job title as ${jobTitle}, can u recommend other 8 jobs that I can apply for? Just list out the jobs without a header or numeric, seperate each job using a comma only. `
					}
				]
			}
		]
	};
	const streamingResp = await generativeModel.generateContentStream(req);

	let responseText = '';
	for await (const item of streamingResp.stream) {
		const candidates = item.candidates || [];
		for (const candidate of candidates) {
			const contentParts = candidate.content.parts || [];
			for (const part of contentParts) {
				responseText += part.text;
			}
		}
	}

	return responseText;
}
