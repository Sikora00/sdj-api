import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './db.configuration';
import { SdjDbConfigService } from './sdj-db-config.service';

@Global()
@Module({
  imports: [ConfigModule.forFeature(dbConfig)],
  exports: [SdjDbConfigService],
  providers: [SdjDbConfigService],
})
export class DbConfigModule {}
