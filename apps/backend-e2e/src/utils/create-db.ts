import { createConnection } from 'typeorm';

export async function createDb(): Promise<void> {
  const dbName = process.env.DB_DATABASE;

  const connection = await createConnection({
    name: 'create-db',
    type: 'mariadb' as 'mariadb',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_ROOT_PASSWORD,
  });
  await connection.query(`DROP DATABASE IF EXISTS ${dbName};`);
  await connection.query(`CREATE DATABASE ${dbName}`);
  await connection.close();
}
