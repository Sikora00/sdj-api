import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import * as childProcess from 'child_process';
import { OptionsT } from './schema';

export default createBuilder((options: OptionsT, context) => {
  return new Promise<BuilderOutput>((resolve) => {
    let args = [];
    if (options.debug) {
      args = args.concat(['--config', 'nodemon-debug.json']);
    }
    const child = childProcess.spawn('nodemon', args);
    child.stdout.on('data', (data) => {
      context.logger.info(data.toString());
    });
    child.stderr.on('data', (data) => {
      context.logger.error(data.toString());
    });
    child.on('close', (code) => {
      resolve({ success: true });
    });
  });
});
