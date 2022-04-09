// import * as P5 from "p5";
// import { random } from "lodash";

// const width = 400;
// const height = 400;

// class Ball {
//   public pos: P5.Vector;
//   public r: number;
//   public velocity: P5.Vector;

//   constructor(size, x, y) {
//     this.r = size / 2;
//     this.pos = new P5.Vector(x, y);
//     this.velocity = new P5.Vector(Math.random(), Math.random(), 0);
//     this.velocity.normalize();
//   }

//   hasCollided(other: Ball) {
//     return this.pos.dist(other.pos) < this.r + other.r;
//   }

//   think(balls: Ball[]) {
//     // have we hit another ball?
//     balls.forEach((b: Ball) => {
//       if (this.hasCollided(b)) {
//         this.velocity.x = -this.velocity.x;
//         this.velocity.y = -this.velocity.y;
//       }
//     });

//     // have we hit a wall?
//     if (
//       this.pos.x + this.velocity.x < this.r ||
//       this.pos.x + this.velocity.x > width - this.r
//     ) {
//       this.velocity.x = -this.velocity.x;
//     }
//     if (
//       this.pos.y + this.velocity.y < this.r ||
//       this.pos.y + this.velocity.y > height - this.r
//     ) {
//       this.velocity.y = -this.velocity.y;
//     }

//     // update the position
//     this.pos.x += this.velocity.x;
//     this.pos.y += this.velocity.y;
//   }

//   draw(p5: P5) {
//     p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
//   }
// }

// const sketch = (p5: P5) => {
//   const balls: Ball[] = [];

//   p5.setup = () => {
//     const canvas = p5.createCanvas(width, height);
//     canvas.parent("app");
//     for (let i = 0; i < 5; i++) {
//       const size = 50;
//       balls.push(
//         new Ball(
//           size,
//           random(width - size) + size / 2,
//           random(height - size) + size / 2
//         )
//       );
//     }
//   };

//   p5.draw = () => {
//     p5.background("blue");
//     p5.fill("red");
//     balls.forEach((ball) => ball.think(balls.filter((b) => b !== ball)));
//     balls.forEach((ball) => ball.draw(p5));
//   };
// };

// new P5(sketch);
