# Detailed Work Plan: Gravity Circles, Upgrades, Campaigns, and Refactor

## Overview
This plan implements several game improvements and system updates based on the user requirements. The work is divided into 5 main steps with detailed sub-tasks.

## Step 1: Gravity Circles Elastic Collision and Static Color

### 1.1 Update Gravity Circle Object Creation
- **File**: `src/game/object.circle.ts`
- **Function**: `randomGravityCircles`
- **Changes**:
  - Replace `Bounce` affect with `ElasticCollision` affect
  - Change color from random HSL to static color (e.g., `hsl(200, 70%, 50%)` for blue)
  - Ensure ElasticCollision state includes appropriate damage and attack properties

### 1.2 Verify Elastic Collision Behavior
- **File**: `src/game/affect.elastic-collision.ts`
- **Action**: Confirm that gravity circles will properly collide elastically with other objects
- **Test**: Run game with gravity circles and verify collision physics

### 1.3 Update Imports and Dependencies
- **File**: `src/game/object.circle.ts`
- **Action**: Import `ElasticCollisionState` if needed
- **File**: `src/game/game.affect.ts`
- **Action**: Ensure `ElasticCollision` is included in the affect list

## Step 2: Add Break Speed Upgrade Option

### 2.1 Update Campaign Types
- **File**: `src/shared/type.campaign.ts`
- **Changes**:
  - Add `"breakSpeed"` to `StatUpgradeOption` enum
  - Add `breakSpeed: z.number().default(0.1)` to `HeroStats` schema

### 2.2 Update Campaign Data
- **File**: `src/shared/data.campaigns.ts`
- **Action**: Add `StatUpgradeOption.enum.breakSpeed` to upgrade options arrays where appropriate

### 2.3 Update Upgrade Page Logic
- **File**: `src/client/page.campaign-upgrade.ts`
- **Changes**:
  - Add case for "breakSpeed" in `getUpgradeDisplayName()`: return "Break Speed +0.05"
  - Add case for "breakSpeed" in `getUpgradeDescription()`: appropriate description
  - Add case for "breakSpeed" in `applyUpgrade()`: `instance.heroStats.breakSpeed += 0.05`
  - Add display for break speed stat in the hero stats section

### 2.4 Implement Break Speed Game Logic
- **File**: `src/game/affect.velocity.ts` or new affect
- **Action**: Implement deceleration logic using breakSpeed stat
- **Note**: Need to determine how break speed affects movement (likely reduces velocity over time)

## Step 3: Health Upgrade Adjustment

### 3.1 Update Health Upgrade Increment
- **File**: `src/client/page.campaign-upgrade.ts`
- **Changes**:
  - Change health upgrade from `+= 1` to `+= 0.5` in `applyUpgrade()`
  - Update display name from "Health +1" to "Health +0.5"
  - Update description to reflect smaller increments

### 3.2 Update Campaign Data
- **File**: `src/shared/data.campaigns.ts`
- **Action**: Ensure health upgrades are still offered in campaign games

## Step 4: Allow Multiple Campaign Instances

### 4.1 Update Campaign Instance Type
- **File**: `src/shared/type.campaign.ts`
- **Changes**:
  - Add `id: z.string()` to `CampaignInstance` schema
  - Generate unique ID when creating new instances

### 4.2 Update Route Configuration
- **File**: `src/client/app.routes.ts`
- **Changes**:
  - Change campaign routes from `/campaigns/:campaignSlug` to `/campaigns/:instanceId`
  - Update `campaign_upgrade` route similarly

### 4.3 Update Storage Functions
- **File**: `src/client/util.storage.ts`
- **Changes**:
  - Update `getActiveCampaign()` to find by `instanceId` instead of `campaignSlug`
  - Update `saveActiveCampaign()` to allow multiple instances with same `campaignSlug`

### 4.4 Update Campaign Pages
- **Files**: `src/client/page.campaign-games.ts`, `src/client/page.campaign-upgrade.ts`
- **Changes**:
  - Parse `instanceId` from route params instead of `campaignSlug`
  - Get campaign instance by ID, then get campaign data by `instance.campaignSlug`
  - Update navigation events to use instance ID in paths

### 4.5 Update Start Campaign Logic
- **File**: `src/client/page.start-campaign.ts`
- **Changes**:
  - Generate unique ID for new campaign instances
  - Update navigation to use instance ID instead of slug
  - Allow starting multiple instances of the same campaign

### 4.6 Update Continue Campaign Page
- **File**: `src/client/page.continue-campaign.ts`
- **Action**: Update to display instances by ID and show campaign name from instance data

## Step 5: Refactor, Update, and Create Skills, Instructions, and Prompts

### 5.1 Review Existing Skills
- **Directory**: `.github/skills/`
- **Action**: Review all skill files for accuracy and completeness
- **Update**: Modify skills that reference outdated file paths or processes

### 5.2 Create New Skills
- **Potential New Skills**:
  - `create-campaign-instance.md`: How to create and manage campaign instances
  - `implement-game-mechanics.md`: How to add new game affects and mechanics
  - `update-campaign-system.md`: How to modify campaign types and data

### 5.3 Update Instructions
- **File**: `.github/copilot-instructions.md`
- **Action**: Update with any new patterns or conventions discovered
- **File**: `.github/prompts/plan.prompt.md`
- **Action**: Ensure it reflects current workflow

### 5.4 Update Prompts
- **Directory**: `.github/prompts/`
- **Action**: Review and update any prompts that reference old structures

## Validation and Testing

### Build and Lint Checks
- Run `npm run fix` after each major change
- Run `npm run build` to ensure TypeScript compilation
- Fix any linting or compilation errors immediately

### Functional Testing
- Test gravity circles in game modes with elastic collision
- Test upgrade system with new break speed and adjusted health
- Test multiple campaign instances can be started and managed
- Verify all campaign routes work with instance IDs

### Edge Cases
- Test campaign instance deletion/cleanup
- Verify backward compatibility with existing saved data
- Test campaign progression with multiple instances

## Implementation Order
1. Start with Step 1 (gravity circles) - isolated change
2. Step 3 (health adjustment) - simple change
3. Step 2 (break speed) - builds on existing upgrade system
4. Step 4 (multiple instances) - major structural change, do last
5. Step 5 (refactor) - ongoing throughout

## Risk Assessment
- **High Risk**: Step 4 (campaign instances) - affects routing and storage
- **Medium Risk**: Steps 1-3 - game mechanics changes
- **Low Risk**: Step 5 - documentation updates

## Dependencies
- All changes depend on existing campaign and game systems
- Step 4 requires coordinated changes across multiple files
- No external dependencies needed