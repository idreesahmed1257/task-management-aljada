import { env } from './config/env';
import { connectDatabase } from './config/database';
import app from './app';

async function start() {
  await connectDatabase();
  const server = app.listen(env.PORT, () => {
    console.log(`[server] Running on port ${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = () => {
    server.close(() => {
      console.log('[server] Gracefully shut down');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start().catch((err) => {
  console.error('[server] Failed to start:', err);
  process.exit(1);
});
