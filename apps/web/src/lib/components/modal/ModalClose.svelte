<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import Button, { type IButtonProps } from '$lib/components/button/index';

	interface IProps extends HTMLFormAttributes {
		onClickOutside?: boolean;
		children: Snippet;
		triggerProps?: IButtonProps;
	}
	const {
		onClickOutside = false,
		children,
		class: className,
		triggerProps,
		...attributes
	}: IProps = $props();
</script>

<!--
component
Modal.Close is an easy way to close the modal
-->

<form
	data-testid="modal-close"
	method="dialog"
	class={[{ 'modal-backdrop': onClickOutside }, className]}
	{...attributes}
>
	<Button {...triggerProps}>
		{@render children()}
	</Button>
</form>
