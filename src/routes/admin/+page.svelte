<script lang="ts">
	import { Nav } from '$lib';
	import RequestCard from './RequestCard.svelte';

	export let data;
</script>

<Nav authenticated={data.session !== null} />

<main class="flex flex-col gap-y-8 px-16 py-8">
	<h1 class="text-4xl font-bold text-primary">
		{#if data.openRequests.length < 1}
			No
		{/if}
		Open Requests
	</h1>

	<section>
		{#each data.openRequests as r (r.id)}
			<RequestCard {...r} />
		{/each}
	</section>
</main>
