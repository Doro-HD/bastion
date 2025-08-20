import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { userTable } from './schema';
const userSchema = createSelectSchema(userTable);
const userInsertSchema = createInsertSchema(userTable).omit({ id: true });
export { userSchema, userInsertSchema };
