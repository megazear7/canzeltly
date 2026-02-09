import { GameObject } from "./game.object.js";
import { AbilityState, VelocityState, TargetState, GameObjectState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";

export const ability: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.Ability)
    .forEach((affect) => {
      const abilityState = affect as AbilityState;

      const targetAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Target) as
        | TargetState
        | undefined;
      if (targetAffect) {
        targetAffect.acceleration = abilityState.acceleration;
      }

      const velocityAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity) as
        | VelocityState
        | undefined;
      if (velocityAffect) {
        const speed = Math.sqrt(velocityAffect.dx * velocityAffect.dx + velocityAffect.dy * velocityAffect.dy);
        if (speed > abilityState.maxSpeed) {
          const scale = abilityState.maxSpeed / speed;
          velocityAffect.dx *= scale;
          velocityAffect.dy *= scale;
        }
      }
    });
};
