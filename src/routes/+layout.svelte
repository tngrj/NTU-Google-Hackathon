<script lang="ts">
	import '../app.postcss';
	import { AppShell, Toast, initializeStores, Modal, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Target } from 'lucide-svelte';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;
	let userRole = data.user;
</script>

<Toast />
<Modal />

<AppShell>
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><Target size={48} /></a>
			</svelte:fragment>
			<h3 class="h3">RetrenchGoWhere</h3>
		</AppBar></svelte:fragment
	>

	<div class="container mx-auto">
		<slot />
	</div>
</AppShell>
