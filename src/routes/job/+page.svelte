<script lang="ts">
	import type { PageData } from './$types';
	import FindRelevantJob from '$lib/components/findRelevantJob.svelte';

	export let data: PageData;
</script>

<div class="container">
	<ol class="breadcrumb mt-4">
		<li class="crumb"><a class="anchor" href="/">Home</a></li>
		<li class="crumb-separator" aria-hidden>/</li>
		<li class="crumb"><a class="anchor" href="/job">Job</a></li>
	</ol>

	<br />
	<div class="max-w-4xl mx-auto">
		{#each data.jobs as job}
			<FindRelevantJob {job} />
		{/each}
	</div>
</div>
