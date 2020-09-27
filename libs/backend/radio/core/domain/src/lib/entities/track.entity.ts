import { Track as ITrack } from '@sdj/shared/domain';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { QueuedTrack } from './queued-track.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Track implements ITrack {
  @ManyToOne((type) => User)
  @JoinColumn()
  addedBy: User | null;

  @Column('datetime')
  createdAt: Date;

  @Column('int', { default: 0 })
  duration: number;

  @Field()
  @PrimaryColumn('varchar')
  id: string;

  @Column('int', {
    default: 0,
  })
  skips: number;

  @Field()
  @Column('varchar', {
    length: 200,
  })
  title: string;

  @OneToMany((type) => QueuedTrack, (queuedTrack) => queuedTrack.track)
  queuedTracks: Promise<QueuedTrack[]>;

  @Field((type) => Number)
  async playedCount(): Promise<number> {
    return (await this.queuedTracks).filter(
      (queuedTrack) => !queuedTrack.randomized
    ).length;
  }

  constructor(id: string, title: string, addedBy: User | null) {
    this.id = id;
    this.title = title;
    this.createdAt = new Date();
    this.addedBy = addedBy;
  }
}
