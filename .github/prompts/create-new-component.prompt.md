---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Create new component'
---

# User Instructions

`${input:instructions}`

Note: If the user said "review your work", then compare the current changes reported by `git diff` against the instructions in this file to ensure all requested changes have been made.

# Steps to follow

1. **Choose a Component Name**: Select a descriptive, lowercase name for the component (e.g., "my-button"). The file will be named `component.<name>.ts`, and the custom element will be `canzeltly-<name>`. The user may have highlighted an unimplemented component name or asked for it in their instructions. If no component name is provided, infer a suitable name based on the functionality described. If no functionality is described, ask for the component name.

2. **Create the Component File**: Create a new file at `src/client/component.<component-name>.ts`. Import necessary modules from Lit (e.g., `LitElement`, `html`, `css`, `customElement`, `property`).

3. **Define the Component Class**: 
   - Extend `LitElement`.
   - Use the `@customElement("canzeltly-<component-name>")` decorator.
   - Add properties using `@property()` for any configurable attributes (e.g., strings, booleans, numbers).
   - If the component needs to consume context from a provider, import the context and use `@consume()` or `@property()` with context injection.

4. **Implement the Render Method**: 
   - Use the `render()` method to return a `TemplateResult` with `html` templates.
   - Keep logic minimal; delegate complex behavior to utilities or events.

5. **Add Styles**:
   - Define `static override styles` as an array including `globalStyles` from `./styles.global.js`.
   - Add component-specific CSS using CSS variables from `static/app.css` (e.g., `--color-primary-text`, `--size-medium`, `--shadow-normal`).
   - Avoid hardcoded colors, sizes, or fonts—use variables for consistency.
   - Use `:host` for component-level styling and ensure responsive, accessible design.

6. **Handle Events and Lifecycle** (if needed):
   - Implement event listeners or dispatch custom events using the event system (e.g., import from `./event.<event-name>.ts` and dispatch with `dispatch(this, ExampleEvent())`).
   - Override lifecycle methods like `connectedCallback` or `disconnectedCallback` for setup/teardown.
   - For interactive components, add keyboard/mouse support as per user requirements.

7. **Integrate with Pages or Other Components**:
   - Import the component in relevant page files (e.g., `src/client/page.<page-name>.ts`) or other components.
   - Use the component in templates with attributes/properties as needed.
   - If it's a general-purpose component, document its usage (e.g., attributes for customization).

8. **Test and Validate**:
   - Run `npm run fix` to ensure linting and formatting.
   - Test the component in a page (e.g., via `npm start` and browser devtools).
   - Ensure it follows best practices: modular, reusable, and uses existing components/events where possible.

9. **Update Documentation** (if applicable):
   - If the component is new and general-purpose, add it to the "using-existing-components" skill documentation for future reference.

10. **Review your Work**:
    - Review your work for adherence to coding standards, readability, and maintainability.
    - Make sure all css variables and styles use the variable definitions in `src/static/app.css`.

# Example

For a simple "info-card" component:

- File: `src/client/component.info-card.ts`
- Class: Extends `LitElement`, uses `@customElement("canzeltly-info-card")`
- Properties: `@property() title: string = "";`
- Render: Returns `html`<div><h3>${this.title}</h3><p>Hello, World</p></div>`
- Styles: Includes `globalStyles` and CSS with variables like `background-color: var(--color-secondary-surface);`
- Usage: `<canzeltly-info-card title="Example"><p>Content</p></canzeltly-info-card>`
