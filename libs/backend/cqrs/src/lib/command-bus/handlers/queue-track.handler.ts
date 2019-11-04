import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { appConfig } from "@sdj/backend/config";
import { ChannelRepository, QueuedTrack, QueuedTrackRepository, TrackRepository } from "@sdj/backend/db";
import { QueueTrackCommand } from "../../../../../core/src/lib/cqrs/commands/queue-track.command";
import { StorageServiceFacade } from "../../../../../core/src/lib/services/storage-service.facade";

@CommandHandler(QueueTrackCommand)
export class QueueTrackHandler implements ICommandHandler<QueueTrackCommand> {
  constructor(
    private readonly storageService: StorageServiceFacade,
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
    @InjectRepository(QueuedTrackRepository)
    private queuedTrackRepository: QueuedTrackRepository,
    @InjectRepository(TrackRepository)
    private readonly trackRepository: TrackRepository
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
          `Masz przekroczony limit ${
            appConfig.queuedTracksPerUser
          } zakolejkowanych utworów.`
        );
      }
    }
    const queuedTrackPromise = this.queuedTrackRepository.queueTrack(
      track,
      channel,
      command.randomized,
      command.addedBy
    );

    queuedTrackPromise.then(queuedTrack =>
      this.storageService.addToQueue(queuedTrack)
    );
    return queuedTrackPromise;
  }
}
