import { Game } from "../game/game";
import { drawObject } from "./draw.object";

export function draw(game: Game, canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set canvas size
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Temporary testing: Draw a green rectangle on the entire canvas
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render objects
  game.layers.forEach((layer) => {
    layer.forEach((obj) => drawObject(game, obj.state, ctx));
  });
}
