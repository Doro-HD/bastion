import type { TResult } from '$lib/result';

interface IAPIResponseOk<T> {
	status: 'ok';
	data: T;
}

interface IAPIResponseBadRequest {
	status: 'bad request';
}

interface IAPIResponseUnauthorized {
	status: 'unauthorized';
}

interface IAPIResponseNotFound {
	status: 'not found';
}

interface IAPIResponseServerError {
	status: 'server error';
}

type TAPIResponseUnion<T> =
	| IAPIResponseOk<T>
	| IAPIResponseBadRequest
	| IAPIResponseUnauthorized
	| IAPIResponseNotFound
	| IAPIResponseServerError;

interface IClientError {
	status: 'client error';
}

/**
 * @description
 * A helper type so all api client functions return the same type
 */
type TAPIResult<T> = TResult<TAPIResponseUnion<T>, IClientError>;

type TPath = `/${string}`;
type TQuery = Record<string, string>;
type TBody = Record<string, string>;

interface IAPIOptions {
	method: 'get' | 'post' | 'put' | 'delete';
	path?: TPath;
	query?: TQuery;
	body?: TBody;
}

type TGetDeleteOptions = Pick<IAPIOptions, 'path' | 'query'>;

interface IPostPutOptions extends Pick<IAPIOptions, 'path' | 'query'> {
	body: TBody;
}

export type {
	IAPIResponseOk,
	IAPIResponseBadRequest,
	IAPIResponseUnauthorized,
	IAPIResponseNotFound,
	IAPIResponseServerError,
	TAPIResponseUnion,
	TAPIResult,
	IClientError,
	IAPIOptions,
	TGetDeleteOptions,
	IPostPutOptions,
	TPath
};
