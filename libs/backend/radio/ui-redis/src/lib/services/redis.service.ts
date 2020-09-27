import { Injectable, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Track } from '@sdj/backend/radio/core/domain';
import { connectionConfig } from '@sdj/backend/shared/domain';
import * as redis from 'redis';
import { RedisClient } from 'redis';
import { Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal-compatibility';

interface RedisData<T> {
  channel: string;
  message: T;
}
export type RedisSubject<T> = Subject<RedisData<T>>;

@Injectable()
export class RedisService {
  private redisClient: RedisClient;
  private redisSub: RedisClient;

  constructor() {
    this.redisClient = redis.createClient({
      host: connectionConfig.redis.host,
    });
    this.redisSub = redis.createClient({
      host: connectionConfig.redis.host,
    });
    this.redisSub.subscribe('getNext');
  }

  createSubject<T>(event: string): RedisSubject<T> {
    const observable = new Observable<RedisData<T>>(
      (observer1: Observer<RedisData<T>>) => {
        this.redisSub.on(event, (channel, message) => {
          observer1.next({ channel, message });
        });
      }
    );

    const observer: Observer<RedisData<T>> = {
      // ToDo this always will be string
      next: (data: any) => {
        this.redisClient.publish(event, data);
      },
      error: () => {},
      complete: () => {},
    };

    return new AnonymousSubject<RedisData<T>>(observer, observable);
  }

  getNextSongSubject(channelId: string): RedisSubject<string> {
    return this.createSubject(channelId);
  }

  sendNextSong(channelId: string, track: Track): void {
    this.getNextSongSubject(channelId).next(<any>track.id);
  }
}
