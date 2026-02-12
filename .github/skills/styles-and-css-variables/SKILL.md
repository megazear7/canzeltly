---
name: styles-and-css-variables
description: Guidelines for styling components and using CSS variables
---

# Styling Guidelines and CSS Variables

This skill covers the styling conventions and best practices for the Canzeltly application, including the use of CSS variables and global styles.

## CSS Variables

All styling in the Canzeltly application uses CSS custom properties (variables) defined in `static/app.css`. These variables ensure consistent theming and easy maintenance.

### Important Warning

**Never use CSS variables that do not exist in `static/app.css`.** Always check the file for available variables before using them. Using non-existent variables will result in undefined styling and potential layout issues.

### Available CSS Variables

#### Colors

- **Primary Colors**: `--color-1`, `--color-1-light`, `--color-1-dark`, `--color-2`, `--color-2-light`, `--color-2-dark`
- **Surface Colors**:
  - Primary: `--color-primary-surface`, `--color-primary-text`, `--color-primary-text-muted`, `--color-primary-text-bold`
  - Secondary: `--color-secondary-surface`, `--color-secondary-text`, `--color-secondary-text-muted`, `--color-secondary-text-bold`
- **Semantic Colors**: `--color-accent`, `--color-error`, `--color-danger`, `--color-warning`, `--color-success`

#### Sizes

- Spacing: `--size-nano`, `--size-tiny`, `--size-small`, `--size-medium`, `--size-large`, `--size-xl`, `--size-2x`, `--size-3x`, `--size-4x`, `--size-5x`, `--size-6x`, `--size-7x`, `--size-8x`
- Font sizes: `--font-tiny`, `--font-small`, `--font-medium`, `--font-large`, `--font-xl`

#### Typography

- `--font-family`: The primary font family (Inter, sans-serif)
- `--line-height`: Standard line height (1.6)

#### Layout

- `--content-width`: Maximum content width (1280px)
- `--border-radius-medium`, `--border-radius-large`: Border radius values
- `--border-normal`, `--border-active`: Border styles

#### Effects

- Shadows: `--shadow-normal`, `--shadow-active`, `--shadow-hover`, `--shadow-inverse-normal`, `--shadow-inverse-active`, `--shadow-inverse-hover`
- Transitions: `--time-normal`, `--transition-all`, `--transition-shadow`
- Transforms: `--transform-hover`

### How to Use CSS Variables

```css
.my-component {
  background-color: var(--color-primary-surface);
  color: var(--color-primary-text);
  padding: var(--size-medium);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-normal);
  transition: var(--transition-all);
}

.my-component:hover {
  box-shadow: var(--shadow-hover);
  transform: var(--transform-hover);
}
```

## Global Styles

Global styles for common HTML elements are defined in `src/client/styles.global.ts`. This file contains styles for elements like `<button>`, `<a>`, `<h1>`, `<p>`, etc.

### Key Rules

- **Component-Level Overrides**: For `<button>`, `<a>`, and other common HTML elements, styling must be done in `src/client/styles.global.ts` rather than in individual components, unless there is a specific need for component-level overrides.
- **Consistency**: All components should use the global styles as a base and only add specific styles when necessary.

### Adding Global Styles

To add or modify global styles, edit `src/client/styles.global.ts`:

```typescript
import { css } from "lit";

export const globalStyles = css`
  /* Existing styles... */

  /* Add new styles here */
  .custom-class {
    background-color: var(--color-accent);
  }
`;
```

### Component-Specific Styles

For styles unique to a component, define them within the component file using the `static styles` property:

```typescript
import { css, LitElement } from "lit";

@customElement("my-component")
export class MyComponent extends LitElement {
  static override styles = [
    globalStyles, // Always include global styles
    css`
      .component-specific {
        /* Component-specific styles using CSS variables */
        background-color: var(--color-secondary-surface);
      }
    `,
  ];

  // Component implementation...
}
```

## Best Practices

1. **Always Use Variables**: Never hardcode colors, sizes, or other values. Always use CSS variables.
2. **Check Existence**: Before using a variable, verify it exists in `static/app.css`.
3. **Consistent Naming**: Follow the existing naming conventions for new variables if needed.
4. **Responsive Design**: Use size variables that scale appropriately.
5. **Accessibility**: Ensure color contrasts meet accessibility standards using the defined color variables.
6. **Performance**: Minimize the number of unique styles by reusing variables and global styles.

## Adding New CSS Variables

If you need a new CSS variable:

1. Add it to `static/app.css` with an appropriate name and value.
2. Document it in this skill document.
3. Use it in your styles.

Example addition to `static/app.css`:

```css
/* In static/app.css */
--color-tertiary-surface: #36393f;
--size-huge: 400px;
```

Then update this document accordingly.

## Common Mistakes to Avoid

- Using `color: red;` instead of `color: var(--color-error);`
- Hardcoding `padding: 10px;` instead of `padding: var(--size-small);`
- Creating component-specific styles for global elements like buttons
- Using non-existent variables like `var(--color-blue)` when only defined colors are available
