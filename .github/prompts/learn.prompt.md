---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Review the chat history and uncommitted code changes to suggest improvements to prompts and skills.'
---

# Steps

- Read the descriptions of each prompt and skill under the `.github/prompts/` and `.github/skills/` directories to understand their purpose and functionality.
- Summarize the conversation history and identify:
    - Failed MCP tool calls that had to be retried
- Summarize the uncommitted code changes made and identify:
    - Any code that was added and then later removed
    - Any code that was modified multiple times
    - Any new files, structural changes, or refactors
- Based on the summary, identify a set of changes that could be made to the prompts and skills to improve their effectiveness, clarity, or usability.
- In rare cases, you may need to add a new prompt or skill if you identify a gap that cannot be addressed by modifying existing ones.
- Make these changes directly to the relevant files in the `.github/prompts/` and `.github/skills/` directories.
- Read the `.github/copilot-instructions.md` file and update it if necessary. Only the most important changes should be made here.
