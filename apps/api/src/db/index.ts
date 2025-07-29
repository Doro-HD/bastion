import { drizzle } from 'drizzle-orm/libsql';
import * as userSchema from './users/schema';

function connect(dbUrl: string, authToken: string) {
	return drizzle({ connection: { url: dbUrl, authToken }, schema: { ...userSchema } });
}

export default connect;

type TConnection = ReturnType<typeof connect>;
export { TConnection };
