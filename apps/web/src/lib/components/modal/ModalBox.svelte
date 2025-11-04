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
Modal.Box is the actual modal that is shown upon being triggered
-->

<div data-testid="modal-box" class={['modal-box', className]} {...attributes}>
	{@render children()}
</div>
