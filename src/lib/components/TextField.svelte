<script lang="ts">
	import { IconAlertTriangleFilled } from '@tabler/icons-svelte';
	import tw from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let name: HTMLInputAttributes['name'] = undefined;
	export let required: HTMLInputAttributes['required'] = undefined;
	export let type: HTMLInputAttributes['type'] = 'text';
	export let value: HTMLInputAttributes['value'] = undefined;
	export let placeholder: HTMLInputAttributes['placeholder'] = undefined;
	export let disabled: HTMLInputAttributes['disabled'] = undefined;
	export let error: string | undefined = undefined;
	export let classes: string | undefined = undefined;
	export let textarea: boolean = false;
	export { classes as class };

	const inputClasses = twMerge(
		tw(
			'text-base font-medium focus:outline-none',
			'transition duration-100 ease-out',
			'rounded border-2 border-gray-200 p-3',
			'disabled:cursor-not-allowed disabled:text-gray-200',
			{
				'focus:enabled:border-primary': !error,
				'border-red-500 text-red-500': error
			}
		),
		classes
	);
</script>

<div class="flex w-full flex-col gap-y-2">
	{#if label || description}
		<div class="flex flex-col gap-y-1">
			{#if label}
				<p
					class={tw('font-bold', {
						'text-gray-100': disabled,
						'text-red-500': error && !disabled
					})}
				>
					{label}
					{#if required}
						<span>*</span>
					{/if}
				</p>
			{/if}

			{#if description}
				<p
					class={tw('text-sm', {
						'text-gray-100': disabled,
						'text-red-500': error && !disabled
					})}
				>
					{description}
				</p>
			{/if}
		</div>
	{/if}

	{#if textarea}
		<textarea
			class={inputClasses}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			{placeholder}
			{disabled}
			{name}
			{required}
			{...{ type }}
		/>
	{:else}
		<input
			class={inputClasses}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			{placeholder}
			{disabled}
			{name}
			{required}
			{...{ type }}
		/>
	{/if}

	{#if error}
		<div class="flex items-center gap-x-2 text-red-500">
			<IconAlertTriangleFilled class="h-6 w-6" />
			<p>{error}</p>
		</div>
	{/if}
</div>
