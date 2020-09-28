import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ChannelRepositoryInterface,
  QueuedTrackRepositoryInterface,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { createSpyObj } from 'jest-createspyobj';
import { RadioFacade } from '../../radio.facade';
import { PlayNextTrackOrSilenceHandler } from './play-next-track-or-silence.handler';
import Mocked = jest.Mocked;

describe('PlayNextTrackOrSilenceHandler', () => {
  let channelRepository: Mocked<ChannelRepositoryInterface>;
  let service: PlayNextTrackOrSilenceHandler;
  let radioFacade: Mocked<RadioFacade>;
  let queuedTrackRepository: Mocked<QueuedTrackRepositoryInterface>;
  let trackRepository: Mocked<TrackRepositoryInterface>;

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
          provide: ChannelRepositoryInterface,
          useValue: createSpyObj(ChannelRepositoryInterface),
        },
        {
          provide: QueuedTrackRepositoryInterface,
          useValue: createSpyObj(QueuedTrackRepositoryInterface),
        },
        {
          provide: TrackRepositoryInterface,
          useValue: createSpyObj(TrackRepositoryInterface),
        },
      ],
    }).compile();

    channelRepository = module.get(ChannelRepositoryInterface);
    queuedTrackRepository = module.get(QueuedTrackRepositoryInterface);
    radioFacade = module.get(RadioFacade);
    service = module.get<PlayNextTrackOrSilenceHandler>(
      PlayNextTrackOrSilenceHandler
    );
    trackRepository = module.get(TrackRepositoryInterface);
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
