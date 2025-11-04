<!--
@component
Button is a simple wrapper around a button tag with daisyui variant props
-->
<script lang="ts">
	import { type IButtonProps } from './index';

	const { class: className, variant, children, ...attributes }: IButtonProps = $props();

	function getColor() {
		switch (variant?.color) {
			case 'primary':
				return 'btn-primary';
			case 'secondary':
				return 'btn-secondary';
			case 'accent':
				return 'btn-accent';
			case 'info':
				return 'btn-info';
			case 'success':
				return 'btn-success';
			case 'warning':
				return 'btn-warning';
			case 'error':
				return 'btn-error';
			case 'neutral':
				return 'btn-neutral';
		}
	}

	function getStyle() {
		switch (variant?.style) {
			case 'outline':
				return 'btn-outline';
			case 'dash':
				return 'btn-dash';
			case 'soft':
				return 'btn-soft';
			case 'ghost':
				return 'btn-ghost';
			case 'link':
				return 'btn-link';
		}
	}

	function getBehaviour() {
		switch (variant?.behaviour) {
			case 'active':
				return 'btn-active';
			case 'disabled':
				return 'btn-disabled';
		}
	}

	function getSize() {
		switch (variant?.size) {
			case 'xs':
				return 'btn-xs';
			case 'sm':
				return 'btn-sm';
			case 'md':
				return 'btn-md';
			case 'lg':
				return 'btn-lg';
			case 'xl':
				return 'btn-xl';
		}
	}

	function getModifier() {
		switch (variant?.modifier) {
			case 'wide':
				return 'btn-wide';
			case 'block':
				return 'btn-block';
			case 'square':
				return 'btn-square';
			case 'circle':
				return 'btn-circle';
		}
	}
</script>

<button
	class={['btn', getColor(), getStyle(), getBehaviour(), getSize(), getModifier(), className]}
	{...attributes}>{@render children()}</button
>
