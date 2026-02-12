import { tutorialCampaign } from "./campaign.tutorial.js";
import { revengeOfTheRadialMaster } from "./campaign.revenge-of-the-radial-master.js";
import { circleManAndTheMightyMinions } from "./campaign.circle-man-and-the-mighty-minions.js";
import { flattenedSpherionCampaign } from "./campaign.flattened-spherion.js";
import { Campaign } from "./type.campaign.js";

export const allCampaigns: Campaign[] = [
  tutorialCampaign,
  revengeOfTheRadialMaster,
  circleManAndTheMightyMinions,
  flattenedSpherionCampaign,
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return allCampaigns.find((c) => c.slug === slug);
}
