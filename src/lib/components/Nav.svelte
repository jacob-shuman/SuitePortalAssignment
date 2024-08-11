<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib';
	import { IconLoader2 } from '@tabler/icons-svelte';

	export let authenticated = false;
	const buttonClasses =
		'block rounded px-4 py-2 transition-all duration-100 ease-out hover:-translate-y-1 hover:bg-secondary hover:text-white';
	let loading = false;
</script>

<nav class="flex justify-between border-b-2 border-primary/20 px-4 py-2">
	<img src="/suite-spot.svg" class="w-36" />

	<ul class="flex items-center">
		<li>
			{#if authenticated}
				<Button
					class={buttonClasses}
					onclick={async () => {
						loading = true;
						await fetch('/logout');
						await invalidateAll();
					}}
				>
					{#if loading}
						<IconLoader2 />
					{:else}
						Logout
					{/if}
				</Button>
			{:else}
				<a href="/login" class={buttonClasses}> Admin Portal </a>
			{/if}
		</li>
	</ul>
</nav>
