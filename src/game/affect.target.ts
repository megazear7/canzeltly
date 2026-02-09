import { GameObject } from "./game.object.js";
import { GameObjectState, TargetState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const target: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Target)
    .forEach((affect) => {
      const targ = affect as TargetState;
      // Check if target coordinates are null (disabled)
      if (targ.x === null || targ.y === null) {
        return;
      }
      // Find the velocity affect
      const velAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity);
      if (velAffect) {
        // Calculate direction to target
        const dx = targ.x - obj.state.x;
        const dy = targ.y - obj.state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          // Normalize and apply acceleration
          const accelX = (dx / dist) * targ.acceleration;
          const accelY = (dy / dist) * targ.acceleration;
          (velAffect as VelocityState).dx += accelX;
          (velAffect as VelocityState).dy += accelY;
        }
      }
    });
};
