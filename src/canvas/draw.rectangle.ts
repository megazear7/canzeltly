import { SquareState } from "../game/object.rectangle.js";
import { GameObjectState } from "../game/game.object.js";

export function drawSquare(obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  const square = SquareState.parse(obj);
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.width, square.height);
}
