<script>
	import Job from '$lib/components/job.svelte';

	export let job;
	let jobTitle = Object.keys(job.data)[0];
	let numRelevantRoles = Object.values(job.data)[0];
	let showJobListings = false;
</script>

<div class="card m-4 p-4">
	<div class="flex p-2 justify-between">
		<div>
			<h2 class="text-lg">{jobTitle}</h2>
			<span class="badge variant-ghost-success"> {numRelevantRoles} opportunities </span>
		</div>

		<div>
			<button
				type="button"
				class="btn variant-filled"
				on:click={() => (showJobListings = !showJobListings)}>Find Relevant Jobs</button
			>
		</div>
	</div>
	{#if showJobListings}
		{#each job.result_json as listing, index (index)}
			<Job Company={listing['Company']} JobTitle={listing['Job Title']} />
		{/each}
	{/if}
</div>
