import { css, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { getCampaignBySlug } from "../shared/data.campaigns.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { getCampaignInstance, saveActiveCampaign } from "./util.storage.js";
import { StatUpgradeOption, CampaignInstance } from "../shared/type.campaign.js";

@customElement("canzeltly-campaign-upgrade-page")
export class CanzeltlyCampaignUpgradePage extends CanzeltlyAppProvider {
  params = parseRouteParams("/campaigns/:instanceId/upgrade", window.location.pathname);

  @state()
  private selectedUpgrades: StatUpgradeOption[] = [];

  @state()
  private instance: CampaignInstance | undefined;

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: var(--size-600);
        margin: 0 auto;
        padding: var(--size-large);
        text-align: center;
      }

      .upgrade-options {
        display: flex;
        flex-direction: column;
        gap: var(--size-medium);
        margin: var(--size-xl) 0;
      }

      .upgrade-option {
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-medium);
        padding: var(--size-large);
        box-shadow: var(--shadow-normal);
        cursor: pointer;
        transition: var(--transition-all);
        border: var(--border-normal);
      }

      .upgrade-option:hover {
        box-shadow: var(--shadow-hover);
      }

      .upgrade-option.selected {
        border-color: var(--color-1);
        box-shadow: var(--shadow-active);
      }

      .upgrade-name {
        font-size: var(--font-large);
        font-weight: bold;
      }

      .upgrade-description {
        color: var(--color-secondary-text-muted);
        font-size: var(--font-small);
        margin-top: var(--size-small);
      }

      .current-stats {
        margin: var(--size-large) 0;
      }

      .stats-grid {
        display: flex;
        justify-content: center;
        gap: var(--size-large);
        margin-top: var(--size-small);
      }

      .stat {
        text-align: center;
      }

      .stat-value {
        font-size: var(--font-large);
        font-weight: bold;
        color: var(--color-1);
      }

      .stat-label {
        font-size: var(--font-small);
        color: var(--color-secondary-text-muted);
      }

      .selections-info {
        color: var(--color-secondary-text-muted);
        margin-bottom: var(--size-medium);
      }
    `,
  ];

  override async load(): Promise<void> {
    const instanceId = this.params.instanceId;
    this.instance = getCampaignInstance(instanceId, this.profileContext.currentProfile!.id);
  }

  override render(): TemplateResult {
    const instanceId = this.params.instanceId;
    const instance = this.instance;
    const campaign = instance ? getCampaignBySlug(instance.campaignSlug) : undefined;

    if (!campaign || !instance) {
      return html`
        <main>
          <h1>Campaign not found</h1>
          <button @click=${this.goHome}>Home</button>
        </main>
      `;
    }

    // The game that was just completed provides the upgrades
    const lastCompletedIndex =
      instance.completedGameIndexes.length > 0
        ? instance.completedGameIndexes[instance.completedGameIndexes.length - 1]
        : -1;
    const completedGame = lastCompletedIndex >= 0 ? campaign.games[lastCompletedIndex] : undefined;
    const upgrades = completedGame?.upgrades;

    if (!upgrades) {
      // No upgrades available, go directly to campaign games
      return html`
        <main>
          <h1>No upgrades available</h1>
          <button class="primary" @click=${() => this.goToCampaign(instanceId)}>Continue Campaign</button>
        </main>
      `;
    }

    const numSelections = upgrades.numSelections;

    return html`
      <main>
        <h1>Enhance Your Hero</h1>
        <p class="selections-info">
          Select ${numSelections} upgrade${numSelections > 1 ? "s" : ""}
          (${this.selectedUpgrades.length}/${numSelections} selected)
        </p>
        ${this.selectedUpgrades.length === numSelections
          ? html`
              <p
                style="color: var(--color-secondary-text-muted); font-size: var(--font-small); margin-bottom: var(--size-medium);">
                You have selected the maximum number of upgrades. To change your selection, first deselect one of the
                upgrades you have already selected.
              </p>
            `
          : html`
              <p
                style="color: var(--color-secondary-text-muted); font-size: var(--font-small); margin-bottom: var(--size-medium);">
                Select up to ${numSelections} upgrade${numSelections > 1 ? "s" : ""} from the below list. After each
                mission you may have different options available. Choose wisely.
              </p>
            `}

        <div class="current-stats">
          <h2>Current Stats</h2>
          <div class="stats-grid">
            <div class="stat">
              <div class="stat-value">${instance.heroStats.health}</div>
              <div class="stat-label">Health</div>
            </div>
            <div class="stat">
              <div class="stat-value">${instance.heroStats.maxSpeed.toFixed(1)}</div>
              <div class="stat-label">Max Speed</div>
            </div>
            <div class="stat">
              <div class="stat-value">${instance.heroStats.acceleration.toFixed(2)}</div>
              <div class="stat-label">Acceleration</div>
            </div>
            <div class="stat">
              <div class="stat-value">${instance.heroStats.breakSpeed.toFixed(2)}</div>
              <div class="stat-label">Break Speed</div>
            </div>
          </div>
        </div>

        <div class="upgrade-options">
          ${upgrades.options.map(
            (option) => html`
              <div
                class="upgrade-option ${this.selectedUpgrades.includes(option) ? "selected" : ""}"
                @click=${() => this.toggleUpgrade(option, numSelections)}>
                <div class="upgrade-name">${this.getUpgradeName(option)}</div>
                <div class="upgrade-description">${this.getUpgradeDescription(option)}</div>
              </div>
            `,
          )}
        </div>

        <button
          class="primary"
          ?disabled=${this.selectedUpgrades.length !== numSelections}
          @click=${() => this.applyUpgrades(instanceId)}>
          Apply Upgrades
        </button>
      </main>
    `;
  }

  private toggleUpgrade(option: StatUpgradeOption, maxSelections: number): void {
    const index = this.selectedUpgrades.indexOf(option);
    if (index >= 0) {
      this.selectedUpgrades = this.selectedUpgrades.filter((o) => o !== option);
    } else if (this.selectedUpgrades.length < maxSelections) {
      this.selectedUpgrades = [...this.selectedUpgrades, option];
    }
  }

  private getUpgradeName(option: StatUpgradeOption): string {
    switch (option) {
      case "health":
        return "Health +0.5";
      case "maxSpeed":
        return "Max Speed +0.5";
      case "acceleration":
        return "Acceleration +0.1";
      case "breakSpeed":
        return "Break Speed +0.05";
    }
  }

  private getUpgradeDescription(option: StatUpgradeOption): string {
    switch (option) {
      case "health":
        return "Increase your maximum health by 0.5, allowing you to survive more hits.";
      case "maxSpeed":
        return "Increase your maximum speed by 0.5, allowing you to move faster.";
      case "acceleration":
        return "Increase your acceleration by 0.1, allowing you to change direction faster.";
      case "breakSpeed":
        return "Increase your break speed by 0.05, allowing you to stop or slow down faster.";
    }
  }

  private applyUpgrades(instanceId: string): void {
    const instance = getCampaignInstance(instanceId, this.profileContext.currentProfile!.id);
    if (!instance) return;

    for (const upgrade of this.selectedUpgrades) {
      switch (upgrade) {
        case "health":
          instance.heroStats.health += 0.5;
          break;
        case "maxSpeed":
          instance.heroStats.maxSpeed += 0.5;
          break;
        case "acceleration":
          instance.heroStats.acceleration += 0.1;
          break;
        case "breakSpeed":
          instance.heroStats.breakSpeed += 0.05;
          break;
      }
    }

    saveActiveCampaign(instance, this.profileContext.currentProfile!.id);
    dispatch(this, NavigationEvent({ path: `/campaigns/${instanceId}` }));
  }

  private goToCampaign(instanceId: string): void {
    dispatch(this, NavigationEvent({ path: `/campaigns/${instanceId}` }));
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
