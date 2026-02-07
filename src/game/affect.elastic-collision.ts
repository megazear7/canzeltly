import { GameObject } from "./game.object.js";
import { AnyGameObjectState, VelocityState } from "./type.object.js";
import { checkForCollision } from "../shared/util.collision.js";
import { affect, AffectCategory } from "./game.affect.js";

export const elasticCollision: affect = function (obj: GameObject<AnyGameObjectState>): void {
  // Get all objects in the same layer with ElasticCollision affect
  const layerIndex = obj.game.layers.findIndex((layer) => layer.includes(obj));
  if (layerIndex === -1) return;

  const elasticObjects = obj.game.layers[layerIndex].filter(
    (otherObj) =>
      otherObj !== obj &&
      otherObj.state.affects.some((affect) => affect.category === AffectCategory.enum.ElasticCollision),
  );

  // Check collisions with each elastic object
  elasticObjects.forEach((otherObj) => {
    if (checkForCollision(obj.state, otherObj.state)) {
      // Calculate collision response
      const dx = otherObj.state.x - obj.state.x;
      const dy = otherObj.state.y - obj.state.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance === 0) return; // Avoid division by zero

      // Normalized collision normal
      const nx = dx / distance;
      const ny = dy / distance;

      // Get velocities
      const objVel = obj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity) as
        | VelocityState
        | undefined;
      const otherVel = otherObj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity) as
        | VelocityState
        | undefined;

      if (!objVel || !otherVel) return;

      // Relative velocity
      const rvx = otherVel.dx - objVel.dx;
      const rvy = otherVel.dy - objVel.dy;

      // Relative velocity along normal
      const velAlongNormal = rvx * nx + rvy * ny;

      // Do not resolve if velocities are separating
      if (velAlongNormal > 0) return;

      // Calculate restitution (elastic collision)
      const restitution = 1.0;

      // Check for infinite mass objects (immovable)
      const objInfiniteMass = obj.state.mass >= Number.MAX_SAFE_INTEGER;
      const otherInfiniteMass = otherObj.state.mass >= Number.MAX_SAFE_INTEGER;

      let impulse: number;
      if (objInfiniteMass || otherInfiniteMass) {
        // Special case: collision with immovable object
        // The movable object reflects its velocity along the normal
        impulse = -(1 + restitution) * velAlongNormal;
        if (objInfiniteMass) {
          // obj is immovable, otherObj bounces
          otherVel.dx += impulse * nx;
          otherVel.dy += impulse * ny;
        } else {
          // otherObj is immovable, obj bounces
          objVel.dx -= (impulse * nx) / obj.state.mass;
          objVel.dy -= (impulse * ny) / obj.state.mass;
        }
      } else {
        // Standard elastic collision between two movable objects
        impulse = (-(1 + restitution) * velAlongNormal) / (1 / obj.state.mass + 1 / otherObj.state.mass);

        // Apply impulse
        const impulseX = impulse * nx;
        const impulseY = impulse * ny;

        objVel.dx -= impulseX / obj.state.mass;
        objVel.dy -= impulseY / obj.state.mass;
        otherVel.dx += impulseX / otherObj.state.mass;
        otherVel.dy += impulseY / otherObj.state.mass;
      }
    }
  });
};
