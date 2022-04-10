import { describe, expect, it, test } from "@jest/globals";
import { Vector } from "p5";
import { collide } from "../collide";

describe("collide", () => {
  it("direction", () => {
    const collision = collide(
      new Vector(0, 0, 0),
      new Vector(1, 1, 0),
      new Vector(1, 0, 0)
    );
    expect(collision.x).toEqual(0);
    expect(collision.y).toEqual(1);
  });
});
