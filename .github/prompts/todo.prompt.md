---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Work on the next TODO item in the codebase.'
---

# Steps

 - Search the codebase for a TODO comment with `grep -r "TODO" src/`.
 - Give me the file and line number where the TODO is located along with the text of the TODO.
 - Come up with a plan to complete the TODO item, including any necessary code changes.
 - You may need to read related files to understand the context.
 - You may want to read relevant skills in the `.github/skills/` directory for guidance.
 - Add this plan in a `.work/` markdown directory named with a zero-padded incremental number and a short description of the task, e.g., `001-complete-some-todo`.
 - Create a `plan.md` file in that directory with the details of the plan.
 - Give me a summary of the plan and ask for my approval before proceeding.
 - I may ask for changes to the plan. In which case, update the plan file accordingly and ask me to review again.
 - Once I approve, implement the code changes to complete the TODO item.
 - Run `npm run fix` and `npm run build` to ensure the code is properly formatted and compiles without errors.

# Notes
 - If the change is very small you may implement it directly after my approval without creating a plan file.
