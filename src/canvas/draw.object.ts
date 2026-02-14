import { Game } from "../game/game.js";
import {
  DrawCategory,
  DrawCircle,
  DrawImage,
  DrawShip,
  DrawSquare,
  GameObjectCategory,
  DrawMode,
} from "../game/type.object.js";
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

  if (!obj.draw || obj.draw.length === 0) {
    // Legacy object without draw property or empty array
    if (obj.category === GameObjectCategory.enum.Circle) {
      const defaultDraw: DrawCircle = {
        category: DrawCategory.enum.circle,
        mode: DrawMode.enum.simple,
        color: "#cccccc",
      };
      drawCircle(obj, ctx, defaultDraw);
    } else if (obj.category === GameObjectCategory.enum.Rectangle) {
      const defaultDraw: DrawSquare = {
        category: DrawCategory.enum.square,
        mode: DrawMode.enum.simple,
        color: "#cccccc",
      };
      drawSquare(obj, ctx, defaultDraw);
    } else {
      console.warn(`No drawing logic for object category: ${obj.category}`);
    }
    return;
  }

  // Find the draw option that matches the game's draw mode, or default to the first one
  const drawOption = obj.draw.find((d) => d.mode === game.state.drawMode) || obj.draw[0];

  const drawCategory = drawOption.category;
  switch (drawCategory) {
    case DrawCategory.enum.circle:
      drawCircle(obj, ctx, drawOption as DrawCircle);
      break;
    case DrawCategory.enum.square:
      drawSquare(obj, ctx, drawOption as DrawSquare);
      break;
    case DrawCategory.enum.image:
      drawImage(obj, ctx, drawOption as DrawImage);
      break;
    case DrawCategory.enum.ship:
      drawShip(obj, ctx, drawOption as DrawShip);
      break;
    default:
      console.warn(`Unknown draw category: ${drawCategory}`);
  }
}
