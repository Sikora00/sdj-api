import { Controls } from './controls';
import { Framer } from './framer';
import { Tracker } from './tracker';

export class Scene {
  context: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  radius: number;
  scaleCoef: number;
  canvas: HTMLCanvasElement;

  padding: number;
  minSize: number = 740;
  optimiseHeight: number = 982;
  _inProcess: boolean = false;
  private width: number;
  private height: number;
  coord: ClientRect | DOMRect;

  constructor(
    private framer: Framer,
    private tracker: Tracker,
    private controls: Controls
  ) {}

  init(): void {
    this.canvasConfigure();
    this.initHandlers();

    this.framer.init(this);
    this.tracker.init(this);
    this.controls.init(this);

    this.startRender();
  }

  canvasConfigure(): void {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = '#FE4365';
    this.calculateSize();
  }

  calculateSize(): void {
    this.scaleCoef = this.minSize / this.optimiseHeight;

    const size = Math.max(this.minSize, 1 /*document.body.clientHeight */);
    this.canvas.setAttribute('width', size.toString());
    this.canvas.setAttribute('height', size.toString());

    this.width = size;
    this.height = size;

    this.padding = 120 * this.scaleCoef;
    this.radius = (size - this.padding * 2) / 2;
    this.cx = this.radius + this.padding;
    this.cy = this.radius + this.padding;
    this.coord = this.canvas.getBoundingClientRect();
  }

  initHandlers(): void {
    window.onresize = () => {
      this.canvasConfigure();
      this.framer.configure();
      this.render();
    };
  }

  render(): void {
    requestAnimationFrame(() => {
      this.clear();
      this.draw();
      if (this._inProcess) {
        this.render();
      }
    });
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(): void {
    this.framer.draw();
    this.tracker.draw();
    this.controls.draw();
  }

  startRender(): void {
    this._inProcess = true;
    this.render();
  }

  stopRender(): void {
    this._inProcess = false;
  }

  inProcess(): boolean {
    return this._inProcess;
  }
}
