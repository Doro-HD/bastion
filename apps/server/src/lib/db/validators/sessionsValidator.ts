import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createUpdateSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { sessionsSchema } from '@/db/schemas/index';

type TSessionSelect = InferSelectModel<typeof sessionsSchema.sessionsTable>;
type TSessionInsert = InferInsertModel<typeof sessionsSchema.sessionsTable>;

const _sessionUpdateSchema = createUpdateSchema(sessionsSchema.sessionsTable).omit({
	id: true,
	userId: true
});
type TSessionUpdate = z.infer<typeof _sessionUpdateSchema>;

export { type TSessionSelect, type TSessionInsert, type TSessionUpdate };
