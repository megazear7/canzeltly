# User Profiles Implementation Plan

## Overview
Implement user profiles system where all game data (saved games, campaigns, achievements, custom modes) is scoped to individual user profiles. Each profile has a name, ID, and two randomly assigned colors for visual identification.

## Current State Analysis
- Local storage uses hardcoded keys: `canzeltly_saved_games`, `canzeltly_player_assignments`, etc.
- App initializes without profile selection
- No profile management UI exists
- Player type exists but is for in-game players, not user profiles

## Implementation Steps

### 1. Create User Profile Types
- **File**: `src/shared/type.profile.ts`
- **Content**:
  - `ProfileId` schema (lowercase underscore version of name)
  - `Profile` schema with id, name, primaryColor, secondaryColor
  - `ProfileContext` for provider context
- **Validation**: Use Zod schemas for type safety

### 2. Update Storage System
- **File**: `src/client/util.storage.ts`
- **Changes**:
  - Add `ACTIVE_PROFILE_KEY = "canzeltly_active_profile"`
  - Add `PROFILES_KEY = "canzeltly_profiles"`
  - Modify all storage functions to accept profileId parameter
  - Update storage keys to be prefixed: `${profileId}_${STORAGE_KEY}`
  - Add profile management functions: saveProfile, getAllProfiles, deleteProfile, setActiveProfile

### 3. Create Profile Provider
- **File**: `src/client/provider.profile.ts`
- **Extends**: `CanzeltlyAbstractProvider`
- **Context**: ProfileContext with current profile, all profiles, status
- **Responsibilities**:
  - Load all profiles on initialization
  - Set active profile (last used or first available)
  - Handle profile creation, switching, deletion
  - Provide profile data to components

### 4. Create Profile Components

#### Profile Circle Component
- **File**: `src/client/component.profile-circle.ts`
- **Purpose**: Display profile avatar in top-right corner
- **Features**:
  - Two-tone gradient circle using profile colors
  - Profile name below circle
  - Click handler to open profile modal
  - Badge count display (from achievements)

#### Profile Modal Component
- **File**: `src/client/component.profile-modal.ts`
- **Purpose**: Main profile management interface
- **Features**:
  - List all existing profiles with selection
  - "Create New Profile" button
  - Current profile highlighting
  - Profile switching functionality

#### Create Profile Modal Component
- **File**: `src/client/component.create-profile-modal.ts`
- **Purpose**: Profile creation interface
- **Features**:
  - Name input field
  - Random color assignment (2 colors)
  - ID generation (slugified name)
  - Validation and creation logic

### 5. Update App Initialization
- **File**: `src/client/app.ts`
- **Changes**:
  - Add profile provider to app template
  - Check for existing profiles on load
  - Show create profile modal if no profiles exist
  - Load last active profile automatically

### 6. Update Home Page
- **File**: `src/client/page.home.ts`
- **Changes**:
  - Add profile circle component to top-right
  - Position using CSS (absolute positioning)
  - Ensure it overlays other content

### 7. Update All Providers to Use Profile Context
- **Files**: `provider.games.ts`, `provider.custom-game-modes.ts`, `provider.campaigns.ts`, `provider.app.ts`
- **Changes**:
  - Inject profile context
  - Pass profileId to all storage functions
  - Update data loading to be profile-scoped

### 8. Update Component Imports and Event Handling
- **File**: `src/client/app.ts`
- **Changes**:
  - Import new profile components
  - Add profile modal to template conditionally
  - Handle profile creation/switching events

### 9. Add Profile Events
- **Files**: `src/client/event.profile-created.ts`, `src/client/event.profile-switched.ts`
- **Purpose**: Handle profile lifecycle events
- **Integration**: Update `util.events.ts` and event dispatching

### 10. Update Styles
- **File**: `src/client/styles.global.ts`
- **Changes**:
  - Add styles for profile circle positioning
  - Profile modal styling
  - Responsive design considerations

## Testing Strategy
- Test profile creation with various names
- Test profile switching and data isolation
- Test app initialization with/without existing profiles
- Verify data persistence across profile switches
- Test color assignment randomness

## Migration Considerations
- Existing data without profiles needs to be migrated to a default profile
- Handle case where users have existing data before profiles were implemented
- Ensure backward compatibility during transition

## File Changes Summary
- **New Files**: 6 (types, provider, 3 components, 2 events)
- **Modified Files**: 8+ (storage, providers, app, home page, styles, events)
- **Total Impact**: Major refactoring of data persistence layer

## Dependencies
- Requires collectables system (already implemented)
- Uses existing modal and input components
- Leverages current provider pattern and context system