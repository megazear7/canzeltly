---
agent: 'agent'
model: Grok Code Fast 1
tools: ['vscode', 'execute', 'read']
description: 'Commit the current changes'
---

# Steps

 - Run `npm fix` to automatically fix any linting or formatting issues before committing.
 - Review the staged changes made in the codebase.
 - Pause these steps and inform me if there are any changes that need to be addressed before committing or any changes that do not look like they should be commited, such as debug code or temporary files.
 - Write a clear and concise commit message summarizing the changes.
 - Ensure the commit message follows best practices (e.g., imperative mood, brief summary).
 - Run `git commit -m "<your commit message>"` to create the commit with the prepared message.
 - Run `git push` to push the committed changes to the remote repository.
 - DO NOT try to use `git checkout` or `git reset` to undo any changes. If you want to make changes, such as removing debug code, ask me first and then just make new edits.
