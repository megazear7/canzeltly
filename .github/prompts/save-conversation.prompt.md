---
agent: "agent"
model: Grok Code Fast 1
tools: ["vscode", "execute", "read", "agent", "edit", "search", "web", "todo"]
description: "Preserve our conversation history by saving it as a markdown file in the .work directory."
---

# Steps

- Save our conversation history as a single markdown file in the `.work` directory.
- The file should be named `conversation.md` and should be placed inside the latest numbered directory under the `.work` directory.
- The markdown file should be named `conversation.md` and should be placed inside the new or existing directory.
- The markdown file should include all of our conversation history.
- The file format should:
  - Have a header with the date and summary of the conversation.
  - Use `## User` for user messages and `### Assistant` for assistant messages.
  - Separate messages with horizontal rules (`---`) for readability.
  - Include summarizations of reasoning and MCP calls in the assistant messages when relevant.
- After saving the file, open the file preview for me to review.

# Notes

- Do NOT include the contents of `promopt` and `skill` files in the conversation history, only refer to them by name when relevant.
- Do NOT make these file references clickable links. Format them with backticks only.
- All file pth references should be relative to the root of the repository, e.g., `.github/prompts/save-conversation.prompt.md` or `.work/032-user-profiles.plan/conversation.md`.
- File paths should NOT be absolute file system paths.
