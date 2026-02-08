# Step 1

A game should only appear in the saved games list if the user saved it
It should NOT appear by default after using the create game page.
We will need to somehow transfer the state from the create game page to the play game page in a different local storage property than is currently being used.
To do this, we can add a get param to the play game page `newgame=true` that tells it to not look for the game id in the normal local storage place but to instead look in a different local storage property called "new-game".

# Step 2

Add a select all option on the saved games page for each section (active games and completed games)

# Step 3

Fix the delete button on the saved games page.
Currently it is disabled even after selecting one or more games.

# Notes

Remember to use Playwight MCP and Chrome DevTools MCP to test along the way
Remember to run `npm run fix` to fix formatting and linting. Manually resolve any isses this command lists.
Remember to run `npm run build` to check the build. Fix any issues that are reported.
As you work, update the `.github/skills/testing/SKILL.md` file with anything you learn about how to properly test the application.
