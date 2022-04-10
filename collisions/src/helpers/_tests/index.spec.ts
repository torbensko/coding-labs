import { describe, expect, it, test } from "@jest/globals";
import { Ball } from "../Ball";

describe("collisions", () => {
  it("overlapping balls", () => {
    const ball1 = new Ball(10, 0, 0);
    const ball2 = new Ball(20, 10, 10);
    expect(ball1.willCollide(ball2)).toEqual(true);
  });
  it("non-overlapping balls", () => {
    const ball1 = new Ball(10, 0, 0);
    const ball2 = new Ball(20, 40, 40);
    expect(ball1.willCollide(ball2)).toEqual(false);
  });
});
