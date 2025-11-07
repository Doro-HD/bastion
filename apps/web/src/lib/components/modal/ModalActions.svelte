<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}
	const { children, class: className, ...attributes }: IProps = $props();
</script>

<!--
component
Modal.Actions is a container for modal relevant actions
-->

<div data-testid="modal-actions" class={['modal-action', className]} {...attributes}>
	{@render children()}
</div>
