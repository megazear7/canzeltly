import { Game } from "../game/game.js";
import { GameObjectState } from "../game/game.object";

export function mapToCanvas(game: Game, canvas: HTMLCanvasElement, obj: GameObjectState): GameObjectState {
  // The dimensions of obj are relative to the game.state.viewport.width and game.state.viewport.height
  // However, the canvas has dimensions canvas.width and canvas.height
  const scaleX = canvas.width / game.state.viewport.width;
  const scaleY = canvas.height / game.state.viewport.height;

  return {
    ...obj,
    x: (obj.x - game.state.viewport.x) * scaleX,
    y: (obj.y - game.state.viewport.y) * scaleY,
    size: obj.size * ((scaleX + scaleY) / 2),
  };
}
