const DEV = Boolean(import.meta.env.VITE_DEV) || 'Environment not set';
const DB_URL = import.meta.env.VITE_DB_URL || 'DB URL not set';
const DB_AUTH_TOKEN = import.meta.env.VITE_DB_AUTH_TOKEN || 'DB AUTH TOKEN not set';

export { DEV, DB_URL, DB_AUTH_TOKEN };
