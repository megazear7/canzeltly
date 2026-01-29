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

export const World = z.object({
  width: z.number(),
  height: z.number(),
});
export type World = z.infer<typeof World>;

export const Viewport = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});
export type Viewport = z.infer<typeof Viewport>;

export const Controls = z.object({
  scrollSpeed: z.number().min(1).default(10),
});
export type Controls = z.infer<typeof Controls>;

export const GameState = z.object({
  name: GameName,
  world: World,
  viewport: Viewport,
  controls: Controls,
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
    this.state.viewport.height = this.state.viewport.width / targetAspectRatio;

    // Ensure viewport constraints are still respected after adjustment
    this.input.constrainViewport();
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

  pause(): void {
    throw new Error("Unimplemented");
  }

  resume(): void {
    throw new Error("Unimplemented");
  }
}
