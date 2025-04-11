import { result } from '$lib/functional';
import argon2 from 'argon2';
import { getDB } from '../drizzle';
import { usersSchema } from '../schemas';
import type { TUsersSelect, TUsersInsert } from '../validators/usersValidator';

const db = getDB();

async function getUsers(): Promise<result.Result<TUsersSelect[], unknown>> {
	try {
		const users = await db.query.usersTable.findMany();

		return result.ok(users);
	} catch (e) {
		return result.err(e);
	}
}

async function findUserById(
	userId: string
): Promise<result.Result<TUsersSelect | undefined, unknown>> {
	try {
		const user = await db.query.usersTable.findFirst({
			where: (user, { eq }) => eq(user.id, userId)
		});

		return result.ok(user);
	} catch (e) {
		return result.err(e);
	}
}

async function findUserByUsername(
	username: string
): Promise<result.Result<TUsersSelect | undefined, unknown>> {
	try {
		const user = await db.query.usersTable.findFirst({
			where: (user, { eq }) => eq(user.username, username)
		});

		return result.ok(user);
	} catch (e) {
		return result.err(e);
	}
}

async function createUser(newUser: TUsersInsert): Promise<result.Result<TUsersInsert, unknown>> {
	try {
		const hashedPassword = await argon2.hash(newUser.password);
		const [createdUser] = await db.insert(usersSchema.usersTable).values({ ...newUser, password: hashedPassword }).returning();

		return result.ok(createdUser);
	} catch (e) {
		return result.err(e);
	}
}

export { getUsers, findUserById, findUserByUsername, createUser };
