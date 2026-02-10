# Detailed Work Plan for Campaigns Feature

## Overview
This plan implements a campaigns feature where players can play through predefined series of games with persistent hero stats, intros, victories, defeats, and stat upgrades. Campaigns are defined in code and include tutorial and adventure campaigns.

## Step 1: Define Campaign Types and Data Structures
- Create `src/shared/type.campaign.ts` with Zod schemas for:
  - Campaign definition (name, games array)
  - CampaignGame (custom mode, intro, victory, defeat objects, stat upgrades)
  - CampaignInstance (campaign name, current game index, hero stats)
  - Hero stats (health, maxSpeed, acceleration)
- Define intro/victory/defeat as objects with type and text.
- Create `src/shared/data.campaigns.ts` with predefined campaigns: Tutorial, Revenge of the Radial Master, Circle Man and the Mighty Minions.

## Step 2: Implement Storage for Active Campaigns
- Add functions in `src/client/util.storage.ts` for saving/loading active campaigns using key "canzeltly_active_campaigns".
- Functions: saveActiveCampaign, loadActiveCampaign, getAllActiveCampaigns, deleteActiveCampaign.

## Step 3: Create Start New Campaign Page
- Follow create-page skill.
- Create `src/client/provider.start-campaign.ts` extending CanzeltlyAppProvider, loading available campaigns.
- Create `src/client/page.start-campaign.ts` extending the provider, displaying campaign list with start buttons.
- Add route in `src/shared/type.routes.ts` and `src/client/app.routes.ts`.
- Add link to home page.

## Step 4: Create Continue Campaign Page
- Create `src/client/provider.continue-campaign.ts` loading active campaigns.
- Create `src/client/page.continue-campaign.ts` listing active campaigns with continue buttons.
- Add route.

## Step 5: Create Campaign Games Page
- Create `src/client/provider.campaign-games.ts` loading specific campaign instance.
- Create `src/client/page.campaign-games.ts` showing games list with checkmarks, play next button.
- Add route with campaign name param.

## Step 6: Create Stat Upgrade Page
- Create `src/client/provider.stat-upgrade.ts` for selecting stat increases.
- Create `src/client/page.stat-upgrade.ts` with options based on campaign config.
- Add route.

## Step 7: Modify Play Page for Campaigns
- Update `src/client/page.play.ts` to check for `?campaign=<name>` query param.
- If campaign, load next game, show intro modal before starting.
- On defeat, show defeat modal with try again/back.
- On victory, show victory modal with continue/back, then redirect to stat upgrade if applicable.
- Update hero stats in campaign instance after upgrade.

## Step 8: Add Events for Campaign Actions
- Create events: StartCampaign, ContinueCampaign, PlayCampaignGame, UpgradeStats.
- Use in pages to handle actions.

## Step 9: Update Home Page
- Add links to "Start New Campaign" and "Continue Campaign" if active campaigns exist.

## Step 10: Testing and Validation
- Run npm run fix and npm run build after each major change.
- Ensure no lint or build errors.