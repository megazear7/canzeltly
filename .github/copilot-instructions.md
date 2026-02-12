# Canzeltly Template Copilot Instructions

## General

 - Use Zod and TypeScript for all code.
 - Follow consistent code formatting using Prettier.
 - Write clear and concise comments for complex logic.
 - Use descriptive names for variables, functions, classes, and files.
 - Ensure code is modular and reusable where possible.
 - Import with `.js` extensions for local files.
 - Do NOT try to start the development server as I am already running it.
 - You can try running `npm run fix` to fix linting and formatting issues.
 - You can also try running `npm run build` to compile the TypeScript code and check for errors, but ONLY if you think your changes might have caused build errors and therfore there is a need to check for them.
 - Styling for `<button>` elements, `<a>` elements, and other common HTML elements must be done in `src/client/styles.global.ts` rather than in individual components, unless there is a specific need for component-level overrides.

## Client

### Client Providers
 - Providers must be created at `src/client/provider.<provider-name>.ts`
 - Providers must handle data fetching and state management.
 - Provider must fetch data by importing services from `src/shared/service.<service-name>.ts` and calling the `fetch()` method.
 - Providers must use context to share data with components.
 - Providers must return typed data imported from `shared/type.<type-name>.ts`

### Client Pages
 - Pages must be created at `src/client/page.<page-name>.ts`
 - Pages must extend a provider located at `src/client/provider.<provider-name>.ts`
 - Pages must have extremely minimal logic, delegating UI capabilities to components.
 - Page routes must be added by following these steps:
   - If needed, create a provider at `src/client/provider.<provider-name>.ts`
   - Create the new page file at `src/client/page.<page-name>.ts`
   - Add a `RouteConfig` entry in the `routes` array in the `src/client/app.routes.ts` file.
   - Add a `case` entry in the `render` method in the `src/client/app.ts` file.

### Client Components
 - Components must be created at `src/client/component.<component-name>.ts`
 - Components must get data by consuming context provided in the provider.
 - Components that are general purpose can have attributes to customize their behavior.

### Client styles
 - All styles must use css variables and avoid hardcoded values such as colors and sizes.
 - CSS variables must be defined in `static/app.css`.
 - Global styles which need to be available in all pages and components must be created at `src/client/styles.global.ts`.
 - Common component styles (e.g., for inputs, modals, buttons) must be created at `src/client/styles.component.ts` and imported where needed.
 - Component specific styles must be created within the component file using the `static styles` property.

### Client Events
 - Events must have a corresponding types and function defined in `src/client/event.<event-name>.ts`.
 - When creating a new event, refer to other event files for structure.
 - Event must be imported by `src/client/util.events.ts` and added to the `ZeltTemplateEvent` type.
 - Events must be dispatched with `dispatch(this, ExampleEvent());`

## Shared

### Shared Types
 - Types must be created at `shared/type.<type-name>.ts`
 - Types must be grouped by functionality.
 - Types must use Zod schemas for validation.
 - Types must be defined even for strings or numbers that have specific meanings.
 - Types must be imported by the client code and used in API calls, components, providers, pages, utils, and all other code.
 - Types must be imported by the server code and used in controllers, services, utils, prompts, and all other code.

### Shared Utilities
 - Shared utilities must be created at `shared/util.<util-name>.ts` when they can be used by both client and server code.
 - Shared utilities must be grouped by functionality.
 - Shared utilities must be pure functions without side effects.
 - Shared utilities must be imported and used in client and server code as needed.
 - Shared utilities must not rely on Browser or Node.js specific APIs so that they can be used in both environments.

## State

  - State types must be created at `src/state/<state-name>.type.ts`
  - State types must use Zod schemas for validation.
  - State types must represent the state of the objects being rendered in the canvas.

## Development Practices

 - Use `npm run fix` to automatically fix linting and formatting issues.
 - Use `npm run build` to compile the TypeScript code.
 - Use `npm start` to run the development server.
 - Use the chrome-devtools extension for debugging client-side code and checking console errors, but only when absolutely necessary.
 - If the changes are large, first come up with a development plan and save it in `.github/prompts/work-plan.md` before starting.
 - When work plans are needed, first ask me to review it before starting the implementation.
 - Always check `src/static/app.css` for css variable names. Do not refer to non-existent css variables.
 - Always use Zod enums such as `Example.enum.Value` instead of hardcoded strings such as `"Value"`.
 - We create `.work/` markdown files for development plans and tasks. These should be committed to the repository alongside code changes.

 ## Testing

 - Use the Playwright MCP server for end-to-end testing.
 - Use the Chrome DevTools for debugging client-side code during testing, checking local storage, and other browser-specific testing.
 - For comprehensive end-to-end testing, combine test instructions from the page-specific instruction files located at `.github/instructions/page.<page-name>.instructions.md`. Each page has detailed English bullet-point test procedures that can be chained together to create complete user journey tests.
 - When testing user flows, start with the home page instructions and follow the navigation paths outlined in each page's test instructions to create realistic end-to-end scenarios.
 - Always verify that new features work correctly by updating and running the relevant page instruction tests.
 - If you learn anything about the application, development process, or testing process that you could benefit from in the future, add it to the relevant section in a new or existing skill file in the `.github/skills/` directory.

 ## Maintenance and Synchronization

 - **CRITICAL**: As features are developed, instructions and skills in the `.github/` directory MUST ALWAYS be updated to stay in sync with the code. This includes:
   - Adding new page instruction files for any new pages created
   - Updating existing instruction files when UI elements or functionality changes
   - Modifying skills when development patterns or best practices evolve
   - Ensuring test instructions reflect current button/link labels and user flows
 - When making code changes that affect the user interface or user experience, immediately update the corresponding instruction files to maintain testing accuracy.
 - Regular review of instruction and skill files should be part of the development process to ensure they remain current and useful for future Copilot sessions.
