import z from "zod";
import { Game } from "./game.js";

export const GameObjectCategory = z.enum(["Circle", "Rectangle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
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

  abstract isInWorld(): boolean;

  update(): void {
    this.updateState();
    this.checkForDestroy();
  }

  checkForDestroy(): void {
    // if (!this.isInWorld()) {
    //   this.game.removeObject(this);
    // }
  }

  abstract updateState(): void;
}
