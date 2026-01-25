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
