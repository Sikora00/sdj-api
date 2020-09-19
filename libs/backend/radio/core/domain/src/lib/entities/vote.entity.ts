import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { QueuedTrack } from './queued-track.entity';
import { User } from './user.entity';

@Entity()
export class Vote {
  @Column('datetime')
  createdAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn()
  addedBy: User;

  @ManyToOne((type) => Channel)
  @JoinColumn()
  addedIn: Channel;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => QueuedTrack, (track) => track.votes)
  @JoinColumn()
  track: QueuedTrack;

  @Column('int')
  value: number;

  constructor(addedBy: User, track: QueuedTrack, value: number) {
    this.addedBy = addedBy;
    this.track = track;
    this.value = value;
  }
}
