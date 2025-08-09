import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Page from './+page.svelte';
import authService from '$lib/service/authService';
import { faker } from '@faker-js/faker';

it('Should render the correct input fields', () => {
	render(Page);

	const usernameInput = screen.getByPlaceholderText('username');
	expect(usernameInput).toBeInTheDocument();
});

it('Should render the submit button', () => {
	render(Page);

	const submitButton = screen.getByRole('button');
	expect(submitButton).toBeInTheDocument();
});

it('Should call authService.signIn with the correct arguments', async () => {
	const spy = vi.spyOn(authService, 'signIn');
	const username = faker.internet.username();

	render(Page);

	const usernameInput = screen.getByPlaceholderText('username');
	await fireEvent.input(usernameInput, { target: { value: username } });

	const submitButton = screen.getByRole('button');
	fireEvent.click(submitButton);

	expect(spy).toHaveBeenCalledOnce();
	expect(spy).toHaveBeenCalledWith({ username });
});
