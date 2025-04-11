import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { usersSchema } from '../schemas';
import { validateSchema, type ValidateData } from './index';
import { result } from '@/functional';

type TUsersSelect = InferSelectModel<typeof usersSchema.usersTable>;

const usersInsertSchema = createInsertSchema(usersSchema.usersTable);
type TUsersInsert = z.infer<typeof usersInsertSchema>;

const usersSignUpSchema = usersInsertSchema
	.extend({
		id: z.string().cuid2(),
		username: z.string().min(5),
		password: z.string().min(8),
		'confirm-password': z.string()
	})
	.refine(
		(val) => {
			return val['confirm-password'] === val.password;
		},
		{ message: 'Passwords must match', path: ['confirm-password'] }
	);

function validateUserSignUp(
	userData: ValidateData
): result.Result<
	TUsersInsert & { 'confirm-password': string },
	{ usernameError?: string; passwordError?: string; confirmPasswordError?: string }
> {
	const schemaResult = validateSchema(usersSignUpSchema, userData);
	if (schemaResult.status === 'error') {
		const { username, password, 'confirm-password': confirmPassword } = schemaResult.err.format();
		const usernameError = username?._errors.join(',');
		const passwordError = password?._errors.join(',');
		const confirmPasswordError = confirmPassword?._errors.join('');

		return result.err({
			usernameError,
			passwordError,
			confirmPasswordError
		});
	}

	return result.ok(schemaResult.data);
}

const userSignInSchema = usersInsertSchema.pick({
	username: true,
	password: true
});
function validateUserSignIn(userData: ValidateData) {
	const schemaResult = validateSchema(userSignInSchema, userData);
	if (schemaResult.status === 'error') {
		const { username, password } = schemaResult.err.format();
		const usernameError = username?._errors.join(',');
		const passwordError = password?._errors.join(',');

		return result.err({
			usernameError,
			passwordError
		});
	}

	return result.ok(schemaResult.data);
}

export {
	type TUsersSelect,
	usersInsertSchema,
	type TUsersInsert,
	validateUserSignUp,
	validateUserSignIn
};
