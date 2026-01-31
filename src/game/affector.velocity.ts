import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";
import { affector } from "./game.affector.js";

export const velocity: affector = function (obj: GameObject<GameObjectState>): void {
  obj.state.x += obj.state.dx;
  obj.state.y += obj.state.dy;
};
