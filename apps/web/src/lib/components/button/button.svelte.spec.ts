import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'

import Button from './Button.svelte'
import { createRawSnippet } from 'svelte'

describe("Positive", () => {
	it('Should render button', async () => {
		render(Button, { children: createRawSnippet(() => ({ render: () => "Click me" })) })

		const button = screen.getByRole('button')

		expect(button).toBeInTheDocument();
	});

	it.each([["primary", "btn-primary"], ["secondary", "btn-secondary"]])("Should use correct color class based on prop", async (color, className) => {
		const screen = render(Button, { children: createRawSnippet(() => ({ render: () => "Click me" })), variant: { color: color } })

		const button = screen.getByRole('button')

		expect(button.className.includes(className)).toBeTruthy()
	})
})
