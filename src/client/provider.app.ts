import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { AppContext, appContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js";
import { getAchievements } from "./util.storage.js";

export abstract class CanzeltlyAppProvider extends CanzeltlyAbstractProvider {
  @provide({ context: appContext })
  @property({ attribute: false })
  appContext: AppContext = {
    status: LoadingStatus.enum.idle,
  };

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.load();
  }

  async load(): Promise<void> {
    this.appContext.status = LoadingStatus.enum.loading;
    this.requestUpdate();
    try {
      this.appContext.achievements = getAchievements();
      this.appContext.status = LoadingStatus.enum.success;
    } catch (error) {
      console.error("Failed to load achievements", error);
      this.appContext.status = LoadingStatus.enum.error;
      this.appContext.error = "Failed to load achievements";
    }
    this.requestUpdate();
  }
}
