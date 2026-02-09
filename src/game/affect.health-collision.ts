import { GameObject } from "./game.object.js";
import { GameObjectState, HealthCollisionState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const healthCollision: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.HealthCollision)
    .map((affect) => {
      const healthAffect = affect as HealthCollisionState;
      healthAffect.collisions.forEach((collision) => (obj.state.health -= collision.damage));
      healthAffect.collisions = [];
    });
};
