import React from "react";
import ReactDOM from "react-dom";

import P5 from "p5";
import { random } from "lodash";
import { Button } from "@mui/material";

import { width, height } from "./helpers/constants";
import { Ball } from "./helpers/Ball";

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
