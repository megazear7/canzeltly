---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "edit", "search", "web", "agent", "todo"]
description: "Fix instructions for skills and prompts in the repository."
---

# User instructions

`${input:instructions}`

# Steps to follow

- For each skill under `.github/skills`, compare it against the code base and make sure all the file references, instructions, and sample code correctly aligns with the current state of the codebase. If there are discrepancies, update the skill files to ensure accuracy.
- For each prompt under `.github/prompts`, review the steps and instructions to ensure they refer to skills whenever possible, and that they accurately reflect the current state of the codebase. If there are discrepancies, update the prompt files to ensure accuracy.
- While reviewing the prompts, ensure that the `description` field accurately summarizes the purpose of the prompt. If it does not, update it accordingly.
