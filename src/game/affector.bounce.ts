import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";
import { affector } from "./game.affector.js";

export const bounce: affector = function (obj: GameObject<GameObjectState>): void {
  if (obj.state.x <= 0 || obj.state.x >= obj.game.state.world.width) {
    obj.state.dx = -obj.state.dx;
  }
  if (obj.state.y <= 0 || obj.state.y >= obj.game.state.world.height) {
    obj.state.dy = -obj.state.dy;
  }
};
