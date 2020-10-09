import { spawn } from '@sikora00/rxjs-overlay';
import { Observable, Subject } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export class IcesManager {
  commands$: Subject<() => Observable<number>> = new Subject<
    () => Observable<number>
  >();

  constructor() {
    this.handleCommands();
  }

  handleCommands(): void {
    this.commands$
      .pipe(concatMap((callback: () => Observable<number>) => callback()))
      .subscribe();
  }

  nextSong(id: string): Observable<number> {
    const { signal$, execSpawn } = spawn('docker', [
      `exec`,
      `slack_dj_ices_${id}`,
      `bash`,
      `-c`,
      `pgrep -f ices | xargs kill -s SIGUSR1`,
    ]);
    this.commands$.next(execSpawn);
    signal$.subscribe((code: number) =>
      console.log(`next exited with code ${code}`)
    );
    return signal$;
  }

  async startContainer(id: string): Promise<number> {
    let result = await this.startNewIcesContainer(id);
    if (result === 1) {
      result = await this.startExistingIcesContainer(id);
    }
    return result;
  }

  removeContainer(id: string): Observable<number> {
    const { signal$, execSpawn } = spawn('docker', [
      `rm`,
      `-f`,
      `slack_dj_ices_${id}`,
    ]);

    signal$.subscribe((code: number) =>
      console.log(`removing exited with code ${code}`)
    );
    this.commands$.next(execSpawn);
    return signal$;
  }

  private startNewIcesContainer(id: string): Promise<number> {
    const { signal$, execSpawn } = spawn('docker-compose', [
      `run`,
      `-d`,
      `--name`,
      `slack_dj_ices_${id}`,
      `-e`,
      `ROOM_ID=${id}`,
      `slack_dj_ices`,
    ]);

    this.commands$.next(execSpawn);
    signal$.subscribe((code: number) =>
      console.log(`run exited with code ${code}`)
    );

    return signal$.toPromise();
  }

  private startExistingIcesContainer(id: string): Promise<number> {
    const { signal$, execSpawn } = spawn('docker-compose', [
      `start`,
      `slack_dj_ices_${id}`,
    ]);

    this.commands$.next(execSpawn);
    signal$.subscribe((code: number) =>
      console.log(`starting exited with code ${code}`)
    );

    return signal$.toPromise();
  }
}

export default new IcesManager();
