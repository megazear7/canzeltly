import { GameObject } from "./game.object.js";
import { GameObjectState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const bounce: affect = function (obj: GameObject<GameObjectState>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Velocity)
    .forEach((affect) => {
      const vel = affect as VelocityState;
      if (obj.state.x - obj.state.radius <= 0 || obj.state.x + obj.state.radius >= obj.game.state.world.width) {
        vel.dx = -vel.dx;
      }
      if (obj.state.y - obj.state.radius <= 0 || obj.state.y + obj.state.radius >= obj.game.state.world.height) {
        vel.dy = -vel.dy;
      }
    });
};
