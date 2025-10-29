import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Card from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Card.Actions, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-actions');

		expect(card).toBeInTheDocument();
	});

	it('Should should have the correct class', () => {
		render(Card.Actions, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-actions');

		expect(card.className.includes("card-actions")).toBeTruthy();
	});
});
