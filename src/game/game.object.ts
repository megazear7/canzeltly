import { Game } from "./game.js";
import { GameObjectState } from "./type.object.js";
import { bounce } from "./affect.bounce.js";
import { AffectCategory } from "./game.affect.js";
import { velocity } from "./affect.velocity.js";
import { target } from "./affect.target.js";
import { gravity } from "./affect.gravity.js";

export abstract class GameObject<T extends GameObjectState> {
  game: Game;
  state: T;

  constructor(game: Game, state: T) {
    this.game = game;
    this.state = state;
  }

  isInWorld(): boolean {
    return (
      this.state.x + this.state.radius >= 0 &&
      this.state.x - this.state.radius <= this.game.state.world.width &&
      this.state.y + this.state.radius >= 0 &&
      this.state.y - this.state.radius <= this.game.state.world.height
    );
  }

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
    this.state.affects.forEach((affect) => {
      if (affect.category === AffectCategory.enum.Velocity) velocity(this);
      if (affect.category === AffectCategory.enum.Bounce) bounce(this);
      if (affect.category === AffectCategory.enum.Target) target(this);
      if (affect.category === AffectCategory.enum.Gravity) gravity(this);
      this.checkBounds();
    });
  }

  checkBounds(): void {
    if (this.state.x - this.state.radius < 0) {
      this.state.x = this.state.radius;
    }
    if (this.state.x + this.state.radius > this.game.state.world.width) {
      this.state.x = this.game.state.world.width - this.state.radius;
    }
    if (this.state.y - this.state.radius < 0) {
      this.state.y = this.state.radius;
    }
    if (this.state.y + this.state.radius > this.game.state.world.height) {
      this.state.y = this.game.state.world.height - this.state.radius;
    }
  }
}
