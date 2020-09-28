import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  TrackDataService,
  TrackService,
} from '@sdj/backend/radio/core/application-services';
import {
  Channel,
  QueuedTrack,
  Track,
  User,
} from '@sdj/backend/radio/core/domain';
import { SlackModule } from '@sdj/backend/radio/ui-slack';
import { WebSocketModule } from '@sdj/backend/radio/ui-web-socket';
import { BackendSharedTestingKernelModule } from '@sdj/backend/shared/kernel';
import { SlackService, SlackTestingService } from '@sikora00/nestjs-slack-bot';
import 'jest-marbles';
import { getRepository } from 'typeorm';
import { UserDataService } from '../../../../libs/backend/radio/ui-slack/src/lib/bot/lib/interceptors/user-data.service';
import { createDb } from '../utils/create-db';

describe('Add Track To Queue', () => {
  let app: INestApplication;
  let slack: jest.Mocked<SlackTestingService>;
  let trackDataService: jest.Mocked<TrackDataService>;
  let trackService: jest.Mocked<TrackService>;
  let userDataService: jest.Mocked<UserDataService>;

  beforeAll(async () => {
    process.env.DB_DATABASE = 'sdj_test_add_track_to_queue';
    jest.setTimeout(30 * 1000);
    await createDb();

    const module = await Test.createTestingModule({
      imports: [WebSocketModule, SlackModule, BackendSharedTestingKernelModule],
    })
      .overrideProvider(UserDataService)
      .useValue({ getUserData: jest.fn() })
      .overrideProvider(TrackDataService)
      .useValue({ loadTrackData: jest.fn() })
      .overrideProvider(TrackService)
      .useValue({ download: jest.fn(), getDuration: jest.fn() })
      .compile();
    app = module.createNestApplication();
    slack = module.get(SlackService);
    trackDataService = module.get(TrackDataService);
    trackService = module.get(TrackService);
    userDataService = module.get(UserDataService);
    await app.init();
  });

  test('saves track, channel, user and queued track in database', (done) => {
    userDataService.getUserData.mockResolvedValue({
      user: '1234',
      name: 'Maciej',
      profile: { display_name: 'Maciek', real_name: 'Maciej Sikorski' },
    });
    slack.fakeReceiveMessage('message', {
      type: 'message',
      channel: 'abc',
      user: '1234',
      text: 'play <https://www.youtube.com/watch?v=G8dsvclf3Tk>',
    } as any);
    trackDataService.loadTrackData.mockResolvedValue({
      title: 'Title',
      duration: 4 * 60 * 1000,
    });
    trackService.download.mockResolvedValue('some-path.mp3');
    trackService.getDuration.mockResolvedValue(4 * 60 * 1000);
    setTimeout(async () => {
      expect(await getRepository(User).findOneOrFail('1234')).toBeTruthy();
      expect(await getRepository(Channel).findOneOrFail('abc')).toBeTruthy();
      expect(await getRepository(QueuedTrack).findOneOrFail(1)).toBeTruthy();
      expect(
        await getRepository(Track).findOneOrFail('G8dsvclf3Tk')
      ).toBeTruthy();
      done();
    }, 5 * 1000);
  });

  afterAll(async () => {
    await app.close();
  });
});
