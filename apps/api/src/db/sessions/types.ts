import { sessionTable } from './schema';

type TSessionTable = typeof sessionTable;

type TSessionSelect = typeof sessionTable.$inferSelect;
type TSessionInsert = typeof sessionTable.$inferInsert;

export type { TSessionInsert, TSessionSelect, TSessionTable };
