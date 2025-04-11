import { eq } from 'drizzle-orm';

import { result } from '$lib/functional';
import { drizzle } from '$lib/server/db/index';
import { sessionsSchema } from '$lib/server/db/schemas';
import { sessionsValidator, usersValidator } from '$lib/server/db/validators';
import type { TSessionSelect } from '../validators/sessionsValidator';

const db = drizzle.getDB();

async function findSessionById(
	sessionId: string
): Promise<
	result.Result<
		(sessionsValidator.TSessionSelect & { user: usersValidator.TUsersSelect }) | undefined,
		unknown
	>
> {
	try {
		const session = await db.query.sessionsTable.findFirst({
			where: (session, { eq }) => eq(session.id, sessionId),
			with: {
				user: true
			}
		});

		return result.ok(session);
	} catch (e) {
		return result.err(e);
	}
}

async function createSession(
	newSession: sessionsValidator.TSessionInsert
): Promise<result.Result<sessionsValidator.TSessionInsert, unknown>> {
	try {
		const [createdSession] = await db
			.insert(sessionsSchema.sessionsTable)
			.values(newSession)
			.returning();

		return result.ok(createdSession);
	} catch (e) {
		return result.err(e);
	}
}

async function updateSession(
	sessionId: string,
	session: sessionsValidator.TSessionUpdate
): Promise<result.Result<sessionsValidator.TSessionUpdate, unknown>> {
	try {
		const [sessionUpdated] = await db
			.update(sessionsSchema.sessionsTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessionsSchema.sessionsTable.id, sessionId))
			.returning();

		return result.ok(sessionUpdated);
	} catch (e) {
		return result.err(e);
	}
}

async function deleteSession(sessionId: string): Promise<result.Result<TSessionSelect, unknown>> {
	try {
		const [deletedSession] = await db
			.delete(sessionsSchema.sessionsTable)
			.where(eq(sessionsSchema.sessionsTable.id, sessionId))
			.returning();

		return result.ok(deletedSession);
	} catch (e) {
		return result.err(e);
	}
}

export { findSessionById, createSession, updateSession, deleteSession };
