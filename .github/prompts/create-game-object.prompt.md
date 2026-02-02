---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'agent', 'todo']
description: 'Create new game object'
---

# User Instructions

`${input:instructions}`

# Steps to follow

- Review the instructions in `.github/skills/create-game-object/SKILL.md` for creating a new game object.
- Follow the steps outlined in the skill file to implement the new game object as per the user instructions.
- The name and behavior of the game object should align with what the user has specified.
- Run `npm run fix` and `npm run build` to ensure code quality and correctness.
