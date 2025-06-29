import { expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Page from './+page.svelte';
import { page } from '@vitest/browser/context';

it('Should render the correct input fields', async () => {
	render(Page);

	const usernameInput = page.getByLabelText('username');
	await expect.element(usernameInput).toBeInTheDocument();
});

it('Should render the submit button', async () => {
	render(Page);

	const submitButton = page.getByRole('button');
	await expect.element(submitButton).toBeInTheDocument();
});
