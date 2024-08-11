<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let type: HTMLButtonAttributes['type'] = undefined;
	export let disabled: HTMLButtonAttributes['disabled'] = undefined;
	export let onclick: HTMLButtonAttributes['on:click'] = undefined;
	export let classes: string | undefined = undefined;
	export { classes as class };
</script>

<button
	{type}
	{disabled}
	class={twMerge(
		'rounded px-4 py-2 transition-all duration-100 ease-out hover:font-bold enabled:hover:-translate-y-1 enabled:hover:bg-secondary enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25',
		classes
	)}
	on:click={onclick}
>
	<slot />
</button>
