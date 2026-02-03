---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Run the linter and build and fix any issues found.'
---

# User Instructions

`${input:instructions}`

# Steps

 - Run `npm run fix` to automatically fix any linting or formatting issues in the codebase.
 - If any issues could not be automatically fixed, read the output from the command to identify the problems.
 - Manually fix any remaining linting or formatting issues in the codebase.
 - After fixing linting issues, run `npm run build` to compile the codebase.
 - If there are any compilation errors, read the output from the build command to identify the issues.
 - Manually fix any compilation errors in the codebase.
 - Repeat running `npm run fix` and `npm run build` until there are no linting issues or compilation errors.
 - Do NOT try to run the development server with `npm start` as I will handle that myself.
 - Do not commit the changes as I will handle that myself.
