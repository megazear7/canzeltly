import { GameState } from "../game/game.js";
import { GameId } from "../game/type.game.js";

const STORAGE_KEY = "canzeltly_saved_games";

export function saveGameState(gameState: GameState): void {
  const savedGames = getAllGameStates();
  const existingIndex = savedGames.findIndex((g) => g.id === gameState.id);
  if (existingIndex >= 0) {
    savedGames[existingIndex] = gameState;
  } else {
    savedGames.push(gameState);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames));
}

export function loadGameState(id: GameId): GameState | undefined {
  const savedGames = getAllGameStates();
  return savedGames.find((g) => g.id === id);
}

export function getAllGameStates(): GameState[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
