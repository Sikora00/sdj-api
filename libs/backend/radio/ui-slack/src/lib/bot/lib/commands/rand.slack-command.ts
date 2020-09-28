import { Injectable } from '@nestjs/common';
import {
  DownloadTrackCommand,
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
export class RandSlackCommand implements SlackCommand {
  description: string = 'wylosuję pioseneczkę i dodam do listy utworów';
  type: string = 'rand';

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

    const randTrack = await this.trackRepository.getRandomTrack(
      message.channel
    );

    if (randTrack) {
      this.radioFacade
        .downloadTrack(new DownloadTrackCommand(randTrack.id))
        .then(() => {
          this.queueTrack(message, randTrack);
        })
        .catch(() => {
          this.slack.sendMessage(
            `Nie da rady pobrać ${randTrack.title} :(`,
            message.channel
          );
        });
    } else {
      this.slack.sendMessage(`Nie ma w czym wybierać :/`, message.channel);
    }
  }

  private async queueTrack(message: any, track: Track): Promise<void> {
    this.radioFacade
      .queueTrack(
        new QueueTrackCommand(track.id, message.channel, message.user, true)
      )
      .then(() => {
        this.slack.sendMessage(
          `Dodałem ${track.title} do playlisty :)`,
          message.channel
        );
      });
  }
}
