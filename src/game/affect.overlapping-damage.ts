import { GameObject } from "./game.object.js";
import { GameObjectState, OverlappingDamageState, HealthState } from "./type.object.js";
import { checkForCollision } from "../shared/util.collision.js";
import { affect, AffectCategory } from "./game.affect.js";

export const overlappingDamage: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.OverlappingDamage)
    .forEach((affect) => {
      const damageState = affect as OverlappingDamageState;
      if (!damageState.makesAttacks) return;

      // Get all objects in the same layer with OverlappingDamage affect that receive attacks
      const layerIndex = obj.game.layers.findIndex((layer) => layer.map((o) => o.state.id).includes(obj.state.id));
      if (layerIndex === -1) return;

      const overlappingObjects = obj.game.layers[layerIndex].filter(
        (otherObj) =>
          otherObj !== obj &&
          otherObj.state.affects.some(
            (a) =>
              a.category === AffectCategory.enum.OverlappingDamage && (a as OverlappingDamageState).receivesAttacks,
          ) &&
          checkForCollision(obj.state, otherObj.state),
      );

      overlappingObjects.forEach((otherObj) => {
        const now = Date.now();
        if (now - damageState.lastAttack >= damageState.attackSpeed) {
          const otherHealth = otherObj.state.affects.find((a) => a.category === AffectCategory.enum.Health) as
            | HealthState
            | undefined;
          if (otherHealth && (!otherHealth.immuneUntil || otherHealth.immuneUntil <= now)) {
            otherHealth.health -= damageState.damage;
          }
          damageState.lastAttack = now;
        }
      });
    });
};
