import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ChannelStartedEvent } from '../events/channel-started.event';
import { ChannelStoppedEvent } from '../events/channel-stopped.event';
import { ChannelUpdatedEvent } from '../events/channel-updated.event';
import { ChannelWillStartEvent } from '../events/channel-will-start.event';
import { ChannelWillStopEvent } from '../events/channel-will-stop.event';
import { UserJoinedChannelEvent } from '../events/user-joined-channel.event';
import { UserLeavedChannelEvent } from '../events/user-leaved-channel.event';
import { QueuedTrack } from './queued-track.entity';

@Entity()
export class Channel extends AggregateRoot {
  @Column('varchar', {
    length: 200,
    nullable: true,
  })
  defaultStreamUrl: string;

  @PrimaryColumn('varchar')
  id: string;

  @Column({
    default: false,
  })
  isRunning: boolean;

  @Column('varchar', {
    length: 200,
    nullable: true,
  })
  name: string;

  @OneToMany((type) => QueuedTrack, (queuedTrack) => queuedTrack.track)
  queuedTracks: Promise<QueuedTrack[]>;

  @Column({
    default: 0,
  })
  usersOnline: number;

  constructor(id: string) {
    super();
    this.id = id;
  }

  static create(id: string, name: string): Channel {
    const channel = new Channel(id);
    channel.name = name;
    return channel;
  }

  join(): void {
    this.usersOnline = this.usersOnline + 1;
    this.apply(new UserJoinedChannelEvent(this.id));
    if (!this.isRunning) {
      this.apply(new ChannelWillStartEvent(this.id));
    }
    this.apply(new ChannelUpdatedEvent(this.id));
  }

  leave(): void {
    if (this.usersOnline !== 0) {
      this.usersOnline = this.usersOnline - 1;
      this.apply(new UserLeavedChannelEvent(this.id));
      if (this.usersOnline === 0) {
        this.apply(new ChannelWillStopEvent(this.id));
      }
      this.apply(new ChannelUpdatedEvent(this.id));
    }
  }

  setDefaultStream(streamUrl: string): void {
    this.defaultStreamUrl = streamUrl;
    this.apply(new ChannelUpdatedEvent(this.id));
  }

  start(): void {
    this.isRunning = true;
    this.apply(new ChannelStartedEvent(this.id));
    this.apply(new ChannelUpdatedEvent(this.id));
  }

  stop(): void {
    this.isRunning = false;
    this.apply(new ChannelStoppedEvent(this.id));
    this.apply(new ChannelUpdatedEvent(this.id));
  }
}
