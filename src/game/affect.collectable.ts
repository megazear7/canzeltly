import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";
import { affect } from "./game.affect.js";

export const collectable: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  // Collectable affect is a state holder; collection is handled by collector affect
  void obj;
};
