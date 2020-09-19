import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ChannelDomainRepository,
  QueuedTrackDomainRepository,
  TrackDomainRepository,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { createSpyObj } from 'jest-createspyobj';
import { RadioFacade } from '../../radio.facade';
import { PlayNextTrackOrSilenceHandler } from './play-next-track-or-silence.handler';
import Mocked = jest.Mocked;

describe('PlayNextTrackOrSilenceHandler', () => {
  let channelRepository: Mocked<ChannelDomainRepository>;
  let service: PlayNextTrackOrSilenceHandler;
  let radioFacade: Mocked<RadioFacade>;
  let queuedTrackRepository: Mocked<QueuedTrackDomainRepository>;
  let trackRepository: Mocked<TrackDomainRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayNextTrackOrSilenceHandler,
        { provide: RadioFacade, useValue: createSpyObj(RadioFacade) },
        {
          provide: EventBus,
          useValue: createSpyObj(EventBus),
        },
        {
          provide: ChannelDomainRepository,
          useValue: createSpyObj(ChannelDomainRepository),
        },
        {
          provide: QueuedTrackDomainRepository,
          useValue: createSpyObj(QueuedTrackDomainRepository),
        },
        {
          provide: TrackDomainRepository,
          useValue: createSpyObj(TrackDomainRepository),
        },
      ],
    }).compile();

    channelRepository = module.get(ChannelDomainRepository);
    queuedTrackRepository = module.get(QueuedTrackDomainRepository);
    radioFacade = module.get(RadioFacade);
    service = module.get<PlayNextTrackOrSilenceHandler>(
      PlayNextTrackOrSilenceHandler
    );
    trackRepository = module.get(TrackDomainRepository);
  });

  test('creates itself', () => {
    expect(service).toBeDefined();
  });

  test('#execute triggers download an play track if is in queue', async () => {
    channelRepository.findOrCreate = jest.fn();
    channelRepository.findOrCreate.mockResolvedValue({ id: '1234' } as any);

    radioFacade.downloadAndPlay.mockResolvedValue({});

    queuedTrackRepository.getNextSongInQueue = jest.fn();
    queuedTrackRepository.getNextSongInQueue.mockResolvedValue({} as any);

    await service.execute({ channelId: '1234' });
    expect(radioFacade.downloadAndPlay).toHaveBeenCalled();
  });

  test('#execute queues new track if no one is in queue but there is enough tracks to play own radio', async () => {
    channelRepository.findOrCreate = jest.fn();
    channelRepository.findOrCreate.mockResolvedValue({ id: '1234' } as any);
    radioFacade.downloadAndPlay.mockResolvedValue({});

    queuedTrackRepository.getNextSongInQueue = jest.fn();
    queuedTrackRepository.getNextSongInQueue.mockResolvedValue(null);
    queuedTrackRepository.findOneOrFail = jest.fn();
    queuedTrackRepository.findOneOrFail.mockResolvedValue({ id: 2 } as any);

    appConfig.trackLengthToStartOwnRadio = 40;
    trackRepository.countTracks = jest.fn();
    trackRepository.countTracks.mockResolvedValue(50);

    trackRepository.getRandomTrack = jest.fn();
    trackRepository.getRandomTrack.mockResolvedValue({ id: '1234' } as any);

    radioFacade.queueTrack.mockResolvedValue({ id: '1234' } as any);

    await service.execute({ channelId: '1234' });
    expect(radioFacade.queueTrack).toHaveBeenCalled();
  });
});
