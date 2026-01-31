import { GameObject } from "./game.object.js";
import { GameObjectState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const velocity: affect = function (obj: GameObject<GameObjectState>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Velocity)
    .forEach((affect) => {
      const vel = affect as VelocityState;
      obj.state.x += vel.dx;
      obj.state.y += vel.dy;
    });
};
