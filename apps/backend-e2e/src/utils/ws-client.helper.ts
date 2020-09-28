import { INestApplication } from '@nestjs/common';
import io from 'socket.io-client';

export const getClientWebsocketForAppAndNamespace = (
  app: INestApplication,
  namespace: string,
  query?: object
) => {
  const httpServer = app.getHttpServer();
  if (!httpServer.address()) {
    httpServer.listen(0);
  }

  return io(`http://127.0.0.1:${httpServer.address().port}`);
};
