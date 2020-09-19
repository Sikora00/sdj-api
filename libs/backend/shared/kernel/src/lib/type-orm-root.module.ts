import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from '@sdj/backend/shared/domain';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  synchronize: true,
  host: connectionConfig.db.host,
  port: connectionConfig.db.port,
  username: connectionConfig.db.username,
  password: connectionConfig.db.password,
  database: connectionConfig.db.database,
  autoLoadEntities: true,
});

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class TypeOrmRootModule {}
