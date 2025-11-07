import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Card from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Card.Title, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-title');

		expect(card).toBeInTheDocument();
	});

	it('Should should have the correct class', () => {
		render(Card.Title, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByRole('heading');

		expect(card.className.includes('card-title')).toBeTruthy();
	});
});
