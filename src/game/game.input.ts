import { Circle } from "./object.circle.js";
import { Game, MAIN_OBJECT_LAYER_INDEX } from "./game.js";
import { GameObjectCategory } from "./game.object.js";

export class GameInput {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  addCircle(): void {
    this.game.layers[MAIN_OBJECT_LAYER_INDEX].push(
      new Circle(this.game, {
        category: GameObjectCategory.enum.Circle,
        size: 10,
        x: Math.random() * this.game.state.world.width,
        y: Math.random() * this.game.state.world.height,
        color: "#d7ad2f",
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
    const inverseMaxScrollOut = 1 - maxScrollOut;
    const maxViewportWidthFactor = 1 + maxScrollOut * 2;
    const maxViewportWidth = this.game.state.world.width * maxViewportWidthFactor;
    const maxViewportHeight = this.game.state.world.height * maxViewportWidthFactor;
    const practicalWidth = Math.min(this.game.state.viewport.width, this.game.state.world.width);
    const practicalHeight = Math.min(this.game.state.viewport.height, this.game.state.world.height);
    const minViewportX = -1 * practicalWidth * maxScrollOut;
    const minViewportY = -1 * practicalHeight * maxScrollOut;
    const maxViewportX = this.game.state.world.width - practicalWidth * inverseMaxScrollOut;
    const maxViewportY = this.game.state.world.height - practicalHeight * inverseMaxScrollOut;

    if (this.game.state.viewport.x > maxViewportX) {
      this.game.state.viewport.x = maxViewportX;
    }

    if (this.game.state.viewport.y > maxViewportY) {
      this.game.state.viewport.y = maxViewportY;
    }

    if (this.game.state.viewport.x < minViewportX) {
      this.game.state.viewport.x = minViewportX;
    }

    if (this.game.state.viewport.y < minViewportY) {
      this.game.state.viewport.y = minViewportY;
    }

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
