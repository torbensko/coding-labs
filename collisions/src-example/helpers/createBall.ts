import { random } from "lodash";
import { width, height } from "./constants";
import { Ball } from "./Ball";
import { balls } from "../index";

export const createBall = () => {
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

  return ball;
};
