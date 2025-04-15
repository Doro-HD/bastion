import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

import { result } from '@/functional';
import { validateSchema, type ValidateData } from './index';
import { decksSchema } from '../schemas';

/**
 * @description
 * Used to apply base extention to all decks schemas
 */
const baseSchemaValidation = { name: z.string().min(5) };

type TDecksErrors = {
	nameError?: string;
	descriptionError?: string;
};

// Select
type TDecksSelect = InferSelectModel<typeof decksSchema.decksTable>;

// Insert
const decksInsertSchema = createInsertSchema(decksSchema.decksTable).extend(baseSchemaValidation);
type TDecksInsert = z.infer<typeof decksInsertSchema>;

const decksInsertFormDataSchema = decksInsertSchema.omit({
	userId: true
});
type TDecksInsertFormData = z.infer<typeof decksInsertFormDataSchema>;

function validateDeckInsert(
	deckData: ValidateData
): result.Result<TDecksInsertFormData, TDecksErrors> {
	const schemaResult = validateSchema(decksInsertFormDataSchema, deckData);
	if (schemaResult.status === 'error') {
		const { name, description } = schemaResult.err.format();
		const nameError = name?._errors.join(',');
		const descriptionError = description?._errors.join(',');

		return result.err({
			nameError,
			descriptionError
		});
	}

	return result.ok(schemaResult.data);
}

// Update
const decksUpdateSchema = createUpdateSchema(decksSchema.decksTable).extend({ ...baseSchemaValidation, name: baseSchemaValidation.name.optional() });
type TDecksUpdate = z.infer<typeof decksUpdateSchema>;

const decksUpdateFormDataSchema = decksUpdateSchema.omit({
	userId: true
});
type TDecksUpdateFormData = z.infer<typeof decksUpdateFormDataSchema>;

function validateDeckUpdate(
	deckData: ValidateData
): result.Result<TDecksUpdateFormData, TDecksErrors> {
	const schemaResult = validateSchema(decksUpdateFormDataSchema, deckData);
	if (schemaResult.status === 'error') {
		const { name, description } = schemaResult.err.format();
		const nameError = name?._errors.join(',');
		const descriptionError = description?._errors.join(',');

		return result.err({
			nameError,
			descriptionError
		});
	}

	return result.ok(schemaResult.data);
}

export {
	type TDecksSelect,
	type TDecksInsert,
	type TDecksInsertFormData,
	validateDeckInsert,
	type TDecksUpdate,
	type TDecksUpdateFormData,
	validateDeckUpdate
};
