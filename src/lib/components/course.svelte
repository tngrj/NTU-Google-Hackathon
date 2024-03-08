<script>
	export let course;
</script>

<div class="card m-4 p-4 flex flex-col mb-4">
	<div class="p-2">
		<div class="flex justify-between items-start">
			<div>
				<p class="trainer text-sm">{course.trainingProviderAlias}</p>
				<h2 class="title text-lg">{course.title}</h2>
			</div>
			<div class="flex flex-col items-end">
				<span class="cost">${course.totalCostOfTrainingPerTrainee}</span>
				<span class="duration">{course.totalTrainingDurationHour} hours</span>
			</div>
		</div>
		<br />
		<a
			href={`https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=${course.referenceNumber}`}
			target="_blank"
		>
			<span class="chip variant-filled-tertiary">More info</span>
		</a>
	</div>
</div>
