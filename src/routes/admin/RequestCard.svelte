<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button, toast } from '$lib';
	import type { requests } from '$lib/db';
	import tw from 'clsx';
	import type { InferSelectModel } from 'drizzle-orm';

	const { id, name, email, details, serviceType, summary, unitNumber } =
		$$props as InferSelectModel<typeof requests>;
	const chipClasses = tw({
		'bg-yellow-800 text-yellow-100': serviceType === 'electrical',
		'bg-blue-800 text-blue-100': serviceType === 'general',
		'bg-green-800 text-green-100': serviceType === 'pest-control',
		'bg-red-800 text-red-100': serviceType === 'plumbing'
	});
</script>

<article class="flex flex-col gap-y-4 rounded border px-4 py-2">
	<div class="flex flex-col gap-y-2">
		<div>
			<h2 class="text-xl font-bold">Sent by <span class="italic">{name}</span></h2>
			<a
				class="italic transition-colors duration-100 ease-out hover:text-secondary"
				href={`mailto:${email}`}
			>
				{email}
			</a>
		</div>

		<div class="flex gap-x-2">
			<span class={tw('rounded px-4 py-1 text-sm', chipClasses)}>
				Unit {unitNumber}
			</span>

			<span class={tw('rounded px-4 py-1 text-sm', chipClasses)}>
				{serviceType}
			</span>
		</div>
	</div>

	<div class="flex flex-col gap-y-1">
		<p>{summary}</p>

		{#if details}
			<p class="text-sm">{details}</p>
		{/if}
	</div>

	<Button
		class="block rounded px-4 py-2 transition-all duration-100 ease-out hover:-translate-y-1 hover:bg-secondary hover:text-white"
		onclick={async () => {
			const result = await fetch(`/api/maintenance-requests/${id}/close`);

			await invalidateAll();

			if (result.status === 200) {
				toast('Request closed successfully');
			}
		}}
	>
		Close Request
	</Button>
</article>
