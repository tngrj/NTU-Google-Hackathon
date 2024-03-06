<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { CircleUser } from 'lucide-svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let parent: SvelteComponent;

	let showForm = false;

	const modalStore = getModalStore();

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	const cHeader = 'text-center text-2xl font-semibold';
	const cBtn = 'flex justify-end space-x-4';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<div class="flex justify-center"><CircleUser size={42} /></div>
		<header class={cHeader}>Unlock Personalised Recommendations</header>
		{#if !showForm}
			<div>
				<p>
					Create an account to access tailored course recommendations based on your skills. Join
					today to enhance your expertise and advance your career!
				</p>
				<br />

				<div class="flex justify-center space-x-4">
					<button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}
						>Cancel</button
					>
					<button type="button" class="btn variant-filled" on:click={() => (showForm = true)}
						>Sign Up</button
					>
				</div>
			</div>
		{/if}
		{#if showForm}<form
				action="/signup?/createUser"
				class={cForm}
				method="POST"
				use:enhance={() => {
					modalStore.close();
				}}
			>
				<label class="label">
					<span>Name</span>
					<input type="text" class="input" name="name" required />
				</label>
				<label class="label">
					<span>Email</span>
					<input type="email" class="input" name="email" required />
				</label>
				<label class="label">
					<span>Password</span>
					<input type="password" class="input" name="password" required />
				</label>

				<div class={cBtn}>
					<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
						>{parent.buttonTextCancel}</button
					>
					<button type="submit" class="btn {parent.buttonPositive}">Sign Up</button>
				</div>
			</form>
		{/if}
	</div>
{/if}
