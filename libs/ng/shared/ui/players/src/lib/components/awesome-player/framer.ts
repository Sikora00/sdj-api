import { Scene } from "./scene";
import { Tracker } from "./tracker";

interface Tick {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
export class Framer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  count: number;
  maxTickSize: number;
  scene: Scene;
  ticks: { x1: number; y1: number; x2: number; y2: number }[];

  countTicks: number = 360;
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
    this.countTicks = this.countTicks * this.scene.scaleCoef;
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
    for (let i = 0, len = this.ticks.length; i < len; ++i) {
      const tick = this.ticks[i];
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
    this.context.moveTo(this.scene.cx + x1, this.scene.cx + y1);
    this.context.lineTo(this.scene.cx + x2, this.scene.cx + y2);
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
    size = 10;
    const ticks = this.getTickPoitns(count);
    let x1: number, y1: number, x2: number, y2: number, tick, k: number;
    const lesser = 160,
      m: Tick[] = [];
    const allScales = [];
    for (let i = 0, len = ticks.length; i < len; ++i) {
      const coef = 1 - i / (len * 2.5);
      let delta =
        ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
      if (delta < 0) {
        delta = 0;
      }
      tick = ticks[i];
      if (
        animationParams[0] <= tick.angle &&
        tick.angle <= animationParams[1]
      ) {
        k =
          this.scene.radius /
          (this.scene.radius -
            this.getSize(tick.angle, animationParams[0], animationParams[1]) -
            delta);
      } else {
        k = this.scene.radius / (this.scene.radius - (size + delta));
      }
      x1 = tick.x * (this.scene.radius - size);
      y1 = tick.y * (this.scene.radius - size);
      x2 = x1 * k;
      y2 = y1 * k;
      m.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
      if (i < 20) {
        let scale = delta / 50;
        scale = scale < 1 ? 1 : scale;
        allScales.push(scale);
      }
    }
    const sum =
      allScales.reduce(function(pv: number, cv: number): number {
        return pv + cv;
      }, 0) / allScales.length;
    this.canvas.style.transform = 'scale(' + sum + ')';
    return m;
  }

  getSize(angle: number, l: number, r: number): number {
    const m = (r - l) / 2;
    const x = angle - l;
    let h: number;

    if (x === m) {
      return this.maxTickSize;
    }
    const d = Math.abs(m - x);
    const v = 70 * Math.sqrt(1 / d);
    if (v > this.maxTickSize) {
      h = this.maxTickSize - d;
    } else {
      h = Math.max(this.tickSize, v);
    }

    if (this.index > this.count) {
      this.index = 0;
    }

    return h;
  }

  getTickPoitns(count: number): { x: number; y: number; angle: number }[] {
    const coords: { x: number; y: number; angle: number }[] = [],
      step = this.PI / count;
    for (let deg = 0; deg < this.PI; deg += step) {
      const rad = (deg * Math.PI) / (this.PI / 2);
      coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
    }
    return coords;
  }
}
