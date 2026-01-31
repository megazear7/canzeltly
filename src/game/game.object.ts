import { Game } from "./game.js";
import { GameObjectState } from "./type.object.js";
import { bounce } from "./affector.bounce.js";
import { AffectorCategory } from "./game.affector.js";
import { velocity } from "./affector.velocity.js";

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
    if (!this.isInWorld()) {
      this.game.removeObject(this.state.id);
    }
  }

  updateState(): void {
    this.state.affectors.forEach((affector) => {
      if (affector.category === AffectorCategory.enum.Bounce) bounce(this);
      if (affector.category === AffectorCategory.enum.Velocity) velocity(this);
    });
  }
}
