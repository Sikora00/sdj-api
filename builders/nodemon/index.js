'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const architect_1 = require('@angular-devkit/architect');
const childProcess = require('child_process');
exports.default = architect_1.createBuilder((options, context) => {
  return new Promise((resolve) => {
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
//# sourceMappingURL=index.js.map
