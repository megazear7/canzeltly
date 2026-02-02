---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Work on the next TODO item in the codebase.'
---

# Steps

 - Search the codebase for a TODO comment with `grep -r "TODO" src/`.
 - Give me the file and line number where the TODO is located along with the text of the TODO.
 - Come up with a plan to complete the TODO item, including any necessary code changes. You may need to read related files to understand the context.
 - Add this plan in a `.work/` markdown file named with a zero-padded incremental number and a short description of the task, e.g., `001-complte-some-todo.md`.
 - Give me a summary of the plan and ask for my approval before proceeding.
 - Once I approve, implement the code changes to complete the TODO item.
 - Run `npm run fix` and `npm run build` to ensure the code is properly formatted and compiles without errors.
