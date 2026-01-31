Add a list of players to the game state.
The player objects has a "viewportIndex" property which specifies which viewport they are looking through
The player object has a "playerId" (uuid)
The player object has a "name" which is optional but might be used later for display purposes
The player object has a "selected objects" array, which is an array of game object ids
The "/play/:id" page url should now be "/play/game/:gameId/player/:playerId"
When creating a default game, create a uuid playerId and use that in construction of the game state
Whenever a game is created maintain a mapping in "player assignment" localstorage object that maps game ids to player ids.
When launching a game from the create game page or from the saved games page, use this lookup table to identify the correct player id to use for this game.
Update the default game to add a single circle and add this circle to the first (and only) players selected objects array.
Update the input so that when the player clicks on the screen, the players selected objects "target" effect is updated to point at that point in the game world. You will need to do the reverse mapping src/canvas/util.map-to-canvas.ts
