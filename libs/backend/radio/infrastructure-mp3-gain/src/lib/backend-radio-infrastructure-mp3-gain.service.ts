import { Injectable } from '@nestjs/common';
import { pathConfig } from '@sdj/backend/shared/domain';
import { exec } from 'child_process';
import * as path from 'path';

@Injectable()
export class BackendRadioInfrastructureMp3GainService {
  /**
   * Get mp3 duration.
   * @param {string} trackId
   * @returns {Promise<number>}
   */
  getDuration(trackId: string): Promise<number> {
    const filePath = path.join(pathConfig.tracks, `${trackId}.mp3`);
    return new Promise((resolve, reject) =>
      exec(`mp3info -p "%S" ${filePath}`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve(+stdout);
        }
      })
    );
  }

  /**
   * Normalize mp3 with mp3gain.
   * @param {string} filePath - system path to mp3 file
   * @returns {Promise<void>}
   */
  normalize(filePath: string): Promise<void> {
    const normalizationDb = 92;

    return new Promise((resolve, reject) =>
      exec(
        `mp3gain -c -p -r -d ${normalizationDb - 89} ${filePath} && \\
sox ${filePath} ${filePath}.temp.mp3 silence 1 0.1 1% reverse silence 1 0.1 1% reverse && \\
rm ${filePath} && \\
mv ${filePath}.temp.mp3 ${filePath}
`,
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    );
  }
}
