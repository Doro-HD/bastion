import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { result } from '@/functional';
import { validateSchema, type ValidateData } from './index';
import { decksSchema } from '../schemas';


type TDecksSelect = InferSelectModel<typeof decksSchema.decksTable>;

const decksInsertSchema = createInsertSchema(decksSchema.decksTable)
    
type TDecksInsert = z.infer<typeof decksInsertSchema>;

const decksFormDataSchema = decksInsertSchema
    .omit({
        id: true,
        userId: true
    })
    .extend({
        name: z.string().min(5),
    });
type TDecksFormData = z.infer<typeof decksFormDataSchema>;

function validateDeckInsert(deckData: ValidateData): result.Result<TDecksFormData, { nameError?: string }> {
    const schemaResult = validateSchema(decksFormDataSchema, deckData);
	if (schemaResult.status === 'error') {
		const { name } = schemaResult.err.format();
		const nameError = name?._errors.join(',');

		return result.err({
			nameError,
		});
	}

	return result.ok(schemaResult.data);
}

export {
    type TDecksSelect,
    type TDecksInsert,
    type TDecksFormData,
    validateDeckInsert
};