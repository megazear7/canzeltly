import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { ProfileContext, profileContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js";
import { getAllProfiles, saveProfile, setActiveProfile, getActiveProfile, deleteProfile } from "./util.storage.js";
import { Profile, ProfileId, createProfile } from "../shared/type.profile.js";

export abstract class CanzeltlyProfileProvider extends CanzeltlyAbstractProvider {
  @provide({ context: profileContext })
  @property({ attribute: false })
  profileContext: ProfileContext = {
    status: LoadingStatus.enum.idle,
    profiles: [],
    showCreateProfileModal: false,
    showProfileModal: false,
  };

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.load();
  }

  override async load(): Promise<void> {
    this.profileContext = {
      ...this.profileContext,
      status: LoadingStatus.enum.loading,
    };

    try {
      const profiles = getAllProfiles();
      let currentProfile: Profile | undefined;

      if (profiles.length === 0) {
        // No profiles exist, show create profile modal
        this.profileContext = {
          ...this.profileContext,
          status: LoadingStatus.enum.success,
          profiles: [],
          showCreateProfileModal: true,
        };
        return;
      }

      // Try to get the last active profile
      const activeProfileId = getActiveProfile();
      if (activeProfileId) {
        currentProfile = profiles.find((p) => p.id === activeProfileId);
      }

      // If no active profile or it doesn't exist, use the first profile
      if (!currentProfile) {
        currentProfile = profiles[0];
        setActiveProfile(currentProfile.id);
      }

      this.profileContext = {
        ...this.profileContext,
        status: LoadingStatus.enum.success,
        currentProfile,
        profiles,
        showCreateProfileModal: false,
      };
    } catch (error) {
      console.error("Error loading profiles:", error);
      this.profileContext = {
        ...this.profileContext,
        status: LoadingStatus.enum.error,
      };
    }
  }

  createProfile(name: string): void {
    const profile = createProfile(name);
    saveProfile(profile);
    setActiveProfile(profile.id);

    this.profileContext = {
      ...this.profileContext,
      profiles: [...this.profileContext.profiles, profile],
      currentProfile: profile,
      showCreateProfileModal: false,
    };
  }

  switchProfile(profileId: ProfileId): void {
    const profile = this.profileContext.profiles.find((p) => p.id === profileId);
    if (profile) {
      setActiveProfile(profile.id);
      this.profileContext = {
        ...this.profileContext,
        currentProfile: profile,
        showProfileModal: false,
      };
    }
  }

  deleteProfile(profileId: ProfileId): void {
    if (this.profileContext.profiles.length <= 1) {
      // Don't allow deleting the last profile
      return;
    }

    deleteProfile(profileId);
    const remainingProfiles = this.profileContext.profiles.filter((p) => p.id !== profileId);

    let newCurrentProfile = this.profileContext.currentProfile;
    if (this.profileContext.currentProfile?.id === profileId) {
      newCurrentProfile = remainingProfiles[0];
      setActiveProfile(newCurrentProfile.id);
    }

    this.profileContext = {
      ...this.profileContext,
      profiles: remainingProfiles,
      currentProfile: newCurrentProfile,
    };
  }

  updateProfileDrawMode(drawMode: "simple" | "graphical"): void {
    if (!this.profileContext.currentProfile) return;
    const updatedProfile = { ...this.profileContext.currentProfile, drawMode };
    saveProfile(updatedProfile);
    this.profileContext = {
      ...this.profileContext,
      currentProfile: updatedProfile,
      profiles: this.profileContext.profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)),
    };
  }

  showProfileModal(): void {
    this.profileContext = {
      ...this.profileContext,
      showProfileModal: true,
    };
  }

  hideProfileModal(): void {
    this.profileContext = {
      ...this.profileContext,
      showProfileModal: false,
    };
  }

  showCreateProfileModal(): void {
    this.profileContext = {
      ...this.profileContext,
      showCreateProfileModal: true,
    };
  }

  hideCreateProfileModal(): void {
    this.profileContext = {
      ...this.profileContext,
      showCreateProfileModal: false,
    };
  }
}
