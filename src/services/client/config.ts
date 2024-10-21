const env = (import.meta as unknown as { env: { DEV: Boolean } }).env;

export const isDev = env.DEV
