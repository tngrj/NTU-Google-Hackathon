<script lang="ts">
	import { enhance } from '$app/forms';
	import { FileButton, ProgressRadial } from '@skeletonlabs/skeleton';

	let files: FileList;

	let isLoading = false;
	let jobData = null;
</script>

<div class="flex justify-center items-center mt-48">
	{#if isLoading}
		<ProgressRadial />
	{:else if jobData}
		<ol class="list">
			{#each jobData as job}
				<li>
					<span class="card">{job}</span>
				</li>
			{/each}
		</ol>
	{:else}
		<div class="flex flex-col">
			<p class="text-5xl">What Role ?</p>

			<br />
			<form
				method="POST"
				action="?/searchJobs"
				enctype="multipart/form-data"
				use:enhance={({}) => {
					isLoading = true;
					return async ({ result }) => {
						jobData = result.data.data.split(',');
						console.log(jobData);
						isLoading = false;
					};
				}}
			>
				<div class="relative">
					<input
						type="text"
						id="job-input"
						name="jobTitle"
						class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						for="job-input"
						class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
						>Job Title</label
					>
				</div>
				<br />
				<div class="justify-center space-y-4">
					<FileButton name="files" bind:files button="btn variant-soft-surface"
						>Upload Resume</FileButton
					>

					{#if files && files[0]}
						<p>Uploaded file: {files[0].name}</p>
					{/if}
					<button type="submit" class="btn variant-filled">Get me a new J O B ! →</button>
				</div>
			</form>
		</div>
	{/if}
</div>
