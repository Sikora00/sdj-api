import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigModule } from './config/db-config.module';
import { SdjDbConfigService } from './config/sdj-db-config.service';

@Module({
  imports: [
    DbConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: SdjDbConfigService) => {
        return {
          type: 'mariadb' as 'mariadb',
          host: configService.host,
          port: 3306,
          username: configService.user,
          password: configService.password,
          database: configService.name,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [SdjDbConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeOrmRootModule {}
