import * as fs from 'fs';
import { getConnection } from 'typeorm';

const fixtureDir = `${__dirname}/../fixtures`;

export async function fixture(name: string): Promise<void> {
  const connection = getConnection();
  const fixtures = fs.readFileSync(`${fixtureDir}/${name}.sql`, {
    encoding: 'utf8',
  });
  for (const query of fixtures.split('\n').filter((q) => q !== '')) {
    await connection.query(query);
  }
}
