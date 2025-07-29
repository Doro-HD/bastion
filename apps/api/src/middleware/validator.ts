import { ErrResponse } from '@/routers/types';
import { zValidator } from '@hono/zod-validator';
import { ValidationTargets } from 'hono';
import * as z from 'zod/v4/core';

/**
 * @description
 * Creates a hono validator using zValidator,
 * if the schema fails, a pretty error is returned instead of the zod error
 * @param target - The hono validation target eg. json, query, header, cookies etc.
 * @param schema - The zod schema used to parse the target
 */
function createValidator<TSchema extends z.$ZodType, TTarget extends keyof ValidationTargets>(
	target: TTarget,
	schema: TSchema
) {
	return zValidator(target, schema, (result, c) => {
		if (!result.success) {
			const prettyError = z.prettifyError(result.error);
			const errResponse: ErrResponse = { status: 400, err: { reason: prettyError } }

			return c.json(errResponse.err, errResponse.status);
		}
	});
}

export { createValidator };
