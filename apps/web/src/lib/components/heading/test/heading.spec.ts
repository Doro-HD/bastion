import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import { Heading } from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Heading, { children: createRawSnippet(() => ({ render: () => '<p>Heading</p>' })) });

		const heading = screen.getByRole('heading');

		expect(heading).toBeInTheDocument();
	});

	it.each([1, 2, 3, 4, 5, 6])('Should render component with the correct heading level', (level) => {
		render(Heading, {
			tag: `h${level}`,
			children: createRawSnippet(() => ({ render: () => '<p>Heading</p>' }))
		});

		const heading = screen.getByRole('heading', { level });

		expect(heading).toBeInTheDocument();
	});
});
