import type { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { verifyAccessToken } from '../../utils/jwt';

type WsMessage = {
  type: 'private_message';
  toUserId: string;
  content: string;
};

const userConnections = new Map<string, WebSocket>();

const parseTokenFromRequest = (req: IncomingMessage): string | null => {
  const host = req.headers.host;
  if (!host || !req.url) return null;

  const url = new URL(req.url, `http://${host}`);
  return url.searchParams.get('token');
};

export const setupWebSocketServer = (server: import('http').Server): WebSocketServer => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (socket, req) => {
    try {
      const token = parseTokenFromRequest(req);
      if (!token) {
        socket.close(1008, 'Token missing');
        return;
      }

      const payload = verifyAccessToken(token);
      userConnections.set(payload.userId, socket);

      socket.on('message', (rawData) => {
        try {
          const data = JSON.parse(rawData.toString()) as WsMessage;

          if (data.type !== 'private_message') {
            return;
          }

          const recipientSocket = userConnections.get(data.toUserId);
          if (!recipientSocket || recipientSocket.readyState !== WebSocket.OPEN) {
            return;
          }

          recipientSocket.send(
            JSON.stringify({
              type: 'private_message',
              fromUserId: payload.userId,
              content: data.content,
              createdAt: new Date().toISOString()
            })
          );
        } catch (_error) {
          socket.send(JSON.stringify({ type: 'error', message: 'Invalid message payload' }));
        }
      });

      socket.on('close', () => {
        userConnections.delete(payload.userId);
      });
    } catch (_error) {
      socket.close(1008, 'Unauthorized');
    }
  });

  return wss;
};
