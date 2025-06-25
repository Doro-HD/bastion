import { describe, expect, it } from 'vitest';
import result from './result';

describe('Result', () => {
	describe('Ok', () => {
		const dataResult = result.ok({ id: 1 });

		it('Should create an ok object', () => {
			expect(dataResult).toStrictEqual({ status: 'ok', data: { id: 1 } });
		});

		it('Should say that result is ok', () => {
			const isOk = result.isOk(dataResult);

			expect(isOk).toBe(true);
		});

		it('Should say that result is not ok', () => {
			const errResult = result.err({ message: 'Wrong id' });
			const isErr = result.isOk(errResult);

			expect(isErr).toBe(false);
		});
	});

	describe('Err', () => {
		const dataResult = result.err({ message: 'Wrong id' });

		it('Should create an err object', () => {
			expect(dataResult).toStrictEqual({ status: 'err', err: { message: 'Wrong id' } });
		});

		it('Should say that result is err', () => {
			const isErr = result.isErr(dataResult);

			expect(isErr).toBe(true);
		});

		it('Should say that result is not err', () => {
			const okResult = result.ok({ id: 1 });
			const isErr = result.isErr(okResult);

			expect(isErr).toBe(false);
		});
	});
});
