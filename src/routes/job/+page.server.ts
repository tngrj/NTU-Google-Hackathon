import { jobStore } from '$lib/store/job';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { jobs: get(jobStore) };
};
