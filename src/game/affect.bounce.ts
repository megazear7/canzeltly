import { GameObject } from "./game.object.js";
import { BounceState, GameObjectState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const bounce: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  const bounce = obj.state.affects.find((affect) => affect.category === AffectCategory.enum.Bounce) as BounceState;
  if (!bounce) return;
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Velocity)
    .forEach((affect) => {
      const vel = affect as VelocityState;
      if (obj.state.x - obj.state.radius <= 0 || obj.state.x + obj.state.radius >= obj.game.state.world.width) {
        vel.dx = -vel.dx;
        vel.dx = vel.dx * (1 - bounce.loss);
        vel.dy = vel.dy * (1 - bounce.loss);
      }
      if (obj.state.y - obj.state.radius <= 0 || obj.state.y + obj.state.radius >= obj.game.state.world.height) {
        vel.dy = -vel.dy;
        vel.dx = vel.dx * (1 - bounce.loss);
        vel.dy = vel.dy * (1 - bounce.loss);
      }
    });
};
