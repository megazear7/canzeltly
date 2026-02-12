---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "chrome-devtools/*", "todo"]
description: "Create new provider"
---

# User instructions

`${input:instructions}`

# Steps to follow

- Review the instructions in .github/skills/create-new-provider
- Come up with a plan to create the new provider based on the user instructions. If there are no user instructions, review the highlighted files for context on what the new provider should include.
- Give me your plan so that I can review it before you start coding. Your plan should include the files to be created, the context types you will define, the data loading logic, events to handle, and any other relevant details.
- Once I approve your plan, proceed to implement the new provider.
- Create the provider as described in the user instructions.
- Ensure the provider follows best practices for code quality, readability, and maintainability and is properly integrated into the application
- Run `npm run fix` to auto-format and fix any linting issues
- Use the #chrome-devtools/\* tools to test and debug the new provider in a browser environment
