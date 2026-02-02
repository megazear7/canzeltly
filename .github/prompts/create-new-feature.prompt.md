---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Create new feature'
---

# User Instructions

`${input:instructions}`

# Steps to follow

- Review the instructions in `.github/skills/create-feature/SKILL.md` for creating a new feature.
- Follow the steps outlined in the skill file to implement the new feature as per the user instructions.
- The feature should align with what the user has specified.
- Run `npm run fix` and `npm run build` to ensure code quality and correctness.