export class LoadMostPlayedTracksQuery {
  static type = '[Track] Load Most Played Tracks';
  type = LoadMostPlayedTracksQuery.type;

  constructor(public channelId: string) {}
}
