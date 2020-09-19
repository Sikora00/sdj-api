import { Track as ITrack } from '@sdj/shared/domain';

export interface Track extends ITrack {
  playedCount: number;
}
