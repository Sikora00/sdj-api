import { Test } from '@nestjs/testing';
import { BackendRadioInfrastructureMp3GainService } from './backend-radio-infrastructure-mp3-gain.service';

describe('BackendRadioInfrastructureMp3GainService', () => {
  let service: BackendRadioInfrastructureMp3GainService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendRadioInfrastructureMp3GainService],
    }).compile();

    service = module.get(BackendRadioInfrastructureMp3GainService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
