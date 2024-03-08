<script>
	import { onMount } from 'svelte';

	export let JobTitle;
	export let Company;

	const toTitleCase = (str) => {
		const smallWords = ['of', 'any'];
		return str.replace(/\w\S*/g, (word) => {
			return smallWords.includes(word.toLowerCase())
				? word
				: word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
		});
	};

	let fixedTitle = toTitleCase(JobTitle);

	const toUrlFormat = (str) => {
		const excludeWords = ['junior', 'senior', 'internship'];
		let words = str.split(/\s+/).filter((word) => !excludeWords.includes(word.toLowerCase()));
		return words.join('&').toLowerCase();
	};

	let urlFriendlyTitle = toUrlFormat(fixedTitle);
</script>

<div class="card m-4 p-4 flex flex-col mb-4">
	<div class="p-2 flex justify-between items-start">
		<div>
			<p class="trainer text-sm">{Company}</p>
			<h2 class="title text-lg">{fixedTitle}</h2>
		</div>
		<div>
			<a href={`course/${urlFriendlyTitle}`} class="btn variant-filled max-w-md w-full text-center">
				Explore Skills
			</a>
		</div>
	</div>
</div>
