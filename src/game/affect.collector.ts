import { GameObject } from "./game.object.js";
import { GameObjectState, CollectableState, CollectorState, HealthState, VelocityState } from "./type.object.js";
import { checkForCollision } from "../shared/util.collision.js";
import { affect, AffectCategory } from "./game.affect.js";

export const collector: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  const collectorAffect = obj.state.affects.find((affect) => affect.category === AffectCategory.enum.Collector) as
    | CollectorState
    | undefined;
  if (!collectorAffect) return;

  // Check collision with collectables
  obj.game.layers.forEach((layer) => {
    layer.forEach((otherObj) => {
      if (otherObj.state.id === obj.state.id) return;
      if (checkForCollision(obj.state, otherObj.state)) {
        const collectableAffect = otherObj.state.affects.find((a) => a.category === AffectCategory.enum.Collectable) as
          | CollectableState
          | undefined;
        if (collectableAffect) {
          // Collect it
          obj.game.removeObject(otherObj.state.id);

          // Apply effect based on type
          const now = Date.now();
          switch (collectableAffect.type) {
            case "Food": {
              const healthAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Health) as
                | HealthState
                | undefined;
              if (healthAffect) {
                healthAffect.health = Math.min(healthAffect.health + 1, healthAffect.maxHealth);
              }
              break;
            }
            case "Shield": {
              const healthAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Health) as
                | HealthState
                | undefined;
              if (healthAffect) {
                healthAffect.immuneUntil = now + (8000 + Math.random() * 4000); // 8-12 seconds
              }
              break;
            }
            case "Ice": {
              // Freeze all enemies with velocity
              obj.game.layers.forEach((l) =>
                l.forEach((o) => {
                  if (o.state.id !== obj.state.id) {
                    const velAffect = o.state.affects.find((a) => a.category === AffectCategory.enum.Velocity) as
                      | VelocityState
                      | undefined;
                    if (velAffect) {
                      velAffect.frozenUntil = now + (4000 + Math.random() * 2000); // 4-6 seconds
                    }
                  }
                }),
              );
              break;
            }
          }
        }
      }
    });
  });
};
