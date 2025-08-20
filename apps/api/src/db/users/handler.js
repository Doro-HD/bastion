import connect from '@/db/index';
import { userTable } from './schema';
import { result } from '@doro-hd/result';
class UserHandler {
    #client;
    #table;
    constructor(dbUrl, dbAuthToken) {
        this.#client = connect(dbUrl, dbAuthToken);
        this.#table = userTable;
    }
    async createUser(newUser) {
        try {
            const id = crypto.randomUUID();
            const users = await this.#client
                .insert(this.#table)
                .values({ id, ...newUser })
                .returning();
            return result.ok(users.at(0));
        }
        catch {
            return result.err('Could not insert new user');
        }
    }
    async findUserByUsername(username) {
        try {
            const user = await this.#client.query.userTable.findFirst({
                where: (user, { eq }) => eq(user.username, username)
            });
            return result.ok(user);
        }
        catch {
            return result.err('Could not select user');
        }
    }
}
export default UserHandler;
