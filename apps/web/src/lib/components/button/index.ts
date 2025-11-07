import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import Button from './Button.svelte';

interface IProps extends HTMLButtonAttributes {
	variant?: {
		color?:
			| 'neutral'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		style?: 'outline' | 'dash' | 'soft' | 'ghost' | 'link';
		behaviour?: 'active' | 'disabled';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		modifier?: 'wide' | 'block' | 'square' | 'circle';
	};
	children: Snippet;
}

export default Button;
export { type IProps as IButtonProps };
