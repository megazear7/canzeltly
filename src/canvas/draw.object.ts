import { Game } from "../game/game.js";
import { DrawCategory, GameObjectCategory } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";
import { drawCircle } from "./draw.circle.js";
import { drawSquare } from "./draw.rectangle.js";
import { drawImage } from "./draw.image.js";
import { drawShip } from "./draw.ship.js";
import { mapToCanvas } from "./util.map-to-canvas.js";

export function drawObject(
  game: Game,
  obj: AnyGameObjectState,
  ctx: CanvasRenderingContext2D,
  viewportIndex: number,
): void {
  obj = mapToCanvas(game.state.viewports[viewportIndex], ctx.canvas, obj);

  const drawCategory = obj.draw?.category;
  switch (drawCategory) {
    case DrawCategory.enum.circle:
      drawCircle(obj, ctx);
      break;
    case DrawCategory.enum.square:
      drawSquare(obj, ctx);
      break;
    case DrawCategory.enum.image:
      drawImage(obj, ctx);
      break;
    case DrawCategory.enum.ship:
      drawShip(obj, ctx);
      break;
    default:
      // Legacy object without draw property or unknown
      if (obj.category === GameObjectCategory.enum.Circle) {
        drawCircle(obj, ctx);
      } else if (obj.category === GameObjectCategory.enum.Rectangle) {
        drawSquare(obj, ctx);
      } else {
        console.warn(`No drawing logic for object category: ${obj.category}`);
      }
  }
}
