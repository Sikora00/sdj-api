import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Channel,
  ChannelRepositoryInterface,
  QueuedTrack,
  QueuedTrackRepositoryInterface,
  Track,
  TrackRepositoryInterface,
  User,
  UserRepositoryInterface,
  Vote,
  VoteRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { TypeormChannelRepository } from './repositories/typeorm-channel.repository';
import { TypeormQueuedTrackRepository } from './repositories/typeorm-queued-track.repository';
import { TypeormTrackRepository } from './repositories/typeorm-track.repository';
import { TypeormUserRepository } from './repositories/typeorm-user.repository';
import { TypeormVoteRepository } from './repositories/typeorm-vote.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, QueuedTrack, Track, User, Vote]),
  ],
  providers: [
    { provide: ChannelRepositoryInterface, useClass: TypeormChannelRepository },
    {
      provide: QueuedTrackRepositoryInterface,
      useClass: TypeormQueuedTrackRepository,
    },
    { provide: TrackRepositoryInterface, useClass: TypeormTrackRepository },
    { provide: UserRepositoryInterface, useClass: TypeormUserRepository },
    { provide: VoteRepositoryInterface, useClass: TypeormVoteRepository },
  ],
  exports: [
    ChannelRepositoryInterface,
    QueuedTrackRepositoryInterface,
    TrackRepositoryInterface,
    UserRepositoryInterface,
    VoteRepositoryInterface,
  ],
})
export class BackendRadioInfrastructureTypeormModule {}
