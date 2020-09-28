export const appConfig = {
  dbDateFormat: 'yyyy-MM-dd hh:mm',
  nextSongVoteQuantity: parseInt(
    process.env.BACKEND_NEXT_SONG_VOTE_QUANTITY,
    10
  ),
  trackLengthToStartOwnRadio: parseInt(
    process.env.BACKEND_TRACKS_TO_START_OWN_RADIO,
    10
  ),
  queuedTracksPerUser: parseInt(process.env.BACKEND_QUEUED_TRACKS_PER_USER, 10),
  skipsToBan: parseInt(process.env.BACKEND_SKIPS_TO_BAN, 10),
};
