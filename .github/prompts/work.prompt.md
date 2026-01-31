---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Begin planning new work'
---

# User instructions

`${input:instructions}`

# Steps

 - Create a new file in the `.work/` directory named with a zero-padded incremental number and a short slug of the work to be done, e.g. `001-add-new-feature.md`
 - In that file, outline the steps needed to complete the work based on the user instructions
 - Ensure the work instructions are clear and detailed enough for implementation
 - Refer to files in the code and skills under `.github/skills/` as needed for examples and guidance
 - Ask me to review and edit the work plan before implementation begins
 - Once approved, begin working on the tasks outlined in the work plan
 - Ask me to review the completed work.
 - Once approved, move the work file to the `.work/archive/` directory for record keeping
