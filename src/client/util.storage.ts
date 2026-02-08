import { GameState } from "../game/game.js";
import { GameId } from "../game/type.game.js";
import { slugify } from "../shared/util.slug.js";

const STORAGE_KEY = "canzeltly_saved_games";
const PLAYER_ASSIGNMENTS_KEY = "canzeltly_player_assignments";
const NEW_GAME_KEY = "canzeltly_new_game";

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
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing stored games:", error);
    return [];
  }
}

export function deleteGameState(id: GameId): void {
  const savedGames = getAllGameStates().filter((g) => g.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames));
}

export function deleteMultipleGameStates(ids: GameId[]): void {
  const savedGames = getAllGameStates().filter((g) => !ids.includes(g.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames));
}

export function saveNewGameState(gameState: GameState): void {
  localStorage.setItem(NEW_GAME_KEY, JSON.stringify(gameState));
}

export function loadNewGameState(): GameState | undefined {
  const stored = localStorage.getItem(NEW_GAME_KEY);
  if (!stored) return undefined;
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing new game state:", error);
    return undefined;
  }
}

export function deleteNewGameState(): void {
  localStorage.removeItem(NEW_GAME_KEY);
}

export function renameGameState(oldId: GameId, newName: string): void {
  const savedGames = getAllGameStates();
  const game = savedGames.find((g) => g.id === oldId);
  if (!game) return;
  deleteGameState(oldId);
  const newId = slugify(newName);
  const newGame = { ...game, name: newName, id: newId };
  saveGameState(newGame);
}

export function getPlayerAssignment(gameId: GameId): string | undefined {
  const assignments = getAllPlayerAssignments();
  return assignments[gameId];
}

export function setPlayerAssignment(gameId: GameId, playerId: string): void {
  const assignments = getAllPlayerAssignments();
  assignments[gameId] = playerId;
  localStorage.setItem(PLAYER_ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

export function getAllPlayerAssignments(): Record<string, string> {
  const stored = localStorage.getItem(PLAYER_ASSIGNMENTS_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing player assignments:", error);
    return {};
  }
}
