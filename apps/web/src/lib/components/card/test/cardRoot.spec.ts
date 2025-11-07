import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Card from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Card.Root, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-root');

		expect(card).toBeInTheDocument();
	});

	it('Should should have the correct class', () => {
		render(Card.Root, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-root');

		expect(card.className.includes('card')).toBeTruthy();
	});

	it.each([
		['border', 'card-border'],
		['dash', 'card-dash']
	])('Should have correct style class depending on prop', (style, className) => {
		render(Card.Root, {
			variant: { style },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		expect(card.className.includes(className)).toBeTruthy();
	});

	it.each([
		['side', 'card-side'],
		['full', 'image-full']
	])('Should have correct modifier class depending on prop', (modifier, className) => {
		render(Card.Root, {
			variant: { modifier },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		expect(card.className.includes(className)).toBeTruthy();
	});

	it.each([
		['xs', 'card-xs'],
		['sm', 'card-sm'],
		['md', 'card-md'],
		['lg', 'card-lg'],
		['xl', 'card-xl']
	])('Should have correct size class depending on prop', (size, className) => {
		render(Card.Root, {
			variant: { size },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		expect(card.className.includes(className)).toBeTruthy();
	});
});

describe('Negative', () => {
	it.each([
		['border', 'card-dash'],
		['dash', 'card-border']
	])('Should not have opposing style class depending on prop', (style, opposingClass) => {
		render(Card.Root, {
			variant: { style },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		expect(card.className.includes(opposingClass)).toBeFalsy();
	});

	it.each([
		['side', 'image-full'],
		['full', 'card-side']
	])('Should not have opposing modifier class depending on prop', (modifier, opposingClass) => {
		render(Card.Root, {
			variant: { modifier },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		expect(card.className.includes(opposingClass)).toBeFalsy();
	});

	const sizeClasses = ['card-xs', 'card-sm', 'card-md', 'card-lg', 'card-xl'];
	it.each([
		['xs', sizeClasses.filter((size) => size !== 'card-xs')],
		['sm', sizeClasses.filter((size) => size !== 'card-sm')],
		['md', sizeClasses.filter((size) => size !== 'card-md')],
		['lg', sizeClasses.filter((size) => size !== 'card-lg')],
		['xl', sizeClasses.filter((size) => size !== 'card-xl')]
	])('Should not have opposing size class depending on prop', (size, opposingClassnames) => {
		render(Card.Root, {
			variant: { size },
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const card = screen.getByTestId('card-root');

		for (const className of card.classList) {
			expect(opposingClassnames).not.toContain(className);
		}
	});
});
