export const connectionConfig = {
  ices: {
    host: 'ices',
    port: 8888,
  },
  redis: {
    host: 'redis',
    port: 6379,
  },
  slack: {
    token: process.env.SLACK_OAUTH_TOKEN,
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
  },
};
