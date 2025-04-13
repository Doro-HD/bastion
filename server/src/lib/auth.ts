import type { Context } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';

import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import argon2 from 'argon2';

import { sessionsHandler } from '@/db/handlers/index';
import { result } from '@/functional/index';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);

	return token;
}

async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const newSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};

	const session = await sessionsHandler.createSession(newSession);

	return session;
}

async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const sessionResult = await sessionsHandler.findSessionById(sessionId);

	if (result.isErr(sessionResult) || !sessionResult.data) {
		return { session: null, user: null };
	}
	const session = sessionResult.data;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await invalidateSession(session.id);

		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await sessionsHandler.updateSession(session.id, session);
	}

	return { session };
}

type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

async function invalidateSession(sessionId: string) {
	return sessionsHandler.deleteSession(sessionId);
}

function setSessionTokenCookie(c: Context, token: string, expiresAt: Date) {
	setCookie(c, sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

function deleteSessionTokenCookie(c: Context) {
	deleteCookie(c, sessionCookieName, {
		path: '/'
	});
}

async function verifyPassword(hashedPassword: string, password: string) {
	return argon2.verify(hashedPassword, password);
}

export {
	generateSessionToken,
	createSession,
	validateSessionToken,
	type SessionValidationResult,
	invalidateSession,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
	verifyPassword
};
