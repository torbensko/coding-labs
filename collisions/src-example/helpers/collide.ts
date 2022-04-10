import P5 from "p5";

export const collide = (
  posA: P5.Vector,
  posB: P5.Vector,
  velocity: P5.Vector
) => {
  // const angle = posA.sub(posB).heading();
  const angle = posA.angleBetween(posB);

  const globalVelocity = velocity.rotate(-angle);
  globalVelocity.y = -globalVelocity.y;
  return globalVelocity.rotate(angle).normalize();
};
