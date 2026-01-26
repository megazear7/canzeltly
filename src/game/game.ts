import z from "zod";
import { GameObject, GameObjectState } from "./game.object.js";
import { hydrateObjects } from "./util.hydrate.js";
import { GameInput } from "./game.input.js";
import { newGame } from "./util.new-game.js";

export const BACKGROUND_ENVIRONMENT_LAYER_INDEX = 0;
export const MAIN_OBJECT_LAYER_INDEX = 1;

export const GameName = z.string().min(1);
export type GameName = z.infer<typeof GameName>;

export const GameObjectLayer = z.array(GameObjectState);
export type GameObjectLayer = z.infer<typeof GameObjectLayer>;

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
  layers: z.array(GameObjectLayer),
});
export type GameState = z.infer<typeof GameState>;

export class Game {
  state: GameState;
  layers: GameObject<GameObjectState>[][];
  input: GameInput;

  constructor(state?: GameState) {
    this.state = state || newGame();
    this.layers = hydrateObjects(this, this.state.layers);
    this.input = new GameInput(this);
  }

  update(): void {
    this.layers.forEach((layer) => {
      layer.forEach((obj) => {
        obj.update();
      });
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

  mapToViewport(obj: GameObjectState): GameObjectState {
    const scaleX = this.state.viewport.width / this.state.world.width;
    const scaleY = this.state.viewport.height / this.state.world.height;

    return {
      ...obj,
      x: (obj.x - this.state.viewport.x) * scaleX,
      y: (obj.y - this.state.viewport.y) * scaleY,
      size: obj.size * ((scaleX + scaleY) / 2),
    };
  }

  removeObject(obj: GameObject<GameObjectState>): void {
    for (const layer of this.layers) {
      const index = layer.indexOf(obj);
      if (index > -1) {
        layer.splice(index, 1);
        return;
      }
    }
  }
}
