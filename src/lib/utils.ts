import type { ComponentType, SvelteComponent } from 'svelte';
import { toast as sonnerToast } from 'svelte-sonner';
import Toast from './components/Toast.svelte';
import type { ToastVariant } from './types';

export const toast = (message: string, variant?: ToastVariant) => {
	const id = sonnerToast.custom(Toast as unknown as ComponentType<SvelteComponent<any, any, any>>, {
		unstyled: true,
		class: 'w-full',
		componentProps: { message, variant },
		dismissable: true
	});

	return { dismiss: () => sonnerToast.dismiss(id) };
};
