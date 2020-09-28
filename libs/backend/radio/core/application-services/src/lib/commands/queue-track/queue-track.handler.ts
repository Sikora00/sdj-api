import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ChannelRepositoryInterface,
  QueuedTrack,
  QueuedTrackRepositoryInterface,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { Store } from '../../ports/store.port';

import { QueueTrackCommand } from './queue-track.command';

@CommandHandler(QueueTrackCommand)
export class QueueTrackHandler implements ICommandHandler<QueueTrackCommand> {
  constructor(
    private readonly storageService: Store,
    private channelRepository: ChannelRepositoryInterface,
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private readonly trackRepository: TrackRepositoryInterface
  ) {}

  async execute(command: QueueTrackCommand): Promise<QueuedTrack> {
    const channel = await this.channelRepository.findOrCreate(
      command.channelId
    );
    const track = await this.trackRepository.findOneOrFail(command.trackId);
    if (track.skips >= appConfig.skipsToBan) {
      throw new Error('Song is banned');
    }
    if (command.addedBy) {
      const queuedTracksCount = await this.queuedTrackRepository.countTracksInQueueFromUser(
        command.addedBy.id,
        command.channelId
      );

      if (queuedTracksCount >= appConfig.queuedTracksPerUser) {
        throw new Error(
          `Masz przekroczony limit ${appConfig.queuedTracksPerUser} zakolejkowanych utworów.`
        );
      }
    }
    let queuedTrack = new QueuedTrack(
      track,
      channel,
      command.randomized,
      command.addedBy
    );

    queuedTrack = await this.queuedTrackRepository.save(queuedTrack);
    await this.storageService.addToQueue(queuedTrack);
    return queuedTrack;
  }
}
