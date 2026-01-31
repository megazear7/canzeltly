import z from "zod";
import { GameObject } from "./game.object.js";
import { GameObjectId } from "./type.object.js";
import { hydrateObjects } from "./util.hydrate.js";
import { GameInput } from "./game.input.js";
import { newGame } from "./util.new-game.js";
import { GameId, GameName, GameObjectLayer } from "./type.game.js";
import { AnyGameObjectState } from "./type.object.js";

export const BACKGROUND_ENVIRONMENT_LAYER_INDEX = 0;
export const MAIN_OBJECT_LAYER_INDEX = 1;

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
  id: GameId,
  world: World,
  viewport: Viewport,
  controls: Controls,
  layers: z.array(GameObjectLayer),
});
export type GameState = z.infer<typeof GameState>;

export class Game {
  state: GameState;
  layers: GameObject<AnyGameObjectState>[][];
  input: GameInput;
  paused: boolean = false;

  constructor(state?: GameState) {
    this.state = state || newGame();
    this.layers = hydrateObjects(this, this.state.layers);
    this.input = new GameInput(this);
  }

  update(): void {
    if (this.paused) return;
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

  removeObject(id: GameObjectId): void {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      for (let objIndex = 0; objIndex < layer.length; objIndex++) {
        if (layer[objIndex].state.id === id) {
          layer.splice(objIndex, 1);
          return;
        }
      }
    }
  }

  serializeState(): void {
    this.state.layers = this.layers.map((layer) => layer.map((obj) => obj.state));
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
  }
}
