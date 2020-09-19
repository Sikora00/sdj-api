export const connectionConfig = {
  db: {
    host: 'database',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
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
