import { Injectable } from '@nestjs/common';
import {
  QueuedTrack,
  QueuedTrackDomainRepository,
} from '@sdj/backend/radio/core/domain';
import { SlackService } from '../../../services/slack.service';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class LsSlackCommand implements SlackCommand {
  description: string = 'obczaj listę utworów';
  type: string = 'ls';

  constructor(
    private slack: SlackService,
    private queuedTrackRepository: QueuedTrackDomainRepository
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    const queuedTracks = await this.queuedTrackRepository.findQueuedTracks(
      message.channel
    );

    const currentTrack = await this.queuedTrackRepository.getCurrentTrack(
      message.channel
    );

    const msg = this.mapQueuedTracksToMessage(currentTrack, queuedTracks);

    if (!msg.length) {
      this.slack.rtm.sendMessage('Brak utworów na liście.', message.channel);
    } else {
      this.slack.rtm.sendMessage(msg, message.channel);
    }
  }

  private mapQueuedTracksToMessage(
    currentTrack: QueuedTrack | null,
    queuedTracks: QueuedTrack[]
  ): string {
    let msg = '';
    if (currentTrack) {
      msg +=
        `Teraz gram: ${currentTrack.track.title}, dodane przez ${
          currentTrack.addedBy ? currentTrack.addedBy.realName : 'BOT'
        }` +
        (currentTrack.randomized ? ' (rand)' : '') +
        '\n';
    }

    queuedTracks.forEach((queuedTrack, index) => {
      msg +=
        `${index + 1}. ${queuedTrack.track.title}, dodane przez ${
          queuedTrack.addedBy ? queuedTrack.addedBy.realName : 'BOT'
        }` +
        (queuedTrack.randomized ? ' (rand)' : '') +
        '\n';
    });
    return msg;
  }
}
