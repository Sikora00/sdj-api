import { Player } from './player';
import { Scene } from './scene';

export class Tracker {
  innerDelta: number = 20;
  lineWidth: number = 7;
  prevAngle: number = 0.5;
  angle: number = 0;
  animationCount: number = 10;
  pressButton: boolean = false;
  private animateId: any;
  private scene: Scene;
  private context: CanvasRenderingContext2D;
  private animatedInProgress: boolean;
  private mx: number;
  private my: number;
  r: number;

  player: Player;

  init(scene: Scene): void {
    this.scene = scene;
    this.context = scene.context;
    this.initHandlers();
  }

  initHandlers(): void {
    this.scene.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      if (this.isInsideOfSmallCircle(e) || this.isOusideOfBigCircle(e)) {
        return;
      }
      this.prevAngle = this.angle;
      this.pressButton = true;
      this.stopAnimation();
      this.calculateAngle(e, true);
    });

    window.addEventListener('mouseup', () => {
      if (!this.pressButton) {
        return;
      }
      const id = setInterval(() => {
        if (!this.animatedInProgress) {
          this.pressButton = false;
          (<any>this.player.context).currentTime =
            (this.angle / (2 * Math.PI)) * 60;
          clearInterval(id);
        }
      }, 100);
    });

    window.addEventListener('mousemove', e => {
      if (this.animatedInProgress) {
        return;
      }
      if (this.pressButton && this.scene.inProcess()) {
        this.calculateAngle(e, this.animatedInProgress);
      }
    });
  }

  isInsideOfSmallCircle(e: MouseEvent): boolean {
    const x = Math.abs(e.pageX - this.scene.cx - this.scene.coord.left);
    const y = Math.abs(e.pageY - this.scene.cy - this.scene.coord.top);
    return Math.sqrt(x * x + y * y) < this.scene.radius - 3 * this.innerDelta;
  }

  isOusideOfBigCircle(e: MouseEvent): boolean {
    return (
      Math.abs(e.pageX - this.scene.cx - this.scene.coord.left) >
        this.scene.radius ||
      Math.abs(e.pageY - this.scene.cy - this.scene.coord.top) >
        this.scene.radius
    );
  }

  draw(): void {
    if (!this.pressButton) {
      this.angle =
        ((this.player.context.currentTime % 60) / 60) * 2 * Math.PI || 0;
    }
    this.drawArc();
  }

  drawArc(): void {
    this.context.save();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.8)';
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;

    this.r = this.scene.radius - (this.innerDelta + this.lineWidth / 2);
    this.context.arc(
      this.scene.radius + this.scene.padding,
      this.scene.radius + this.scene.padding,
      this.r,
      0,
      this.angle,
      false
    );
    this.context.stroke();
    this.context.restore();
  }

  calculateAngle(e: MouseEvent, animatedInProgress: boolean): void {
    this.animatedInProgress = animatedInProgress;
    this.mx = e.pageX;
    this.my = e.pageY;
    this.angle = Math.atan(
      (this.my - this.scene.cy - this.scene.coord.top) /
        (this.mx - this.scene.cx - this.scene.coord.left)
    );
    if (this.mx < this.scene.cx + this.scene.coord.left) {
      this.angle = Math.PI + this.angle;
    }
    if (this.angle < 0) {
      this.angle += 2 * Math.PI;
    }
    if (animatedInProgress) {
      this.startAnimation();
    } else {
      this.prevAngle = this.angle;
    }
  }

  startAnimation(): void {
    const angle = this.angle;
    const l = Math.abs(this.angle) - Math.abs(this.prevAngle);
    const step = l / this.animationCount;
    let i = 0;
    const f = () => {
      this.angle += step;
      if (++i === this.animationCount) {
        this.angle = angle;
        this.prevAngle = angle;
        this.animatedInProgress = false;
      } else {
        this.animateId = setTimeout(f, 20);
      }
    };

    this.angle = this.prevAngle;
    this.animateId = setTimeout(f, 20);
  }

  stopAnimation(): void {
    clearTimeout(this.animateId);
    this.animatedInProgress = false;
  }
}
