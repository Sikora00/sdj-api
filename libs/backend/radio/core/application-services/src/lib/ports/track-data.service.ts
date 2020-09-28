import { TrackDataDto } from '../dtos/track-data.dto';

export abstract class TrackDataService {
  abstract loadTrackData(id: string): Promise<TrackDataDto>;
}
