import { GameObject } from "./game.object.js";
import { GameObjectState, VelocityState } from "./type.object.js";
import { affector, AffectorCategory } from "./game.affector.js";

export const bounce: affector = function (obj: GameObject<GameObjectState>): void {
  obj.state.affectors
    .filter((affector) => affector.category === AffectorCategory.enum.Velocity)
    .forEach((affector) => {
      const vel = affector as VelocityState;
      if (obj.state.x - obj.state.radius <= 0 || obj.state.x + obj.state.radius >= obj.game.state.world.width) {
        vel.dx = -vel.dx;
      }
      if (obj.state.y - obj.state.radius <= 0 || obj.state.y + obj.state.radius >= obj.game.state.world.height) {
        vel.dy = -vel.dy;
      }
    });
};
