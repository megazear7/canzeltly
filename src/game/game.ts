import z from "zod";
import { GameObject } from "./game.object.js";
import { GameObjectId } from "./type.object.js";
import { hydrateObjects } from "./util.hydrate.js";
import { GameInput } from "./game.input.js";
import { GameId, GameName, GameObjectLayer, GameMode } from "./type.game.js";
import { AnyGameObjectState } from "./type.object.js";
import { Player } from "../shared/type.player.js";

export const BACKGROUND_ENVIRONMENT_LAYER_INDEX = 0;
export const MAIN_OBJECT_LAYER_INDEX = 1;

export const GameStatus = z.enum(["NotStarted", "Playing", "Paused", "GameOver"]);
export type GameStatus = z.infer<typeof GameStatus>;

export const Victory = z.enum(["Win", "Lose"]);
export type Victory = z.infer<typeof Victory>;

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
  viewports: z.array(Viewport),
  controls: Controls,
  layers: z.array(GameObjectLayer),
  players: z.array(Player),
  status: GameStatus.default("NotStarted"),
  started: z.number().optional(),
  ended: z.number().optional(),
  duration: z.number().default(0),
  mode: GameMode,
  collected: z.number().default(0),
  totalCollectibles: z.number().optional(),
  timeLimit: z.number().optional(),
  startTime: z.number().optional(),
});
export type GameState = z.infer<typeof GameState>;

export class Game {
  state: GameState;
  layers: GameObject<AnyGameObjectState>[][];
  input: GameInput;

  constructor(state: GameState) {
    this.state = state;
    this.layers = hydrateObjects(this, this.state.layers);
    this.input = new GameInput(this);
  }

  update(): void {
    if (this.state.status === GameStatus.enum.Paused || this.state.status === GameStatus.enum.GameOver) return;
    this.layers.forEach((layer) => {
      layer.forEach((obj) => {
        obj.update();
      });
    });
  }

  alignViewport(targetAspectRatio: number): void {
    // Adjust viewport height to match the target aspect ratio while keeping width the same
    this.state.viewports.forEach((viewport) => {
      viewport.height = viewport.width / targetAspectRatio;
    });

    // Ensure viewport constraints are still respected after adjustment
    this.input.applyConstraints();
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
    if (this.state.status === GameStatus.enum.Playing) {
      this.state.status = GameStatus.enum.Paused;
    }
  }

  resume(): void {
    if (this.state.status === GameStatus.enum.Paused) {
      this.state.status = GameStatus.enum.Playing;
    }
  }

  start(): void {
    if (this.state.status === GameStatus.enum.NotStarted) {
      this.state.status = GameStatus.enum.Playing;
      this.state.started = Date.now();
    }
  }

  end(): void {
    if (this.state.status === GameStatus.enum.Playing || this.state.status === GameStatus.enum.Paused) {
      this.state.status = GameStatus.enum.GameOver;
      this.state.ended = Date.now();
      if (this.state.started) {
        this.state.duration = this.state.ended - this.state.started;
      }
    }
  }
}
