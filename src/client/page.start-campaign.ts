import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCampaignsProvider } from "./provider.campaigns.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { HeroStats } from "../shared/type.campaign.js";
import { saveActiveCampaign, getActiveCampaign } from "./util.storage.js";

@customElement("canzeltly-start-campaign-page")
export class CanzeltlyStartCampaignPage extends CanzeltlyCampaignsProvider {
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
      }

      .campaign-card h2 {
        margin-top: 0;
      }

      .campaign-card p {
        color: var(--color-secondary-text-muted);
      }

      .campaign-actions {
        display: flex;
        gap: var(--size-medium);
        margin-top: var(--size-medium);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>Start New Campaign</h1>
        <p>Choose a campaign to begin your adventure.</p>
        ${this.campaignsContext.campaigns.map(
          (campaign) => html`
            <div class="campaign-card">
              <h2>${campaign.name}</h2>
              <p>${campaign.description}</p>
              <p>${campaign.games.length} games</p>
              <div class="campaign-actions">
                ${getActiveCampaign(campaign.slug)
                  ? html`
                      <button @click=${() => this.continueCampaign(campaign.slug)}>Continue Existing</button>
                      <button class="warning" @click=${() => this.restartCampaign(campaign.slug)}>Restart</button>
                    `
                  : html`
                      <button class="primary" @click=${() => this.startCampaign(campaign.slug)}>Start</button>
                    `}
              </div>
            </div>
          `,
        )}
      </main>
    `;
  }

  private startCampaign(slug: string): void {
    const instance = {
      campaignSlug: slug,
      currentGameIndex: 0,
      completedGameIndexes: [],
      heroStats: HeroStats.parse({}),
      startedAt: Date.now(),
    };
    saveActiveCampaign(instance);
    dispatch(this, NavigationEvent({ path: `/campaigns/${slug}` }));
  }

  private restartCampaign(slug: string): void {
    this.startCampaign(slug);
  }

  private continueCampaign(slug: string): void {
    dispatch(this, NavigationEvent({ path: `/campaigns/${slug}` }));
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
