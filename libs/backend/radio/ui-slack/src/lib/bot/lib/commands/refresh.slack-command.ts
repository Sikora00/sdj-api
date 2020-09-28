import { Injectable } from '@nestjs/common';
import {
  QueueTrackCommand,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';
import {
  QueuedTrackRepositoryInterface,
  Track,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import {
  SlackCommand,
  SlackCommandHandler,
  SlackMessage,
  SlackService,
} from '@sikora00/nestjs-slack-bot';

@SlackCommandHandler()
@Injectable()
export class RefreshSlackCommand implements SlackCommand {
  description: string = 'zagram pioseneczkę, która była grana najdawniej';
  type: string = 'refresh';

  constructor(
    private readonly radioFacade: RadioFacade,
    private slack: SlackService,
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private trackRepository: TrackRepositoryInterface
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    const queuedTracksCount = await this.queuedTrackRepository.countTracksInQueueFromUser(
      message.user,
      message.channel
    );

    if (queuedTracksCount >= appConfig.queuedTracksPerUser) {
      this.slack.sendMessage(
        `Osiągnąłeś limit ${appConfig.queuedTracksPerUser} zakolejkowanych utworów.`,
        message.channel
      );
      throw new Error('zakolejkowane');
    }

    const groupedTracksQuery = this.queuedTrackRepository
      .createQueryBuilder('queuedTrack')
      .select('trackId, MAX(createdAt) as createdAt')
      .where('queuedTrack.playedIn = :channelId')
      .setParameter('channelId', message.channel)
      .groupBy('trackId');

    const oldestTrack = await this.queuedTrackRepository
      .createQueryBuilder('queuedTrack')
      .select('*')
      .from(`(${groupedTracksQuery.getQuery()})`, 'latest')
      .orderBy('latest.createdAt', 'ASC')
      .where('queuedTrack.playedIn = :channelId')
      .setParameter('channelId', message.channel)
      .limit(1)
      .execute();

    if (oldestTrack[0] && oldestTrack[0].trackId) {
      const trackId = oldestTrack[0].trackId;
      const refreshTrack = await this.trackRepository.findOne(trackId);
      if (refreshTrack) {
        this.queueTrack(message, refreshTrack);
      }
    }
  }

  private async queueTrack(message: any, track: Track): Promise<void> {
    this.radioFacade
      .queueTrack(
        new QueueTrackCommand(track.id, message.channel, message.user, true)
      )
      .then((_) =>
        this.slack.sendMessage(
          `Odświeżamy! Dodałem ${track.title} do playlisty :)`,
          message.channel
        )
      )
      .catch((error) => {
        this.slack.sendMessage(error.message, message.channel);
      });
  }
}
