'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const architect_1 = require('@angular-devkit/architect');
const spawn_service_1 = require('./spawn.service');
exports.default = architect_1.createBuilder((options, context) => {
  return new Promise((resolve) => {
    spawn_service_1.default
      .spawn('pm2-runtime', ['start', 'pm2.json'])
      .subscribe({
        next: (data) => context.logger.info(data.toString()),
        error: (data) => context.logger.error(data),
        complete: () => resolve({ success: true }),
      });
  });
});
//# sourceMappingURL=index.js.map
