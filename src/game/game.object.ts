import z from "zod";
import { Game } from "./game.js";

export const GameObjectCategory = z.enum(["Circle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
  size: z.number(),
  x: z.number(),
  y: z.number(),
});
export type GameObjectState = z.infer<typeof GameObjectState>;

export abstract class GameObject<T extends GameObjectState> {
  game: Game;
  state: T;

  constructor(game: Game, state: T) {
    this.game = game;
    this.state = state;
  }

  update(): void {
    this.updateState();
    this.checkForDestroy();
  }

  abstract updateState(): void;
  abstract checkForDestroy(): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
