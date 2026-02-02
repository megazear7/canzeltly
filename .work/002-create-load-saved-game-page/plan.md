Create a load saved game page where all the saved games are displayed.
Each game is displayed in a `<canzeltly-game-preview .gameState=${...}>` component which is displayed as a bar with:
 - A checkbox on the left so that the games can be selected
 - The game name displayed next to the check box
 - A "play game" button next to the game name
 - A kebab menu on the right
The kebab menu opens a modal with some options:
 - Play game
 - Delete game
 - Rename game (this should change the name and recalculate the id)
The user should be able to multi select the games (provide a selected state with a 1px color-1 border)
When one or more games are selected, a "Delete" option becomes active:
 - This button is by default not clickable until one or more games are selected
 - When clicked, a modal appears asking the user to confirm that they want to delete all the selected games.
 - The modal has a "delete all button" that deletes all the games.
 - The modal has a "cancel" option that closes the modal but leaves the selected games still selected.
The data for all the games should be loaded with `src/client/util.storage.ts`
The page should be launched from the home screen with a "Load saved game" link
