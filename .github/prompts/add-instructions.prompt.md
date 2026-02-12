---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "todo"]
description: "Add instructions for skills and prompts in the repository."
---

# User instructions

`${input:instructions}`

# Steps to follow

- Review all the skills in the `.github/skills/` directory.
- Review all the prompts in the `.github/prompts/` directory.
- Review the codebase to understand its current functionality and structure.
- Suggest a new skill or prompt that would enhance the repository's capabilities based on your understanding of the codebase and existing skills/prompts.
- Give me a summary of the proposed skill or prompt and ask for my approval before proceeding.
- I may ask for changes to the proposed skill or prompt. If so, update the proposal accordingly and ask me to review it again. Keep repeating this step until I approve the proposal.
- Once I approve, create the new skill or prompt file in the appropriate directory with clear instructions and relevant details.
- The skill or prompt should follow the established format and conventions used in the repository.

# Notes

- Prompts should refer to skills whenever possible to keep instructions modular and reusable.
- Prompts need a concise step-by-step breakdown of tasks to guide the user effectively.
- Prompts often have an approval step to ensure alignment before proceeding.
- Prompts can include commands to run such as `npm run fix` and `npm run build` to ensure code quality.
- Prompts can also leverage the `.work` directory for planning and task tracking, using an auto-incremented numbering scheme as can be seen in other prompts.
- Skills should provide code examples where applicable to illustrate their usage.
