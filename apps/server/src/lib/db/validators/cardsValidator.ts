import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

import { validateSchema, type ValidateData } from './index';
import { cardsSchema } from '@/db/schemas/index';
import { result } from '@/functional';

const baseSchemaValidation = { id: z.string().cuid2(), name: z.string().min(5) };

type TCardsErrors = {
	nameError?: string;
	descriptionError?: string;
	durationError?: string;
	difficultyError?: string;
};

// Select
type TCardsSelect = InferSelectModel<typeof cardsSchema.cardsTable>;

// Insert
const cardsInsertSchema = createInsertSchema(cardsSchema.cardsTable).extend(baseSchemaValidation);
type TCardsInsert = z.infer<typeof cardsInsertSchema>;

const cardsInsertFormDataSchema = cardsInsertSchema;
type TCardsInsertFormData = z.infer<typeof cardsInsertFormDataSchema>;

function validateCardInsert(
	cardData: ValidateData
): result.Result<TCardsInsertFormData, TCardsErrors> {
	const duration = Number(cardData['duration'])
	const schemaResult = validateSchema(cardsInsertFormDataSchema, { ...cardData, duration });
	if (schemaResult.status === 'error') {
		const { name, description, difficulty, duration } = schemaResult.err.format();
		const nameError = name?._errors.join(',');
		const descriptionError = description?._errors.join(',');
		const difficultyError = difficulty?._errors.join(',');
		const durationError = duration?._errors.join(',');

		return result.err({
			nameError,
			descriptionError,
			difficultyError,
			durationError
		});
	}

	return result.ok(schemaResult.data);
}

// Update
const cardsUpdateSchema = createUpdateSchema(cardsSchema.cardsTable)
	.extend({ ...baseSchemaValidation, name: baseSchemaValidation.name.optional() })
	.omit({ id: true, deckId: true });
type TCardsUpdate = z.infer<typeof cardsUpdateSchema>;

const cardsUpdateFormDataSchema = cardsUpdateSchema;
type TCardsUpdateFormData = z.infer<typeof cardsUpdateFormDataSchema>;

function validateCardUpdate(
	cardData: ValidateData
): result.Result<TCardsUpdateFormData, TCardsErrors> {
	const duration = Number(cardData['duration'])
	const schemaResult = validateSchema(cardsUpdateFormDataSchema, { ...cardData, duration });
	if (schemaResult.status === 'error') {
		const { name, description, difficulty, duration } = schemaResult.err.format();
		const nameError = name?._errors.join(',');
		const descriptionError = description?._errors.join(',');
		const difficultyError = difficulty?._errors.join(',');
		const durationError = duration?._errors.join(',');

		return result.err({
			nameError,
			descriptionError,
			difficultyError,
			durationError
		});
	}

	return result.ok(schemaResult.data);
}

export {
	type TCardsSelect,
	type TCardsInsert,
	type TCardsInsertFormData,
	validateCardInsert,
	type TCardsUpdate,
	type TCardsUpdateFormData,
	validateCardUpdate
};
