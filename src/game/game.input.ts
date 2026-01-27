import { Circle } from "./object.circle.js";
import { BACKGROUND_ENVIRONMENT_LAYER_INDEX, Game, MAIN_OBJECT_LAYER_INDEX } from "./game.js";
import { GameObjectCategory } from "./game.object.js";

export class GameInput {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  addCircle(): void {
    console.log(this.game.layers[BACKGROUND_ENVIRONMENT_LAYER_INDEX]);
    console.log(this.game.layers[MAIN_OBJECT_LAYER_INDEX]);

    this.game.layers[MAIN_OBJECT_LAYER_INDEX].push(
      new Circle(this.game, {
        category: GameObjectCategory.enum.Circle,
        size: 20,
        x: Math.random() * this.game.state.world.width,
        y: Math.random() * this.game.state.world.height,
        color: "#ff0000",
        dx: 0,
        dy: 0,
      }),
    );
  }

  moveViewport(dx: number, dy: number): void {
    this.game.state.viewport.x += dx;
    this.game.state.viewport.y += dy;
    this.constrainViewport();
  }

  constrainViewport(): void {
    // Constrain viewport so it can only be moved maxScrollOut fraction outside the world
    const maxScrollOut = 1 / 3;
    const maxViewportWidthFactor = 1 + maxScrollOut * 2;
    const maxViewportWidth = this.game.state.world.width * maxViewportWidthFactor;
    const maxViewportHeight = this.game.state.world.height * maxViewportWidthFactor;

    if (this.game.state.viewport.width > maxViewportWidth) {
      this.game.state.viewport.width = maxViewportWidth;
    }
    if (this.game.state.viewport.height > maxViewportHeight) {
      this.game.state.viewport.height = maxViewportHeight;
    }
  }

  zoomIn(factor: number = 0.9): void {
    const newWidth = this.game.state.viewport.width * factor;
    const newHeight = this.game.state.viewport.height * factor;

    // Prevent zooming in too much (viewport smaller than 10% of world)
    const minWidth = this.game.state.world.width * 0.1;
    const minHeight = this.game.state.world.height * 0.1;

    this.game.state.viewport.width = Math.max(newWidth, minWidth);
    this.game.state.viewport.height = Math.max(newHeight, minHeight);

    this.constrainViewport();
  }

  zoomOut(factor: number = 1.1): void {
    const newWidth = this.game.state.viewport.width * factor;
    const newHeight = this.game.state.viewport.height * factor;

    // Prevent zooming out too much (viewport larger than 2x world)
    const maxWidth = this.game.state.world.width * 2;
    const maxHeight = this.game.state.world.height * 2;

    this.game.state.viewport.width = Math.min(newWidth, maxWidth);
    this.game.state.viewport.height = Math.min(newHeight, maxHeight);

    this.constrainViewport();
  }
}
