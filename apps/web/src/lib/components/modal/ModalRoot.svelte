<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { setModalContext, type TModalContext } from './modalContext';

	interface IProps extends HTMLDialogAttributes {
		id?: string;
		variant?: {
			placement?: 'top' | 'bottom' | 'middle' | 'start' | 'end';
		};
		children: Snippet;
	}
	const {
		id = crypto.randomUUID(),
		variant,
		children,
		class: className,
		...attributes
	}: IProps = $props();

	function setContext(element: HTMLDialogElement) {
		const open = element.showModal;
		const close = element.close;

		const ctx: TModalContext = { open, close };
		setModalContext(ctx);
	}

	function getPlacement() {
		switch (variant?.placement) {
			case 'top':
				return 'modal-top';
			case 'bottom':
				return 'modal-bottom';
			case 'middle':
				return 'modal-middle';
			case 'start':
				return 'modal-start';
			case 'end':
				return 'modal-end';
		}
	}
</script>

<!--
@component
Modal.Root is the root component for a modal. It creates the context for other modal sub components to use. 
And it is here that you should set daisyui style settings
-->

<dialog
	{id}
	class={['modal', getPlacement(), className]}
	{...attributes}
	{@attach (element) => setContext(element)}
>
	{@render children()}
</dialog>
