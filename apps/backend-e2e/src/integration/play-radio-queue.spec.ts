import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { QueuedTrack } from '@sdj/backend/radio/core/domain';
import { BackendRadioUiRedisModule } from '@sdj/backend/radio/ui-redis';
import { WebSocketModule } from '@sdj/backend/radio/ui-web-socket';
import { connectionConfig } from '@sdj/backend/shared/domain';
import { BackendSharedTestingKernelModule } from '@sdj/backend/shared/kernel';
import { WebSocketEvents } from '@sdj/shared/domain';
import 'jest-marbles';
import * as redis from 'redis';
import { RedisClient } from 'redis';
import { getRepository } from 'typeorm';
import { createDb } from '../utils/create-db';
import { fixture } from '../utils/fixture';
import { getClientWebsocketForAppAndNamespace } from '../utils/ws-client.helper';

describe('Play Radio Queue', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.DB_DATABASE = 'sdj_test_play_radio_queue';
    jest.setTimeout(30 * 1000);
    await createDb();

    const module = await Test.createTestingModule({
      imports: [
        WebSocketModule,
        BackendRadioUiRedisModule,
        BackendSharedTestingKernelModule,
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe('With empty queue at start', () => {
    let socket;
    const channelId = '1234';
    const redisPub = redis.createClient({
      host: connectionConfig.redis.host,
    });
    let redisSub: RedisClient;

    beforeAll(async () => {
      redisSub = redis.createClient({
        host: connectionConfig.redis.host,
      });
      redisSub.subscribe(channelId);
    });

    test('user connects to socket, joining to room and waiting for the room to be running', (done) => {
      socket = getClientWebsocketForAppAndNamespace(app, '');
      socket.once('connect', () => {
        socket.emit(WebSocketEvents.join, JSON.stringify({ room: channelId }));
        socket.once(WebSocketEvents.roomIsRunning, () => done());
      });
    });

    test('returns 10-sec-of-silence', (done) => {
      redisSub.on('message', (channel, message) => {
        expect(channel).toEqual(channelId);
        expect(message).toEqual('10-sec-of-silence');
        done();
      });
      redisPub.publish('getNext', channelId);
    });

    test('returns emits playRadio on second silence', (done) => {
      Promise.all([
        new Promise((resolve) => {
          redisSub.on('message', (channel, message) => {
            expect(channel).toEqual(channelId);
            expect(message).toEqual('10-sec-of-silence');
            resolve();
          });
        }),
        new Promise((resolve) =>
          socket.once(WebSocketEvents.playRadio, resolve)
        ),
      ]).then(() => done());
      redisPub.publish('getNext', channelId);
    });
  });

  describe('With songs in queue at start', () => {
    let socket;
    const channelId = '12345';
    const redisPub = redis.createClient({
      host: connectionConfig.redis.host,
    });
    let redisSub: RedisClient;

    beforeAll(async () => {
      await fixture('get-next-song');
      redisSub = redis.createClient({
        host: connectionConfig.redis.host,
      });
      redisSub.subscribe(channelId);
    });

    test('user connects to socket, joining to room and waiting for the room to be running', (done) => {
      socket = getClientWebsocketForAppAndNamespace(app, '');
      socket.once('connect', () => {
        socket.emit(WebSocketEvents.join, JSON.stringify({ room: channelId }));
        socket.once(WebSocketEvents.roomIsRunning, () => done());
      });
    });

    test('on getNext returns first queued track without platedAt and emits playDj', (done) => {
      Promise.all([
        new Promise((resolve) => socket.once(WebSocketEvents.playDj, resolve)),
        new Promise((resolve) => {
          redisSub.once('message', async (channel, message) => {
            expect(channel).toEqual(channelId);
            expect(message).toEqual('_4VCpTZye10');
            setTimeout(async () => {
              expect(
                (await getRepository(QueuedTrack).findOneOrFail(2)).playedAt
              ).toBeTruthy();
              resolve();
            }, 100);
          });
        }),
      ]).then(() => done());
      redisPub.publish('getNext', channelId);
    });

    test('same for next song from queue', (done) => {
      Promise.all([
        new Promise((resolve) => socket.once(WebSocketEvents.playDj, resolve)),
        new Promise((resolve) => {
          redisSub.once('message', (channel, message) => {
            expect(channel).toEqual(channelId);
            expect(message).toEqual('_D1rrdFcj1U');
            resolve();
          });
        }),
      ]).then(() => done());
      redisPub.publish('getNext', channelId);
    });

    test('returns silence when queue is empty', (done) => {
      redisSub.once('message', (channel, message) => {
        expect(channel).toEqual(channelId);
        expect(message).toEqual('10-sec-of-silence');
        done();
      });
      redisPub.publish('getNext', channelId);
    });

    test('returns silence and emits playRadio on second silence playing', (done) => {
      Promise.all([
        new Promise((resolve) =>
          socket.once(WebSocketEvents.playRadio, resolve)
        ),
        new Promise((resolve) => {
          redisSub.once('message', (channel, message) => {
            expect(channel).toEqual(channelId);
            expect(message).toEqual('10-sec-of-silence');
            resolve();
          });
        }),
      ]).then(() => done());
      redisPub.publish('getNext', channelId);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
