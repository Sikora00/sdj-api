import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Channel,
  QueuedTrack,
  Track,
  User,
  Vote,
} from '@sdj/backend/radio/core/domain';

const typeormModule = TypeOrmModule.forFeature([
  Channel,
  QueuedTrack,
  Track,
  User,
  Vote,
]);

@Module({
  imports: [typeormModule],
  exports: [typeormModule],
})
export class DbModule {}
