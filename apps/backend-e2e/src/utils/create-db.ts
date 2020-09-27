import { createConnection } from 'typeorm';
import { connectionConfig } from '../../../../libs/backend/shared/domain/src';

export async function createDb(): Promise<void> {
  const dbName = connectionConfig.db.database;
  const connection = await createConnection({
    name: 'create-db',
    type: 'mariadb' as 'mariadb',
    host: connectionConfig.db.host,
    port: connectionConfig.db.port,
    username: connectionConfig.db.username,
    password: connectionConfig.db.password,
  });
  await connection.query(`DROP DATABASE IF EXISTS ${dbName};`);
  await connection.query(`CREATE DATABASE ${dbName}`);
  await connection.close();
}
