````skill
---
name: create-new-component
description: How to create a new component in the Canzeltly application.
---

# Creating a New Component

This skill covers the process of adding a new component to the Canzeltly application. Components are built using Lit and follow established patterns for styling, events, and context consumption.

## Overview

Components are organized as follows:
- **Component Files**: Located in `src/client/component.<component-name>.ts`
- **Styling**: Uses CSS variables from `static/app.css`, global styles from `src/client/styles.global.ts`, and common component styles from `src/client/styles.component.ts`
- **Events**: Custom events defined in `src/client/event.*.ts`
- **Context**: Consumes context from providers when needed

## Step-by-Step Process

### 1. Choose a Component Name

Select a descriptive, lowercase name for the component (e.g., "my-button"). The file will be named `component.<name>.ts`, and the custom element will be `canzeltly-<name>`.

### 2. Create the Component File

Create a new file at `src/client/component.<component-name>.ts` with the following structure:

```typescript
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-<component-name>")
export class Canzeltly<ComponentName> extends LitElement {
  static override styles = [
    globalStyles,
    css`
      :host {
        display: block;
      }

      /* Component-specific styles using CSS variables */
      .component-content {
        background-color: var(--color-primary-surface);
        color: var(--color-primary-text);
        padding: var(--size-medium);
        border-radius: var(--border-radius-medium);
      }
    `,
  ];

  // Properties
  @property({ type: String })
  someProperty: string = "";

  // Render method
  override render(): TemplateResult {
    return html`
      <div class="component-content">
        <p>${this.someProperty}</p>
      </div>
    `;
  }
}
````

### 3. Add Properties and Attributes

Use `@property()` decorators for configurable attributes:

```typescript
@property({ type: String })
title: string = "";

@property({ type: Boolean })
disabled: boolean = false;

@property({ type: Number })
maxLength: number = 100;
```

### 4. Implement Rendering

Use the `render()` method to return a `TemplateResult` with `html` templates. Keep logic minimal and delegate complex behavior to utilities or events.

```typescript
override render(): TemplateResult {
  return html`
    <button
      ?disabled=${this.disabled}
      @click=${this._handleClick}
    >
      ${this.title}
    </button>
  `;
}

private _handleClick(): void {
  // Handle click logic
  this.dispatchEvent(new CustomEvent('component-clicked', {
    bubbles: true,
    composed: true,
  }));
}
```

### 5. Add Event Handling

For custom events, use the established event system:

```typescript
import { dispatch } from "./util.events.js";
import { MyEvent } from "./event.my-event.js";

// In component method
dispatch(this, MyEvent({ detail: "value" }));
```

### 6. Consume Context (if needed)

If the component needs to consume context from a provider:

```typescript
import { consume } from "@lit/context";
import { myContext, MyContext } from "./context.js";

@consume({ context: myContext, subscribe: true })
@property({ attribute: false })
myContext: MyContext = { data: null, status: 'idle' };
```

### 7. Styling

- Include `globalStyles` in the `static styles` array.
- Use CSS variables from `static/app.css` for colors, sizes, etc.
- Avoid hardcoded values.
- Use `:host` for component-level styling.

### 8. Lifecycle Methods (if needed)

Override lifecycle methods for setup/teardown:

```typescript
override connectedCallback(): void {
  super.connectedCallback();
  // Setup logic
}

override disconnectedCallback(): void {
  super.disconnectedCallback();
  // Cleanup logic
}
```

### 9. Integration

Import the component in pages or other components where it's used:

```typescript
import "./component.<component-name>.js";
```

Then use it in templates:

```html
<canzeltly-<component-name>
  title="Example"
  ?disabled=${isDisabled}
  @component-clicked=${handleClick}
></canzeltly-<component-name>>
```

## Best Practices

- **Minimal Logic**: Keep components focused on presentation. Delegate business logic to utilities or providers.
- **Reusability**: Design components to be general-purpose with configurable properties.
- **Accessibility**: Ensure components work with keyboard navigation and screen readers.
- **Styling**: Always use CSS variables and include global styles.
- **Events**: Use the custom event system for communication.
- **TypeScript**: Use proper types for all properties and methods.

## Example: Info Card Component

```typescript
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-info-card")
export class CanzeltlyInfoCard extends LitElement {
  static override styles = [
    globalStyles,
    css`
      :host {
        display: block;
      }

      .card {
        background-color: var(--color-secondary-surface);
        color: var(--color-secondary-text);
        padding: var(--size-large);
        border-radius: var(--border-radius-large);
        box-shadow: var(--shadow-normal);
      }

      .title {
        font-size: var(--font-large);
        font-weight: bold;
        margin-bottom: var(--size-medium);
      }
    `,
  ];

  @property({ type: String })
  title: string = "";

  override render(): TemplateResult {
    return html`
      <div class="card">
        <div class="title">${this.title}</div>
        <slot></slot>
      </div>
    `;
  }
}
```

Usage:

```html
<canzeltly-info-card title="Information">
  <p>This is some information content.</p>
</canzeltly-info-card>
```

```</content>
<parameter name="filePath">/Users/alexlockhart/src/canzeltly/.github/skills/create-new-component/SKILL.md
```
