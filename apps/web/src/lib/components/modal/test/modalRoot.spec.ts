import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Modal from '../index';
import EmptySnippet from '$lib/dev/EmptySnippet.svelte';

describe('Positive', () => {
	it('Should render component', () => {
		render(Modal.Root, { children: EmptySnippet });

		const modal = screen.getByRole('dialog', { hidden: true });

		expect(modal).toBeInTheDocument();
	});

	it.each([
		['top', 'modal-top'],
		['bottom', 'modal-bottom'],
		['middle', 'modal-middle'],
		['start', 'modal-start'],
		['end', 'modal-end']
	])('Should have correct placement class depending on prop', (placement, className) => {
		render(Modal.Root, {
			variant: { placement },
			children: EmptySnippet
		});

		const modal = screen.getByRole('dialog', { hidden: true });

		expect(modal.className.includes(className)).toBeTruthy();
	});
});

describe('Negative', () => {
	const modalPlacementClasses = [
		'modal-top',
		'modal-bottom',
		'modal-middle',
		'modal-start',
		'modal-end'
	];
	it.each([
		['top', modalPlacementClasses.filter((placement) => placement !== 'modal-top')],
		['bottom', modalPlacementClasses.filter((placement) => placement !== 'modal-bottom')],
		['middle', modalPlacementClasses.filter((placement) => placement !== 'modal-middle')],
		['start', modalPlacementClasses.filter((placement) => placement !== 'modal-start')],
		['end', modalPlacementClasses.filter((placement) => placement !== 'modal-end')]
	])(
		'Should not have opposing placement classes depending on prop',
		(placement, opposingClassNames) => {
			render(Modal.Root, {
				variant: { placement },
				children: EmptySnippet
			});

			const modal = screen.getByRole('dialog', { hidden: true });

			for (const className of modal.classList) {
				expect(opposingClassNames).not.toContain(className);
			}
		}
	);
});
