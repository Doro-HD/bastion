import type { ParsedFormValue } from 'hono/types';
import type { z, ZodError, ZodTypeAny } from 'zod';

import { result } from '@/functional';
import * as usersValidator from './usersValidator';
import * as sessionsValidator from './sessionsValidator';
import * as decksValidator from './decksValidator';

type ValidateData = Record<string, ParsedFormValue | ParsedFormValue[]>;

/**
 * @description
 * An internal validator function used by other validator functions
 * @param {ZodTypeAny} schema - The zod shcema to validate the data against
 * @param {FormData} data - The formdata that is validated using the zod schema
 * @returns {result.Result<T, string>} - A result based on the schema validation
 */
function validateSchema<T extends ZodTypeAny>(
	schema: T,
	data: ValidateData
): result.Result<z.infer<T>, ZodError<z.infer<T>>> {
	console.log(data)
	const schemaResult = schema.safeParse(data);
	if (!schemaResult.success) {
		return result.err(schemaResult.error);
	}

	return result.ok(schemaResult.data);
}

export { validateSchema, usersValidator, sessionsValidator, decksValidator, type ValidateData };
