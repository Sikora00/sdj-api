import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { OptionsT } from './schema';
import SpawnService from './spawn.service';

export default createBuilder((options: OptionsT, context) => {
  return new Promise<BuilderOutput>((resolve) => {
    SpawnService.spawn('pm2-runtime', ['start', 'pm2.json']).subscribe({
      next: (data) => context.logger.info(data.toString()),
      error: (data) => context.logger.error(data),

      complete: () => resolve({ success: true }),
    });
  });
});
