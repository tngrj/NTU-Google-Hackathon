import { writable } from 'svelte/store';

export const jobStore = writable<string[]>([]);
