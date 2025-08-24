import connect, { TConnection } from '$/db/index';
import { TUserSelect, TUserInsert, TUserTable } from './types';
import { userTable } from './schema';
import { result } from '@doro-hd/result';

class UserHandler {
	#client: TConnection;
	#table: TUserTable;

	constructor(dbUrl: string, dbAuthToken: string) {
		this.#client = connect(dbUrl, dbAuthToken);
		this.#table = userTable;
	}

	async createUser(newUser: TUserInsert): Promise<result.TResult<TUserSelect | undefined, string>> {
		try {
			const id = crypto.randomUUID();
			const users = await this.#client
				.insert(this.#table)
				.values({ id, ...newUser })
				.returning();

			return result.ok(users.at(0));
		} catch (err) {
			console.log(err)
			return result.err('Could not insert new user');
		}
	}

	async findUserByUsername(
		username: TUserSelect['username']
	): Promise<result.TResult<TUserSelect | undefined, string>> {
		try {
			const user = await this.#client.query.userTable.findFirst({
				where: (user, { eq }) => eq(user.username, username)
			});

			return result.ok(user);
		} catch {
			return result.err('Could not select user');
		}
	}
}

export default UserHandler;
