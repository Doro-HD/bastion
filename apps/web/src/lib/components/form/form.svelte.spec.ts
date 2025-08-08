import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Form from './Form.svelte';
import { createRawSnippet } from 'svelte';

it('Should have a form element', async () => {
	render(Form, {
		'aria-label': 'foo',
		onsubmit: () => {},
		children: createRawSnippet(() => {
			return {
				render: () => '<label>Username</label>'
			};
		})
	});

	const form = screen.getByRole('form');

	expect(form).toBeInTheDocument();
});

it('Should call submit function via child', async () => {
	// implicit children render test
	const spy = vi.fn();
	render(Form, {
		'aria-label': 'foo',
		onsubmit: spy,
		children: createRawSnippet(() => {
			return {
				render: () => '<button type="submit">Submit</button>'
			};
		})
	});

	const button = screen.getByRole('button');
	await fireEvent.click(button);

	expect(spy).toHaveBeenCalledOnce();
});
