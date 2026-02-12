---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "chrome-devtools/*", "todo"]
description: "Create new event"
---

# User instructions

`${input:instructions}`

# Steps to follow

- Review the instructions in .github/skills/create-new-event
- Come up with a plan to create the new event based on the user instructions. If there are no user instructions, review the highlighted files for context on what the new event should include.
- Give me your plan so that I can review it before you start coding. Your plan should include the files to be created, the event data schema, the event name, and any other relevant details.
- Once I approve your plan, proceed to implement the new event.
- Create the event as described in the user instructions.
- Ensure the event follows best practices for code quality, readability, and maintainability and is properly integrated into the application
- Run `npm run fix` to auto-format and fix any linting issues
- Use the #chrome-devtools/\* tools to test and debug the new event in a browser environment
