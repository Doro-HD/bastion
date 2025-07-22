import { expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';

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

	const form = page.getByRole('form');

	await expect.element(form).toBeInTheDocument();
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

	const button = page.getByRole('button');
	await button.click();

	expect(spy).toHaveBeenCalledOnce();
});
