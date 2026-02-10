import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCampaignsProvider } from "./provider.campaigns.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { getCampaignBySlug } from "../shared/data.campaigns.js";

@customElement("canzeltly-continue-campaign-page")
export class CanzeltlyContinueCampaignPage extends CanzeltlyCampaignsProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--size-large);
      }

      .campaign-card {
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-large);
        padding: var(--size-large);
        margin-bottom: var(--size-large);
        box-shadow: var(--shadow-normal);
        cursor: pointer;
        transition: var(--transition-all);
      }

      .campaign-card:hover {
        box-shadow: var(--shadow-hover);
      }

      .campaign-card h2 {
        margin-top: 0;
      }

      .progress {
        color: var(--color-secondary-text-muted);
        font-size: var(--font-small);
      }

      .no-campaigns {
        text-align: center;
        padding: var(--size-xl);
        color: var(--color-secondary-text-muted);
      }
    `,
  ];

  override render(): TemplateResult {
    const activeCampaigns = this.campaignsContext.activeCampaigns;

    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>Continue Campaign</h1>
        ${activeCampaigns.length === 0
          ? html`
              <div class="no-campaigns">
                <p>No active campaigns. Start a new campaign to begin your adventure!</p>
                <button class="primary" @click=${this.goStartCampaign}>Start New Campaign</button>
              </div>
            `
          : activeCampaigns.map((instance) => {
              const campaign = getCampaignBySlug(instance.campaignSlug);
              if (!campaign) return html``;
              const progress = instance.completedGameIndexes.length;
              const total = campaign.games.length;
              return html`
                <div class="campaign-card" @click=${() => this.openCampaign(instance.campaignSlug)}>
                  <h2>${campaign.name}</h2>
                  <p>${campaign.description}</p>
                  <p class="progress">Progress: ${progress} / ${total} games completed</p>
                </div>
              `;
            })}
      </main>
    `;
  }

  private openCampaign(slug: string): void {
    dispatch(this, NavigationEvent({ path: `/campaigns/${slug}` }));
  }

  private goStartCampaign(): void {
    dispatch(this, NavigationEvent({ path: "/campaigns/start" }));
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
