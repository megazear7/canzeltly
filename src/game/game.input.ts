import { Circle } from "./object.circle.js";
import { Game, MAIN_OBJECT_LAYER_INDEX } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { AffectCategory } from "./game.affect.js";
import { TargetState, AbilityState, VelocityState } from "./type.object.js";

export class GameInput {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  handleKeys(pressedKeys: Set<string>, playerId: string): void {
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

    // Handle braking
    if (pressedKeys.has(" ")) {
      this.applyBraking(playerId);
    }
  }

  addCircle(): void {
    this.game.layers[MAIN_OBJECT_LAYER_INDEX].push(
      new Circle(this.game, {
        category: GameObjectCategory.enum.Circle,
        id: crypto.randomUUID(),
        affects: [],
        radius: 10,
        mass: 10 * 10,
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
    this.game.state.viewports.forEach((viewport) => {
      const world = this.game.state.world;

      // Handle X-axis constraints
      if (viewport.width >= world.width) {
        // Viewport is larger than world: center on world
        viewport.x = world.width / 2;
      } else {
        // Viewport is smaller than world: allow 1/3 outside scrolling (2/3 remains over world)
        const minX = viewport.width / 6;
        const maxX = world.width - viewport.width / 6;
        viewport.x = Math.max(minX, Math.min(maxX, viewport.x));
      }

      // Handle Y-axis constraints
      if (viewport.height >= world.height) {
        // Viewport is larger than world: center on world
        viewport.y = world.height / 2;
      } else {
        // Viewport is smaller than world: allow 1/3 outside scrolling (2/3 remains over world)
        const minY = viewport.height / 6;
        const maxY = world.height - viewport.height / 6;
        viewport.y = Math.max(minY, Math.min(maxY, viewport.y));
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

  handleCanvasClick(playerId: string, worldX: number, worldY: number): void {
    const currentPlayer = this.game.state.players.find((p) => p.playerId === playerId);
    if (!currentPlayer) return;
    currentPlayer.selectedObjects.forEach((objId) => {
      const obj = this.game.layers.flat().find((o) => o.state.id === objId);
      if (obj) {
        const targetAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Target);
        if (targetAffect) {
          (targetAffect as TargetState).x = worldX;
          (targetAffect as TargetState).y = worldY;
        } else {
          obj.state.affects.push({
            category: AffectCategory.enum.Target,
            x: worldX,
            y: worldY,
            acceleration: 0.1,
          } as TargetState);
        }
      }
    });
  }

  applyBraking(playerId: string): void {
    const currentPlayer = this.game.state.players.find((p) => p.playerId === playerId);
    if (!currentPlayer) return;
    currentPlayer.selectedObjects.forEach((objId) => {
      const obj = this.game.layers.flat().find((o) => o.state.id === objId);
      if (obj) {
        // Disable target by setting coordinates to null
        const targetAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Target) as
          | TargetState
          | undefined;
        if (targetAffect) {
          targetAffect.x = null;
          targetAffect.y = null;
        }
        const abilityAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Ability) as
          | AbilityState
          | undefined;
        if (abilityAffect) {
          const velocityAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Velocity) as
            | VelocityState
            | undefined;
          if (velocityAffect) {
            const speed = Math.sqrt(velocityAffect.dx * velocityAffect.dx + velocityAffect.dy * velocityAffect.dy);
            if (speed > 0) {
              const deceleration = abilityAffect.brakingAcceleration;
              // Reduce speed by deceleration amount
              const newSpeed = Math.max(0, speed - deceleration);
              // Scale velocity to new speed
              const scale = newSpeed / speed;
              velocityAffect.dx *= scale;
              velocityAffect.dy *= scale;
              // If speed is very low, set to zero to prevent jitter
              const finalSpeed = Math.sqrt(
                velocityAffect.dx * velocityAffect.dx + velocityAffect.dy * velocityAffect.dy,
              );
              if (finalSpeed < 0.01) {
                velocityAffect.dx = 0;
                velocityAffect.dy = 0;
              }
            }
          }
        }
      }
    });
  }
}
