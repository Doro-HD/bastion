import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Modal from '../index';
import EmptySnippet from '$lib/dev/EmptySnippet.svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Modal.Actions, { props: { children: EmptySnippet } });

		const modal = screen.getByTestId('modal-actions');

		expect(modal).toBeInTheDocument();
	});
});
