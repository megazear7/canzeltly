---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
description: 'Describe the new work you want to plan'
---

# User Instructions

`${input:instructions}`

# Steps

 - Decide a name for the plan based on the instructions I gave. The name should be a short, descriptive slug summarizing the work to be done. The directory should be named with a zero-padded incremental number and the slug, e.g., `001-some-example.plan/`. The number should be one higher than the highest numbered existing plan directory in the `.work/` folder.
 - Create a new directory named `.work/001-some-example.plan/` with files:
    - `instructions.md` - This file should contain the instructions that I gave.
    - `plan.md` - This file should be empty.
    - `details.md` - This file should be empty.
 - Ask me to add my plan to the `plan.md` file.
 - Once I confirm that I have added my plan, read the contents of the `plan.md` file.
 - Based on the contents of the `plan.md` file, create a detailed work plan in the `details.md` file.
 - You will need to review relevant files in the codebase to create a comprehensive work plan.
 - You will need to review relevant skills in the `.github/skills/` directory for guidance.
 - Update the `details.md` file as you go. Do not wait until the end to update it.
 - Once the `details.md` file is complete, ask me to review it.
 - After I confirm that the work plan is approved, inform me that I can begin the implementation
 - Do not proceed with any implementation until I confirm that the work plan is approved.
 - I may ask for changes to the `details.md` file before approving it. If so, make the updates to `details.md` and ask me to review it again. Keep repeating this step until I approve the work plan.
 - Once approved, begin the implementation as per the work plan in `details.md`.
 - After completing these steps, run `npm run fix` to automatically fix any linting or formatting issues.
 - Try running `npm run build` to ensure there are no compilation errors.
 - Keep iterating until all lint and build issues are resolved.
 - Do NOT try to run the development server with `npm start` as I will handle that myself.
 - Do not commit the changes as I will handle that myself.
