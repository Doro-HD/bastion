<script lang="ts">
	import Button, { type IButtonProps } from '$lib/components/button/index';
	import { getModalContext } from './modalContext';

	const { children, ...attributes }: Omit<IButtonProps, 'onclick'> = $props();

	const ctx = getModalContext();
</script>

<!--
component
Module.Trigger is the button component that opens the modal. It needs to be a child of a Modal.Root component to access it's context
-->

<Button onclick={() => ctx.open()} {...attributes}>
	{@render children()}
</Button>
