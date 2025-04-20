type Ok<T> = {
	status: 'success';
	data: T;
};

type Err<T> = {
	status: 'error';
	err: T;
};

type Result<TOk, TErr> = Ok<TOk> | Err<TErr>;

function ok<T>(data: T): Ok<T> {
	return {
		status: 'success',
		data
	};
}

function isOk<TOk, TErr>(result: Result<TOk, TErr>): result is Ok<TOk> {
	return result.status === 'success';
}

function err<T>(err: T): Err<T> {
	return {
		status: 'error',
		err
	};
}

function isErr<TOk, TErr>(result: Result<TOk, TErr>): result is Err<TErr> {
	return result.status === 'error';
}

function map<TOk, TNewOk, TErr>(
	result: Result<TOk, TErr>,
	fn: (result: TOk) => Result<TNewOk, TErr>
) {
	if (isOk(result)) {
		return fn(result.data);
	}

	return result;
}

export { ok, isOk, err, isErr, type Result, map };
