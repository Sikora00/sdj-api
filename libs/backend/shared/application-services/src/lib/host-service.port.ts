export abstract class HostService {
  abstract startRadioStream(channelId: string): Promise<unknown>;

  abstract removeRadioStream(channelId: string): Promise<unknown>;

  abstract nextSong(channelId: string): Promise<unknown>;
}
