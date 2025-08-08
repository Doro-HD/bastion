import { describe, expect, it } from "vitest";
import { render } from "@testing-library/svelte";
import Page from "./+page.svelte";

describe("Root client page", () => {
	it("should render h1", async () => {
		const page = render(Page);

		const heading = page.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
	});
});
