import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSpyObj } from 'jest-createspyobj';
import { BackendRadioInfrastructureYoutubeApiService } from './backend-radio-infrastructure-youtube-api.service';

describe('BackendRadioInfrastructureYoutubeApiService', () => {
  let service: BackendRadioInfrastructureYoutubeApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BackendRadioInfrastructureYoutubeApiService,
        { provide: HttpService, useValue: createSpyObj(HttpService) },
      ],
    }).compile();

    service = module.get(BackendRadioInfrastructureYoutubeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
