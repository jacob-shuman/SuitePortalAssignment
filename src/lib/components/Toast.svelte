<script lang="ts">
	import { type ToastVariant } from '$lib';
	import {
		IconAlertCircleFilled,
		IconCheck,
		IconInfoCircleFilled,
		IconX
	} from '@tabler/icons-svelte';
	import tw from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let message: string;
	export let variant: ToastVariant = 'info';

	const dispatch = createEventDispatcher();
</script>

<div
	class={tw(
		'flex w-full justify-between gap-x-6 rounded-lg border bg-white p-4 text-black shadow',
		{
			'border-blue-500': variant === 'info',
			'border-green-500': variant === 'success',
			'border-red-500': variant === 'danger'
		}
	)}
>
	<div class="flex items-center gap-x-4">
		{#if variant === 'info'}
			<IconInfoCircleFilled class="h-8 w-8 min-w-8 text-blue-500" />
		{:else if variant === 'success'}
			<IconCheck class="h-8 w-8 min-w-8 text-green-500" />
		{:else}
			<IconAlertCircleFilled class="h-8 w-8 min-w-8 text-red-500" />
		{/if}

		<p class="text-base font-bold">
			{message}
		</p>
	</div>

	<button on:click={() => dispatch('closeToast')}>
		<IconX class="h-6 w-6" />
	</button>
</div>
