import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueuedTrackRepository } from '../../../../core/modules/db/repositories/queued-track.repository';
import { SlackService } from '../../../services/slack.service';
import { SlackCommand } from '../interfaces/slack-command';

@Injectable()
export class LsSlackCommand implements SlackCommand {
    description = 'obczaj listę utworów';
    type = 'ls';

    constructor(
        private slack: SlackService,
        @InjectRepository(QueuedTrackRepository) private queuedTrackRepository: QueuedTrackRepository
    ) {
    }

    async handler(command: string[], message: any): Promise<any> {
        const queuedTracks = await this.queuedTrackRepository.findQueuedTracks();

        let msg = '';

        const currentTrack = await this.queuedTrackRepository.getCurrentTrack();
            if (currentTrack) {
                msg += `Teraz gram: ${(await currentTrack.track).title}, dodane przez ${currentTrack.addedBy ? currentTrack.addedBy.realName : 'BOT'}` + (currentTrack.randomized ? ' (rand)' : '') + '\n';
            }

        queuedTracks.forEach((queuedTrack, index) => {
            msg += `${index + 1}. ${queuedTrack.track.title}, dodane przez ${queuedTrack.addedBy ? queuedTrack.addedBy.realName : 'BOT'}` + (queuedTrack.randomized ? ' (rand)' : '') + '\n';
        });

        if (!msg.length) {
            this.slack.rtm.sendMessage('Brak utworów na liście.', message.channel);
        } else {
            this.slack.rtm.sendMessage(msg, message.channel);
        }

    }
}