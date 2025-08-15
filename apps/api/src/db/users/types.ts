import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';
import { userTable } from './schema';

type TUserTable = typeof userTable;

const userSchema = createSelectSchema(userTable);
type TUserSelect = z.infer<typeof userSchema>;

const userInsertSchema = createInsertSchema(userTable).omit({ id: true });
type TUserInsert = z.infer<typeof userInsertSchema>;

export { TUserTable, userSchema, TUserSelect, userInsertSchema, TUserInsert };
