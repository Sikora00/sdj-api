import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BackendRadioFeatureModule } from '@sdj/backend/radio/feature';
import { AppController } from './controllers/app.controller';
import { ChannelController } from './controllers/channel.controller';
import { TrackResolver } from './controllers/track.resolver';

@Module({
  imports: [
    BackendRadioFeatureModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    })
  ],
  controllers: [AppController, ChannelController],
  providers: [TrackResolver]
})
export class BackendRadioUiRestModule {}
