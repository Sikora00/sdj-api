import { Scene } from './scene';
import { Circle } from './circle';

interface Tick {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class Ticks {
  private static readonly DefaultCountTicks = 360;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  maxTickSize: number;
  scene: Scene;
  ticks: Tick[];

  countTicks: number;
  frequencyData: Uint8Array | Array<any> = [];
  tickSize = 10;
  PI = 360;
  index = 0;

  circle: Circle;

  init(scene: Scene): void {
    this.canvas = document.querySelector('canvas');
    this.scene = scene;
    this.context = scene.context;
    this.configure();
  }

  configure(): void {
    this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
    this.countTicks = Ticks.DefaultCountTicks * this.scene.scaleCoef;
  }

  draw(): void {
    this.drawTicks();
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

  getTicks(count: number, size: number, animationParams: number[]): Tick[] {
    const ticks = this.getTickPoints(count),
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
      allScales.reduce(function (pv: number, cv: number): number {
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
