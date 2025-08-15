import { drizzle } from 'drizzle-orm/libsql';
import * as userSchema from './users/schema';
import * as sessionSchema from './sessions/schema';

function connect(dbUrl: string, authToken: string) {
	return drizzle({
		connection: { url: dbUrl, authToken },
		schema: { ...userSchema, ...sessionSchema }
	});
}

export default connect;

type TConnection = ReturnType<typeof connect>;
export { TConnection };
