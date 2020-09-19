import { pathConfig } from '@sdj/backend/shared/domain';
import { exec } from 'child_process';
import * as path from 'path';
import { Observable, Subject } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import * as ytdl from 'youtube-dl';

const inProgress: { [key: string]: Observable<void> } = {};

/**
 * Download youtube video, convert and normalize mp3.
 * @param {string} id - youtube video id
 * @returns {Observable<string>} - mp3 duration after normalization
 */
export function downloadAndNormalize(id: string): Observable<void> {
  if (inProgress[id]) {
    return inProgress[id];
  }

  const obs = download(id).pipe(
    switchMap((filePath) => normalize(filePath)),
    finalize(() => {
      delete inProgress[id];
    })
  );

  inProgress[id] = obs;

  return obs;
}

/**
 * Download youtube video and covert it to mp3 format.
 * @param {string} id - youtube video id
 * @returns {Observable<string>} - created mp3 system path
 */
function download(id: string): Observable<string> {
  const sub = new Subject<string>();
  const filePath = path.join(pathConfig.tracks, id);

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
        sub.error(new Error("Can't Download Track"));
        sub.complete();
        return;
      }

      sub.next(filePath + '.mp3');
      sub.complete();
    }
  );

  return sub;
}

/**
 * Get mp3 duration.
 * @param {string} trackId
 * @returns {Observable<string>}
 */
export function getDuration(trackId: string): Observable<string> {
  const sub = new Subject<string>();
  const filePath = path.join(pathConfig.tracks, `${trackId}.mp3`);

  try {
    exec(`mp3info -p "%S" ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        sub.error(err);
      } else {
        sub.next(stdout);
      }

      sub.complete();
    });
  } catch (e) {
    sub.error(e);
    sub.complete();
  }

  return sub;
}

/**
 * Normalize mp3 with mp3gain.
 * @param {string} filePath - system path to mp3 file
 * @returns {Observable<void>}
 */
function normalize(filePath: string): Observable<void> {
  const sub = new Subject<void>();
  const normalizationDb = 92;

  exec(
    `mp3gain -c -p -r -d ${normalizationDb - 89} ${filePath} && \\
sox ${filePath} ${filePath}.temp.mp3 silence 1 0.1 1% reverse silence 1 0.1 1% reverse && \\
rm ${filePath} && \\
mv ${filePath}.temp.mp3 ${filePath}
`,
    (err, stdout, stderr) => {
      if (err) {
        sub.error(err);
      } else {
        sub.next();
      }

      sub.complete();
    }
  );

  return sub;
}
