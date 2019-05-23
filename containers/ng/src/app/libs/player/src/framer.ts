import { Scene } from './scene';
import { Tracker } from './tracker';

export class Framer {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  count: number;
  maxTickSize: number;
  scene: Scene;
  ticks: { x1: number, y1: number, x2: number, y2: number }[];

  countTicks = 360;
  frequencyData: Uint8Array | Array<any> = [];
  tickSize = 10;
  PI = 360;
  index = 0;
  loadingAngle = 0;

  tracker: Tracker;

  init(scene: Scene) {
    this.canvas = document.querySelector('canvas');
    this.scene = scene;
    this.context = scene.context;
    this.configure();
  }

  configure() {
    this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
    this.countTicks = 360 * this.scene.scaleCoef;
  }

  draw() {
    this.drawTicks();
    this.drawEdging();
  }

  drawTicks() {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.ticks = this.getTicks(this.countTicks, this.tickSize, [0, 90]);
    for (var i = 0, len = this.ticks.length; i < len; ++i) {
      var tick = this.ticks[i];
      this.drawTick(tick.x1, tick.y1, tick.x2, tick.y2);
    }
    this.context.restore();
  }

  drawTick(x1, y1, x2, y2) {
    var dx1 = parseInt(this.scene.cx + x1);
    var dy1 = parseInt(this.scene.cy + y1);

    var dx2 = parseInt(this.scene.cx + x2);
    var dy2 = parseInt(this.scene.cy + y2);

    var gradient = this.context.createLinearGradient(dx1, dy1, dx2, dy2);
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

  setLoadingPercent(percent) {
    this.loadingAngle = percent * 2 * Math.PI;
  }

  drawEdging() {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.5)';
    this.context.lineWidth = 1;

    var offset = this.tracker.lineWidth / 2;
    this.context.moveTo(this.scene.padding + 2 * this.scene.radius - this.tracker.innerDelta - offset, this.scene.padding + this.scene.radius);
    this.context.arc(this.scene.cx, this.scene.cy, this.scene.radius - this.tracker.innerDelta - offset, 0, this.loadingAngle, false);

    this.context.stroke();
    this.context.restore();
  }

  getTicks(count, size, animationParams) {
    size = 10;
    var ticks = this.getTickPoitns(count);
    var x1, y1, x2, y2, m = [], tick, k;
    var lesser = 160;
    var allScales = [];
    for (var i = 0, len = ticks.length; i < len; ++i) {
      var coef = 1 - i / (len * 2.5);
      var delta = ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
      if (delta < 0) {
        delta = 0;
      }
      tick = ticks[i];
      if (animationParams[0] <= tick.angle && tick.angle <= animationParams[1]) {
        k = this.scene.radius / (this.scene.radius - this.getSize(tick.angle, animationParams[0], animationParams[1]) - delta);
      } else {
        k = this.scene.radius / (this.scene.radius - (size + delta));
      }
      x1 = tick.x * (this.scene.radius - size);
      y1 = tick.y * (this.scene.radius - size);
      x2 = x1 * k;
      y2 = y1 * k;
      m.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
      if (i < 20) {
        var scale = delta / 50;
        scale = scale < 1 ? 1 : scale;
        allScales.push(scale);
      }
    }
    var sum = allScales.reduce(function(pv, cv) {
      return pv + cv;
    }, 0) / allScales.length;
    this.canvas.style.transform = 'scale(' + sum + ')';
    return m;
  }

  getSize(angle, l, r) {
    var m = (r - l) / 2;
    var x = (angle - l);
    var h;

    if (x == m) {
      return this.maxTickSize;
    }
    var d = Math.abs(m - x);
    var v = 70 * Math.sqrt(1 / d);
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

  getTickPoitns(count) {
    var coords = [], step = this.PI / count;
    for (var deg = 0; deg < this.PI; deg += step) {
      var rad = deg * Math.PI / (this.PI / 2);
      coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
    }
    return coords;
  }
}