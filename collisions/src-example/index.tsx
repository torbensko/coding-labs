import React from "react";
import ReactDOM from "react-dom";

import P5 from "p5";
import { Button } from "@mui/material";

import { width, height } from "./helpers/constants";
import { Ball } from "./helpers/Ball";
import { createBall } from "./helpers/createBall";

export const balls: Ball[] = [];

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(width, height);
    canvas.parent("app");
    for (let i = 0; i < 2; i++) {
      balls.push(createBall());
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
  const onCreate = () => balls.push(createBall());
  return (
    <div>
      <Button onClick={onCreate}>Add ball</Button>
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("app"));
