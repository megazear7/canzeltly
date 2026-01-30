import { RectangleState } from "../game/object.rectangle.js";
import { AnyGameObjectState } from "../game/type.game.js";

export function drawSquare(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  const square = RectangleState.parse(obj);
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.width, square.height);
}
