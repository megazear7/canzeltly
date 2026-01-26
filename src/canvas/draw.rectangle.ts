import { SquareState } from "../game/object.square.js";
import { GameObjectState } from "../game/game.object.js";

export function drawSquare(obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  const square = SquareState.parse(obj);
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x - square.size / 2, square.y - square.size / 2, square.size, square.size);
}
