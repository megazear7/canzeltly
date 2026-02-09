import { GameObject } from "./game.object.js";
import { AnyGameObjectState, GameObjectState, TargetObjectState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const targetObject: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.TargetObject)
    .forEach((affect) => {
      const targ = affect as TargetObjectState;
      // Find the target object in all layers
      let targetObj: GameObject<AnyGameObjectState> | undefined;
      for (const layer of obj.game.layers) {
        targetObj = layer.find((o) => o.state.id === targ.objectId);
        if (targetObj) break;
      }
      if (!targetObj) {
        return;
      }
      // Find the velocity affect
      const velAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity);
      if (velAffect) {
        // Calculate direction to target
        const dx = targetObj.state.x - obj.state.x;
        const dy = targetObj.state.y - obj.state.y;
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
