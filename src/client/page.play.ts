import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { saveAchievements } from "./util.storage.js";
import { Achievements } from "../shared/type.achievement.js";

@customElement("canzeltly-play-page")
export class CanzeltlyPlayPage extends CanzeltlyAppProvider {
  params = parseRouteParams("/play/game/:gameId/player/:playerId", window.location.pathname);
  isNewGame = new URLSearchParams(window.location.search).get("newgame") === "true";
  campaignSlug = new URLSearchParams(window.location.search).get("campaign") || "";
  modeName = new URLSearchParams(window.location.search).get("mode") || "";

  override render(): TemplateResult {
    return html`
      <canzeltly-play
        .gameId="${this.params.gameId}"
        .playerId="${this.params.playerId}"
        .isNewGame="${this.isNewGame}"
        .instanceId="${this.campaignSlug}"
        .modeName="${this.modeName}"
        .achievements="${this.appContext.achievements}"
        .onAchievementsUpdate="${(achievements: Achievements) => {
          this.appContext.achievements = achievements;
          saveAchievements(achievements, this.profileContext.currentProfile!.id);
        }}"></canzeltly-play>
    `;
  }
}
