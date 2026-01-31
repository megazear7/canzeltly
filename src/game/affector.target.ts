import { GameObject } from "./game.object.js";
import { GameObjectState, TargetState, VelocityState } from "./type.object.js";
import { affector, AffectorCategory } from "./game.affector.js";

export const target: affector = function (obj: GameObject<GameObjectState>): void {
  obj.state.affectors
    .filter((affector) => affector.category === AffectorCategory.enum.Target)
    .forEach((affector) => {
      const targ = affector as TargetState;
      // Find the velocity affector
      const velAffector = obj.state.affectors.find((a) => a.category === AffectorCategory.enum.Velocity);
      if (velAffector) {
        // Calculate direction to target
        const dx = targ.x - obj.state.x;
        const dy = targ.y - obj.state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          // Normalize and apply acceleration
          const accelX = (dx / dist) * targ.acceleration;
          const accelY = (dy / dist) * targ.acceleration;
          (velAffector as VelocityState).dx += accelX;
          (velAffector as VelocityState).dy += accelY;
        }
      }
    });
};
