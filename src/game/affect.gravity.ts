import { GameObject } from "./game.object.js";
import { GameObjectState, GravityState, VelocityState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const gravity: affect = function (obj: GameObject<GameObjectState>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Gravity)
    .forEach((affect) => {
      const grav = affect as GravityState;
      obj.state.affects
        .filter((a) => a.category === AffectCategory.enum.Velocity)
        .forEach((velAffect) => {
          if (velAffect) {
            (velAffect as VelocityState).dy += grav.strength;
          }
        });
    });
};
