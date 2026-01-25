import { Ball } from "./game.ball.js";
import { GameObject } from "./game.object.js";
import { GameName, GameObjectCategory, GameObjectState } from "./type.game.js";

export class Game {
  name: GameName;
  objects: GameObject<GameObjectState>[];

  constructor(name: GameName) {
    this.name = name;
    this.objects = [new Ball(this, {
      category: GameObjectCategory.enum.ball,
      x: 50,
      y: 50,
      dx: 2,
      dy: 3,
    })];
  }

  start(): void {
    console.log(`Starting game: ${this.name}`);
    // Game loop logic would go here
  }
}
