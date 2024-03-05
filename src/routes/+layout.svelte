<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Toast, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;
	let userRole = data.user;
</script>

<Toast />
<Modal />
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header" />

	<svelte:fragment slot="sidebarLeft" />

	<!-- Page Route Content -->
	<div class="container mx-auto"><slot /></div>
</AppShell>
