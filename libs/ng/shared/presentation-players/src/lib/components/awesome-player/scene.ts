import { Circle } from './circle';
import { Ticks } from './ticks';

export class Scene {
  context: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  radius: number;
  scaleCoef: number;
  canvas: HTMLCanvasElement;

  padding: number;
  minSize = 740;
  optimiseHeight = 982;
  private inProcess = false;
  private width: number;
  private height: number;

  constructor(private ticks: Ticks, private circle: Circle) {}

  init(): void {
    this.canvasConfigure();
    this.initHandlers();

    this.ticks.init(this);
    this.circle.init(this);

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
  }

  initHandlers(): void {
    window.onresize = () => {
      this.canvasConfigure();
      this.ticks.configure();
      this.render();
    };
  }

  render(): void {
    requestAnimationFrame(() => {
      this.clear();
      this.draw();
      if (this.inProcess) {
        this.render();
      }
    });
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(): void {
    this.ticks.draw();
    this.circle.draw();
  }

  startRender(): void {
    this.inProcess = true;
    this.render();
  }

  stopRender(): void {
    this.inProcess = false;
  }
}
