---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'chrome-devtools/*', 'todo']
description: 'Create new page'
---

# User instructions

`${input:instructions}`

# Steps to follow

- Review the instructions in .github/skills/create-page
- Come up with a plan to create the new page based on the user instructions. If there are no user instructions, review the highlighted files for context on what the new page should include.
- Give me your plan so that I can review it before you start coding. Your plan should include the files to be created, the components you will use to implement the page, the events you will use, and any other relevant details.
- Once I approve your plan, proceed to implement the new page.
- Create the page as described in the user instructions.
- Ensure the page follows best practices for code quality, readability, and maintainability and is properly integrated into the application
- Run `npm run fix` to auto-format and fix any linting issues
- Use the #chrome-devtools/* tools to test and debug the new page in a browser environment
