### Detailed Plan to Fix Victory Display in Adventure Mode

**Problem Analysis:**
- In Adventure mode, collecting all green circles should set `player.victory = "Win"` and end the game with "Victory!" displayed.
- However, the game-over modal still shows "Defeat", indicating `victory` is not set to "Win" or is overridden.
- Possible causes:
  - The collection affect logic is correct, but victory might be overridden by the game-over affect if collisions with red circles occur simultaneously or in a specific order.
  - If the player hits a red circle first, `victory` is set to "Lose", and the game ends. If the player then collects the remaining green circles (if the game loop continues), `victory` is set to "Win", but the modal may have already opened with "Lose".
  - The affects processing order: GameOver affect (sets Lose on collision) runs before Collection affect (sets Win on collecting all). If collision happens first, Lose is set; if collection happens first, Win is set.
  - With the current check in `affect.game-over.ts` (only set Lose if not already Win), and Collection setting Win after, it should work. But if the modal opens on the first GameOver trigger, it might show the initial value.

**Proposed Fix:**
1. **Prevent overriding victory after game over:**
   - Modify `affect.collection.ts` to only set `status`, `ended`, and `victory` if the game is not already in `GameOver` status.
   - This ensures that if the player hits a red circle first (causing GameOver with Lose), collecting remaining circles doesn't change victory to Win.
   - If the player collects all circles first (setting Win), hitting a red circle afterward won't change it to Lose (due to the existing check).

2. **Code Changes:**
   - In `affect.collection.ts`, wrap the win condition logic in `if (obj.game.state.status !== GameStatus.enum.GameOver) { ... }`.
   - This prevents re-setting victory if the game has already ended.

3. **Testing:**
   - Test scenarios:
     - Collect all green circles without hitting red: Should show "Victory!".
     - Hit a red circle before collecting all: Should show "Defeat".
     - Hit a red circle while collecting the last green circle: Should prioritize Win (since collection sets Win, and game-over doesn't override if Win is set).
     - Collect all, then hit red (if game continues): Should remain "Victory!".

**Questions:**
- Does the game loop stop when `status` is set to `GameOver`, or do affects continue to run?
- Is the game-over modal re-rendered if `victory` changes after it opens, or does it capture the value at open time?
- Have you observed if hitting red circles affects the victory display in any specific way during testing?