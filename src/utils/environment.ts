const environment = {
  SENTRY_DSN: import.meta.env.VITE_APP_SENTRY_DSN,
  SERVER_URL: import.meta.env.VITE_APP_SERVER_URL,
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,
};

export default environment;
