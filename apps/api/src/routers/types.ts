type TOkResponseStatus = 200 | 201;
type TErrResponseStatus = 400 | 401 | 404 | 500;
type TResponseStatus = TOkResponseStatus | TErrResponseStatus;

/**
 * @description
 * OkResponse defines a response that is ok for the client to recieve
 */
interface OkResponse<T> {
	/**
	 * @property An ok response can only be a succesful one eg. 200, 201
	 */
	status: TOkResponseStatus;
	/**
	 * @property The requested data
	 */
	data: T;
}

/**
 * @description
 * ErrResponse defines a response that is not ok for the client to recieve,
 * meaning it has to handle it another way
 */
interface ErrResponse {
	/**
	 * @property An err response can only be a failure or an error eg. 4xx, 500
	 */
	status: TErrResponseStatus;
	/**
	 * @property Details about the error
	 */
	err: {
		reason: string;
	};
}

function okResponse<T>(status: OkResponse<T>['status'], data: T): OkResponse<T> {
	return {
		status,
		data
	};
}

function errResponse(status: ErrResponse['status'], err: ErrResponse['err']): ErrResponse {
	return {
		status,
		err
	};
}

export { errResponse, okResponse, TErrResponseStatus, TOkResponseStatus, TResponseStatus };
