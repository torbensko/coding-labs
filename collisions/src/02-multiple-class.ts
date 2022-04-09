import * as P5 from "p5";
import { random } from "lodash";

const width = 400;
const height = 400;

class Ball {
  public x: number;
  public y: number;
  public size: number;
  public velocity: P5.Vector;

  constructor(size, x, y) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.velocity = new P5.Vector(Math.random(), Math.random(), 0);
    this.velocity.normalize();
  }

  think() {
    if (this.x + this.velocity.x < 0 || this.x + this.velocity.x > width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.velocity.y < 0 || this.y + this.velocity.y > width) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(p5: P5) {
    p5.ellipse(this.x, this.y, this.size, this.size);
  }
}

const sketch = (p5: P5) => {
  const balls: Ball[] = [];

  p5.setup = () => {
    const canvas = p5.createCanvas(width, height);
    canvas.parent("app");
    for (let i = 0; i < 5; i++) {
      const size = 50;
      balls.push(new Ball(size, random(width - size), random(height - size)));
    }
  };

  p5.draw = () => {
    p5.background("blue");
    p5.fill("red");
    balls.forEach((ball) => ball.think());
    balls.forEach((ball) => ball.draw(p5));
  };
};

new P5(sketch);
