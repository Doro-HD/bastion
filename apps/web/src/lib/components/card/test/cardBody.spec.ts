import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Card from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Card.Body, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-body');

		expect(card).toBeInTheDocument();
	});

	it('Should should have the correct class', () => {
		render(Card.Body, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const card = screen.getByTestId('card-body');

		expect(card.className.includes('card-body')).toBeTruthy();
	});
});
