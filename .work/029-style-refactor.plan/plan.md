# Style Refactor Plan

## Overview
Refactor the codebase to improve styling practices by centralizing styles, using CSS variables for consistency, and identifying/removing bad practices.

## Key Changes
1. **Move Common Component Styles**: Extract reusable styles for buttons, inputs, and other common elements into `src/client/styles.component.ts`.
2. **Centralize Global Styles**: Move default element styling (e.g., for `<button>`, `<a>`, etc.) to `src/client/styles.global.ts`.
3. **Use CSS Variables**: Replace hardcoded pixel sizes, colors, box shadows, borders, etc., with CSS variables defined in `src/static/app.css`.
4. **Identify Bad Practices**: Review the codebase for issues like hardcoded strings instead of enums, inconsistent imports, unused code, etc.
5. **Update Documentation**: Ensure `.github/` files (prompts, skills, instructions) are accurate and up-to-date with the new practices.

## Goals
- Improve maintainability and consistency of styles.
- Reduce code duplication.
- Enforce best practices from the copilot instructions.
- Prepare for future scalability.