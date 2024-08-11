<script lang="ts">
	import { IconAlertTriangleFilled, IconCheck, IconChevronDown } from '@tabler/icons-svelte';
	import { Select } from 'bits-ui';
	import tw from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let name: HTMLInputAttributes['name'];
	export let required: HTMLInputAttributes['required'] = undefined;
	export let placeholder: string | undefined = undefined;
	export let disabled: HTMLInputAttributes['disabled'] = false;
	export let value: HTMLInputAttributes['value'] | undefined = undefined;
	export let values: { value: string; label: string }[];
	export let error: string | undefined = undefined;
</script>

<div class={tw('flex w-full flex-col gap-y-2')}>
	{#if label || description}
		<div class="flex flex-col gap-y-1">
			{#if label}
				<p class="font-bold">
					{label}
					{#if required}
						<span>*</span>
					{/if}
				</p>
			{/if}

			{#if description}
				<p class="text-sm">
					{description}
				</p>
			{/if}
		</div>
	{/if}

	<Select.Root
		items={values}
		selected={values.find((v) => v.value === value)}
		onSelectedChange={(selected) => {
			if (selected) {
				value = selected?.value;
			}
		}}
	>
		<Select.Trigger
			class={tw(
				'flex w-full items-center justify-between gap-x-2',
				'text-base font-medium text-black',
				'transition duration-100 ease-out',
				'rounded border border-gray-200 bg-white p-3',
				'border-2 focus:outline-none focus:enabled:border-primary',
				'disabled:cursor-not-allowed'
			)}
		>
			<Select.Value class="flex-1 text-start" {placeholder} />
			<IconChevronDown />
		</Select.Trigger>

		<Select.Content class="mt-4 flex flex-col gap-y-0.5 rounded-lg border bg-white p-2 shadow">
			{#each values as { label, value: v }}
				<Select.Item
					class="flex cursor-pointer items-center gap-x-3 rounded p-2 text-sm transition duration-100 ease-out hover:bg-gray-100 focus:bg-gray-100 data-[highlighted]:bg-gray-100"
					bind:value={v}
					bind:label
				>
					{label}
					<Select.ItemIndicator class="ml-auto">
						<IconCheck />
					</Select.ItemIndicator>
				</Select.Item>
			{/each}
		</Select.Content>

		<Select.Input bind:name bind:disabled bind:value />
	</Select.Root>

	{#if error}
		<div class={tw('flex items-center gap-x-2 text-red-200')}>
			<IconAlertTriangleFilled class="h-6 w-6" />
			<p>{error}</p>
		</div>
	{/if}
</div>
