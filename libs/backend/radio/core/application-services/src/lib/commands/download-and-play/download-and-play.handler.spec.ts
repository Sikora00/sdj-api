import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObj } from 'jest-createspyobj';
import { RadioFacade } from '../../radio.facade';
import { DownloadAndPlayHandler } from './download-and-play.handler';
import Mocked = jest.Mocked;

describe('DownloadAndPlayHandler', () => {
  let eventBus: Mocked<EventBus>;
  let service: DownloadAndPlayHandler;
  let radioFacade: Mocked<RadioFacade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadAndPlayHandler,
        { provide: RadioFacade, useValue: createSpyObj(RadioFacade) },
        {
          provide: EventBus,
          useValue: createSpyObj(EventBus),
        },
      ],
    }).compile();

    eventBus = module.get(EventBus);
    service = module.get<DownloadAndPlayHandler>(DownloadAndPlayHandler);
    radioFacade = module.get(RadioFacade);
  });

  test('creates itself', () => {
    expect(service).toBeDefined();
  });

  test('execute# runs download actions', () => {
    radioFacade.downloadTrack.mockResolvedValue(null);
    service.execute({ queuedTrack: { track: {} } } as any);
    expect(radioFacade.downloadTrack).toHaveBeenCalled();
  });

  test('execute# emits event on success', async () => {
    radioFacade.downloadTrack.mockResolvedValue(null);
    await service.execute({ queuedTrack: { track: {} } } as any);
    expect(eventBus.publish).toHaveBeenCalled();
  });
});
