---
name: refactor-code
description: Refactor and simplify code
---

---
name: refactor-code
description: Refactor and simplify code
---

# Instructions for Refactoring and Simplifying Code

When refactoring code in the Canzeltly project, follow these guidelines to improve maintainability, readability, and performance:

## General Principles

- **DRY (Don't Repeat Yourself)**: Eliminate duplicate code by extracting common logic into shared utilities or components.
- **Single Responsibility**: Ensure each function, class, or module has one clear purpose.
- **Readability**: Use descriptive names, clear structure, and comments for complex logic.
- **Consistency**: Follow the project's coding conventions, such as using Zod for types, Prettier for formatting, and the established file naming patterns.

## Common Refactoring Techniques

### 1. Extract Functions
- Break down large functions into smaller, focused functions.
- Move repeated code blocks into reusable utility functions in `src/shared/util.*.ts`.
- Example: If multiple components parse route parameters, extract to a utility.

### 2. Simplify Conditionals
- Replace complex if-else chains with early returns or switch statements.
- Use ternary operators for simple conditions.
- Leverage Zod enums instead of string comparisons.

### 3. Remove Dead Code
- Delete unused imports, variables, functions, or files.
- Use tools like `npm run build` to identify unused code.

### 4. Improve Type Safety
- Add proper TypeScript types where `any` is used.
- Use Zod schemas for validation and type inference.
- Extend existing types in `src/shared/type.*.ts` rather than creating new ones unnecessarily.

### 5. Optimize Performance
- Avoid unnecessary re-renders in Lit components by using appropriate property decorators.
- Use memoization for expensive computations.
- Batch DOM updates where possible.

### 6. Enhance Error Handling
- Add try-catch blocks for async operations.
- Provide meaningful error messages.
- Use the toast component for user-facing errors.

## Project-Specific Guidelines

- **Use Existing Components**: Before creating new components, check if existing ones in `src/client/component.*.ts` can be reused or extended.
- **Follow Provider Pattern**: For new pages, extend appropriate providers for data management.
- **Styling**: Use CSS variables from `static/app.css` and add component styles to `src/client/styles.global.ts` for global elements.
- **Events**: Use the event system in `src/client/event.*.ts` for cross-component communication.
- **Testing**: After refactoring, run `npm run build` to ensure no compilation errors, and test functionality manually.

## Steps for Refactoring

1. **Identify Issues**: Review the code for code smells, complexity, or duplication.
2. **Plan Changes**: Consider the impact on other parts of the codebase.
3. **Make Incremental Changes**: Refactor in small steps, testing after each change.
4. **Update Documentation**: Ensure comments and this skill document reflect changes if needed.
5. **Validate**: Run builds, lints, and tests to ensure everything works.

Remember, refactoring should improve the code without changing its external behavior. If functionality needs to change, that's a feature update, not refactoring.
