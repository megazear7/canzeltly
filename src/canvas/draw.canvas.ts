import { Game } from "../game/game";
import { drawObject } from "./draw.object";

export function draw(game: Game, canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Only resize if necessary
  const newWidth = canvas.clientWidth;
  const newHeight = canvas.clientHeight;
  if (canvas.width !== newWidth || canvas.height !== newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;
  } else {
    // Clear canvas only if not resized
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Render objects
  game.layers.forEach((layer) => {
    layer.forEach((obj) => drawObject(game, obj.state, ctx));
  });
}
