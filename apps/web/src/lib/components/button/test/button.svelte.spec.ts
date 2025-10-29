import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Button from '../Button.svelte';
import { createRawSnippet } from 'svelte';

describe('Positive', () => {
	it('Should render button', async () => {
		render(Button, { children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })) });

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
	});

	it.each([
		['neutral', 'btn-neutral'],
		['primary', 'btn-primary'],
		['secondary', 'btn-secondary'],
		['accent', 'btn-accent'],
		['info', 'btn-info'],
		['success', 'btn-success'],
		['warning', 'btn-warning'],
		['error', 'btn-error']
	])('Should use correct color class based on prop', async (color, className) => {
		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			variant: { color }
		});

		const button = screen.getByRole('button');

		expect(button.className.includes(className)).toBeTruthy();
	});

	it.each([
		['outline', 'btn-outline'],
		['dash', 'btn-dash'],
		['soft', 'btn-soft'],
		['ghost', 'btn-ghost'],
		['link', 'btn-link']
	])('Should use correct style class based on prop', async (style, className) => {
		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			variant: { style }
		});

		const button = screen.getByRole('button');

		expect(button.className.includes(className)).toBeTruthy();
	});

	it.each([
		['active', 'btn-active'],
		['disabled', 'btn-disabled']
	])('Should use correct behaviour class based on prop', async (behaviour, className) => {
		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			variant: { behaviour }
		});

		const button = screen.getByRole('button');

		expect(button.className.includes(className)).toBeTruthy();
	});

	it.each([
		['xs', 'btn-xs'],
		['sm', 'btn-sm'],
		['md', 'btn-md'],
		['lg', 'btn-lg'],
		['xl', 'btn-xl']
	])('Should use correct size class based on prop', async (size, className) => {
		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			variant: { size }
		});

		const button = screen.getByRole('button');

		expect(button.className.includes(className)).toBeTruthy();
	});

	it.each([
		['wide', 'btn-wide'],
		['block', 'btn-block'],
		['square', 'btn-square'],
		['circle', 'btn-circle']
	])('Should use correct modifier class based on prop', async (modifier, className) => {
		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			variant: { modifier }
		});

		const button = screen.getByRole('button');

		expect(button.className.includes(className)).toBeTruthy();
	});

	it('Should call function on click', async () => {
		const user = userEvent.setup();
		const spy = vi.fn();

		const screen = render(Button, {
			children: createRawSnippet(() => ({ render: () => '<p>Click me</p>' })),
			onclick: spy
		});

		const button = screen.getByRole('button');
		await user.click(button);

		expect(spy).toHaveBeenCalledOnce();
	});
});
