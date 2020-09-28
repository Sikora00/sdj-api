import { Module } from '@nestjs/common';
import { BackendRadioInfrastructureMp3GainService } from './backend-radio-infrastructure-mp3-gain.service';

@Module({
  controllers: [],
  providers: [BackendRadioInfrastructureMp3GainService],
  exports: [BackendRadioInfrastructureMp3GainService],
})
export class BackendRadioInfrastructureMp3GainModule {}
