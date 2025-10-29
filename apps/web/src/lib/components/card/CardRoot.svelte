<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		variant?: {
			style?: 'border' | 'dash';
			modifier?: 'side' | 'full';
			size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		};
		children: Snippet;
	}

	const { variant, children, class: className, ...attributes }: IProps = $props();

	function getStyle() {
		switch (variant?.style) {
			case 'border':
				return 'card-border';
			case 'dash':
				return 'card-dash';
		}
	}

	function getModifier() {
		switch (variant?.modifier) {
			case 'side':
				return 'card-side';
			case 'full':
				return 'image-full';
		}
	}

	function getSize() {
		switch (variant?.size) {
			case 'xs':
				return 'card-xs';
			case 'sm':
				return 'card-sm';
			case 'md':
				return 'card-md';
			case 'lg':
				return 'card-lg';
			case 'xl':
				return 'card-xl';
		}
	}
</script>

<div
	data-testid="card-root"
	class={['card', getStyle(), getModifier(), getSize(), className]}
	{...attributes}
>
	{@render children()}
</div>
