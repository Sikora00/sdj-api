import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  ChannelRepositoryInterface,
  QueuedTrack,
  QueuedTrackRepositoryInterface,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { RadioFacade } from '../../radio.facade';
import { DeleteQueuedTrackCommand } from '../delete-queued-track/delete-queued-track.command';
import { DownloadAndPlayCommand } from '../download-and-play/download-and-play.command';
import { QueueTrackCommand } from '../queue-track/queue-track.command';
import { PlayNextTrackOrSilenceCommand } from './play-next-track-or-silence.command';

@CommandHandler(PlayNextTrackOrSilenceCommand)
export class PlayNextTrackOrSilenceHandler
  implements ICommandHandler<PlayNextTrackOrSilenceCommand> {
  constructor(
    private channelRepository: ChannelRepositoryInterface,
    private publisher: EventPublisher,
    private radioFacade: RadioFacade,
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private trackRepository: TrackRepositoryInterface
  ) {}

  async execute(command: PlayNextTrackOrSilenceCommand): Promise<any> {
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrCreate(command.channelId)
    );
    const queuedTrack = await this.getNextTrack(channel.id);
    if (queuedTrack) {
      try {
        await this.radioFacade.downloadAndPlay(
          new DownloadAndPlayCommand(queuedTrack)
        );
      } catch (e) {
        await this.radioFacade.deleteQueuedTrack(
          new DeleteQueuedTrackCommand(queuedTrack.id)
        );
        await this.execute(command);
      }
    } else {
      channel.playSilence();
      channel.commit();
      await this.channelRepository.save(channel);
    }
  }

  private async getNextTrack(
    channelId: string
  ): Promise<QueuedTrack | undefined> {
    const queuedTrack = await this.queuedTrackRepository.getNextSongInQueue(
      channelId
    );
    if (queuedTrack) {
      return queuedTrack;
    } else {
      const tracksInDb = await this.trackRepository.countTracks(channelId);
      if (tracksInDb >= appConfig.trackLengthToStartOwnRadio) {
        const randTrack = await this.trackRepository.getRandomTrack(channelId);
        if (randTrack) {
          const newQueuedTrack = await this.radioFacade.queueTrack(
            new QueueTrackCommand(randTrack.id, channelId, undefined, true)
          );
          return this.queuedTrackRepository.findOneOrFail(newQueuedTrack.id);
        }
      }
    }
  }
}
