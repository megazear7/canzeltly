import { BADGES, BadgeId, BadgeProgress, Badge } from "./type.badge.js";
import { Achievements } from "./type.achievement.js";

export function initializeAchievements(): Achievements {
  const badges: BadgeProgress[] = BADGES.map((badge) => ({
    badgeId: badge.id,
    current: 0,
    unlocked: false,
  }));
  return {
    badges,
    totalGamesPlayed: 0,
    totalGreenCirclesCollected: 0,
    totalSurvivalTime: 0,
    campaignsDefeated: 0,
  };
}

export function updateGamesPlayed(achievements: Achievements, count: number): Achievements {
  const updated = { ...achievements, totalGamesPlayed: achievements.totalGamesPlayed + count };
  return checkBadgeUnlocks(updated);
}

export function updateGreenCirclesCollected(achievements: Achievements, count: number): Achievements {
  const updated = { ...achievements, totalGreenCirclesCollected: achievements.totalGreenCirclesCollected + count };
  return checkBadgeUnlocks(updated);
}

export function updateSurvivalTime(achievements: Achievements, minutes: number): Achievements {
  const updated = { ...achievements, totalSurvivalTime: achievements.totalSurvivalTime + minutes };
  return checkBadgeUnlocks(updated);
}

export function updateCampaignsDefeated(achievements: Achievements, count: number): Achievements {
  const updated = { ...achievements, campaignsDefeated: achievements.campaignsDefeated + count };
  return checkBadgeUnlocks(updated);
}

export function checkBadgeUnlocks(achievements: Achievements): Achievements {
  const updatedBadges = achievements.badges.map((badgeProgress) => {
    const badge = BADGES.find((b) => b.id === badgeProgress.badgeId);
    if (!badge || badgeProgress.unlocked) return badgeProgress;

    let shouldUnlock = false;
    switch (badge.category) {
      case "GamesPlayed":
        shouldUnlock = achievements.totalGamesPlayed >= badge.threshold;
        break;
      case "GreenCirclesCollected":
        shouldUnlock = achievements.totalGreenCirclesCollected >= badge.threshold;
        break;
      case "SurvivalTime":
        shouldUnlock = achievements.totalSurvivalTime >= badge.threshold;
        break;
      case "CampaignVictory":
        shouldUnlock = achievements.campaignsDefeated >= badge.threshold;
        break;
      case "BadgesCollected": {
        const unlockedCount = achievements.badges.filter((b) => b.unlocked).length;
        shouldUnlock = unlockedCount >= badge.threshold;
        break;
      }
    }

    if (shouldUnlock) {
      return {
        ...badgeProgress,
        unlocked: true,
        unlockedAt: Date.now(),
        current: badge.threshold,
      };
    }

    // Update current progress
    let current = 0;
    switch (badge.category) {
      case "GamesPlayed":
        current = Math.min(achievements.totalGamesPlayed, badge.threshold);
        break;
      case "GreenCirclesCollected":
        current = Math.min(achievements.totalGreenCirclesCollected, badge.threshold);
        break;
      case "SurvivalTime":
        current = Math.min(achievements.totalSurvivalTime, badge.threshold);
        break;
      case "CampaignVictory":
        current = Math.min(achievements.campaignsDefeated, badge.threshold);
        break;
      case "BadgesCollected":
        current = Math.min(achievements.badges.filter((b) => b.unlocked).length, badge.threshold);
        break;
    }

    return { ...badgeProgress, current };
  });

  return { ...achievements, badges: updatedBadges };
}

export function getBadgeById(id: BadgeId): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function getTotalBadges(): number {
  return BADGES.length;
}

export function getUnlockedBadgesCount(achievements: Achievements): number {
  return achievements.badges.filter((b) => b.unlocked).length;
}
