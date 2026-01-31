import { Circle } from "./object.circle.js";
import { Game, MAIN_OBJECT_LAYER_INDEX } from "./game.js";
import { GameObjectCategory } from "./type.object.js";

export class GameInput {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  handleKeys(pressedKeys: Set<string>): void {
    // Handle movement keys (can be pressed simultaneously)
    if (pressedKeys.has("ArrowUp")) {
      this.moveViewport(0, -1 * this.game.state.controls.scrollSpeed);
    }
    if (pressedKeys.has("ArrowDown")) {
      this.moveViewport(0, 1 * this.game.state.controls.scrollSpeed);
    }
    if (pressedKeys.has("ArrowLeft")) {
      this.moveViewport(-1 * this.game.state.controls.scrollSpeed, 0);
    }
    if (pressedKeys.has("ArrowRight")) {
      this.moveViewport(1 * this.game.state.controls.scrollSpeed, 0);
    }

    // Handle zoom keys
    if (pressedKeys.has("+") || pressedKeys.has("=")) {
      this.zoomIn(0.95);
    }
    if (pressedKeys.has("-") || pressedKeys.has("_")) {
      this.zoomOut(1.05);
    }

    // Handle action keys (one-time actions)
    if (pressedKeys.has("c")) {
      this.addCircle();
      pressedKeys.delete("c"); // Remove to prevent continuous spawning
    }
  }

  addCircle(): void {
    this.game.layers[MAIN_OBJECT_LAYER_INDEX].push(
      new Circle(this.game, {
        category: GameObjectCategory.enum.Circle,
        id: crypto.randomUUID(),
        affects: [],
        radius: 10,
        x: Math.random() * this.game.state.world.width,
        y: Math.random() * this.game.state.world.height,
        color: "#d7ad2f",
      }),
    );
  }

  applyConstraints(): void {
    this.applyMoveConstraints();
    this.applyZoomInConstraints();
    this.applyZoomOutConstraints();
  }

  applyMoveConstraints(): void {
    // TODO Apply constraints when world smaller than viewport
    this.game.state.viewports.forEach((viewport) => {
      if (this.game.state.world.width <= viewport.width) {
        // TODO This logic is flawed - needs to center viewport on world
        const minViewportX = 0;
        const maxViewportX = this.game.state.world.width / 2;

        if (viewport.x > maxViewportX) {
          viewport.x = maxViewportX;
        }

        if (viewport.x < minViewportX) {
          viewport.x = minViewportX;
        }
      }

      if (this.game.state.world.height <= viewport.height) {
        // TODO This logic is flawed - needs to center viewport on world
        const minViewportY = 0;
        const maxViewportY = this.game.state.world.height / 2;

        if (viewport.y > maxViewportY) {
          viewport.y = maxViewportY;
        }

        if (viewport.y < minViewportY) {
          viewport.y = minViewportY;
        }
      }
    });
  }

  applyZoomInConstraints(): void {
    // Prevent zooming in too much (viewport smaller than 10% of world)
    const minWidth = this.game.state.world.width * 0.1;
    const minHeight = this.game.state.world.height * 0.1;

    this.game.state.viewports.forEach((viewport) => {
      viewport.width = Math.max(viewport.width, minWidth);
      viewport.height = Math.max(viewport.height, minHeight);
    });
  }

  applyZoomOutConstraints(): void {
    // Calculate the maximum viewport size to contain the entire world with a 10% margin
    const margin = 1.5;
    const world = this.game.state.world;

    this.game.state.viewports.forEach((viewport) => {
      const aspectRatio = viewport.width / viewport.height;
      const maxWidth = Math.max(margin * world.width, margin * world.height * aspectRatio);
      const maxHeight = Math.max(margin * world.height, (margin * world.width) / aspectRatio);

      viewport.width = Math.min(viewport.width, maxWidth);
      viewport.height = Math.min(viewport.height, maxHeight);
    });
  }

  moveViewport(dx: number, dy: number): void {
    this.game.state.viewports.forEach((viewport) => {
      viewport.x += dx;
      viewport.y += dy;
    });
    this.applyMoveConstraints();
  }

  zoomIn(factor: number = 0.9): void {
    this.game.state.viewports.forEach((viewport) => {
      const newWidth = viewport.width * factor;
      const newHeight = viewport.height * factor;

      viewport.width = newWidth;
      viewport.height = newHeight;
    });

    this.applyZoomInConstraints();
  }

  zoomOut(factor: number = 1.1): void {
    this.game.state.viewports.forEach((viewport) => {
      const newWidth = viewport.width * factor;
      const newHeight = viewport.height * factor;

      viewport.width = newWidth;
      viewport.height = newHeight;
    });

    this.applyZoomOutConstraints();
  }
}
