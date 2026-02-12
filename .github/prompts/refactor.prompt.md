---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "todo"]
description: "Refactor code based on guidelines"
---

# User Instructions

`${input:instructions}`

# Steps

- Read the contents of `.github/skills/refactor-code/SKILL.md` to understand the refactoring guidelines and best practices.
- Search the codebase for potential refactoring opportunities, such as:
  - Code duplication
  - Long functions or methods that could be broken down
  - Hardcoded values that should use constants or configuration
  - Inconsistent naming or structure
  - Unused imports or variables
  - Complex conditionals that could be simplified
  - Missing error handling
  - Performance issues or unnecessary computations
- Focus on identifying 3-5 of the most important refactoring items that would provide the biggest improvement in maintainability, readability, or performance. Do not attempt to refactor everything at once.
- Provide a short list of the identified refactor items, including the file names, line numbers, and brief descriptions of what needs to be changed.
- Ask me to review and approve the list before proceeding with any changes.
- Once I approve the list, implement the approved refactoring items one by one.
- For each refactor, ensure it follows the guidelines from the refactor-code skill document.
- After completing all approved refactors, run `npm run fix` to automatically fix linting and formatting issues.
- Run `npm run build` to ensure there are no compilation errors.
- If any issues arise during build, iterate on fixes until the build passes.
- Do not commit the changes as I will handle that myself.
- Keep the refactoring focused and incremental - only tackle the approved items and avoid scope creep.
