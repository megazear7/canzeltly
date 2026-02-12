import { GameState } from "../game/game.js";
import { GameId } from "../game/type.game.js";
import { slugify } from "../shared/util.slug.js";
import { CustomGameMode } from "../shared/type.custom-game-mode.js";
import { CampaignInstance } from "../shared/type.campaign.js";

const STORAGE_KEY = "canzeltly_saved_games";
const PLAYER_ASSIGNMENTS_KEY = "canzeltly_player_assignments";
const NEW_GAME_KEY = "canzeltly_new_game";
const CUSTOM_GAME_MODES_KEY = "canzeltly_custom_game_modes";
const ACTIVE_CAMPAIGNS_KEY = "canzeltly_active_campaigns";

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

export function saveCustomGameMode(mode: CustomGameMode): void {
  const modes = getAllCustomGameModes();
  const existingIndex = modes.findIndex((m) => m.name === mode.name);
  if (existingIndex >= 0) {
    modes[existingIndex] = mode;
  } else {
    modes.push(mode);
  }
  localStorage.setItem(CUSTOM_GAME_MODES_KEY, JSON.stringify(modes));
}

export function loadCustomGameMode(name: string): CustomGameMode | undefined {
  const modes = getAllCustomGameModes();
  return modes.find((m) => m.name === name);
}

export function getAllCustomGameModes(): CustomGameMode[] {
  const stored = localStorage.getItem(CUSTOM_GAME_MODES_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing custom game modes:", error);
    return [];
  }
}

export function deleteCustomGameMode(name: string): void {
  const modes = getAllCustomGameModes().filter((m) => m.name !== name);
  localStorage.setItem(CUSTOM_GAME_MODES_KEY, JSON.stringify(modes));
}

export function deleteMultipleCustomGameModes(names: string[]): void {
  const modes = getAllCustomGameModes().filter((m) => !names.includes(m.name));
  localStorage.setItem(CUSTOM_GAME_MODES_KEY, JSON.stringify(modes));
}

export function getAllActiveCampaigns(): CampaignInstance[] {
  const stored = localStorage.getItem(ACTIVE_CAMPAIGNS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing active campaigns:", error);
    return [];
  }
}

export function getCampaignInstance(instanceId: string): CampaignInstance | undefined {
  return getAllActiveCampaigns().find((c) => c.id === instanceId);
}

export function getActiveCampaign(campaignSlug: string): CampaignInstance | undefined {
  return getAllActiveCampaigns().find((c) => c.campaignSlug === campaignSlug);
}

export function saveActiveCampaign(instance: CampaignInstance): void {
  const campaigns = getAllActiveCampaigns();
  const existingIndex = campaigns.findIndex((c) => c.id === instance.id);
  if (existingIndex >= 0) {
    campaigns[existingIndex] = instance;
  } else {
    campaigns.push(instance);
  }
  localStorage.setItem(ACTIVE_CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

export function deleteCampaignInstance(instanceId: string): void {
  const campaigns = getAllActiveCampaigns().filter((c) => c.id !== instanceId);
  localStorage.setItem(ACTIVE_CAMPAIGNS_KEY, JSON.stringify(campaigns));
}
