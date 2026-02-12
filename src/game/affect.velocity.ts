import { GameObject } from "./game.object.js";
import { GameObjectState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const velocity: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Velocity)
    .forEach((affect) => {
      const vel = affect as VelocityState;
      if (vel.frozenUntil && vel.frozenUntil > Date.now()) {
        // Frozen, don't move
        return;
      }
      obj.state.x += vel.dx;
      obj.state.y += vel.dy;
    });
};
