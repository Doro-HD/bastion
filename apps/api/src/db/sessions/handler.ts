import { eq } from 'drizzle-orm';
import { option, result } from '@doro-hd/result';

import { constantTimeEqual, generateSecureRandomString, hashSecret } from '@/crypto';
import connect, { TConnection } from '@/db/index';
import { TSessionInsert, TSessionSelect, TSessionTable } from './types';
import { sessionTable } from './schema';
import { TUserSelect } from '../users/types';

const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day

class SessionHandler {
	#client: TConnection;
	#table: TSessionTable;

	constructor(dbUrl: string, dbAuthToken: string) {
		this.#client = connect(dbUrl, dbAuthToken);
		this.#table = sessionTable;
	}

	/**
	 * @description
	 * createSession inserts a new session into the db
	 * @param userId - The user id to use when creating the session
	 * @returns A result containing the newly created session and the token to set as a cookie
	 */
	async createSession(
		userId: TUserSelect['id']
	): Promise<result.TResult<option.TOption<{ session: TSessionInsert; token: string }>, unknown>> {
		try {
			const now = new Date();

			const id = generateSecureRandomString();
			const secret = generateSecureRandomString();
			const secretHash = await hashSecret(secret);

			const returnedSession = await this.#client
				.insert(this.#table)
				.values({
					id,
					secretHash: Buffer.from(secretHash),
					createdAt: Math.floor(now.getTime() / 1000),
					userId
				})
				.returning();

			const sessionOption = returnedSession.at(0);
			if (!sessionOption) {
				return result.ok(option.none());
			}

			const token = id + '.' + secret;

			return result.ok(option.some({ session: sessionOption, token }));
		} catch (err) {
			return result.err(err);
		}
	}

	/**
	 * @description
	 * Finds a session from the database using it's id
	 * @param sessionId - The session id used to find the session
	 * @returns An optional session
	 */
	async findSession(
		sessionId: string
	): Promise<result.TResult<option.TOption<TSessionSelect>, unknown>> {
		try {
			const now = new Date();

			const sessionResult = await this.#client.query.sessionTable.findFirst({
				where: (session, { eq }) => eq(session.id, sessionId)
			});
			if (!sessionResult) {
				return result.ok(option.none());
			}

			const session = {
				...sessionResult,
				createdAt: new Date(sessionResult.createdAt * 1000)
			};

			// Check expiration
			if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
				return this.deleteSession(sessionId);
			}

			return result.ok(option.some(sessionResult));
		} catch (err) {
			return result.err(err);
		}
	}

	/**
	 * @description
	 * findUserFromSession attempts to find a user from the provided token
	 * @param token - The session token
	 * @returns A result containing an optional user
	 */
	async findUserFromSession(
		token: string
	): Promise<result.TResult<option.TOption<TUserSelect>, unknown>> {
		const sessionResult = await this.#validateSession(token);
		if (result.isErr(sessionResult)) {
			return sessionResult;
		}

		if (sessionResult.data.status === 'none') {
			return result.ok(option.none())
		}
		const data = sessionResult.data.data

		try {
			const session = await this.#client.query.sessionTable.findFirst({
				columns: {},
				where: (session, { eq }) => eq(session.id, data.id),
				with: {
					user: true
				}
			});

			if (!session) {
				return result.ok(option.none());
			}

			return result.ok(option.some(session.user));
		} catch (err) {
			return result.err(err);
		}
	}

	/**
	 * @description
	 * deleteSession attempts to delete a session from the provided id
	 * @param sessionId - The id of the session to delete
	 * @returns A result containing an optional session
	 */
	async deleteSession(
		sessionId: TSessionSelect['id']
	): Promise<result.TResult<option.TOption<TSessionSelect>, unknown>> {
		try {
			const returnedSessions = await this.#client
				.delete(this.#table)
				.where(eq(this.#table.id, sessionId))
				.returning();

			return result.ok(option.from(returnedSessions.at(0)));
		} catch (err) {
			return result.err(err);
		}
	}

	/**
	 * @description
	 * #validateSession will validate the provided session token
	 * @param token - The session token to validate
	 * @returns A result containing the session
	 */
	async #validateSession(token: string): Promise<result.TResult<option.TOption<TSessionSelect>, unknown>> {
		// the authorization vaidator handles the length of the token when split on a dot
		const tokenParts = token.split('.');

		const sessionId = tokenParts[0];
		const sessionSecret = tokenParts[1];

		const sessionResult = await this.findSession(sessionId);
		if (result.isErr(sessionResult)) {
			return sessionResult
		}

		if (sessionResult.data.status === 'none') {
			return sessionResult;
		}
		const data = sessionResult.data.data;

		const tokenSecretHash = await hashSecret(sessionSecret);
		const validSecret = constantTimeEqual(tokenSecretHash, data.secretHash);
		if (!validSecret) {
			return result.err('Expired token');
		}

		return result.ok(option.some(data));
	}
}

export default SessionHandler;
