import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST,
  name: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
}));
