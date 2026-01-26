import { Game } from "../game/game.js";
import { GameObjectCategory, GameObjectState } from "../game/game.object.js";
import { drawCircle } from "./draw.circle.js";
import { drawSquare } from "./draw.square.js";
import { mapToCanvas } from "./util.map-to-canvas.js";

export function drawObject(game: Game, obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  // Map to viewport
  // obj = game.mapToViewport(obj);

  // Map to canvas
  obj = mapToCanvas(game, ctx.canvas, obj);

  switch (obj.category) {
    case GameObjectCategory.enum.Circle:
      drawCircle(obj, ctx);
      break;
    case GameObjectCategory.enum.Square:
      drawSquare(obj, ctx);
      break;
    default:
      console.warn(`No drawing logic for object category: ${obj.category}`);
  }
}
