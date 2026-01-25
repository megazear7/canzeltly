import z from "zod";
import { GameObject, GameObjectState } from "./game.object.js";
import { GameName } from "./type.game.js";
import { hydrateObjects } from "./util.hydrate.js";
import { GameInput } from "./game.input.js";
import { newGame } from "./util.new-game.js";

export const GameState = z.object({
  name: GameName,
  world: z.object({
    width: z.number(),
    height: z.number(),
  }),
  viewport: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  objects: z.array(GameObjectState),
});
export type GameState = z.infer<typeof GameState>;

export class Game {
  state: GameState;
  objects: GameObject<GameObjectState>[];
  input: GameInput;

  constructor(state?: GameState) {
    this.state = state || newGame();
    this.objects = hydrateObjects(this, this.state.objects);
    this.input = new GameInput(this);
  }

  update(): void {
    this.objects.forEach((obj) => {
      obj.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.objects.forEach((obj) => {
      obj.draw(ctx);
    });
  }

  alignViewport(targetAspectRatio: number): void {
    // Adjust viewport height to match the target aspect ratio while keeping width the same
    const newHeight = this.state.viewport.width / targetAspectRatio;

    // Keep viewport.x the same, but adjust viewport.y to center the viewport
    // The y position should be adjusted so the viewport remains centered vertically
    const heightDifference = newHeight - this.state.viewport.height;
    this.state.viewport.y -= heightDifference / 2;

    // Update the viewport height
    this.state.viewport.height = newHeight;

    // Ensure viewport constraints are still respected after adjustment
    this.input.constrainViewport();
  }
}
