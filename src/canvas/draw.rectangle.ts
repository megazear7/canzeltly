import { RectangleState } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";

export function drawSquare(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  const square = obj as RectangleState;
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.width, square.height);
}
