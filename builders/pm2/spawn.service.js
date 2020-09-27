'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const child_process_1 = require('child_process');
const rxjs_1 = require('rxjs');
class SpawnService {
  spawn(command, args, options) {
    const child = child_process_1.spawn(command, [...args], options);
    const result = new rxjs_1.Subject();
    child.stdout.on('data', (data) => result.next(data));
    child.stderr.on('data', (data) => result.next(data.toString()));
    child.on('close', (code) => {
      result.complete();
    });
    return result;
  }
}
exports.default = new SpawnService();
//# sourceMappingURL=spawn.service.js.map
