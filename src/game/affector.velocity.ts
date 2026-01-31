import { GameObject } from "./game.object.js";
import { GameObjectState, VelocityState } from "./type.object.js";
import { affector, AffectorCategory } from "./game.affector.js";

export const velocity: affector = function (obj: GameObject<GameObjectState>): void { 
  obj.state.affectors
    .filter((affector) => affector.category === AffectorCategory.enum.Velocity)
    .forEach((affector) => {
      const vel = VelocityState.parse(affector);
      obj.state.x += vel.dx;
      obj.state.y += vel.dy;
    });
};
