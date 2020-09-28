import { Injectable } from '@nestjs/common';
import { Path, pathConfig } from '@sdj/backend/shared/domain';
import path from 'path';
import { Observable } from 'rxjs';
import * as ytdl from 'youtube-dl';

@Injectable()
export class YoutubeTrackService {
  /**
   * Download youtube video and covert it to mp3 format.
   * @param {string} id - youtube video id
   * @returns {Observable<string>} - created mp3 system path
   */
  download(id: string): Promise<Path> {
    const filePath = path.join(pathConfig.tracks, id);

    return new Promise((resolve, reject) =>
      ytdl.exec(
        `https://www.youtube.com/watch?v=${id}`,
        [
          '--restrict-filenames',
          '--geo-bypass-country',
          'PL',
          '-o',
          filePath + '.%(ext)s',
          '--extract-audio',
          '--audio-format',
          'mp3',
          '--audio-quality',
          '1',
        ],
        {},
        (err, output) => {
          if (err) {
            reject(new Error("Can't Download Track"));
          }

          resolve(filePath + '.mp3');
        }
      )
    );
  }
}
