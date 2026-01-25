import { GameObjectState } from "../game/game.object";
import { GameObjectCategory } from "../game/type.game";
import { drawCircle } from "./draw.circle";

export function contextDraw(obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  switch (obj.category) {
    case GameObjectCategory.enum.Circle:
      drawCircle(obj, ctx);
      break;
    default:
      console.warn(`No drawing logic for object category: ${obj.category}`);
  }
}
