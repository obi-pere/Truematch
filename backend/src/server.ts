import { createServer } from 'http';
import { execFileSync } from 'child_process';
import { env } from './config/env';
import { app } from './app';
import { setupWebSocketServer } from './modules/chat/websocket';

const httpServer = createServer(app);
const webSocketServer = setupWebSocketServer(httpServer);

webSocketServer.on('error', (error) => {
  console.error('WebSocket server error:', error.message);
});

const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const getListeningPids = (port: number): number[] => {
  try {
    const output = execFileSync('lsof', ['-t', '-i', `TCP:${port}`, '-sTCP:LISTEN'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });

    return output
      .split('\n')
      .map((line) => Number.parseInt(line.trim(), 10))
      .filter((pid) => Number.isInteger(pid) && pid > 0 && pid !== process.pid);
  } catch {
    return [];
  }
};

const terminatePid = async (pid: number): Promise<void> => {
  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    return;
  }

  await sleep(300);

  try {
    process.kill(pid, 0);
    process.kill(pid, 'SIGKILL');
  } catch {
    return;
  }
};

const reclaimPort = async (port: number): Promise<boolean> => {
  const pids = getListeningPids(port);

  if (!pids.length) {
    return false;
  }

  console.warn(`Port ${port} is busy. Releasing listener PID(s): ${pids.join(', ')}`);
  await Promise.all(pids.map((pid) => terminatePid(pid)));
  await sleep(200);
  return getListeningPids(port).length === 0;
};

const startServer = (retryCount = 0): void => {
  httpServer.once('error', async (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE' && env.NODE_ENV === 'development' && retryCount < 1) {
      const reclaimed = await reclaimPort(env.PORT);

      if (reclaimed) {
        console.warn(`Port ${env.PORT} was reclaimed. Retrying backend startup...`);
        startServer(retryCount + 1);
        return;
      }
    }

    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${env.PORT} is already in use. Kill the process on that port and restart backend.`);
      process.exit(1);
    }

    console.error('HTTP server error:', error.message);
    process.exit(1);
  });

  httpServer.listen(env.PORT, () => {
    console.log(`Backend listening on http://localhost:${env.PORT}`);
  });
};

startServer();

const shutdown = (): void => {
  webSocketServer.close();
  httpServer.close(() => process.exit(0));

  setTimeout(() => process.exit(1), 5000).unref();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
