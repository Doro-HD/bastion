console.log(import.meta.env)
const DEV = import.meta.env.VITE_DEV || 'Environment not set';
const DB_URL = import.meta.env.VITE_DB_URL || 'DB URL not set';
const DB_AUTH_TOKEN = import.meta.env.VITE_DB_URL || 'DB AUTH TOKEN not set';

export {
    DEV,
    DB_URL,
    DB_AUTH_TOKEN
};