import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Modal from '../index';
import EmptySnippet from '$lib/dev/EmptySnippet.svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Modal.Close, { props: { children: EmptySnippet } });

		const close = screen.getByTestId('modal-close');

		expect(close).toBeInTheDocument();
	});
});
