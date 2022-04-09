import * as P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(200, 200);
    canvas.parent("app");
    p5.background("blue");
  };

  p5.draw = () => {
    p5.fill("red");
    p5.ellipse(0, 0, 50, 50);
  };
};

new P5(sketch);
