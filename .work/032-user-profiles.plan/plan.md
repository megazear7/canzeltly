Goal: Add user profiles where all the custom games, played games, campaign data, badges, etc. are scoped to that profile.

- When the app loads, the last used profile is auto selected. If there are no profiles, a "create profile" modal is opened that asks for a profile name.
- When creating a new profile, randomly assign two colors to that profile
- When creating a new profile, assign an ID that is a lowercase and underscore version of the profile name
- There is a profile circle on the top right (a two tone gradient color that is randomly assigned during profile creation).
    - The name is shown below the profile circle
- Clicking on the profile circle opens a modal
    - In this modal, the profile can be changed to a different profile, or a new profile can be created.
    - Creating a new profile opens up the same create new profile modal used when the app loads without a profile
    - The number of collected badges is shown in the gradient circle below the badge icon.
- The keys of the local storage data all need updated to be prefixed by the user profile id
- The app urls do not change. Instead, an "active profile" localstorage value determines which profile is currently active.