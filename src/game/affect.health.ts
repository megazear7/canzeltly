import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";
import { affect } from "./game.affect.js";

export const health: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  // Health affect is a state holder; damage is applied by other affects
  void obj;
};
