/**
 * @description
 * A indicator for a succesful operation
 */
interface IOk<T> {
	status: 'ok';
	data: T;
}

/**
 * @description
 * A indicator for a non succesful operation
 */
interface IErr<T> {
	status: 'err';
	err: T;
}

/**
 * @description
 * An intermediary for determining the result of a operation, it can either be a succes or an error.
 * Check the status field to figure out wich
 */
type TResult<TOk, TErr> = IOk<TOk> | IErr<TErr>;

const result = {
	/**
	 * @description
	 * A helper function for creating a ok object
	 * @param data - The data to insert into an ok object
	 * @returns A ok object, indicating success
	 */
	ok<T>(data: T): IOk<T> {
		return {
			status: 'ok',
			data
		};
	},
	/**
	 * @description
	 * A helper function to check if a result has a status of ok rather than err
	 * @param result The result to check if it's status is ok
	 * @returns A boolean indicating if the result has a status of ok
	 */
	isOk<TOk, TErr>(result: TResult<TOk, TErr>): result is IOk<TOk> {
		return result.status === 'ok';
	},
	/**
	 * @description
	 * A helper function for creating a err object
	 * @param err - The data to insert into an err object
	 * @returns A err object, indicating error
	 */
	err<T>(err: T): IErr<T> {
		return {
			status: 'err',
			err
		};
	},
	/**
	 * @description
	 * A helper function to check if a result has a status of err rather than ok
	 * @param result The result to check if it's status is err
	 * @returns A boolean indicating if the result has a status of err
	 */
	isErr<TOk, TErr>(result: TResult<TOk, TErr>): result is IErr<TErr> {
		return result.status === 'err';
	}
};

export default result;
export { type TResult };
