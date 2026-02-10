import { Game } from "./game.js";
import { GameObjectState } from "./type.object.js";
import { bounce } from "./affect.bounce.js";
import { AffectCategory } from "./game.affect.js";
import { velocity } from "./affect.velocity.js";
import { target } from "./affect.target.js";
import { targetObject } from "./affect.target-object.js";
import { gravity } from "./affect.gravity.js";
import { health } from "./affect.health.js";
import { ability } from "./affect.ability.js";
import { gameOver } from "./affect.game-over.js";
import { collection } from "./affect.collection.js";
import { impermeable } from "./affect.impermeable.js";
import { overlappingDamage } from "./affect.overlapping-damage.js";
import { elasticCollision } from "./affect.elastic-collision.js";

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
    this.updatePosition();
    this.checkForDestroy();
    this.updateAffects();
  }

  updatePosition(): void {
    this.state.affects.forEach((affect) => {
      if (affect.category === AffectCategory.enum.Velocity) velocity(this);
      if (affect.category === AffectCategory.enum.Bounce) bounce(this);
      this.checkBounds();
    });
  }

  updateAffects(): void {
    this.state.affects.forEach((affect) => {
      if (affect.category === AffectCategory.enum.Target) target(this);
      if (affect.category === AffectCategory.enum.TargetObject) targetObject(this);
      if (affect.category === AffectCategory.enum.Gravity) gravity(this);
      if (affect.category === AffectCategory.enum.Health) health(this);
      if (affect.category === AffectCategory.enum.Ability) ability(this);
      if (affect.category === AffectCategory.enum.Collection) collection(this);
      if (affect.category === AffectCategory.enum.OverlappingDamage) overlappingDamage(this);
      if (affect.category === AffectCategory.enum.ElasticCollision) elasticCollision(this);
      if (affect.category === AffectCategory.enum.GameOver) gameOver(this);
    });
  }

  checkForDestroy(): void {
    if (!this.isInWorld()) {
      this.game.removeObject(this.state.id);
    }
  }

  majorUpdates(): void {
    this.state.affects.forEach((affect) => {
      if (affect.category === AffectCategory.enum.Impermeable) impermeable(this);
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
