Add a "create new game" page where game options can be set by the user before starting the game.
This game is opened from the home page in a "Create game" link. The existing "Play the game" button should be renamed to "Quickstart a Game"

General purpose input component:
- Create a general purpose `<canzeltly-input type="number|slider|checkbox|dropdown|plaintext">` component
- Use this component on the page to allow the user to select values of the GameState as defined in `src/game/game.ts`

Selections that the user can make:
 - Game name (only letters, numbers, and spaces)
 - Game world width (slider from 100 to 10,000)
 - Game world height (slider from 100, to 10,000)
 - Number of circles (CircleState objects added in the second layer of the game world)

Other notes about creating the game
- Auto calculate a all lowercase with dashes version of the game name to use as the id
- The viewport always starts at 0,0 and there is always two rectangles in the first layer as shown in `src/game/util.new-game.ts`
- The first rectangle is the size of the game world and the second rectangle is 20 smaller and offset by 10.

Once they confirm their selection:
- Save the game state to local storage using the utils in `src/client/util.storage.ts`
- Send the user to the url `/play/:id`
