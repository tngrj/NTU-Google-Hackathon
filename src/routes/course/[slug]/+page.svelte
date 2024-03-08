<script lang="ts">
	import type { PageData } from '../$types';
	import Course from '$lib/components/course.svelte';

	export let data: PageData;

	let courses = data.data.data.courses;
</script>

<ol class="breadcrumb mt-4">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li class="crumb"><a class="anchor" href="/job">Job</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li class="crumb"><a class="anchor" href="/course">Courses</a></li>
</ol>

<div class="mx-auto w-2/3">
	{#each courses as course, index (index)}
		<Course {course} />
	{/each}
</div>
