import { GameState } from "../game/game.js";
import { GameId } from "../game/type.game.js";
import { slugify } from "../shared/util.slug.js";
import { CustomGameMode } from "../shared/type.custom-game-mode.js";
import { CampaignInstance } from "../shared/type.campaign.js";
import { Achievements } from "../shared/type.achievement.js";
import { initializeAchievements } from "../shared/util.achievements.js";
import { Profile, ProfileId } from "../shared/type.profile.js";

const PROFILES_KEY = "canzeltly_profiles";
const ACTIVE_PROFILE_KEY = "canzeltly_active_profile";

function getProfileKey(profileId: ProfileId, baseKey: string): string {
  return `${profileId}_${baseKey}`;
}

export function saveGameState(gameState: GameState, profileId: ProfileId): void {
  const savedGames = getAllGameStates(profileId);
  const existingIndex = savedGames.findIndex((g) => g.id === gameState.id);
  if (existingIndex >= 0) {
    savedGames[existingIndex] = gameState;
  } else {
    savedGames.push(gameState);
  }
  localStorage.setItem(getProfileKey(profileId, "saved_games"), JSON.stringify(savedGames));
}

export function loadGameState(id: GameId, profileId: ProfileId): GameState | undefined {
  const savedGames = getAllGameStates(profileId);
  return savedGames.find((g) => g.id === id);
}

export function getAllGameStates(profileId: ProfileId): GameState[] {
  const stored = localStorage.getItem(getProfileKey(profileId, "saved_games"));
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing stored games:", error);
    return [];
  }
}

export function deleteGameState(id: GameId, profileId: ProfileId): void {
  const savedGames = getAllGameStates(profileId).filter((g) => g.id !== id);
  localStorage.setItem(getProfileKey(profileId, "saved_games"), JSON.stringify(savedGames));
}

export function deleteMultipleGameStates(ids: GameId[], profileId: ProfileId): void {
  const savedGames = getAllGameStates(profileId).filter((g) => !ids.includes(g.id));
  localStorage.setItem(getProfileKey(profileId, "saved_games"), JSON.stringify(savedGames));
}

export function saveNewGameState(gameState: GameState, profileId: ProfileId): void {
  localStorage.setItem(getProfileKey(profileId, "new_game"), JSON.stringify(gameState));
}

export function loadNewGameState(profileId: ProfileId): GameState | undefined {
  const stored = localStorage.getItem(getProfileKey(profileId, "new_game"));
  if (!stored) return undefined;
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing new game state:", error);
    return undefined;
  }
}

export function deleteNewGameState(profileId: ProfileId): void {
  localStorage.removeItem(getProfileKey(profileId, "new_game"));
}

export function renameGameState(oldId: GameId, newName: string, profileId: ProfileId): void {
  const savedGames = getAllGameStates(profileId);
  const game = savedGames.find((g) => g.id === oldId);
  if (!game) return;
  deleteGameState(oldId, profileId);
  const newId = slugify(newName);
  const newGame = { ...game, name: newName, id: newId };
  saveGameState(newGame, profileId);
}

export function getPlayerAssignment(gameId: GameId, profileId: ProfileId): string | undefined {
  const assignments = getAllPlayerAssignments(profileId);
  return assignments[gameId];
}

export function setPlayerAssignment(gameId: GameId, playerId: string, profileId: ProfileId): void {
  const assignments = getAllPlayerAssignments(profileId);
  assignments[gameId] = playerId;
  localStorage.setItem(getProfileKey(profileId, "player_assignments"), JSON.stringify(assignments));
}

export function getAllPlayerAssignments(profileId: ProfileId): Record<string, string> {
  const stored = localStorage.getItem(getProfileKey(profileId, "player_assignments"));
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing player assignments:", error);
    return {};
  }
}

export function saveCustomGameMode(mode: CustomGameMode, profileId: ProfileId): void {
  const modes = getAllCustomGameModes(profileId);
  const existingIndex = modes.findIndex((m) => m.name === mode.name);
  if (existingIndex >= 0) {
    modes[existingIndex] = mode;
  } else {
    modes.push(mode);
  }
  localStorage.setItem(getProfileKey(profileId, "custom_game_modes"), JSON.stringify(modes));
}

export function loadCustomGameMode(name: string, profileId: ProfileId): CustomGameMode | undefined {
  const modes = getAllCustomGameModes(profileId);
  return modes.find((m) => m.name === name);
}

export function getAllCustomGameModes(profileId: ProfileId): CustomGameMode[] {
  const stored = localStorage.getItem(getProfileKey(profileId, "custom_game_modes"));
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch (error) {
    console.error("Error parsing custom game modes:", error);
    return [];
  }
}

export function deleteCustomGameMode(name: string, profileId: ProfileId): void {
  const modes = getAllCustomGameModes(profileId).filter((m) => m.name !== name);
  localStorage.setItem(getProfileKey(profileId, "custom_game_modes"), JSON.stringify(modes));
}

export function deleteMultipleCustomGameModes(names: string[], profileId: ProfileId): void {
  const modes = getAllCustomGameModes(profileId).filter((m) => !names.includes(m.name));
  localStorage.setItem(getProfileKey(profileId, "custom_game_modes"), JSON.stringify(modes));
}

export function getAllActiveCampaigns(profileId: ProfileId): CampaignInstance[] {
  const stored = localStorage.getItem(getProfileKey(profileId, "active_campaigns"));
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing active campaigns:", error);
    return [];
  }
}

export function getCampaignInstance(instanceId: string, profileId: ProfileId): CampaignInstance | undefined {
  return getAllActiveCampaigns(profileId).find((c) => c.id === instanceId);
}

export function getActiveCampaign(campaignSlug: string, profileId: ProfileId): CampaignInstance | undefined {
  return getAllActiveCampaigns(profileId).find((c) => c.campaignSlug === campaignSlug);
}

export function saveActiveCampaign(instance: CampaignInstance, profileId: ProfileId): void {
  const campaigns = getAllActiveCampaigns(profileId);
  const existingIndex = campaigns.findIndex((c) => c.id === instance.id);
  if (existingIndex >= 0) {
    campaigns[existingIndex] = instance;
  } else {
    campaigns.push(instance);
  }
  localStorage.setItem(getProfileKey(profileId, "active_campaigns"), JSON.stringify(campaigns));
}

export function deleteCampaignInstance(instanceId: string, profileId: ProfileId): void {
  const campaigns = getAllActiveCampaigns(profileId).filter((c) => c.id !== instanceId);
  localStorage.setItem(getProfileKey(profileId, "active_campaigns"), JSON.stringify(campaigns));
}

export function getAchievements(profileId: ProfileId): Achievements {
  const stored = localStorage.getItem(getProfileKey(profileId, "achievements"));
  if (!stored) return initializeAchievements();
  try {
    return Achievements.parse(JSON.parse(stored));
  } catch (error) {
    console.error("Error parsing achievements:", error);
    return initializeAchievements();
  }
}

export function saveAchievements(achievements: Achievements, profileId: ProfileId): void {
  localStorage.setItem(getProfileKey(profileId, "achievements"), JSON.stringify(achievements));
}

// Profile management functions
export function saveProfile(profile: Profile): void {
  const profiles = getAllProfiles();
  const existingIndex = profiles.findIndex((p) => p.id === profile.id);
  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getAllProfiles(): Profile[] {
  const stored = localStorage.getItem(PROFILES_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored) as {
      createdAt: string;
      name: string;
      primaryColor: string;
      secondaryColor: string;
      id: string;
    }[];
    return parsed.map((p) => ({
      ...p,
      createdAt: new Date(p.createdAt),
    })) as Profile[];
  } catch (error) {
    console.error("Error parsing profiles:", error);
    return [];
  }
}

export function getProfile(profileId: ProfileId): Profile | undefined {
  return getAllProfiles().find((p) => p.id === profileId);
}

export function deleteProfile(profileId: ProfileId): void {
  const profiles = getAllProfiles().filter((p) => p.id !== profileId);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));

  // Clean up profile-specific data
  const keysToRemove = [
    getProfileKey(profileId, "saved_games"),
    getProfileKey(profileId, "player_assignments"),
    getProfileKey(profileId, "new_game"),
    getProfileKey(profileId, "custom_game_modes"),
    getProfileKey(profileId, "active_campaigns"),
    getProfileKey(profileId, "achievements"),
  ];
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function setActiveProfile(profileId: ProfileId): void {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
}

export function getActiveProfile(): ProfileId | undefined {
  const stored = localStorage.getItem(ACTIVE_PROFILE_KEY);
  return stored || undefined;
}
