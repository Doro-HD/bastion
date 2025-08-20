import { errResponse } from '@/routers/types';
import { zValidator } from '@hono/zod-validator';
import * as z from 'zod/v4/core';
/**
 * @description
 * Creates a hono validator using zValidator,
 * if the schema fails, a pretty error is returned instead of the zod error
 * @param target - The hono validation target eg. json, query, header, cookies etc.
 * @param schema - The zod schema used to parse the target
 * @param [errStatus=400] - The status code to use if the data is not compliant with the schema
 */
function createValidator(target, schema, errStatus = 400) {
    return zValidator(target, schema, (result, c) => {
        if (!result.success) {
            const prettyError = z.prettifyError(result.error);
            const errRes = errResponse(errStatus, {
                reason: prettyError
            });
            return c.json(errRes.err, errRes.status);
        }
    });
}
export { createValidator };
