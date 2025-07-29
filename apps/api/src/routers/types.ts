/**
 * @description
 * OkResponse defines a response that is ok for the client to recieve
 */
interface OkResponse<T> {
	/**
	* @property An ok response can only be a succesful one eg. 200, 201
	*/
	status: 200 | 201;
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
	status: 400 | 401 | 404 | 500;
	/**
	 * @property Details about the error
	 */
	err: {
		reason: string
	};
}

export { OkResponse, ErrResponse };
