import P5 from "p5";
import { width, height } from "./constants";
import { collide } from "./collide";

export class Ball {
  public pos: P5.Vector;
  public nextPos: P5.Vector;
  public r: number;
  public velocity: P5.Vector;

  constructor(size, x, y) {
    this.r = size / 2;
    this.pos = new P5.Vector(x, y);
    this.velocity = new P5.Vector(Math.random() - 0.5, Math.random() - 0.5, 0);
    this.velocity.normalize();
    this.nextPos = this.nextMove();
  }

  willCollide(other: Ball) {
    return this.nextPos.dist(other.nextPos) < this.r + other.r;
  }

  nextMove() {
    return this.pos.add(this.velocity);
  }

  tick(balls: Ball[]) {
    // have we hit another ball?
    balls.forEach((b: Ball) => {
      if (this.willCollide(b)) {
        this.velocity = collide(this.nextPos, b.nextPos, this.velocity);
      }
    });

    // have we hit a wall?
    if (this.nextPos.x < this.r || this.nextPos.x > width - this.r) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.nextPos.y < this.r || this.nextPos.y > height - this.r) {
      this.velocity.y = -this.velocity.y;
    }
  }

  move() {
    // update the position
    this.pos = this.nextMove();
    // predict the next movement
    this.nextPos = this.nextMove();
  }

  draw(p5: P5) {
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
