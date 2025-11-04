import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Modal from '../index';
import EmptySnippet from '$lib/dev/EmptySnippet.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Positive', () => {
	it('Should render component', () => {
		render(Modal.Trigger, {
			props: { children: EmptySnippet },
			context: new Map([['modal', { open: vi.fn(), close: vi.fn() }]])
		});

		const trigger = screen.getByRole('button', { hidden: true });

		expect(trigger).toBeInTheDocument();
	});

	it('Should call showModal on click', async () => {
		const user = userEvent.setup();
		const triggerSpy = vi.fn();

		render(Modal.Trigger, {
			props: { children: EmptySnippet },
			context: new Map([['modal', { open: triggerSpy, close: vi.fn() }]])
		});

		const trigger = screen.getByRole('button', { hidden: true });
		await user.click(trigger);

		expect(triggerSpy).toHaveBeenCalledOnce();
	});
});
