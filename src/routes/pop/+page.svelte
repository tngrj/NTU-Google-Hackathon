<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import DeliverableForm from '$lib/components/dialogForm.svelte';

	const modalStore = getModalStore();

	async function openDeliverableForm(): Promise<void> {
		const x: ModalComponent = { ref: DeliverableForm };
		const modal: ModalSettings = {
			type: 'component',
			component: x,
			title: 'Add Deliverables'
		};
		modalStore.trigger(modal);
	}
</script>

<div class="container mx-auto px-auto flex items-center justify-center h-screen">
	<button class="btn variant-filled mr-4" on:click={openDeliverableForm}>Button</button>
</div>
