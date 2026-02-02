---
name: using-existing-components
description: The purpose of existing components and how to use them.
---

# Existing Components

This document describes the existing components in the `src/client` directory, their intended purposes, and examples of how to use them.

## Modal Component (`component.modal.ts`)

### Purpose
The Modal component provides a reusable dialog overlay that can display content in a centered, blurred backdrop. It supports animations for opening and closing, keyboard navigation (Escape to close), and event dispatching for integration with application logic.

### Key Features
- Animated open/close transitions
- Backdrop blur and click-to-close
- Keyboard support (Escape key)
- Event system for opening, closing, and submitting
- Slot-based content insertion

### Usage Example
```html
<canzeltly-modal>
  <button slot="open-button">Open Modal</button>
  <div slot="body">
    <h2>Modal Title</h2>
    <p>Modal content goes here.</p>
    <button @click=${() => modal.submit()}>Submit</button>
  </div>
</canzeltly-modal>
```

```typescript
// Programmatically control the modal
const modal = document.querySelector('canzeltly-modal') as CanzeltlyModal;
await modal.open();
await modal.close();
modal.submit(); // Dispatches submit event and closes
```

### Events
- `modal-opening`: Dispatched when modal starts opening
- `modal-closing`: Dispatched when modal starts closing  
- `modal-submit`: Dispatched when submit() is called

## Save Indicator Component (`component.save-indicator.ts`)

### Purpose
The Save Indicator displays a temporary success checkmark in the top-right corner of the screen to provide visual feedback when data has been saved successfully.

### Key Features
- Fixed positioning in top-right corner
- Animated checkmark appearance
- Auto-hide after 2 seconds
- Listens for custom "book-saved" events

### Usage Example
```html
<canzeltly-save-indicator></canzeltly-save-indicator>
```

```typescript
// Trigger the save indicator
const indicator = document.querySelector('canzeltly-save-indicator') as CanzeltlySaveIndicator;
indicator.show();

// Or dispatch the event it listens for
document.dispatchEvent(new CustomEvent('book-saved'));
```

## Toast Component (`component.toast.ts`)

### Purpose
The Toast component displays temporary notification messages in the top-right corner of the screen. It supports different message types (error, warning, success, info) with appropriate styling.

### Key Features
- Multiple toast types with distinct styling
- Auto-hide after configurable duration
- Manual close button
- Fixed positioning in top-right corner

### Usage Example
```html
<canzeltly-toast></canzeltly-toast>
```

```typescript
const toast = document.querySelector('canzeltly-toast') as CanzeltlyToast;
toast.show('Operation completed successfully!', 'success');
toast.show('An error occurred', 'error', 3000); // 3 second duration
```

### Toast Types
- `error`: Red background for error messages
- `warning`: Yellow background for warnings
- `success`: Green background for success messages
- `info`: Default styling for informational messages

## Tooltip Component (`component.tooltip.ts`)

### Purpose
The Tooltip component displays contextual help text when users hover over an element. It automatically positions itself above the trigger element.

### Key Features
- Hover-triggered display with delays
- Automatic positioning above trigger
- Configurable vertical offset
- Smooth fade animations

### Usage Example
```html
<canzeltly-tooltip content="This is a helpful tooltip message">
  <button>Hover me</button>
</canzeltly-tooltip>
```

```typescript
// With dynamic content
const tooltip = document.querySelector('canzeltly-tooltip') as CanzeltlyTooltip;
tooltip.content = 'Updated tooltip text';
tooltip.offsetY = 10; // Adjust vertical positioning
```

## Create Game Component (`component.create-game.ts`)

### Purpose
The Create Game component provides a form for users to create a new game by specifying parameters like game name, world dimensions, and number of circles.

### Key Features
- Form inputs for game configuration
- Generates random game state with player and additional circles
- Saves the game and assigns player
- Dispatches game creation event

### Usage Example
```html
<canzeltly-create-game @game-created=${handleGameCreated}></canzeltly-create-game>
```

```typescript
const createGame = document.querySelector('canzeltly-create-game') as CanzeltlyCreateGameComponent;
// Listen for game-created event
createGame.addEventListener('game-created', (e) => {
  const { id, playerId } = e.detail;
  // Navigate to play the game
});
```

## Game Preview Component (`component.game-preview.ts`)

### Purpose
The Game Preview component displays a summary of a saved game, allowing users to select it, play it, or access options.

### Key Features
- Checkbox for selection
- Game name display
- Play button with player assignment
- Kebab menu for additional options
- Dispatches selection and options events

### Usage Example
```html
<canzeltly-game-preview
  .gameState=${gameState}
  .selected=${isSelected}
  @toggle-selection=${handleToggle}
  @open-game-options=${handleOptions}>
</canzeltly-game-preview>
```

## Games List Component (`component.games-list.ts`)

### Purpose
The Games List component displays a list of saved games, handles bulk selection and deletion, and provides modals for individual game options like renaming.

### Key Features
- Loads and displays saved games
- Bulk selection with delete functionality
- Modal for game-specific actions (rename, etc.)
- Integrates with games context

### Usage Example
```html
<canzeltly-games-list></canzeltly-games-list>
```

```typescript
// Consumes gamesContext automatically
// Handles all interactions internally
```

## Heads Up Display Component (`component.heads-up-display.ts`)

### Purpose
The Heads Up Display (HUD) component overlays game information and controls on the play screen, including FPS counter and game menu.

### Key Features
- Fixed positioning overlay
- Real-time FPS display with color coding
- Game menu modal with save/exit options
- Pauses/resumes game during menu interaction

### Usage Example
```html
<canzeltly-heads-up-display .game=${game} .fps=${fps}></canzeltly-heads-up-display>
```

## Input Component (`component.input.ts`)

### Purpose
The Input component is a versatile form input that supports multiple types: text, number, slider, checkbox, and dropdown.

### Key Features
- Multiple input types in one component
- Consistent styling with theme variables
- Dispatches input-change events
- Supports min/max/step for numeric inputs

### Usage Example
```html
<canzeltly-input
  type="slider"
  label="Volume"
  .value=${volume}
  .min=${0}
  .max=${100}
  @input-change=${(e) => setVolume(e.detail.value)}>
</canzeltly-input>
```

## Play Component (`component.play.ts`)

### Purpose
The Play component renders the game canvas, handles user input, and manages the game loop for playing a game.

### Key Features
- Full-screen canvas rendering
- Game loop with 60 FPS updates
- Keyboard and mouse input handling
- Integrates HUD and game state
- Loads saved games or creates new ones

### Usage Example
```html
<canzeltly-play gameId=${gameId} playerId=${playerId}></canzeltly-play>
```

```typescript
// Automatically starts game loop on connection
// Handles all game rendering and input
```
