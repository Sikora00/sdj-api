import { spawn as spawnL, SpawnOptions } from 'child_process';
import { Observable, Subject } from 'rxjs';

class SpawnService {
  spawn(
    command: string,
    args?: ReadonlyArray<string>,
    options?: SpawnOptions
  ): Observable<any> {
    const child = spawnL(command, [...args], options);
    const result = new Subject();
    child.stdout.on('data', (data) => result.next(data));
    child.stderr.on('data', (data) => result.next(data.toString()));
    child.on('close', (code) => {
      result.complete();
    });
    return result;
  }
}

export default new SpawnService();
