import { Scene } from './scene';
import { Tracker } from './tracker';

interface Tick {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class Framer {
  private static readonly DefaultCountTicks = 360;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  maxTickSize: number;
  scene: Scene;
  ticks: Tick[];

  countTicks: number;
  frequencyData: Uint8Array | Array<any> = [];
  tickSize: number = 10;
  PI: number = 360;
  index: number = 0;
  loadingAngle: number = 0;

  tracker: Tracker;

  init(scene: Scene): void {
    this.canvas = document.querySelector('canvas');
    this.scene = scene;
    this.context = scene.context;
    this.configure();
  }

  configure(): void {
    this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
    this.countTicks = Framer.DefaultCountTicks * this.scene.scaleCoef;
  }

  draw(): void {
    this.drawTicks();
    this.drawEdging();
  }

  drawTicks(): void {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.ticks = this.getTicks(this.countTicks, this.tickSize, [0, 90]);
    for (const tick of this.ticks) {
      this.drawTick(tick.x1, tick.y1, tick.x2, tick.y2);
    }
    this.context.restore();
  }

  drawTick(x1: number, y1: number, x2: number, y2: number): void {
    const dx1 = this.scene.cx + x1;
    const dy1 = this.scene.cy + y1;

    const dx2 = this.scene.cx + x2;
    const dy2 = this.scene.cy + y2;

    const gradient = this.context.createLinearGradient(dx1, dy1, dx2, dy2);
    gradient.addColorStop(0, '#FE4365');
    gradient.addColorStop(0.6, '#FE4365');
    gradient.addColorStop(1, '#F5F5F5');
    this.context.beginPath();
    this.context.strokeStyle = gradient;
    this.context.lineWidth = 2;
    this.context.moveTo(this.scene.cx + x1, this.scene.cy + y1);
    this.context.lineTo(this.scene.cx + x2, this.scene.cy + y2);
    this.context.stroke();
  }

  setLoadingPercent(percent: number): void {
    this.loadingAngle = percent * 2 * Math.PI;
  }

  drawEdging(): void {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.5)';
    this.context.lineWidth = 1;

    const offset = this.tracker.lineWidth / 2;
    this.context.moveTo(
      this.scene.padding +
        2 * this.scene.radius -
        this.tracker.innerDelta -
        offset,
      this.scene.padding + this.scene.radius
    );
    this.context.arc(
      this.scene.cx,
      this.scene.cy,
      this.scene.radius - this.tracker.innerDelta - offset,
      0,
      this.loadingAngle,
      false
    );

    this.context.stroke();
    this.context.restore();
  }

  getTicks(count: number, size: number, animationParams: number[]): Tick[] {
    const ticks = this.getTickPoints(count),
      // lesser = 160 + (1 - ((this.scene.minSize - 300) / 440)) * 38,
      lesser = 160,
      result: Tick[] = [],
      allScales = [];

    ticks.forEach((tick, i) => {
      const coef = 1 - i / (ticks.length * 2.5);
      let delta =
        ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
      if (delta < 0) {
        delta = 0;
      }
      const k = this.scene.radius / (this.scene.radius - (size + delta)),
        x1 = tick.x * (this.scene.radius - size),
        y1 = tick.y * (this.scene.radius - size),
        x2 = x1 * k,
        y2 = y1 * k;
      result.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
      if (i < 20) {
        let scale = delta / 50;
        scale = scale < 1 ? 1 : scale;
        allScales.push(scale);
      }
    });
    const sum =
      allScales.reduce(function(pv: number, cv: number): number {
        return pv + cv;
      }, 0) / allScales.length;
    this.canvas.style.transform = 'scale(' + sum + ')';
    return result;
  }

  getTickPoints(count: number): { x: number; y: number; angle: number }[] {
    const coords: { x: number; y: number; angle: number }[] = [],
      step = this.PI / count;
    for (let deg = 0; deg < this.PI; deg += step) {
      const rad = (deg * Math.PI) / (this.PI / 2);
      coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
    }
    return coords;
  }
}
