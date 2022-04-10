import P5 from "p5";

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(200, 200);
    canvas.parent("app");
    p5.ellipseMode(p5.CORNER);
  };

  p5.draw = () => {
    // reset the canvas each time
    p5.background("#3e7");
    p5.fill("red");
    p5.ellipse(0, 0, 50, 50);
  };
};

new P5(sketch);
