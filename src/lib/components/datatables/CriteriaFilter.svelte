<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import MultiSelect from 'svelte-multiselect';

	export let handler: DataHandler;
	export let centres: string[];

	const centreFilter = handler.createAdvancedFilter('centre');
	let selected: string[] = [];

	function handleSelectionChange(event: any) {
		const { type, option } = event.detail;
		if (type === 'add') {
			centreFilter.set(option);
		} else if (type === 'remove') {
			centreFilter.clear();
			selected.forEach((option) => {
				centreFilter.set(option);
			});
		} else if (type === 'removeAll') {
			centreFilter.clear();
		}
	}
</script>

<MultiSelect
	bind:selected
	options={centres}
	on:change={handleSelectionChange}
	on:removeAll={handleSelectionChange}
/>
