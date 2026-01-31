import { Game } from "../game/game.js";
import { GameObjectCategory } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";
import { drawCircle } from "./draw.circle.js";
import { drawSquare } from "./draw.rectangle.js";
import { mapToCanvas } from "./util.map-to-canvas.js";

export function drawObject(game: Game, obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  obj = mapToCanvas(game, ctx.canvas, obj);

  switch (obj.category) {
    case GameObjectCategory.enum.Circle:
      drawCircle(obj, ctx);
      break;
    case GameObjectCategory.enum.Rectangle:
      drawSquare(obj, ctx);
      break;
    default:
      console.warn(`No drawing logic for object category`);
  }
}
