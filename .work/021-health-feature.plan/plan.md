## Step 1: Add Health

Add a `health` and `damage` properties to the ability affect.
Add a new health collision affect that checks for collisions similar to the game over affect
This health collision affect reduces "this" objects health by an amount equal to the `damage` property of the colliding object.
If the colliding object has no damage property, then the damage is 1.
Ghosts do 2 damage.
Voids do 5 damage.

## Step 2: Update Game Over

Update the game over affect to check if "this" object has 0 health. If so, the game is over.

## Step 3: Update Create Game Page

Add a health option on the create game page that determines how much health you get, default to 1 with a range of 1-100.

## Step 4: Heads up Display

Display the health in the HUD.
Update the color of the text in the HUD to be black instead of white for readability.

## Notes

Test all your changes with `npm run build`, `npm run test`, the Chrome DevTools MCP server and the Playwright MCP server.