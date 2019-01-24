import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { appConfig } from '../../../configs/app.config';
import { PlaylistType } from '../enums/playlist-type.enum';
import { QueuedTrack } from '../modules/db/entities/queued-track.model';
import { QueuedTrackRepository } from '../modules/db/repositories/queued-track.repository';
import { TrackRepository } from '../modules/db/repositories/track.repository';
import { UserRepository } from '../modules/db/repositories/user.repository';

@Injectable()
export class PlaylistService {
    type: PlaylistType = PlaylistType.topRated;
    index = 10;
    pozdro = new Subject<string>();

    constructor(
        @InjectRepository(TrackRepository) private trackRepository: TrackRepository,
        @InjectRepository(QueuedTrackRepository) private queuedTrackRepository: QueuedTrackRepository,
        @InjectRepository(UserRepository) private userRepository: UserRepository
    ) {
    }

    async getNext(): Promise<QueuedTrack | undefined> {
        const queuedTrack = await this.queuedTrackRepository.getNextSongInQueue();
        if (queuedTrack) {
            return queuedTrack;
        } else {
            switch (this.type) {
                case PlaylistType.topRated:
                    this.index--;
                    if (this.index < 0) {
                        this.type = PlaylistType.radio;
                    }
                    this.pozdro.next('Numer ' + (this.index + 1));
                    const tracks = await this.trackRepository.findTopRatedTracks(this.index);
                    return this.queuedTrackRepository.queueTrack(tracks[0]);
                case PlaylistType.radio:
                default:
                    const tracksInDb = await this.trackRepository.countTracks();
                    if (tracksInDb >= appConfig.trackLengthToStartOwnRadio) {
                        const randTrack = await this.trackRepository.getRandomTrack();
                        return this.queuedTrackRepository.queueTrack(randTrack, true);
                    }
                    break;
            }
        }
    }

    removeQueuedTrack(queuedTrack: QueuedTrack): Promise<QueuedTrack> {
        return this.queuedTrackRepository.remove(queuedTrack);
    }

    /**
     * Update playedAt in database to current or provided time
     * @param {QueuedTrack} queuedTrack
     * @param {Date} [playedAt]
     * @returns {Observable<QueuedTrack>}
     */
    updateQueuedTrackPlayedAt(queuedTrack: QueuedTrack, playedAt?: Date): Promise<QueuedTrack> {
        queuedTrack.playedAt = playedAt || new Date();

        return this.queuedTrackRepository.save(queuedTrack);
    }
}