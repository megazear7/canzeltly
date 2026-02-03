# Game Over

## GameState Updates
 - Add a `duration` property to the `GameState` which is a unix timestamp.
 - Add a `started` property to the `GameState which is a unix timestamp.
 - Add a `ended` property to the `GameState which is a unix timestamp.
 - Add a `status` propery to `GameState` which is an enum called `GameStatus`.
 - This enum could not `NotStarted`, `Playing`, `Paused`, or `GameOver`.
 - Use this enum in place of the current pause boolean which currently sits on the `Game` class.
 - Remove that `paused` boolean and use the `status` instead.

## Collision Utility
 - Add a utility that checks for a collision between two objects using a distance measurement between the x,y and the combined radius of the two objects.

## Game Over Check
 - Add an affect called default-game-over.
 - This affect has a `playerId` property of type `PlayerId`.
 - This affect uses the collision utility checking for a collision between "this" object and the other objects.
 - If there is a collision:
    - Update the status of the game.
    - Find the player, and set that players `victory` property to `Lose`.
 - The `update` of the `Game` class should not do anything if the game is paused or if the game is over.

## Player Circle
 - Add a `heroCircle` method to the `src/game/object.circle.ts` file.
 - Use this method in the `src/game/util.new-game.ts` file in place of the current circle that is used for the player.
 - Update `src/client/component.create-game.ts` to use this circle as well.

## Player
 - Update the `Player` object in `src/shared/type.player.ts` to include a `victory` property.
 - This property is an enum called `Victory` which has two values: `Win` and `Lose`.

# Game Summary Page
 - The url of this page is `/play/game/review/:gameId/player/:uuid`
 - This page shows statistics of the game in a pretty way, including:
    - How many objects are in the game
    - How long the game has been played
    - The size of the game world
    - Etc.
 - This page has a "Back to Home" button that takes the user to the home page.
 - If the game is over:
    - This page shows the current user win/lose messaging
 - If the game is not over:
    - This page has a "continue game" button that takes the user to `/play/game/:gameId/player/:uuid`

## Modal Updates
 - Update the modal to have a `closeable` property which defaults to `true`
 - When this property is set to false, there is no x button to close the modal and clicking outside of the modal does not close the modal.

## Game Loop
 - Update the game loop in `src/client/component.play.ts` to:
    - Set the `started` property on the `GameState` on the first loop (use the existing `once` if condition).
    - Update the `duration` property using the `currentTime - lastDraw` calculation.
    - Check for the game status on each loop
 - If the game is over:
    - Stop the game loop
    - Update the `ended` property on the `GameState`
    - Open the GameOver modal
 - The GameOver modal should:
    - Display win/lose information based on the game state.
    - Include an "End Game" button that takes the user to the game summary page.
    - This modal is not closeable.

## Saved Games Page
 - Update the saved games page to:
    - List the games that are not over in one list on the top.
    - List the games that are over in a second list below.
 - The games that are over should not have an option to play the game. Instead, the play game button should say "View Summmary"
 - The play game button in the modal should also say "View Summary".
