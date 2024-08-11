<script lang="ts">
	import { Button, TextField } from '$lib';
	import { IconEye, IconEyeClosed, IconLoader2 } from '@tabler/icons-svelte';
	import tw from 'clsx';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	let hidePassword = true;

	const { form, enhance, errors, submitting } = superForm(data.form);
</script>

<main>
	<form
		class="mx-auto flex h-screen max-w-64 flex-col items-center justify-center gap-y-4"
		method="POST"
		use:enhance
	>
		<img alt="SuiteSpot logo" src="suite-spot.svg" class="w-36" />

		<TextField
			name="email"
			bind:value={$form.email}
			label="Email"
			placeholder="wheatley@aperture.labs"
			error={$errors.email?.[0]}
		/>

		<div class="relative w-full">
			<TextField
				name="password"
				bind:value={$form.password}
				label="Password"
				placeholder="*************"
				error={$errors.password?.[0]}
				type={hidePassword ? 'password' : 'text'}
				class="pr-12"
			/>

			<button
				class={tw(
					'absolute right-4 top-1/2 mt-4 -translate-y-1/2 text-black',
					$errors.password ? 'mt-0' : 'mt-4'
				)}
				on:click|preventDefault={() => (hidePassword = !hidePassword)}
			>
				{#if hidePassword}
					<IconEyeClosed />
				{:else}
					<IconEye />
				{/if}
			</button>
		</div>

		<div class="flex gap-x-2">
			<Button type="submit">
				{#if $submitting}
					<IconLoader2 class="animate-spin" />
				{:else}
					Login
				{/if}
			</Button>

			<a
				href="/"
				class="rounded px-4 py-2 transition-all duration-100 ease-out hover:-translate-y-1 hover:bg-secondary hover:font-bold hover:text-white"
			>
				Cancel
			</a>
		</div>
	</form>
</main>
