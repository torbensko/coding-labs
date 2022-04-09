import React from "react";
import ReactDOM from "react-dom";

import P5 from "p5";
import { random } from "lodash";
import { Button } from "@mui/material";

const width = 400;
const height = 400;

const collide = (posA: P5.Vector, posB: P5.Vector, velocity: P5.Vector) => {
  // const angle = posA.sub(posB).heading();
  const angle = posA.angleBetween(posB);

  const globalVelocity = velocity.rotate(-angle);
  globalVelocity.y = -globalVelocity.y;
  return globalVelocity.rotate(angle).normalize();
};

class Ball {
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

const balls: Ball[] = [];

const createBall = () => {
  const size = 100;
  let collision = true;
  let ball: Ball = null;
  do {
    ball = new Ball(
      size,
      random(width - size) + size / 2,
      random(height - size) + size / 2
    );
    collision =
      balls.map((b) => b.willCollide(ball)).filter((n) => n).length > 0;
  } while (collision);
  balls.push(ball);
};

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(width, height);
    canvas.parent("app");
    for (let i = 0; i < 2; i++) {
      createBall();
    }
  };

  p5.draw = () => {
    p5.background("blue");
    p5.fill("red");
    // predict changes
    balls.forEach((ball) => ball.tick(balls.filter((b) => b !== ball)));
    // apply changes
    balls.forEach((ball) => ball.move());
    // render
    balls.forEach((ball) => ball.draw(p5));
  };
};

new P5(sketch);

const MyApp: React.FC = () => {
  return (
    <div>
      <Button onClick={createBall}>Add ball</Button>
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("app"));
