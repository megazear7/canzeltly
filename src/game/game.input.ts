import { Circle } from "./game.circle.js";
import { Game } from "./game.js";
import { GameObjectCategory } from "./game.object.js";

export class GameInput {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  addCircle(): void {
    this.game.objects.push(
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
    // Constrain viewport so it can only be moved half outside the world
    const halfViewportWidth = this.game.state.viewport.width / 2;
    const halfViewportHeight = this.game.state.viewport.height / 2;

    this.game.state.viewport.x = Math.max(
      -halfViewportWidth,
      Math.min(this.game.state.viewport.x, this.game.state.world.width - halfViewportWidth),
    );

    this.game.state.viewport.y = Math.max(
      -halfViewportHeight,
      Math.min(this.game.state.viewport.y, this.game.state.world.height - halfViewportHeight),
    );
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
