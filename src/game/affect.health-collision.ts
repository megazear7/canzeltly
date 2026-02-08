import { GameObject } from "./game.object.js";
import { AnyGameObjectState, HealthCollisionState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { checkForCollision } from "../shared/util.collision.js";

export const healthCollision: affect = function (obj: GameObject<AnyGameObjectState>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.HealthCollision)
    .forEach((affect) => {
      const healthCollisionState = affect as HealthCollisionState;

      // Check collision with objects in specified layers
      healthCollisionState.layers.forEach((layerIndex) => {
        const layer = obj.game.layers[layerIndex];
        if (layer) {
          layer.forEach((otherObj) => {
            // Don't check collision with self
            if (otherObj.state.id !== obj.state.id) {
              if (checkForCollision(obj.state, otherObj.state)) {
                // Check cooldown - only allow damage once per second per object pair
                const pairKey = `${obj.state.id}-${otherObj.state.id}`;
                const now = Date.now();
                const lastDamageTime = healthCollisionState.lastDamageTimes.get(pairKey) || 0;
                if (now - lastDamageTime >= 1000) {
                  // Collision detected - reduce health
                  obj.state.health -= otherObj.state.damage;
                  healthCollisionState.lastDamageTimes.set(pairKey, now);
                }
              }
            }
          });
        }
      });
    });
};
