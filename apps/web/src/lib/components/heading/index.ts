import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import Heading from './Heading.svelte';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: Snippet;
}

export { type IProps as HeadingProps, Heading };
