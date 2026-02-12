---
name: create-and-update-instructions-skills-prompts
description: Create and update instructions, skills, and prompts for GitHub Copilot
---

# Instructions for Creating and Updating Instructions, Skills, and Prompts

- Instructions should be clear, concise, and scoped to a particular file path.
- Instructions should refer to skills for the details of how to make code changes within particular file paths.
- Prompts should be clear and concise, and should refer to skills on the details of how to make code changes.
- Skills should be clear and concise, and should include details on how to make code changes for particular file paths, file types, components, pages, or features.

# Resources

- [Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Prompt files](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file)

# Page-Specific Instructions

When creating new pages, also create corresponding instruction files at `.github/instructions/page.<page-name>.instructions.md` with:
- Frontmatter specifying the applyTo path (e.g., `src/client/page.my-page.ts`)
- Clear English bullet-point test instructions for Playwright MCP testing
- Exact button and link text labels for autonomous testing
- Common interaction patterns and validation steps

Refer to existing page instruction files for examples of the expected format and content.
