import { AffectCategory } from "./game.affect.js";
import { Game, GameState } from "./game.js";
import { GameObject } from "./game.object.js";
import { CircleState, GameObjectCategory } from "./type.object.js";

export class Circle extends GameObject<CircleState> {
  override state: CircleState;

  constructor(game: Game, state: CircleState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }
}

export function randomCircleState(game: Game): CircleState {
  const radius = 10 + Math.random() * 20;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [],
    x: Math.random() * game.state.world.width,
    y: Math.random() * (game.state.world.height / 2),
    radius,
    mass: radius * radius,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  });
}

export function randomMovingCircleState(game: GameState): CircleState {
  const radius = 10 + Math.random() * 20;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
      },
      {
        category: AffectCategory.enum.Target,
        x: Math.random() * game.world.width,
        y: Math.random() * game.world.height,
        acceleration: 0.2 + Math.random() * 0.1,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius,
    mass: radius * radius,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  });
}

export function randomBouncingCircleState(game: GameState): CircleState {
  const radius = 30 + Math.random() * 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 25,
        dy: (Math.random() - 0.5) * 25,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.25,
        maxSpeed: 5.0,
        brakingAcceleration: 0.075,
        damage: 0,
      },
      {
        category: AffectCategory.enum.GameOverCollision,
      },
      {
        category: AffectCategory.enum.ElasticCollision,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius,
    mass: radius * radius,
    color: `#FF0000`,
  });
}

export function randomBlockadeCircleState(game: GameState): CircleState {
  const radius = 20 + Math.random() * 20;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.ElasticCollision,
        damage: 0,
        attackSpeed: 1000,
        makesAttacks: false,
        receivesAttacks: false,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    radius,
    mass: Number.MAX_SAFE_INTEGER, // Infinite mass - immovable
    color: `#808080`,
  });
}

export function randomVoidCircleState(game: GameState): CircleState {
  const radius = 20 + Math.random() * 20;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 1,
        attackSpeed: 1000,
        lastAttack: 0,
        makesAttacks: true,
        receivesAttacks: false,
      },
      {
        category: AffectCategory.enum.GameOverCollision,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    radius,
    mass: radius * radius,
    color: `#000000`,
  });
}

export function randomHunterCircleState(game: GameState, playerId: string): CircleState {
  const player = game.players.find((p) => p.playerId === playerId);
  const targetId = player?.selectedObjects[0] || playerId;
  const radius = 15 + Math.random() * 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.TargetObject,
        objectId: targetId,
        acceleration: 0.1,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.1,
        maxSpeed: 3.0,
        brakingAcceleration: 0.05,
        damage: 0,
      },
      {
        category: AffectCategory.enum.GameOverCollision,
      },
      {
        category: AffectCategory.enum.ElasticCollision,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius,
    mass: radius * radius,
    color: `#800080`, // Purple for hunters
  });
}

export function randomGhostCircleState(game: GameState, playerId: string): CircleState {
  const player = game.players.find((p) => p.playerId === playerId);
  const targetId = player?.selectedObjects[0] || playerId;
  const radius = 15 + Math.random() * 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.TargetObject,
        objectId: targetId,
        acceleration: 0.1,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.1,
        maxSpeed: 3.0,
        brakingAcceleration: 0.05,
        damage: 0,
      },
      {
        category: AffectCategory.enum.GameOverCollision,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 2,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius,
    mass: radius * radius,
    color: `#C0C0C0`, // Silver for ghosts
  });
}

export function randomGravityCircles(game: GameState): CircleState {
  const radius = 10 + Math.random() * 20;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health: 1,
        maxHealth: 1,
      },
      {
        category: AffectCategory.enum.Gravity,
        strength: 0.1 + Math.random() * 0.1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.ElasticCollision,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: true,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 1,
        attackSpeed: 1000,
        makesAttacks: true,
        receivesAttacks: false,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius,
    mass: radius * radius,
    color: `hsl(200, 70%, 50%)`,
  });
}

export function heroCircle(
  game: GameState,
  playerId: string,
  health: number = 1,
  breakSpeed: number = 0.1,
): CircleState {
  const radius = 15;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Health,
        health,
        maxHealth: health,
      },
      {
        category: AffectCategory.enum.GameOver,
        layers: [1],
        playerId: playerId,
      },
      {
        category: AffectCategory.enum.Collection,
      },
      {
        category: AffectCategory.enum.Collector,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.15,
        maxSpeed: 5.0,
        brakingAcceleration: breakSpeed,
        damage: 0,
      },
      {
        category: AffectCategory.enum.ElasticCollision,
        damage: 0,
        attackSpeed: 1000,
        makesAttacks: false,
        receivesAttacks: true,
      },
      {
        category: AffectCategory.enum.OverlappingDamage,
        damage: 0,
        attackSpeed: 1000,
        makesAttacks: false,
        receivesAttacks: true,
      },
    ],
    x: Math.random() * game.world.width,
    y: (0.5 + Math.random() * 0.5) * game.world.height,
    radius,
    mass: radius * radius,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  });
}

export function foodCircle(game: GameState): CircleState {
  const radius = 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Collectable,
        type: "Food",
      },
      {
        category: AffectCategory.enum.Impermeable,
      },
    ],
    radius,
    mass: radius * radius,
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    color: "#FFA500", // Orange for food
  });
}

export function shieldCircle(game: GameState): CircleState {
  const radius = 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Collectable,
        type: "Shield",
      },
      {
        category: AffectCategory.enum.Impermeable,
      },
    ],
    radius,
    mass: radius * radius,
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    color: "#0000FF", // Blue for shield
  });
}

export function iceCircle(game: GameState): CircleState {
  const radius = 10;
  return CircleState.parse({
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Collectable,
        type: "Ice",
      },
      {
        category: AffectCategory.enum.Impermeable,
      },
    ],
    radius,
    mass: radius * radius,
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    color: "#00FFFF", // Cyan for ice
  });
}
