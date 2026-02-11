# Enum Usage Review and Replacement Plan

## Overview
Review the codebase for hardcoded strings that should be replaced with Zod enum values. The project uses Zod enums for type safety, and the instructions specify to use `Example.enum.Value` instead of `"Value"`.

## Identified Issues

### 1. GameStatus Enum ✅ COMPLETED
- **Enum**: `GameStatus` in `src/game/game.ts` with values: "NotStarted", "Playing", "Paused", "GameOver"
- **Issues**: Multiple files used `"GameOver"` as string instead of `GameStatus.enum.GameOver`
- **Files Fixed**: `component.games-list.ts`, `page.game-summary.ts`, `component.play.ts`, `util.new-game.ts`, `mode.*.ts`

### 2. Victory Enum ✅ COMPLETED
- **Enum**: `Victory` in `src/game/game.ts` and `src/shared/type.player.ts` with values: "Win", "Lose"
- **Issues**: Many files used `"Win"` and `"Lose"` as strings
- **Files Fixed**: `component.game-over-modal.ts`, `component.play.ts`, `affect.game-over.ts`

### 3. GameMode Enum ✅ COMPLETED
- **Enum**: `GameMode` in `src/game/type.game.ts` with values: "Survival", "Adventure", "Race"
- **Issues**: Extensive use of mode strings in game creation, components, and data
- **Files Fixed**: `component.create-game.ts`, `component.play.ts`, `component.heads-up-display.ts`, `util.new-game.ts`, `mode.*.ts`, `data.campaigns.ts`, `type.custom-game-mode.ts`

### 4. ToastType Enum ✅ COMPLETED
- **Enum**: `ToastType` in `src/client/component.toast.ts` with values: "error", "warning", "success", "info"
- **Issues**: `src/client/app.ts` used strings and union types
- **Files Fixed**: `app.ts`, `component.toast.ts`

### 5. StatUpgradeOption Enum ✅ COMPLETED
- **Enum**: `StatUpgradeOption` in `src/shared/type.campaign.ts` with values: "health", "maxSpeed", "acceleration"
- **Issues**: `src/shared/data.campaigns.ts` used string arrays
- **Files Fixed**: `data.campaigns.ts`

### 6. LoadingStatus Enum ✅ VERIFIED
- **Enum**: `LoadingStatus` in `src/shared/type.loading.ts` with values: "idle", "loading", "success", "error"
- **Issues**: None found - used correctly in providers

### 7. Other Enums ✅ VERIFIED
- **GameObjectCategory**, **GameObjectLabel**, **AffectCategory**, **RouteName**, **HttpMethod**, **ScrollToEventTarget**, **Role**, **MessageType**: No issues found

## Implementation Summary
- Replaced all hardcoded strings with appropriate Zod enum values
- Updated type definitions (e.g., `CustomGameMode.mode` from `z.string()` to `GameMode`)
- Fixed import statements to import enums from correct modules
- Added proper type annotations where needed
- All changes compile successfully and pass linting

## Validation
- ✅ `npm run build` - successful compilation
- ✅ `npm run fix` - no linting errors
- All enum values now use the proper `Enum.enum.Value` syntax as per project guidelines</content>
<parameter name="filePath">/Users/alexlockhart/src/canzeltly/.work/027-enum-usage-review/plan.md