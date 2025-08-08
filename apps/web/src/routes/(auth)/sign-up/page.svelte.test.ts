import { expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { faker } from "@faker-js/faker";

import authService from "$lib/service/authService";
import Page from "./+page.svelte";

it("Should render the correct input fields", () => {
	render(Page);

	const usernameInput = screen.getByPlaceholderText("username");
	expect(usernameInput).toBeInTheDocument();
});

it("Should render the submit button", () => {
	render(Page);

	const submitButton = screen.getByRole("button");
	expect(submitButton).toBeInTheDocument();
});

it("Should call authService.signUp with the correct value", async () => {
	const spy = vi.spyOn(authService, "signUp");
	render(Page);

	const username = faker.internet.username();

	const usernameInput = screen.getByPlaceholderText("username");
	fireEvent.input(usernameInput, { target: { value: username } });

	const submitButton = screen.getByRole("button");
	await fireEvent.click(submitButton);

	expect(spy).toHaveBeenCalledOnce();
	expect(spy).toHaveBeenCalledWith({ username });
});
