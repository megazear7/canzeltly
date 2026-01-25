import { Game } from "../game/game";
import { GameObjectState } from "../game/game.object";
import { GameObjectCategory } from "../game/type.game";
import { drawCircle } from "./draw.circle";
import { mapToCanvas } from "./util.map-to-canvas.js";

export function drawObject(game: Game, gameObject: GameObjectState, ctx: CanvasRenderingContext2D): void {
  // Map to viewport
  const viewportObject = game.mapToViewport(gameObject);

  // Map to canvas
  const obj = mapToCanvas(game, ctx.canvas, viewportObject);

  switch (obj.category) {
    case GameObjectCategory.enum.Circle:
      drawCircle(obj, ctx);
      break;
    default:
      console.warn(`No drawing logic for object category: ${obj.category}`);
  }
}
