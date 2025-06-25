interface IAPIError {
	message: string;
}

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

export type { IAPIError, IAPIOptions, TGetDeleteOptions, IPostPutOptions, TPath };
