# Detailed Work Plan for Style Refactor

## Overview
This plan outlines the steps to refactor the codebase for better styling practices, including centralizing styles, using CSS variables, and identifying/removing bad practices.

## Identified Issues

### 1. Hardcoded Values in Styles
- **Pixel values**: Many hardcoded `px` values in component styles (e.g., `max-width: 800px`, `width: 24px`, `margin: 100px auto`, `width: 80px`, etc.)
- **Colors**: One hardcoded color `#000` in `component.toast.ts` for warning text
- **Other**: Hardcoded `blur(5px)` in modal, `border: 2px solid var(--color-1)` (should use variable for 2px)

### 2. Inline Styles in HTML
- Found inline styles like `style="width:24px"`, `style="display: flex; align-items: center; gap: var(--size-small);"`, `style="flex: 1;"`, `style="width: 80px;"`

### 3. Hardcoded Strings Instead of Enums
- In `component.create-game.ts`: `value="Survival"`, `value="Adventure"`, `value="Race"` should use `GameMode.enum.*`

### 4. Missing Centralized Component Styles
- No `src/client/styles.component.ts` file exists
- Common styles for inputs, modals, lists, etc., are duplicated in individual components

### 5. Documentation Updates Needed
- Copilot instructions mention only `styles.global.ts` for common elements, but user wants `styles.component.ts` for component styles
- Skills may need updates to reference `styles.component.ts`

## Proposed Changes

### 1. Create `src/client/styles.component.ts`
- Extract common component styles from individual files
- Include styles for:
  - Input groups, labels, inputs, selects, textareas
  - Modal backdrops, content, bodies
  - Game lists, headers
  - Toast notifications
  - Tooltips
  - Other reusable patterns

### 2. Add New CSS Variables
- Add variables for commonly used sizes: `--size-800`, `--size-600`, `--size-24`, `--size-80`, etc.
- Add color variables if needed (e.g., `--color-black` for #000)
- Add blur variable: `--blur-normal`
- Border width variables: `--border-width-normal`, `--border-width-thin`

### 3. Refactor Individual Components
- Remove duplicated styles and import from `styles.component.ts`
- Replace hardcoded values with variables
- Remove inline styles and move to CSS classes

### 4. Fix Enum Usage
- Replace hardcoded strings with enum values in component.create-game.ts

### 5. Update Documentation
- Update copilot instructions to mention `styles.component.ts` for common component styles
- Update skills to reference the new file

## Implementation Steps

1. **Create CSS Variables**: Add missing variables to `src/static/app.css`
2. **Create `styles.component.ts`**: Extract and centralize common styles
3. **Refactor Components**: Update each component to use centralized styles and variables
4. **Fix Bad Practices**: Replace hardcoded strings with enums
5. **Update Documentation**: Modify `.github/` files as needed
6. **Test and Lint**: Run `npm run fix` and `npm run build` to ensure no issues

## Files to Modify
- `src/static/app.css` (add variables)
- `src/client/styles.component.ts` (new file)
- `src/client/component.input.ts` (refactor styles)
- `src/client/component.modal.ts` (refactor styles)
- `src/client/component.games-list.ts` (refactor styles)
- `src/client/component.toast.ts` (refactor styles)
- `src/client/component.tooltip.ts` (refactor styles)
- `src/client/component.create-game.ts` (fix enums, refactor styles)
- `src/client/page.continue-campaign.ts` (refactor styles)
- `src/client/page.custom-game-modes.ts` (refactor styles)
- `src/client/page.start-campaign.ts` (refactor styles)
- `src/client/page.campaign-games.ts` (refactor styles)
- `src/client/page.game-summary.ts` (refactor styles)
- `src/client/page.campaign-upgrade.ts` (refactor styles)
- `src/client/component.heads-up-display.ts` (refactor styles)
- `.github/copilot-instructions.md` (update)
- `.github/skills/create-new-component/SKILL.md` (update)

## Validation
- After changes, run `npm run fix` to lint
- Run `npm run build` to compile
- Check that styles still work as expected