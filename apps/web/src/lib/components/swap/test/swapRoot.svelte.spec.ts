import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Swap from '../index';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render root swap component', () => {
		render(Swap.Root, { children: createRawSnippet(() => ({ render: () => '<p>test</p>' })) });

		const swapRoot = screen.getByTestId('swap-root');

		expect(swapRoot).toBeInTheDocument();
	});
});
