import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Swap from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Swap.Item, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const swapItem = screen.getByTestId('swap-item');

		expect(swapItem).toBeInTheDocument();
	});

	it.each([
		['on', 'swap-on'],
		['off', 'swap-off']
	])('Should correct class depending on prop', (type, className) => {
		render(Swap.Item, {
			type,
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const swapItem = screen.getByTestId('swap-item');

		expect(swapItem.className.includes(className)).toBeTruthy();
	});
});

describe('Negative', () => {
	it.each([
		['on', 'swap-off'],
		['off', 'swap-on']
	])('Should not have the corrosponding class depending on prop', (type, className) => {
		render(Swap.Item, {
			type,
			children: createRawSnippet(() => ({ render: () => '<p>test</p>' }))
		});

		const swapItem = screen.getByTestId('swap-item');

		expect(swapItem.className.includes(className)).toBeFalsy();
	});
});
