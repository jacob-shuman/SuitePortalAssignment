<script lang="ts">
	import { Button, Select, ServiceType, TextField, toast } from '$lib';
	import { IconLoader2 } from '@tabler/icons-svelte';
	import { superForm } from 'sveltekit-superforms';
	import Nav from '../lib/components/Nav.svelte';

	export let data;

	const { form, tainted, errors, submitting, isTainted, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast('Your request was submitted successfully!', 'success');
			}
		}
	});
</script>

<Nav authenticated={data.session !== null} />

<main class="flex flex-col gap-y-8 px-16 py-8">
	<h1 class="text-4xl font-bold text-primary">Maintenance Request</h1>

	<form
		class="flex max-w-64 flex-col items-center justify-center gap-y-4"
		method="POST"
		use:enhance
	>
		<TextField
			required
			label="Name"
			name="name"
			bind:value={$form.name}
			placeholder="Wheatley"
			error={$errors.name?.[0]}
		/>

		<TextField
			required
			label="Email"
			name="email"
			bind:value={$form.email}
			placeholder="wheatley@aperture.labs"
			error={$errors.email?.[0]}
		/>

		<TextField
			required
			label="Unit Number"
			name="unitNumber"
			bind:value={$form.unitNumber}
			placeholder="742"
			error={$errors.unitNumber?.[0]}
		/>

		<Select
			required
			label="Service Type"
			name="organization"
			bind:value={$form.serviceType}
			values={Object.values(ServiceType).map((s) => ({ value: s, label: s }))}
			error={$errors.serviceType?.[0]}
		/>
		{#if $errors.serviceType}<span>{$errors.serviceType}</span>{/if}

		<TextField
			required
			label="Summary"
			name="summary"
			bind:value={$form.summary}
			placeholder="I have an issue with..."
			error={$errors.summary?.[0]}
		/>

		<TextField
			textarea
			label="Details"
			name="details"
			placeholder="I have tried turning it off and on but..."
			bind:value={$form.details}
			error={$errors.details?.[0]}
		/>

		<Button
			type="submit"
			class="rounded px-4 py-2 transition-all duration-100 ease-out hover:font-bold enabled:hover:-translate-y-1 enabled:hover:bg-secondary enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
			disabled={!isTainted($tainted)}
		>
			{#if $submitting}
				<IconLoader2 class="animate-spin" />
			{:else}
				Create
			{/if}
		</Button>
	</form>
</main>
