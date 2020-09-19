import { Request, Response } from 'express';
import { last } from 'rxjs/operators';
import icesManagerService, {
  IcesManager,
} from '../services/ices-manager.service';

class IcesController {
  icesManager: IcesManager = icesManagerService;
  constructor() {
    this.startContainer = this.startContainer.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.nextSong = this.nextSong.bind(this);
  }
  startContainer(req: Request, res: Response): void {
    console.log('starting', req.params.id);
    this.icesManager
      .startContainer(req.params.id)
      .pipe(last())
      .subscribe((code: number) => {
        code === 0 ? res.sendStatus(204) : res.sendStatus(500);
      });
  }

  removeContainer(req: Request, res: Response): void {
    console.log('removing', req.params.id);
    this.icesManager
      .removeContainer(req.params.id)
      .pipe(last())
      .subscribe((code: number) => {
        code === 0 ? res.sendStatus(204) : res.sendStatus(500);
      });
  }

  nextSong(req: Request, res: Response): void {
    console.log('next song', req.params.id);
    this.icesManager
      .nextSong(req.params.id)
      .pipe(last())
      .subscribe((code: number) => {
        code === 0 ? res.sendStatus(204) : res.sendStatus(500);
      });
  }
}

export default new IcesController();
