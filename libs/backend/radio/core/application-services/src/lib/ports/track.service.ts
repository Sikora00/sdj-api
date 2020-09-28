import { Path } from '@sdj/backend/shared/domain';

export abstract class TrackService {
  /**
   * Download video and covert it to mp3 format.
   * @param {string} id - video id
   * @returns {Promise<Path>} - created mp3 system path
   */
  abstract download(id: string): Promise<Path>;

  /**
   * Get mp3 duration.
   * @param {string} trackId
   * @returns {Promise<number>}
   */
  abstract getDuration(trackId: string): Promise<number>;
}
