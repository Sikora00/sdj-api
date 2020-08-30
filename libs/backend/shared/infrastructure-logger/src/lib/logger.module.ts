import { Logger, Module } from '@nestjs/common';
import { DefaultLogger } from './services/default.logger.service';

@Module({
  providers: [
    {
      provide: Logger,
      useClass: DefaultLogger
    }
  ],
  exports: [Logger]
})
export class LoggerModule {}
