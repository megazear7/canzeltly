# Campaigns

## Step 1: Define Campaigns

- Within the codebase
- Each campaign is a series of predefined custom game modes defined in the codebase.
- Each game in the campaign is associated to a "intro" object.
- For now, all intro objects are `{ "type": "text", "text": "some intro text" }`
- There is also "victory" objects and "defeat" objects that follow the same patter.
- Before the game starts, intro objects of type text are displayed in a modal
  before the game beings.
- Each game in the campaign is associated to a number of options where they can enhance
  the attributes of the hero object including along with a number that says how many
  increases they can select:
    - health
    - max speed
    - acceleration
- Each game could allow for different attribute modifications between games
- The hero object data is saved in the instance of the campaign so that it persists
  between games.

## Step 2: Tutorial Campaign

- Game 1:
    - Intro: Welcome to Canzeltly, the game of circle survival and adventures. Collect the green circles to win. But watch out, you are the master of gravity in this world...
    - Victory: You mastered the green circle, but you have not mastered gravity! Continue playing to explore this world...
    - Defeat: I don't know how you lost this one, but try again...
    - Updates: Increase health/max speed/acceleration
    - Game details: Adventure mode with 1 green circle
- Game 2:
    - Intro: <fill this in creatively>
    - Victory: <fill this in creatively>
    - Defeat: <fill this in creatively>
    - Updates: Increase health/max speed/acceleration
    - Game details: Adventure mode with 2 green circles
- Game 3:
    - ... same
    - Game details: Adventure mode with 2 green circle and 1 bouncy circle
- Game 4:
    - ... same
    - Game details: Adventure mode with 2 green circles, 1 bouncy circle, and 5 blockades
- Game 5:
    - ... same
    - Game details: Adventure mode with 3 green circles, 1 bouncy circle, and 2 voids
- Game 6:
    - ... same
    - Game details: Race mode with 3 green circles
- Game 7:
    - ... same
    - Defeat: You have now played through the entire tutorial. But the greatest challenge is still ahead...
    - Game details: Survival mode with 5 red circles

## Step 3: The Revenge of the Radial Master
- Creatively define a series of 10 adventure games of increasing difficulty.
- Use all of the circle types in the various games except ghost and void.

## Step 4: Circle Man and the Mighty Minions
- Creatively define a series of 10 race games of increasing difficulty
- Use all of the circle types in the various games including ghost and void.

## Step 5: Start New Campaign Page

- Add a "Start New Campaign" link that takes the user to a new page.
- On this page they can choose one of the campaigns and start that campaign.
- Once started, this "instance" of the campaign is saved to local storage in an "active campaigns" property

## Step 6: Continue a Campaign

- Add a "Continue Campaign" link that takes the user to a new page
- On this page, the active campaigns are listed
- The user can click on one of the campaigns to go to a new page that shows all of the games for that campaign.
- On this page, the games that are already played and won are showed with a color-1 checkmark
- The next game is displayed with a "Play next game" button
- The games after the next game are greyed out and disabled

## Step 7: Playing a campaign game

- Go to the play game page with "?campaign=<name>" in the url
- Find the next game in that campaign.
- Show the intro text in a modal before starting the game
- When the user confirms the modal, start the game
- If the user is defeated, show the defeated text in a modal with a "try again" button, and "back to home" button.
- If the user wins, show the victory text in a modal with a "continue campaign" button and a "back to home" button.
- After clicking the "continue campaign" button on the modal, take the user to a new page where they can select an
  increase to their stats based on the campaign configuration.
