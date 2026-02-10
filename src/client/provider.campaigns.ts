import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { CampaignsContext, campaignsContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { allCampaigns } from "../shared/data.campaigns.js";
import { getAllActiveCampaigns } from "./util.storage.js";

export abstract class CanzeltlyCampaignsProvider extends CanzeltlyAppProvider {
  @provide({ context: campaignsContext })
  @property({ attribute: false })
  campaignsContext: CampaignsContext = {
    status: LoadingStatus.enum.idle,
    campaigns: [],
    activeCampaigns: [],
  };

  override async load(): Promise<void> {
    this.campaignsContext = {
      status: LoadingStatus.enum.loading,
      campaigns: [],
      activeCampaigns: [],
    };
    this.requestUpdate();

    this.campaignsContext = {
      status: LoadingStatus.enum.success,
      campaigns: allCampaigns,
      activeCampaigns: getAllActiveCampaigns(),
    };
    this.requestUpdate();
  }
}
