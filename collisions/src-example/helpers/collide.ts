import P5, { Vector } from "p5";

export const collide = (
  posA: P5.Vector,
  posB: P5.Vector,
  velocity: P5.Vector
) => {
  // TODO put in a real calculation
  return velocity.rotate(1.570790282);
};
